import React, { useState , useEffect } from "react";
import { Box, Button, Grid, Typography, List, ListItem, ListItemText } from "@mui/material";
import CreateNewGroup from "../components/CreateNewGroup";
import FetchGroups from "../components/FetchGroups";

const Home = () => {
    const [showNewGroupForm, setShowNewGroupForm] = useState(false);
    const [showGroupsList, setShowGroupsList] = useState(true);
    const [groups, setGroups] = useState([]);
    // const [activeButton, setActiveButton] = useState(null);
    
    useEffect(() => {
      FetchGroups()
        .then((data) => {
          if (data) {
            setGroups(data);
          } else {
            console.error("Failed to fetch groups data.");
          }
        })
        .catch((error) => {
          console.error("Error fetching groups data:", error);
        });
    }, []);

    const handleNewGroupBtn =  () => {
        setShowNewGroupForm(true);
        setShowGroupsList(false);
    }

    return ( 
        <>
        <div>Groups</div>
        <Button onClick={handleNewGroupBtn}>+</Button>
        {showNewGroupForm && (
        <CreateNewGroup />
      )}
      {showGroupsList && (
        <div>
          <Typography variant="h6" sx={{ mt: 2 }}>Your Groups:</Typography>
          <List>
            {groups.map((group) => (
              <ListItem key={group._id}>
                <ListItemText primary={group.groupName} />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </>
  );
}

export default Home;