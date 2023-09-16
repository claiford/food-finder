import "./App.css";
import Main from "./pages/Main";
import NewSession from "./pages/NewSession";

import { Box } from "@mui/material";
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";

function App() {

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
        <Route path="/" element={<Main />}/>
        <Route path="/session" element={<NewSession />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </Box>
  );
}

export default App;
