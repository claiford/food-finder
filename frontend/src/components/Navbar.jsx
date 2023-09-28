import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  CardMedia,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import Fade from "@mui/material/Fade";
import LogoNoText from "../assets/platepals-notext.png";

const Navbar = ({ customerInfo, handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
            {!customerInfo ? (
              <Typography>Hello!</Typography>
            ) : (
              <Typography sx={{ fontWeight: "bold" }}>
                Hello, {customerInfo.name}!
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
