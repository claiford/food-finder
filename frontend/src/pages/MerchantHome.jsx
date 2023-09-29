import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import StoreNew from "../components/StoreNew";
import StoreList from "../components/StoreList";

import {
	Box,
	Typography,
	IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const MerchantHome = () => {
	const [stores, setStores] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const { merchantInfo } = useContext(AuthContext);

	const handleNewStore = () => {
		setShowForm(false);
		getStores();
	};

	const handleDeleteStore = async (store_id) => {
		try {
			const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/merchant/api/stores/${store_id}/${merchantInfo._id}`);
			getStores();
		} catch (error) {
			console.error("Error deleting group:", error);
		}
	}

	const toggleForm = () => {
		setShowForm((prev) => !prev);
	};

	const getStores = async () => {
		try {
			console.log("getting stores");
			const res = await axios.get(
				`${process.env.REACT_APP_BACKEND_URL}/merchant/api/stores/${merchantInfo._id}`
			);
			setStores(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getStores();
	}, []);

	return (
		<>
			<Navbar />
			<Box
				sx={{
					width: "90%",
					maxWidth: "350px",
					height: "calc(100% - 56px - 24px)",
					maxHeight: "800px",
					mt: "56px",
					mb: "24px",
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						py: 3,
					}}
				>
					<Typography variant="header2">{"Your restaurant(s)"}</Typography>
					<IconButton size="small" onClick={toggleForm}>
						{showForm ? (
							<CloseRoundedIcon color="lime" fontSize="small" />
						) : (
							<AddIcon color="lime" fontSize="small" />
						)}
					</IconButton>
				</Box>

				{showForm ? (
					<StoreNew handleNewStore={handleNewStore} />
				) : (
					<StoreList stores={stores} handleDeleteStore={handleDeleteStore} />
				)}
			</Box>
		</>
	);
};

export default MerchantHome;
