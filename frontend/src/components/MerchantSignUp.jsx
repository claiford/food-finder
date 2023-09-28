// Merchant Signup

import React, { useState } from "react";
import axios from "axios";
import { Alert, Container, TextField, Button } from "@mui/material";

const MerchantSignUp = () => {
  const [error, setError] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessBar, setShowSuccessBar] = useState(false);
  const [success, setSuccess] = useState(null);
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleInputChange = (e, key) => {
    const updatedMerchantInfo = { ...form, [key]: e.target.value };
    setForm(updatedMerchantInfo);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      setShowErrorMessage(true);
    }
    // API call
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/merchant/signup`,
        form
      );
      if (response.status === 200) {
        setShowSuccessBar(true);
        setSuccess(response.data.message || "Sign up successful.");
        // Reset form fields
        setForm({
          name: "",
          email: "",
          password: "",
        });
      } else {
        const errorMessage = response.data.message;
        setError(errorMessage || "Sign up failed.");
        setShowErrorMessage(true);
      }
    } catch (err) {
      // handling server side error
      if (err.response && form.email) {
        const errorMessage = err.response.data.message;
        setError(errorMessage || "Server error.");
        setShowErrorMessage(true);
      } else {
        console.log(err);
      }
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
          sx={{ borderRadius: "8px", marginTop: "0px" }}
          label="Name"
          type="text"
          fullWidth
          margin="normal"
          value={form.name}
          onChange={(e) => handleInputChange(e, "name")}
        />
        <TextField
          sx={{ borderRadius: "8px", marginTop: "0px" }}
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={(e) => handleInputChange(e, "email")}
        />
        <TextField
          sx={{ borderRadius: "8px", marginTop: "0px" }}
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={(e) => handleInputChange(e, "password")}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          size="large"
          sx={{
            color: "#242424",
            backgroundColor: "#c0ec6b",
            fontWeight: "bold",
            marginTop: "5px",
            marginBottom: "8px",
          }}
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
