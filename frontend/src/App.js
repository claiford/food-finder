import { useEffect } from "react";
import "./App.css";
import Main from "./pages/Main";

import axios from "axios";
import { Box } from "@mui/material";
import { Routes, Route } from 'react-router-dom'

const { io } = require("socket.io-client");
console.log(process.env.REACT_APP_BACKEND_URL)
const socket = io.connect(process.env.REACT_APP_BACKEND_URL)

function App() {
  const getData = async () => {
    const res = await axios.get(process.env.REACT_APP_BACKEND_URL);
    console.log(res.data[0].data);
  };

  useEffect(() => {
    getData();
  }, []);

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
        <Route path="/session" element={<h2>sessioning</h2>} />
        <Route path="/*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </Box>
  );
}

export default App;
