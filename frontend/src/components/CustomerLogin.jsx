import React, { useState } from "react";
import axios from "axios";
import { Alert, Container, TextField, Button } from "@mui/material";

const CustomerLogin = ({ customerInfo, setCustomerInfo, setIsAuthenticated }) => {
  const [error, setError] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessBar, setShowSuccessBar] = useState(false);
  const [success, setSuccess] = useState(null);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "", 
  });

  const handleInputChange = (e, key) => {
    const updatedCustomerInfo = { ...loginInfo, [key]: e.target.value };
    setLoginInfo(updatedCustomerInfo)
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!loginInfo.email || !loginInfo.password) {
      setError("All fields are required");
      setShowErrorMessage(true);
    }
    // API call
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/customer/login`,
        loginInfo
      );
      console.log("response", response);
      console.log("customerID:", response.data.customer.id);
      if (response.status === 200) {
        setSuccess(response.data.message || "Sign in successful.");
        setShowSuccessBar(true);
        // setIsAuthenticated(true);
        // Store customer ID in localstorage
        localStorage.setItem('token', JSON.stringify(response.data.customer.id))
        // Reset form fields
        setLoginInfo({
          email: "",
          password: "",
        });
      } else {
        const data = response.data;
        setError(data.message || "Sign in failed.");
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
      <form onSubmit={handleSubmitForm}
      autocomplete="off">
        <TextField
          sx={{ height: 40 }}
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={loginInfo.email}
          onChange={(e) => handleInputChange(e, "email")}
        />
        <TextField
          sx={{ height: 40 }}
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={loginInfo.password}
          onChange={(e) => handleInputChange(e, "password")}
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

export default CustomerLogin;
