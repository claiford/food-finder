import { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import { Box, Button, Grid, Typography, List, ListItem, ListItemText, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import CreateNewGroup from "../components/CreateNewGroup";
import FetchGroups from "../components/FetchGroups";
import GroupList from "../components/GroupList";

const Home = () => {
	const [showNewGroupForm, setShowNewGroupForm] = useState(false);
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

	const handleNewGroupBtn = () => {
		setShowNewGroupForm((prev) => !prev);
	}

	return (
		<>
			<Box sx={{
				width: '100%',
				display: 'flex',
				justifyContent: "space-between",
				alignItems: 'center',
				my: 4,
			}}>
				<Typography variant="header2">
					Your group(s)
				</Typography>
				<IconButton size="small" onClick={handleNewGroupBtn}>
					<AddIcon color="lime" fontSize="small" />
				</IconButton>
			</Box>
			{showNewGroupForm ? (
				<CreateNewGroup />
			) : (
				<GroupList groups={groups} />
				// <List>
				// 	{groups.map((group) => (
				// 		<ListItem key={group._id}>
				// 			{/* <ListItemText primary={group.groupName} /> */}
				// 			<Button onClick={() => navigate(`/customer/group/${group._id}`)}>{group.groupName}</Button>
				// 		</ListItem>
				// 	))}
				// </List>
			)}
		</>
	);
}

export default Home;