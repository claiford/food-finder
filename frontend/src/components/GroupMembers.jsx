import { Avatar, Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import AddMembersForm from "./AddMembersForm";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CustomerSelect from "./CustomerSelect";

const GroupMembers = ({ members }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [groupMembers, setGroupMembers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const { group_id } = useParams();

    const handleAddSelected = (newMember) => {
        setSelectedMembers((prevMembers) => {
            return [
                ...prevMembers,
                newMember
            ]
        });
    };

    const handleRemoveSelected = (idx) => {
        setSelectedMembers((prevSelectedMembers) => {
            return prevSelectedMembers.filter((_, i) => i !== idx);
        });
    };


    const toggleAddMembersForm = () => {
        setIsEdit(!isEdit);
    };

    const handleRemoveMember = async (userId) => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_BACKEND_URL}/customer/api/group/${group_id}/remove-member/${userId}`,
                {
                    data: { user: localStorage.getItem("customerToken") },
                }
            );

            if (response.status === 200) {
                const updatedMembers = groupMembers.filter((member) => member._id !== userId);
                setGroupMembers(updatedMembers);
            } else {
                console.error("Failed to remove member from the group");
            }
        } catch (error) {
            console.error("Error removing member from the group:", error);
        }
    };

    const handleAddMember = (newMember) => {
        console.log('addmember')
    };

    const memberList = members.map((member, i) => {
        const nameparts = member.name.split(" ");
        const initialA = nameparts[0][0].toUpperCase();
        const initialB = nameparts.length > 1 ? nameparts[1][0].toUpperCase() : "";

        return (
            <Box
                key={i}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    m: 2,
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
                {isEdit ? <Button onClick={() => handleRemoveMember(member._id)}>Remove</Button> : null}
            </Box>
        );
    });

    return (
        <>
            {memberList}
            {isEdit ? (
                <>
                    {/* <AddMembersForm onAddMember={handleAddMember} /> */}
                    <CustomerSelect
                        selectedMembers={selectedMembers}
                        handleAddSelected={handleAddSelected}
                        handleRemoveSelected={handleRemoveSelected}
                    />
                </>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={toggleAddMembersForm}
                >
                    Edit Members
                </Button>
            )}
        </>
    );
};

export default GroupMembers;
