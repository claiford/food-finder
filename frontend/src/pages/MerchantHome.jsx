import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { Box, Modal, Button, Grid, Typography, List, ListItem, ListItemText, IconButton } from "@mui/material";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import StoreNew from "../components/StoreNew";
import StoreList from "../components/StoreList";

const MerchantHome = () => {
  const [stores, setStores] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleForm = () => {
    setShowForm((prev) => !prev);
  };

	const getStores = async () => {
		try {
			console.log("getting stores")
			const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/merchant/home/${localStorage.getItem("merchantToken")}`);
			setStores(res.data);
		} catch (err) {
			console.log(err);
		}
	}

  useEffect(() => {
    getStores();
  }, []);

  return (
    <>
      <Typography variant="title1">Hi, {"[merchant]"}</Typography>

      {showForm && <StoreNew handleForm={handleForm} />}

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 4,
        }}
      >
        <Typography variant="header2">{"Your restaurant(s)"}</Typography>
        <IconButton size="small" onClick={handleForm}>
          <AddIcon color="lime" fontSize="small" />
        </IconButton>
      </Box>

			<StoreList stores={stores} />
		</>
	);
}

export default MerchantHome;
