import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
  Alert,
  Container,
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import FetchUsers from "./FetchUsers";


const CreateNewGroup = () => {
  const [error, setError] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessBar, setShowSuccessBar] = useState(false);
  const [success, setSuccess] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);
  const [newMember, setNewMember] = useState(""); // To store input for adding new members
  const [searchInput, setSearchInput] = useState(""); // For search bar input
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");


  useEffect(() => {
    // Fetch user data when the component mounts
    FetchUsers()
      .then((data) => {
        if (data) {
          setCustomers(data);
        } else {
          // Handle the case where data is null (error occurred)
          console.error("Failed to fetch user data.");
        }
      })
      .catch((error) => {
        // Handle unexpected errors
        console.error("Error fetching user data:", error);
      })
      .finally(() => {
        // Set isLoading to false when the request is complete
        setIsLoading(false);
      });
  }, []);

  const handleAddMember = (memberName) => {
    // Add the selected member to the groupMembers array
    setGroupMembers([...groupMembers, memberName]);
    if (selectedUsers.includes(memberName)) {
        console.error("already added to the group");
        return;
      }
  };

  const handleRemoveMember = (index) => {
    // Remove a member from the groupMembers array by index
    const updatedMembers = groupMembers.filter((_, i) => i !== index);
    setGroupMembers(updatedMembers);
  };

  const handleCreateGroup = async () => {
    // Handle group creation here (e.g., sending data to a server using axios)
    // Display success or error messages accordingly
    if(!groupName || groupMembers.length === 0) {
        console.log("please name your group and add members")
        return;
    }
    try {
        // Prepare the data to send to the backend
        const data = {
          groupName: groupName,
          memberIds: groupMembers.map((memberName) => {
            // Find the user by name and get their ID
            const selectedUser = customers.find(
              (customer) => customer.name === memberName
            );
            return selectedUser._id;
          }),
        };
    
        // Send a POST request to create the group
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/customer/api/groups`, { user: localStorage.getItem("token"),data: data });
        //send in the user id, local storage token
    
        // Check the response status and display messages accordingly
        if (response.status === 200) {
          console.log("Group created successfully");
          setSuccess("Group created successfully");
          setShowSuccessBar(true);
        } else {
          console.error("Failed to create the group");
          setError("Failed to create the group");
          setShowErrorMessage(true);
        }
      } catch (error) {
        console.error("Error creating group:", error);
        setError("Error creating group");
        setShowErrorMessage(true);
      } finally {
        // Clear the group name and group members
        setGroupName("");
        setGroupMembers([]);
        setSelectedUsers([]);
      }
      console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);

  };

  // Filter group members based on the search input
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <Container maxWidth="sm">
      {" "}
      {/* Set maximum width to 500px */}
      <Typography variant="h5" sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}>
        Select Group Members
      </Typography>
      {/* Search bar */}
      <TextField
        label="Search"
        variant="outlined"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="New Member"
        variant="outlined"
        value={newMember}
        onChange={(e) => setNewMember(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Group Name"
        variant="outlined"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {filteredCustomers.map((customer) => (
          <Grid item key={customer._id} xs={12}>
            <Typography>{customer.name}</Typography>
            {/* Add a button or icon to select the user */}
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => handleAddMember(customer.name)}
            >
              Add
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button
        onClick={handleAddMember}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Add Member
      </Button>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {groupMembers.map((member, index) => (
          <Grid item key={index} xs={12}>
            <Typography>{member}</Typography>
            <Button
              onClick={() => handleRemoveMember(index)}
              variant="outlined"
              color="error"
              size="small"
            >
              Remove
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button
        onClick={handleCreateGroup}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Create Group
      </Button>
      {showErrorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {showSuccessBar && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {success}
        </Alert>
      )}
    </Container>
  );
};

export default CreateNewGroup;
