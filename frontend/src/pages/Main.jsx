import React, { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import CustomerSignUp from "../components/CustomerSignUp";
import MerchantSignUp from "../components/MerchantSignUp";

const Main = () => {
  const [activeButton, setActiveButton] = useState(null)
  const [showClientForm, setShowClientForm] = useState(false);
  const [showMerchantForm, setShowMerchantForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [merchantInfo, setMerchantInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const buttonStyles = {
    color: "black",
    fontWeight: "bold",
    fontSize: "25px",
    ":active": {
      color: "white", 
    },
  };

  const handleCustomerBtn = () => {
    setActiveButton("Client")
    setShowClientForm(true);
    setShowMerchantForm(false);
  };

  const handleMerchantBtn = () => {
    setActiveButton("Merchant")
    setShowClientForm(false);
    setShowMerchantForm(true);
  };

  return (
    <Box
      sx={{
        width: 300,
        height: "70%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid>
        <Grid item xs={4}>
          <Button
            onClick={handleCustomerBtn}
            sx={activeButton === "Client" ? buttonStyles : {}}
          >
            Client
          </Button>
          <Button
            onClick={handleMerchantBtn}
            sx={activeButton === "Merchant" ? buttonStyles : {}}
          >
            Merchant
          </Button>
        </Grid>
      </Grid>
      {showClientForm && activeButton === "Client" && (
        <CustomerSignUp customerInfo={customerInfo} setCustomerInfo={setCustomerInfo} />
      )}
      {showMerchantForm && activeButton === "Merchant" && (
        <MerchantSignUp
          merchantInfo={merchantInfo}
          setMerchantInfo={setMerchantInfo}
        />
      )}
    </Box>
  );
};

export default Main;
