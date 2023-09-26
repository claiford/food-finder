import React, { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { Box, Button, Grid, Typography, List, ListItem, ListItemText } from "@mui/material";
import CreateNewGroup from "../components/CreateNewGroup";
import FetchGroups from "../components/FetchGroups";
import Navbar from "../components/Navbar";
import styles from './CustomerHome.module.css'

const Home = () => {
    const [showNewGroupForm, setShowNewGroupForm] = useState(false);
    const [showGroupsList, setShowGroupsList] = useState(true);
    const [groups, setGroups] = useState([]);
    // const [activeButton, setActiveButton] = useState(null);

    const navigate = useNavigate();
    
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
        <Navbar/>
        <div>Groups</div>
        <Button onClick={handleNewGroupBtn}>+</Button>
        {showNewGroupForm && (
        <CreateNewGroup />
      )}
      {showGroupsList && (
        <div className={styles.container}>
          <Typography variant="h6" sx={{ mt: 2 }}>Your Groups:</Typography>
          <List>
            {groups.map((group) => (
              <ListItem key={group._id}>
                {/* <ListItemText primary={group.groupName} /> */}
                <Button onClick={() => navigate(`/customer/group/${group._id}`)}>{group.groupName}</Button>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </>
  );
}

export default Home;