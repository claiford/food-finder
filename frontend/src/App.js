import styles from "./App.module.css";
import Main from "./pages/Main";
import Group from "./pages/Group";
import Store from "./pages/Store";
import Demo from "./pages/Demo";

import { createTheme, ThemeProvider } from '@mui/material';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import CustomerSignUp from "./components/CustomerSignUp";
import CustomerLogin from "./components/CustomerLogin";
import MerchantSignUp from "./components/MerchantSignUp";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomerHome from "./pages/CustomerHome";
import MerchantLogin from "./components/MerchantLogin";
import MerchantHome from "./pages/MerchantHome";


const theme = createTheme({
  typography: {
    fontFamily: "Lato",
    appname: {
      fontFamily: "Caveat Brush",
      fontWeight: 700,
      fontSize: 30,
      color: "#242424",
    },
    title1: {
      fontFamily: "Arvo",
      fontWeight: 700,
      fontSize: 40,
      color: "#C0EC6B",
    },
    header3: {
      fontFamily: "Arvo",
      fontWeight: 700,
      fontSize: 25,
      color: "#242424",
    },
    header1: {
      // header black
      fontFamily: "Arvo",
      fontWeight: 400,
      fontSize: 20,
      color: "#000000",
    },
    header2: {
      // subheader white
      fontFamily: "Arvo",
      fontWeight: 400,
      fontSize: 20,
      color: "#FFFFFF",
    },
    body1: {
      // body black
      fontFamily: "Lato",
      fontSize: 15,
      color: "#000000",
    },
    body2: {
      // body white
      fontFamily: "Lato",
      fontSize: 15,
      color: "#FFFFFF",
    },
    body3: {
      // body darkgray
      fontFamily: "Lato",
      fontSize: 15,
      color: "#242424",
    },
    body4: {
      // body lime
      fontFamily: "Lato",
      fontSize: 15,
      color: "#C0EC6B",
    },
    caption1: {
      // caption darkgray
      fontFamily: "Lato",
      fontSize: 12,
      color: "#000000",
    },
    caption2: {
      // caption darkgray
      fontFamily: "Lato",
      fontSize: 12,
      color: "#FFFFFF",
    },
    caption3: {
      // caption darkgray
      fontFamily: "Lato",
      fontSize: 12,
      color: "#242424",
    },
  },
  palette: {
    primary: {
      main: "#C0EC6B",
    },
    darkgray: {
      main: "#242424",
    },
    lightgray: {
      main: "#D2D2D2",
    },
    lime: {
      main: "#C0EC6B",
      dark: "#7AAD16",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            color: "white",
            textAlign: "left",
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "#C0EC6B",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#C0EC6B",
            },
          },
          "& .MuiInputLabel-root": {
            color: "white",
            "&.Mui-focused": {
              color: "#C0EC6B",
            },
          },
          "& .MuiInputLabel-shrink": {
            color: "#C0EC6B",
          },
          "& .MuiSvgIcon-root": {
            color: "white",
            "&.Mui-disabled": {
              color: "#242424",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          color: "#C0EC6B",
        },
      },
    },
  },
});

function App() {
  const [isCustomerAuthenticated, setIsCustomerAuthenticated] = useState(null);
  const [isMerchantAuthenticated, setIsMerchantAuthenticated] = useState(null);
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
  const checkCustomerAuth = async () => {
    const token = localStorage.getItem("customerToken");
    if (token !== null) {
      setIsCustomerAuthenticated(true);
    } else {
      setIsCustomerAuthenticated(false);
    }
  };

  const checkMerchantAuth = async () => {
    const token = localStorage.getItem("merchantToken");
    if (token !== null) {
      setIsMerchantAuthenticated(true);
    } else {
      setIsMerchantAuthenticated(false);
    }
  };

  useEffect(() => {
    checkCustomerAuth();
    checkMerchantAuth();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.body}>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route
              path="customer/login"
              element={
                <CustomerLogin
                setIsCustomerAuthenticated={setIsCustomerAuthenticated}
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
                  isMerchantAuthenticated={isMerchantAuthenticated}
                  setIsMerchantAuthenticated={setIsMerchantAuthenticated}
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
          {isCustomerAuthenticated && (
            <>
              <Route path="/customer/group/:group_id" element={<Group />} />
              <Route path="/customer/home" element={<CustomerHome />} />
              <Route path="/demo" element={<Demo />} />
            </>
          )}
             {isMerchantAuthenticated && (
            <>
              <Route path="merchant/home" element={<MerchantHome />} />
            </>
          )}
          {!isCustomerAuthenticated && !isMerchantAuthenticated && (
            <Route path="/*" element={<Navigate to="/"/>}/>
          )}

        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
