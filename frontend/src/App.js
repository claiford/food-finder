import "./App.css";
import Main from "./pages/Main";
import Group from "./pages/Group";
import SessionNew from "./components/SessionNew";

import { createTheme, ThemeProvider } from '@mui/material';
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import CustomerHome from "./pages/CustomerHome";

const theme = createTheme({
  typography: {
    fontFamily: "Lato",
    title: {
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
      fontSize: 15,
      color: '#000000'
    },
    header2: {
      // subheader white
      fontFamily: "Arvo",
      fontWeight: 400,
      fontSize: 15,
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
            color: 'white',
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
          <Route path="/customer/group/:group_id/session/new" element={<SessionNew />} />
          <Route path="/customer/home" element={<CustomerHome />} />
          <Route path="/*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
