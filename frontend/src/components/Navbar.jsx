import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
import LogoNoText from "../assets/platepals-notext.png";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  CardMedia,
  Fade,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const { merchantInfo, customerInfo, handleLogout } = useContext(AuthContext);

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <CardMedia
              component="img"
              alt="logo-notext"
              image={LogoNoText}
              sx={{
                backgroundColor: "transparent",
                height: "50px",
                width: "50px",
                mr: 1,
              }}
            />
            <Typography variant="appname" sx={{ flexGrow: 1 }}>
              PlatePals
            </Typography>
            {customerInfo && (
              <Typography variant="body3" fontWeight={700}>
                Hello, {customerInfo.name}!
              </Typography>
            )}
            {merchantInfo && (
              <Typography sx={{ fontWeight: "bold" }}>
                Hello, {merchantInfo.name}!
              </Typography>
            )}
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
            >
              <MenuItem
                onClick={handleLogout}
                sx={{
                  color: "white",
                }}
              >
                <LogoutIcon sx={{ color: "white" }} />
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
