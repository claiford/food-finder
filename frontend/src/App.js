import "./App.css";
import Main from "./pages/Main";
import NewSession from "./pages/NewSession";

import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CustomerSignUp from "./components/CustomerSignUp";
import CustomerLogin from "./components/CustomerLogin";
import MerchantSignUp from "./components/MerchantSignUp";
import { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true)
    }
  }, [isAuthenticated])

  return (
    <Box
      sx={{
        p: "20px",
        display: "flex",
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>App Name</h1>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="customer/login" element={<CustomerLogin setIsAuthenticated={setIsAuthenticated}/>} />
          <Route
            path="customer/signup"
            element={
              <CustomerSignUp
                customerInfo={customerInfo}
                setCustomerInfo={setCustomerInfo}
              />
            }
          />
          <Route
            path="merchant/signup"
            element={
              <MerchantSignUp
                merchantInfo={merchantInfo}
                setMerchantInfo={setMerchantInfo}
              />
            }
          />
        </Route>
        {isAuthenticated ? (
          <>
            <Route path="/session" element={<NewSession />} />
            <Route path="/home" element={<Home />} />
          </>
        ) : (
          <Route path="/*" element={<h1>404: Page Not Found</h1>} />
        )}
      </Routes>
    </Box>
  );
}

export default App;
