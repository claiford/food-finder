import React, { useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";

import styles from "./Main.module.css";
import Logo from "../assets/platepals-logo.png";

import {
  Button,
  Grid,
  Card,
  CardMedia,
  CardActions
} from "@mui/material";

export const CURRENT_USER = {
  CUSTOMER: "Customer",
  MERCHANT: "Merchant",
};
const Main = () => {
  const [activeButton, setActiveButton] = useState(null);

  const navigate = useNavigate();

  // default button styles
  const buttonStyles = {
    color: "#242424",
    fontWeight: "bold",
    fontSize: "18px",
    backgroundColor: "#c0ec6b",
    height: "3rem",
    width: "10rem",
    m: "5px",
  };

  const handleCustomerBtn = () => {
    navigate("/customer/login");
    setActiveButton(CURRENT_USER.CUSTOMER);
  };

  const handleMerchantBtn = () => {
    navigate("/merchant/login");
    setActiveButton(CURRENT_USER.MERCHANT);
  };

  return (
    <div className={styles.mainBody}>
      <Card elevation={0} style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent", border: "none", boxShadow: "none"
      }}>
        <Link to="/">
          <CardMedia component="img" alt="plate" image={Logo} sx={{
            backgroundColor: "transparent",
            height: "350px",
            width: "350px"
          }} />
        </Link>
        <CardActions
          elevation={0}
          sx={{
            backgroundColor: "#242424",
            display: "flex",
            justifyContent: "center",
            pt: "10px",
            pb: "30px"
          }}
        >
          <Button
            onClick={handleCustomerBtn}
            fullWidth
            sx={{
              ...buttonStyles,
              backgroundColor:
                activeButton === CURRENT_USER.CUSTOMER
                  ? "#7aa625 !important"
                  : "#c0ec6b",
            }}
          >
            Customer
          </Button>
          <Button

            onClick={handleMerchantBtn}
            sx={{
              ...buttonStyles,
              backgroundColor:
                activeButton === CURRENT_USER.MERCHANT
                  ? "#7aa625 !important"
                  : "#c0ec6b",
            }}
          >
            Merchant
          </Button>
        </CardActions>
      </Card>
      <Grid>
        <Grid item xs={6}>
          <Outlet activeButton={activeButton} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
