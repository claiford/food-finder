import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import Fade from "@mui/material/Fade";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Logging out now.");
    if (localStorage.getItem("customerToken")) {
      localStorage.removeItem("customerToken");
    }
    if (localStorage.getItem("merchantToken")) {
      localStorage.clear("merchantToken");
    }
    navigate("/");
  };
  return (
    <>
      <div>
        <AppBar position="fixed" color="primary" sx={{ flexGrow: 1 }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                PlatePals
              </Typography>
            </Box>
            <IconButton
              color="inherit"
              aria-label="open menu"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
                sx: { backgroundColor: "lime.dark" },
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
              // anchorOrigin={{
              //   vertical: "top",
              //   horizontal: "right",
              // }}
              // transformOrigin={{
              //   vertical: "top",
              //   horizontal: "right",
              // }}
            >
              <MenuItem
                onClick={handleLogout}
                sx={{
                  color: "white"
                }}
              >
                <LogoutIcon sx={{ color: "white"}}/>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Navbar;
