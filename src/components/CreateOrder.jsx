import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import Customers from "../pages/Customers";

function CreateOrder() {
  const [customers, setCustomers] = React.useState([]);

  const handleChange = (event) => {
    setCustomers(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/customers")
      .then((response) => {
        console.log(response.data);
        setCustomers(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Header />
      <h1>Create new order</h1>
      <div>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <FormControl fullWidth>
              <InputLabel id="customer-selector-label">Customer</InputLabel>
              <Select
                labelId="customer-selector-label"
                id="customer-selector"
                value={customers[0]}
                label="Customer"
                onChange={handleChange}
                sx={{ width: "50vw" }}
              >
                {customers.map((customer) => (
                  <MenuItem key={customer.id} value={customer}>
                    {customer.customer_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Button variant="contained">Create</Button>
        </Box>
      </div>
      <Footer />
    </div>
  );
}

export default CreateOrder;
