import React, { useState } from "react";
import { Alert, Container, TextField, Button, Typography, Grid } from "@mui/material";

const CreateNewGroup = () => {
    const [error, setError] = useState(null);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showSuccessBar, setShowSuccessBar] = useState(false);
    const [success, setSuccess] = useState(null);
    const [groupMembers, setGroupMembers] = useState([]);
    const [newMember, setNewMember] = useState(""); // To store input for adding new members
    const [searchInput, setSearchInput] = useState(""); // For search bar input

    const handleAddMember = () => {
        // Add the newMember to the groupMembers array
        setGroupMembers([...groupMembers, newMember]);
        setNewMember(""); // Clear the input field
    };

    const handleRemoveMember = (index) => {
        // Remove a member from the groupMembers array by index
        const updatedMembers = groupMembers.filter((_, i) => i !== index);
        setGroupMembers(updatedMembers);
    };

    const handleCreateGroup = () => {
        // Handle group creation here (e.g., sending data to a server using axios)
        // Display success or error messages accordingly
    };

    // Filter group members based on the search input
    const filteredMembers = groupMembers.filter((member) =>
        member.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <Container maxWidth="sm"> {/* Set maximum width to 500px */}
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
            {filteredMembers.map((member, index) => (
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
