import React, { useState } from "react";
import axios from "axios";
import { Alert, Container, TextField, Button } from "@mui/material";
import styles from "../App.module.css";

const MerchantLogin = ({ merchantInfo, setMerchantInfo }) => {
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
      console.log("Sign up response: ", response);
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
          value={merchantInfo.email}
          onChange={(e) => handleInputChange(e, "email")}
        />
        <TextField
          sx={{ height: 40}}
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={merchantInfo.password}
          onChange={(e) => handleInputChange(e, "password")}
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          size="large"
          className={styles.primaryButton}
        >
          Login as Merchant
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
