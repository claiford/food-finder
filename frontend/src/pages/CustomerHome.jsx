import { useState, useEffect } from "react";
import axios from "axios";

import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import CreateNewGroup from "../components/CreateNewGroup";
import GroupList from "../components/GroupList";
import Navbar from "../components/Navbar";

const CustomerHome = ({ customerInfo, handleLogout }) => {
  const [showNewGroupForm, setShowNewGroupForm] = useState(false);
  const [groups, setGroups] = useState([]);
  const [inSession, setInSession] = useState([]);

  const getGroups = async () => {
    try {
      // Make a GET request to your backend API endpoint for fetching groups
      const response = await axios.get(
        `${
          process.env.REACT_APP_BACKEND_URL
        }/customer/api/groups/${localStorage.getItem("customerToken")}`
      );
      setGroups(response.data.groups);
      setInSession(response.data.inSession);
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error fetching groups data:", error);
    }
  };

  const handleNewGroup = () => {
    console.log("handling new group");
    setShowNewGroupForm(false);
    getGroups();
  };

  const handleNewGroupBtn = () => {
    setShowNewGroupForm((prev) => !prev);
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <>
      <Navbar customerInfo={customerInfo} handleLogout={handleLogout}/>
      <Box
        sx={{
          width: "90%",
          maxWidth: "350px",
          height: "calc(100% - 56px - 24px)",
          maxHeight: "800px",
          mt: "56px",
          mb: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 3,
          }}
        >
          <Typography variant="header2">Your group(s)</Typography>
          <IconButton size="small" onClick={handleNewGroupBtn}>
            {showNewGroupForm ? (
              <CloseRoundedIcon color="lime" fontSize="small" />
            ) : (
              <AddIcon color="lime" fontSize="small" />
            )}
          </IconButton>
        </Box>
        {showNewGroupForm ? (
          <CreateNewGroup handleNewGroup={handleNewGroup} />
        ) : (
          <GroupList groups={groups} inSession={inSession} />
        )}
      </Box>
    </>
  );
};

export default CustomerHome;
