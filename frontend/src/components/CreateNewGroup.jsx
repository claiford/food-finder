import { useEffect, useState } from "react";
import axios from 'axios';
import {
	Box,
	Alert,
	Container,
	TextField,
	Button,
	Typography,
	Grid,
	Stack,
	Badge,
	Avatar,
	IconButton,
} from "@mui/material";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

import FetchUsers from "./FetchUsers";


const CreateNewGroup = () => {
	const [error, setError] = useState(null);
	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const [showSuccessBar, setShowSuccessBar] = useState(false);
	const [success, setSuccess] = useState(null);
	const [groupMembers, setGroupMembers] = useState([]);
	const [newMember, setNewMember] = useState("");
	const [searchInput, setSearchInput] = useState("");
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
				console.error("Error fetching user data:", error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const handleAddMember = (memberName) => {
		setGroupMembers([...groupMembers, memberName]);
		if (selectedUsers.includes(memberName)) {
			console.error("already added to the group");
			return;
		}
	};

	const handleRemoveMember = (index) => {
		const updatedMembers = groupMembers.filter((_, i) => i !== index);
		setGroupMembers(updatedMembers);
	};

	const handleCreateGroup = async () => {
		if (!groupName || groupMembers.length === 0) {
			console.log("please name your group and add members")
			return;
		}
		try {
			const data = {
				groupName: groupName,
				memberIds: groupMembers.map((memberName) => {
					const selectedUser = customers.find(
						(customer) => customer.name === memberName
					);
					return selectedUser._id;
				}),
			};

			// Send a POST request to create the group
			const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/customer/api/groups`, { user: localStorage.getItem("token"), data: data });
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
		<>
			<Container maxWidth="sm">
				<TextField
					label="Group Name"
					variant="outlined"
					value={groupName}
					onChange={(e) => setGroupName(e.target.value)}
					fullWidth
					margin="normal"
				/>

				<Stack direction="row" spacing={2} sx={{ mt: 3, minHeight: '60px', overflowX: 'scroll' }}>
					{groupMembers.map((member, i) => (
						<Box sx={{ maxHeight: '45px' }}>
							<Badge
								key={i}
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								badgeContent={
									<IconButton sx={{ ml: 1.5 }} onClick={() => handleRemoveMember(i)}>
										<CancelRoundedIcon color="lightgray" />
									</IconButton>
								}
							>
								<Avatar sx={{
									backgroundColor: "black",
								}}>
									<Typography variant="body4" fontWeight={700}>
										{member.split(" ")[0][0].toUpperCase()}
										{(member.split(" ").length > 1) ? member.split(" ")[1][0].toUpperCase() : ""}
									</Typography>
								</Avatar>
							</Badge>
						</Box>
					))}
				</Stack>

				{/* SEARCH BAR */}
				<TextField
					label="Search"
					variant="outlined"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
					fullWidth
					margin="normal"
				/>
				{/* <TextField
				label="New Member"
				variant="outlined"
				value={newMember}
				onChange={(e) => setNewMember(e.target.value)}
				fullWidth
				margin="normal"
			/> */}

				<Box sx={{
					height: "400px",
					overflowY: 'scroll'
				}}>
					<Stack direction="column" spacing={0}>
						{filteredCustomers.map((customer, i) => (
							<Box
								key={i}
								sx={{
									display: 'flex',
									alignItems: 'center',
									p: 2,
									gap: 2,
									'&:hover': {
										cursor: 'pointer',
									}
								}}
							>
								<Avatar sx={{
									backgroundColor: "black",
								}}>
									<Typography variant="body4" fontWeight={700}>
										{customer.name.split(" ")[0][0].toUpperCase()}
										{(customer.name.split(" ").length > 1) ? customer.name.split(" ")[1][0].toUpperCase() : ""}
									</Typography>
								</Avatar>
								<Typography variant="body2" fontWeight={700}>
									{customer.name}
								</Typography>
								<IconButton onClick={() => handleAddMember(customer.name)} sx={{ ml: "auto" }}>
									<AddCircleRoundedIcon color="lime" />
								</IconButton>
							</Box>
						))}
					</Stack>
				</Box>

				{/* <Button
				onClick={handleAddMember}
				variant="contained"
				color="primary"
				fullWidth
				sx={{ mt: 2 }}
			>
				Add Member
			</Button> */}

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

			{/* <Container maxWidth="sm">
				{" "}
				<Typography variant="h5" sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}>
					Select Group Members
				</Typography>
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
			</Container> */}
		</>
	);
};

export default CreateNewGroup;
