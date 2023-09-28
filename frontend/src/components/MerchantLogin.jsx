import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import {
  Alert,
  Container,
  TextField,
  Button
} from "@mui/material";

const MerchantLogin = () => {
  const [error, setError] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessBar, setShowSuccessBar] = useState(false);
  const [success, setSuccess] = useState(null);
  const [merchantInfo, setMerchantInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (e, key) => {
    const updatedMerchantInfo = { ...merchantInfo, [key]: e.target.value };
    setMerchantInfo(updatedMerchantInfo);
    console.log(updatedMerchantInfo);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!merchantInfo.email || !merchantInfo.password) {
      setError("All fields are required");
      setShowErrorMessage(true);
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/auth/merchant/login`,
          merchantInfo
        );
        if (response) {
          Cookies.set("merchantData", JSON.stringify(response), {
            expires: 0.0208, // 30 minutes
          });
          setSuccess(response.data.message || "Sign in successful.");
          setShowSuccessBar(true);

          // Retrieve the cookie and parse it back to an object
          const userDataCookie = Cookies.get("merchantData");
          if (userDataCookie) {
            const userDataObject = JSON.parse(userDataCookie);
            console.log(userDataObject);
            navigate("/merchant/home");
          }
        } else {
          const data = response.data;
          console.log("error data: ", data);
          setError(
            data.message || "Incorrect email or password. Please try again."
          );
          setShowErrorMessage(true);
        }

        // Reset form fields
        setMerchantInfo({
          email: "",
          password: "",
        });
      } catch (err) {
        console.log(err);
        setError("Incorrect email or password. Please try again.");
        setShowErrorMessage(true);
      }
    }

    setTimeout(() => {
      setError(null);
      setSuccess(null);
      setShowErrorMessage(false);
      setShowSuccessBar(false);
    }, 3000);
  };

  const handleSignUpBtn = () => {
    navigate("/merchant/signup");
  };
  return (
    <>
      <Container maxWidth="xs">
        <form onSubmit={handleSubmitForm}>
          <TextField
            sx={{
              borderRadius: "8px",
              marginTop: "0px",
            }}
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={merchantInfo.email}
            onChange={(e) => handleInputChange(e, "email")}
          />
          <TextField
            sx={{
              borderRadius: "8px",
              marginTop: "0px",
            }}
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
            sx={{
              color: "#242424",
              backgroundColor: "#c0ec6b",
              fontWeight: "bold",
              marginTop: "5px",
            }}
          >
            Login as Merchant
          </Button>
        </form>
        <Button
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "transparent",
            color: "#c0ec6b",
            margin: "0 auto",
          }}
          onClick={handleSignUpBtn}
        >
          Not registered? Sign up here
        </Button>
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
    </>
  );
};

export default MerchantLogin;
