import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import CustomerSignUp from "../components/CustomerSignUp";
import MerchantSignUp from "../components/MerchantSignUp";
import CustomerLogin from "../components/CustomerLogin";

const Main = () => {
  const [activeButton, setActiveButton] = useState("Customer");
  const [showCustomerLoginForm, setShowCustomerLoginForm] = useState(true);
  const [showMerchantLoginForm, setShowMerchantLoginForm] = useState(false);
  const [showCustomerSignUpForm, setShowCustomerSignUpForm] = useState(false);
  const [showMerchantSignUpForm, setShowMerchantSignUpForm] = useState(false);
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

  const navigate = useNavigate();

  const buttonStyles = {
    color: "black",
    fontWeight: "bold",
    fontSize: "25px",
    ":active": {
      color: "white",
    },
  };

  const handleCustomerBtn = () => {
    setActiveButton("Customer");
    setShowCustomerLoginForm(true);
    setShowMerchantLoginForm(false);
    setShowCustomerSignUpForm(false);
  };

  const handleMerchantBtn = () => {
    setActiveButton("Merchant");
    setShowCustomerLoginForm(false);
    setShowMerchantLoginForm(true);
  };

  const handleCustomerSignUpBtn = () => {
    setActiveButton("Customer");
    setShowCustomerLoginForm(false);
    setShowCustomerSignUpForm(true);
  };

  const handleGoBack = () => {
    navigate("/");
    setShowCustomerSignUpForm(false);
    setShowCustomerLoginForm(true);
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
        <Grid item xs={6}>
          <Button
            onClick={handleCustomerBtn}
            sx={activeButton === "Customer" ? buttonStyles : {}}
          >
            Customer
          </Button>
          <Button
            onClick={handleMerchantBtn}
            sx={activeButton === "Merchant" ? buttonStyles : {}}
          >
            Merchant
          </Button>
        </Grid>
        <Grid item xs={6}>
          {showCustomerLoginForm && activeButton === "Customer" && (
            <>
              <span>
                <CustomerLogin />
                Not registered?
                <Button variant="text" onClick={handleCustomerSignUpBtn}>
                  Sign up here.
                </Button>
              </span>
            </>
          )}
          {showCustomerSignUpForm && activeButton === "Customer" && (
            <>
              <CustomerSignUp
                customerInfo={customerInfo}
                setCustomerInfo={setCustomerInfo}
              />
              <Button variant="text" onClick={handleGoBack}>
                Back to login
              </Button>
            </>
          )}
        </Grid>
        <Outlet />
      </Grid>
      {showMerchantLoginForm && activeButton === "Merchant" && (
        <>
          <MerchantSignUp
            merchantInfo={merchantInfo}
            setMerchantInfo={setMerchantInfo}
          />
          <Button variant="text" onClick={handleGoBack}>
            Back to login
          </Button>
        </>
      )}
    </Box>
  );
};

export default Main;
