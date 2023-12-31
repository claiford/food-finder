import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../contexts/AuthContext";
import CreateNewGroup from "../components/CreateNewGroup";
import GroupList from "../components/GroupList";
import Navbar from "../components/Navbar";

import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const CustomerHome = () => {
  const [showNewGroupForm, setShowNewGroupForm] = useState(false);
  const [groups, setGroups] = useState([]);
  const [inSession, setInSession] = useState([]);

  const { customerInfo } = useContext(AuthContext);

  const getGroups = async () => {
    try {
      // Make a GET request to your backend API endpoint for fetching groups
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/customer/api/groups/${customerInfo._id}`
      );
      setGroups(response.data.groups);
      setInSession(response.data.inSession);
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error fetching groups data:", error);
    }
  };

  const handleDeleteGroup = async (group_id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/customer/api/groups/${group_id}/`);
      getGroups();
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  }

  const handleNewGroup = () => {
    setShowNewGroupForm(false);
    getGroups();
  };

  const handleNewGroupBtn = () => {
    setShowNewGroupForm((prev) => !prev);
  };

  useEffect(() => {
    console.log('refresh groups');
    getGroups();
  }, []);

  return (
    <>
      <Navbar />
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
            py: 3,
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
          <GroupList groups={groups} inSession={inSession} handleDeleteGroup={handleDeleteGroup} />
        )}
      </Box>
    </>
  );
};

export default CustomerHome;
