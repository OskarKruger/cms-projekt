import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateOrder() {
  const [customers, setCustomers] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  const [selectedCustomerId, setSelectedCustomerId] = React.useState("");
  const [selectedProductId, setSelectedProductId] = React.useState("");

  const navigate = useNavigate();

  const handleCustomerChange = (event) => {
    setSelectedCustomerId(event.target.value);
  };

  const handleProductChange = (event) => {
    setSelectedProductId(event.target.value);
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

  useEffect(() => {
    axios
      .get("http://localhost:8000/products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const createProduct = () => {
    const orderId = uuidv4();
    const orderData = {
      id: orderId,
      customer_id: selectedCustomerId,
      product_id: selectedProductId,
    };
  
    axios
      .post(
        "http://localhost:8000/orders",
        { orderData },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        alert("Order created successfully");
        // navigate("/orders");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  


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
          <Container sx={{ margin: "10px" }}>
            <FormControl fullWidth>
              <InputLabel id="customer-selector-label">Customer</InputLabel>
              <Select
                labelId="customer-selector-label"
                id="customer-selector"
                value={selectedCustomerId}
                required
                label="Customer"
                onChange={handleCustomerChange}
                sx={{ width: "50vw" }}
              >
                {customers.map((customer) => (
                  <MenuItem key={customer.id} value={customer}>
                    {customer.customer_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Container>
          <Container sx={{ margin: "10px" }}>
            <FormControl fullWidth>
              <InputLabel id="product-selector-label">Product</InputLabel>
              <Select
                labelId="product-selector-label"
                id="product-selector"
                value={selectedProductId}
                required
                label="Product"
                onChange={handleProductChange}
                sx={{ width: "50vw" }}
              >
                {products.map((product) => (
                  <MenuItem key={product.product_code} value={product}>
                    {product.product_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Container>
          <Button variant="contained" onClick={createProduct}>
            Create
          </Button>
        </Box>
      </div>
      <Footer />
    </div>
  );
}

export default CreateOrder;
