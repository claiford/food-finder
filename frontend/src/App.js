import styles from "./App.module.css";
import Main from "./pages/Main";
import Group from "./pages/Group";
import Store from "./pages/Store";
import Demo from "./pages/Demo";

import { createTheme, ThemeProvider } from '@mui/material';
import { Box } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
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
    title1: {
      fontFamily: "Arvo",
      fontWeight: 700,
      fontSize: 40,
      color: "#C0EC6B"
    },
    title2: {
      fontFamily: "Arvo",
      fontWeight: 700,
      fontSize: 25,
      color: "#242424"
    },
    header1: {
      // header black
      fontFamily: "Arvo",
      fontWeight: 400,
      fontSize: 20,
      color: '#000000'
    },
    header2: {
      // subheader white
      fontFamily: "Arvo",
      fontWeight: 400,
      fontSize: 20,
      color: "#FFFFFF"
    },
    body1: {
      // body black
      fontFamily: "Lato",
      fontSize: 15,
      color: "#000000"
    },
    body2: {
      // body white
      fontFamily: "Lato",
      fontSize: 15,
      color: "#FFFFFF"
    },
    body3: {
      // body darkgray
      fontFamily: "Lato",
      fontSize: 15,
      color: "#242424"
    },
    body4: {
      // body lime
      fontFamily: "Lato",
      fontSize: 15,
      color: "#C0EC6B"
    }
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
      dark: "#7AAD16"
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            color: 'white',
            textAlign: 'left',
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: '#C0EC6B',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#C0EC6B',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#C0EC6B',
            '&.Mui-focused': {
              color: "#C0EC6B"
            }
          },
          '& .MuiInputLabel-shrink': {
            color: '#C0EC6B'
          },
          '& .MuiSvgIcon-root': {
            color: 'white',
            '&.Mui-disabled': {
              color: "#242424"
            }
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          color: "#C0EC6B"
        }
      }
    }
  }
})

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

  // useEffect(() => {
  //   checkAuthentication()
  // }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.body}>
        <Box sx={{
          width: "400px",
        }}>
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
            <Route path="/customer/group/:group_id" element={<Group />} />
            <Route
              path="/customer/home"
              element={<CustomerHome customerInfo={customerInfo} />}
            />
            <Route path="merchant/home" element={<MerchantHome />}></Route>
            <Route path="/merchant/store/:store_id" element={<Store />} />
            <Route path="/demo" element={<Demo />}></Route>
          </Routes>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;


