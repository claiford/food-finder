import { useState } from "react";
import axios from "axios";
import { Alert, Container, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../App.module.css";

const CustomerLogin = ({
  activeButton,
  isAuthenticated,
  setIsAuthenticated,
}) => {
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
          localStorage.setItem("token", response.data.customer.id);
          setIsAuthenticated(true);
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
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmitForm}>
          <TextField
            sx={{
              //backgroundColor: "white",
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
              //backgroundColor: "white",
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
            // className={styles.primaryButton}
          >
            Login as Customer
          </Button>
        </form>
        <Button
          sx={{
            backgroundColor: "transparent",
            color: "#c0ec6b",
          }}
          onClick={handleSignUpBtn}
        >
          Not registered? Sign up here
        </Button>
      </Container>
      <div>
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
      </div>
    </>
  );
};

export default CustomerLogin;
