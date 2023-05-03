import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField } from "@mui/material";
import { createNewCustomer } from "../../data/api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function CreateCustomer() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ name });

    const newCustomer = {
      customerName: name,
      // customer_id: id,
    };
    createNewCustomer(newCustomer)
      .then((response) => {
        console.log(response);
        navigate("/customers");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      <Header />
      <Box>
        <Button startIcon={<ArrowBackIcon />} href="/customers">
          Return
        </Button>
        <Container maxWidth="sm" sx={{ margin: "50px" }}>
          <h1>Create Customer</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ m: 2 }}
              label="Name"
              value={name}
              onChange={handleNameChange}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" sx={{ m: 2 }}>
              Create Customer
            </Button>
          </form>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default CreateCustomer;
