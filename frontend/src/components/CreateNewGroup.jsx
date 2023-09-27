import { useEffect, useState } from "react";
import axios from 'axios';
import {
	Box,
	Alert,
	Container,
	TextField,
	Button,
	Typography,
	Stack,
	Badge,
	Avatar,
	IconButton,
} from "@mui/material";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

import FetchUsers from "./FetchUsers";
import CustomerSelect from "./CustomerSelect";


const CreateNewGroup = () => {
	const [error, setError] = useState(null);
	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const [showSuccessBar, setShowSuccessBar] = useState(false);
	const [success, setSuccess] = useState(null);
	const [groupName, setGroupName] = useState("");
	const [selectedMembers, setSelectedMembers] = useState([]);

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

	const handleFormChange = (e) => {
		setGroupName(e.target.value)
		setShowErrorMessage(false);
	}

	const handleCreateGroup = async () => {
		if (!groupName && selectedMembers.length === 0) {
			setError("All fields are required.");
			setShowErrorMessage(true);
		} else if (!groupName) {
			setError("Group name required.");
			setShowErrorMessage(true);
		} else if (selectedMembers.length === 0) {
			setError("At least 1 user required.");
			setShowErrorMessage(true);
		} else {
			try {
				const data = {
					name: groupName,
					members: selectedMembers,
					// memberIds: selectedMembers.map((memberName) => {
					// 	const selectedUser = customers.find(
					// 		(customer) => customer.name === memberName
					// 	);
					// 	return selectedUser._id;
					// }),
				};

				// Send a POST request to create the group
				const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/customer/api/groups/new`, { user: localStorage.getItem("token"), data: data });
				//send in the user id, local storage token

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
				// Clear the group name and group selectedMembers
				setGroupName("");
				setSelectedMembers([]);
			}
		}
	};

	return (
		<Container maxWidth="sm">
			<TextField
				label="Group Name"
				value={groupName}
				onChange={handleFormChange}
				fullWidth
				margin="normal"
			/>

			<CustomerSelect
				selectedMembers={selectedMembers}
				handleAddSelected={handleAddSelected}
				handleRemoveSelected={handleRemoveSelected}
			/>

			<Button
				onClick={handleCreateGroup}
				variant="contained"
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
