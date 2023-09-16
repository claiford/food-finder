import React, { useState } from "react";
import axios from "axios";
import { Alert, Container, TextField, Button } from "@mui/material";

const MerchantLogin = ({ merchantInfo, setMerchantInfo }) => {
  const [error, setError] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessBar, setShowSuccessBar] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e, key) => {
    const updatedCustomerInfo = { ...merchantInfo, [key]: e.target.value };
    setMerchantInfo(updatedCustomerInfo);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    // if (!customerInfo.name || !customerInfo.email || !customerInfo.password) {
    //   setError("All fields are required");
    //   setShowErrorMessage(true);
    // }
    // API call
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/merchant/signup`,
        merchantInfo
      );
      // console.log("Sign up response: ", response);
      if (response.status === 200) {
        setSuccess(response.data.message || "Sign up successful.");
        setShowSuccessBar(true);
        // Reset form fields
        setMerchantInfo({
          name: "",
          email: "",
          password: "",
        });
      } else {
        const data = response.data;
        setError(data.message || "Sign up failed.");
        setShowErrorMessage(true);
      }
    } catch (err) {
      console.log(err);
    }

    setTimeout(() => {
      setError(null);
      setSuccess(null);
      setShowErrorMessage(false);
      setShowSuccessBar(false);
    }, 3000);
  };

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmitForm}>
        <TextField
          sx={{ height: 40 }}
          label="Email"
          type="email"
          fullWidth
          margin="normal"
        //   value={customerInfo.email}
        //   onChange={(e) => handleInputChange(e, "email")}
        />
        <TextField
          sx={{ height: 40 }}
          label="Password"
          type="password"
          fullWidth
          margin="normal"
        //   value={customerInfo.password}
        //   onChange={(e) => handleInputChange(e, "password")}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          size="large"
          sx={{ marginTop: "1rem", marginBottom: "2rem" }}
        >
          Login as Customer
        </Button>
        </form>
        {showErrorMessage && (
          <Alert severity="error">
            <span>{error}</span>
          </Alert>
        )}
      {showSuccessBar && (
        <Alert severity="success">
          <span>{success}</span>
        </Alert>
      )}
    </Container>
  );
};

export default MerchantLogin;
