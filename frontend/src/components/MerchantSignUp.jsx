import React, { useState } from "react";
import axios from "axios";
import { Alert, Container, TextField, Button } from "@mui/material";

const MerchantSignUp = ({ merchantInfo, setMerchantInfo }) => {
  const [error, setError] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessBar, setShowSuccessBar] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e, key) => {
    const updatedMerchantInfo = { ...merchantInfo, [key]: e.target.value };
    setMerchantInfo(updatedMerchantInfo);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!merchantInfo.name || !merchantInfo.email || !merchantInfo.password) {
      setError("All fields are required");
      setShowErrorMessage(true);
    }
    // API call
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/merchant/signup`,
        merchantInfo
      );
      if (response.status === 200) {
        setShowSuccessBar(true);
        setSuccess(response.data.message || "Sign up successful.");
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
          label="Name"
          type="text"
          fullWidth
          margin="normal"
          value={merchantInfo.name}
          onChange={(e) => handleInputChange(e, "name")}
        />
        <TextField
          sx={{ height: 40 }}
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={merchantInfo.email}
          onChange={(e) => handleInputChange(e, "email")}
        />
        <TextField
          sx={{ height: 40 }}
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={merchantInfo.password}
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
          Sign up as Merchant
        </Button>
        {showErrorMessage && (
          <Alert severity="error">
            <span>{error}</span>
          </Alert>
        )}
      </form>
      {showSuccessBar && (
        <Alert severity="success">
          <span>{success}</span>
        </Alert>
      )}
    </Container>
  );
};

export default MerchantSignUp;
