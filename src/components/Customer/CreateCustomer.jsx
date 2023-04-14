import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Header from "../Header";
import Footer from "../Footer";
import {
  Box,
  Button,
  Container,
  TextField,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CreateCustomer() {
  const [name, setName] = useState("");
  const [id, setId] = useState(uuidv4());

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ name, id });
  
    const newCustomer = {
      customer_name: name,
      customer_id: id,
    };
  
    axios
      .post(
        "http://localhost:8000/customers", 
      newCustomer,
       {},
       {
        headers: { "Content-Type": "application/json" },
      }
      )
      .then((response) => {
        alert("Customer created successfully");
        setName("");
        setId(uuidv4());
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
      <Button startIcon={<ArrowBackIcon />} href="/customers">Return</Button>
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
            <TextField
              sx={{ m: 2 }}
              label="ID"
              disabled
              value={id}
              fullWidth
              InputProps={{ readOnly: true }}
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
