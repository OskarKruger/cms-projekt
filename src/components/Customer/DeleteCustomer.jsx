import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function DeleteCustomer() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://localhost:5001/api/customers/customers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleCustomerChange = (event) => {
    setSelectedCustomerId(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Delete Customer
  const deleteCustomerById = () => {
    if (selectedCustomerId) {
      axios
        .delete(`https://localhost:5001/api/customers/DeleteCustomers/${selectedCustomerId}`, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          alert("Customer deleted successfully");
          navigate("/customers");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const filteredCustomers = customers.filter((customer) =>
    customer.customerName.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <Header />
      <Box>
        <Button startIcon={<ArrowBackIcon />} href="/customers">
          Return
        </Button>
        <Container maxWidth="sm" sx={{ margin: "50px" }}>
          <h1>Delete Customer</h1>
          <TextField
            label="Search by Name"
            value={searchValue}
            onChange={handleSearchChange}
            fullWidth
          />
          <FormControl fullWidth sx={{ marginTop: "10px" }}>
            <InputLabel id="customer-selector-label">Customer</InputLabel>
            <Select
              labelId="customer-selector-label"
              id="customer-selector"
              value={selectedCustomerId}
              required
              label="customer"
              onChange={handleCustomerChange}
            >
              {filteredCustomers.map((customer) => (
                <MenuItem key={customer.id} value={customer.id} sx={{ marginBottom: "8px" }}>
                  {customer.customerName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="error"
            sx={{ m: 2 }}
            onClick={deleteCustomerById}
          >
            Delete Customer
          </Button>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default DeleteCustomer;