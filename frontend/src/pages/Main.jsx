// Main page consists of Merchant and Client button
// When 'Client' button is clicked, default fields (username and password) to Login
// Otherwise, user clicks 'Sign up' button and fields for signup shows (name, email, password)
import React, { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import ClientSignUp from "../components/ClientSignUp";
import MerchantSignUp from "../components/MerchantSignUp";

const Main = () => {
  const [isClientClicked, setIsClientClicked] = useState(true);
  const [showClientForm, setShowClientForm] = useState(false);
  const [showMerchantForm, setShowMerchantForm] = useState(false);

  const handleClientBtn = () => {
    setIsClientClicked(true);
    setShowClientForm(true);
    setShowMerchantForm(false);
  };

  const handleMerchantBtn = () => {
    setIsClientClicked(false);
    setShowClientForm(false);
    setShowMerchantForm(true);
  };

  return (
    <Box
      sx={{
        width: 300,
        height: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid>
        <Grid item xs={4}>
          <Button variant="outlined" onClick={handleClientBtn}>
            Client
          </Button>
          <Button variant="outlined" onClick={handleMerchantBtn}>
            Merchant
          </Button>
        </Grid>
      </Grid>
      {showClientForm && isClientClicked && <ClientSignUp />}
      {showMerchantForm && !isClientClicked && <MerchantSignUp />}
    </Box>
  );
};

export default Main;
