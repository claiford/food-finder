import "./App.css";
import Main from "./pages/Main";
import Group from "./pages/Group";
import NewSession from "./components/NewSession";

import { createTheme, ThemeProvider } from '@mui/material';
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import CustomerHome from "./pages/CustomerHome";

const theme = createTheme({
  typography: {
    fontFamily: "Lato",
    header1: {
      fontFamily: "Arvo",
      fontWeight: 700,
      fontSize: 40,
      color: "#C0EC6B"
    },
    header2: {
      fontFamily: "Arvo",
      fontWeight: 400,
      fontSize: 15,
    },
    body1: {
      fontFamily: "Lato",
      fontSize: 15,
    },
  },
  palette: {
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
    white: {
      main: "#FFFFFF",
    },
    black: {
      main: "#000000"
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box className='app-container'
        sx={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          flexDirection: "column",
          // justifyContent: "center",
          alignItems: "center",
          // border: 2px solid black
          backgroundColor: 'darkgray.main'
        }}
      >
        {/* <h1>App Name</h1> */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/customer/group/:group_id" element={<Group />} />
          <Route path="/customer/group/:group_id/session/new" element={<NewSession />} />
          <Route path="/customer/home" element={<CustomerHome />} />
          <Route path="/*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
