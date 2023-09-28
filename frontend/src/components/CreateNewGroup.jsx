import { useState, useContext } from "react";
import axios from 'axios';

import { AuthContext } from '../contexts/AuthContext';
import CustomerSelect from "./CustomerSelect";

import {
	Stack,
	Alert,
	TextField,
	Button,
} from "@mui/material";

const CreateNewGroup = ({ handleNewGroup }) => {
	const [error, setError] = useState(null);
	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const [groupName, setGroupName] = useState("");
	const [selectedMembers, setSelectedMembers] = useState([]);

	const { customerInfo } = useContext(AuthContext);

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
				};
				// Send a POST request to create the group
				const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/customer/api/groups/new`, { user_id: customerInfo._id, new_group: data });
				// Clear the group name and group selectedMembers
				setGroupName("");
				setSelectedMembers([]);
				
				handleNewGroup();
			} catch (error) {
				setError("Error creating group");
				setShowErrorMessage(true);
			}
		}
	};

	return (
		<Stack direction='column' sx={{
			mx: 1,
		}}>
			<TextField
				label="Group Name"
				value={groupName}
				onChange={handleFormChange}
			/>

			<CustomerSelect
				existingMembers={[]}
				selectedMembers={selectedMembers}
				handleAddSelected={handleAddSelected}
				handleRemoveSelected={handleRemoveSelected}
			/>

			{showErrorMessage ? (
				<Alert severity="error">
					{error}
				</Alert>
			) : (
				<Button
					onClick={handleCreateGroup}
					variant="contained"
					fullWidth
				>
					Create Group
				</Button>
			)
			}
		</Stack>
	);
};

export default CreateNewGroup;
