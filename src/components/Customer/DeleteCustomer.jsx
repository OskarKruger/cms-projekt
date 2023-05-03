import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getAllCustomers, deleteCustomerById } from "../../data/api";
import { useNavigate } from "react-router-dom";

function DeleteCustomer() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleData = async () => {
    const AllCustomers = await getAllCustomers();
    setCustomers(AllCustomers);
  };
  useEffect(() => {
    handleData();
  }, []);

  const handleCustomerChange = (event) => {
    setSelectedCustomerId(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  const handleDelete = async () => {
    const result = await deleteCustomerById(selectedCustomerId);
    if (result.success) {
      alert("Customer deleted successfully");
      handleData();
    } else {
      console.log(result.error);
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
                <MenuItem
                  key={customer.id}
                  value={customer.id}
                  sx={{ marginBottom: "8px" }}
                >
                  {customer.customerName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="error"
            sx={{ m: 2 }}
            onClick={handleDelete}
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
