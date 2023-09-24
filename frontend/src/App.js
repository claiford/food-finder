import styles from "./App.module.css";
import Main from "./pages/Main";
import Group from "./pages/Group";
import NewSession from "./components/NewSession";
// import OngoingSession from "./pages/SessionIncomplete";

import { Routes, Route } from "react-router-dom";
import CustomerSignUp from "./components/CustomerSignUp";
import CustomerLogin from "./components/CustomerLogin";
import MerchantSignUp from "./components/MerchantSignUp";
import { useState, useEffect } from "react";
import CustomerHome from "./pages/CustomerHome";
import MerchantLogin from "./components/MerchantLogin";
import axios from "axios";
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

  // const getCustomerById = () => {
  //   const data = axios.get(`${process.env.REACT_APP_BACKEND_URL}/customer/:id`);

  // }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

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
        {isAuthenticated ? (
          <>
            <Route path="/customer/group/groupid" element={<Group />} />
            <Route path="/customer/session/new" element={<NewSession />} />
            <Route
              path="/customer/home"
              element={<CustomerHome customerInfo={customerInfo} />}
            />
            <Route
            path="merchant/home" 
            element={<MerchantHome />}
            ></Route>
          </>
        ) : (
          <Route path="/" element={<Main />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
