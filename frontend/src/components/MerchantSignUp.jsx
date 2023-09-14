import React from "react";
import { Container, TextField, Button } from "@mui/material";

const MerchantSignUp = () => {
  return (
    <Container maxWidth="xs">
      <form>
        <TextField
          sx={{ height: 40 }}
          label="Full Name"
          type="name"
          fullWidth
          margin="normal"
        />
        <TextField
          sx={{ height: 40 }}
          label="Email"
          type="email"
          fullWidth
          margin="normal"
        />
        <TextField
          sx={{ height: 40 }}
          label="Password"
          type="password"
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          size="large"
          sx={{ marginTop: "1rem", marginBottom: "2rem" }}
        >
          Sign up as Merchant
        </Button>
      </form>
    </Container>
  );
};

export default MerchantSignUp;
