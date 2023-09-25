import styles from "./App.module.css";
import Main from "./pages/Main";
import Group from "./pages/Group";
import NewSession from "./components/NewSession";
// import OngoingSession from "./pages/SessionIncomplete";

import { Routes, Route, useNavigate } from "react-router-dom";
import CustomerSignUp from "./components/CustomerSignUp";
import CustomerLogin from "./components/CustomerLogin";
import MerchantSignUp from "./components/MerchantSignUp";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomerHome from "./pages/CustomerHome";
import MerchantLogin from "./components/MerchantLogin";
import MerchantHome from "./pages/MerchantHome";

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
  const navigate = useNavigate();

  // const getCustomerById = () => {
  //   const data = axios.get(`${process.env.REACT_APP_BACKEND_URL}/customer/:id`);

  // }
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   console.log("token: ", token);
  //   if (token) {
  //     setIsAuthenticated(true);
  //     console.log("isAuthenticated => ", isAuthenticated);
  //   } else {
  //     return;
  //   }
  // }, []);
  const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACKEND_URL, // Set your backend URL here
  });

  const checkAuthentication = async () => {
    try {
      const response = await axiosInstance.get('/api/check-auth');
      console.log("Response: ", response)
      if (response.status === 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.log("Authentication failed:", err);
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    checkAuthentication()
  }, [])

  return (
    <div className={styles.body}>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route
            path="customer/login"
            element={
              <CustomerLogin
                customerInfo={customerInfo}
                setCustomerInfo={setCustomerInfo}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
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
            path="merchant/login"
            element={
              <MerchantLogin
                merchantInfo={merchantInfo}
                setMerchantInfo={setMerchantInfo}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
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
        {/* {!isAuthenticated && navigate("/")} */}
          <Route path="/customer/group/groupid" element={<Group />} />
          <Route path="/customer/session/new" element={<NewSession />} />
          <Route
            path="/customer/home"
            element={<CustomerHome customerInfo={customerInfo} />}
          />
          <Route path="merchant/home" element={<MerchantHome />}></Route>
      </Routes>
    </div>
  );
}

export default App;


