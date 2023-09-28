import { useState, useContext } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

import GroupContext from '../pages/GroupContext';
import CustomerSelect from "./CustomerSelect";

import { Avatar, Box, Stack, Typography, Button, IconButton, Alert } from "@mui/material";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';


const GroupMembers = ({ members }) => {
    const [error, setError] = useState(null);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [isAddMembers, setIsAddMembers] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const { group_id } = useParams();
    const { refreshData } = useContext(GroupContext)

    const toggleAddMembers = () => {
        setIsAddMembers((prev) => !prev);
    };

    const handleAddSelected = (newMember) => {
        setSelectedMembers((prevMembers) => {
            return [
                ...prevMembers,
                newMember
            ]
        });
        setShowErrorMessage(false);
    };

    const handleRemoveSelected = (idx) => {
        setSelectedMembers((prevSelectedMembers) => {
            return prevSelectedMembers.filter((_, i) => i !== idx);
        });
    };

    const handleRemoveMember = async (member) => {
        try {
            const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/customer/api/group/${group_id}/remove-member`, { member: member });
            refreshData();
        } catch (error) {
            console.error("Error removing member from the group:", error);
        }
    };

    const handleAddMembers = async () => {
        if (selectedMembers.length === 0) {
            setError("At least 1 user required.");
            setShowErrorMessage(true);
        } else {
            try {
                // Send a POST request to create the group
                const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/customer/api/group/${group_id}/add-members`, { members: selectedMembers });
                // Clear the group name and group selectedMembers
                setSelectedMembers([]);

                setIsAddMembers(false);
                refreshData();
            } catch (error) {
                setError("Error adding members.");
                setShowErrorMessage(true);
            }
        }
    };

    const memberList = members.map((member, i) => {
        const nameparts = member.name.split(" ");
        const initialA = nameparts[0][0].toUpperCase();
        const initialB = nameparts.length > 1 ? nameparts[1][0].toUpperCase() : "";

        return (
            <Box
                key={i}
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <Avatar
                    sx={{
                        mx: 2,
                        backgroundColor: "black",
                        color: "lime.main",
                    }}
                >
                    <Typography variant="body4" fontWeight={700}>
                        {initialA}
                        {initialB}
                    </Typography>
                </Avatar>
                <Typography variant="body2" fontWeight={700}>
                    {member.name}
                </Typography>

                <IconButton onClick={() => handleRemoveMember(member)} sx={{ ml: 'auto', '&:hover': { color: 'error.main' } }}>
                    <CancelRoundedIcon />
                </IconButton>
            </Box>
        );
    });

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            m: 3,
        }}>
            {isAddMembers ? (
                <Stack direction={"row"} spacing={2}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="darkgray"
                        onClick={toggleAddMembers}
                        sx={{ backgroundColor: "darkgray.main", boxShadow: "none" }}
                    >
                        Cancel
                    </Button>
                    {/* <Button
                        fullWidth
                        variant="contained"
                        onClick={handleAddMembers}
                    >
                        Save
                    </Button> */}
                    {showErrorMessage ? (
                        <Alert severity="error" sx={{width: "100%"}}>
                            {/* {error} */}
                        </Alert>
                    ) : (
                        <>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleAddMembers}
                            >
                                Save
                            </Button>
                        </>
                    )}
                </Stack>

            ) : (
                <>
                    {memberList}
                    <Button
                        variant="contained"
                        onClick={toggleAddMembers}
                    >
                        Add Members
                    </Button>
                </>
            )}

            {isAddMembers &&
                <CustomerSelect
                    existingMembers={members}
                    selectedMembers={selectedMembers}
                    handleAddSelected={handleAddSelected}
                    handleRemoveSelected={handleRemoveSelected}
                />
            }
        </Box>
    );
};

export default GroupMembers;
