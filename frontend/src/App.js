import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { Box, createTheme, ThemeProvider } from "@mui/material";

import { AuthContext } from "./contexts/AuthContext";
import Main from "./pages/Main";
import CustomerSignUp from "./components/CustomerSignUp";
import CustomerLogin from "./components/CustomerLogin";
import MerchantSignUp from "./components/MerchantSignUp";
import MerchantLogin from "./components/MerchantLogin";
import CustomerHome from "./pages/CustomerHome";
import MerchantHome from "./pages/MerchantHome";
import Group from "./pages/Group";
import Store from "./pages/Store";

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
      fontSize: 25,
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
              borderRadius: 10,
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
  const [customerInfo, setCustomerInfo] = useState(null);
  const [merchantInfo, setMerchantInfo] = useState(null);
  const navigate = useNavigate();

  // Function to check if the user is authenticated (you can define this according to your logic)
  const authenticateCustomer = () => {
    const rawCookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("userData="));
    // console.log("checking authentication");
    if (rawCookie) {
      const userDataCookie = Cookies.get("userData");
      const userDataObject = JSON.parse(userDataCookie);
      console.log("Customer in App.js", userDataObject.data.userData);
      if (customerInfo === null) {
        setCustomerInfo(userDataObject.data.userData);
      }
    }
    return !!rawCookie;
  };

  const authenticateMerchant = () => {
    console.log("authenticate merchant");
    const rawCookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("merchantData="));
    //console.log("checking authentication");
    if (rawCookie) {
      const merchantDataCookie = Cookies.get("merchantData");
      const merchantDataObject = JSON.parse(merchantDataCookie);
      console.log("Merchant in App.js", merchantDataObject.data.merchantData);
      if (merchantInfo === null) {
        setMerchantInfo(merchantDataObject.data.merchantData);
      }
    }
    return !!rawCookie;
  };

  const handleLogout = () => {
    console.log("Logging out now.");
    document.cookie =
      "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "merchantData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setCustomerInfo(null);
    setMerchantInfo(null);
    navigate("/");
  };

  const showMain = () => {
    if (authenticateCustomer()) {
      return <Navigate to="customer/home" />;
    } else if (authenticateMerchant()) {
      return <Navigate to="merchant/home" />;
    } else {
      return <Main />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider
        value={{ merchantInfo, customerInfo, handleLogout }}
      >
        <Box className="App-background" sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "darkgray.main",
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Box className="App-container" sx={{
            display: 'flex',
            justifyContent: 'center',
            width: "100%",
            maxWidth: '340px',
            maxHeight: '580px',
            backgroundColor: "darkgray.main",
            // border: '2px solid red'
          }}>
            <Routes>
              <Route path="/" element={showMain()}>
                <Route path="customer/login" element={<CustomerLogin />} />
                <Route path="customer/signup" element={<CustomerSignUp />} />
                <Route path="merchant/login" element={<MerchantLogin />} />
                <Route path="merchant/signup" element={<MerchantSignUp />} />
              </Route>
              <Route
                path="/customer/home"
                element={
                  authenticateCustomer() ? <CustomerHome /> : <Navigate to="/" />
                }
              />
              <Route
                path="/customer/group/:group_id"
                element={authenticateCustomer() ? <Group /> : <Navigate to="/" />}
              />
              <Route
                path="/merchant/home"
                element={
                  authenticateMerchant() ? (
                    <MerchantHome
                      merchantInfo={merchantInfo}
                      handleLogout={handleLogout}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/merchant/store/:store_id"
                element={<Store />}
              // element={
              //   authenticateCustomer() ? (
              //     <Group />
              //   ) : (
              //     <Navigate to="/" />
              //   )
              // }
              />
            </Routes>
          </Box>
        </Box>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
