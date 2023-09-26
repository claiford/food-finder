import { useState, useEffect } from "react";
import axios from "axios";

import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import StoreNew from "../components/StoreNew";
import StoreList from "../components/StoreList";

const MerchantHome = () => {
	const [stores, setStores] = useState([]);
	const [showForm, setShowForm] = useState(false);

	/////////////////
    // HANDLERS
	const handleForm = () => {
		setShowForm((prev) => !prev);
	}

	const handleNewStore = () => {
		handleForm()
		getStores();
	}
	/////////////////
	/////////////////

	const getStores = async () => {
		try {
			console.log("getting stores")
			const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/merchant/home/${localStorage.getItem("token")}`);
			setStores(res.data);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		getStores();
	}, [])

	return (
		<>
			{/* <Typography variant="title1">
				Hi, {"[merchant]"}
			</Typography> */}
			<Box sx={{
				width: '100%',
				display: 'flex',
				justifyContent: "space-between",
				alignItems: 'center',
				my: 4,
			}}>
				<Typography variant="header2">
					Your restaurant(s)
				</Typography>
				<IconButton size="small" onClick={handleForm}>
					<AddIcon color="lime" fontSize="small" />
				</IconButton>
			</Box>

			{showForm ? (
				<StoreNew handleNewStore={handleNewStore}/>
			) : (
				<StoreList stores={stores} />
			)}
		</>
	);
}

export default MerchantHome;