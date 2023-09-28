import { useState } from "react";
import axios from "axios";
import { Alert, Container, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CustomerLogin = ({ setIsCustomerAuthenticated }) => {
  const [error, setError] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessBar, setShowSuccessBar] = useState(false);
  const [success, setSuccess] = useState(null);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (e, key) => {
    const updatedCustomerInfo = { ...loginInfo, [key]: e.target.value };
    setLoginInfo(updatedCustomerInfo);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!loginInfo.email || !loginInfo.password) {
      setError("All fields are required");
      setShowErrorMessage(true);
    } else {
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
          // Store customer ID in localstorage
          localStorage.setItem("customerToken", response.data.customer.id);
          setIsCustomerAuthenticated(true);
          navigate("/customer/home");

          // Reset form fields
          setLoginInfo({
            email: "",
            password: "",
          });
        } else {
          const data = response.data;
          setError(
            data.message || "Incorrect email or password. Please try again."
          );
          setShowErrorMessage(true);
        }
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
    navigate("/customer/signup");
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
            value={loginInfo.email}
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
            value={loginInfo.password}
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
            Login as Customer
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

export default CustomerLogin;
