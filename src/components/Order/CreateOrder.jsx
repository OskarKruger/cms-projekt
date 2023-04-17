import React from "react";
import Header from "../Header";
import Footer from "../Footer";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateOrder() {
  const [customers, setCustomers] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [cart, setCart] = React.useState([]);

  const [selectedCustomerId, setSelectedCustomerId] = React.useState("");
  const [selectedProductId, setSelectedProductId] = React.useState("");
  const [selectedQuantity, setSelectedQuantity] = React.useState(1);

  const navigate = useNavigate();

  const handleCustomerChange = (event) => {
    setSelectedCustomerId(event.target.value);
  };

  const handleProductChange = (event) => {
    setSelectedProductId(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(event.target.value);
  };

  const addToCart = () => {
    if (!selectedProductId) {
      alert("Please select a product");
      return;
    }
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.product_id === selectedProductId.product_id
    );

    if (existingProductIndex > -1) {
      updatedCart[existingProductIndex].quantity += Number(selectedQuantity);
    } else {
      updatedCart.push({
        product_id: selectedProductId.product_id,
        product_name: selectedProductId.product_name,
        product_cost: selectedProductId.product_cost,
        quantity: Number(selectedQuantity),
      });
    }

    setCart(updatedCart);
    setSelectedProductId("");
    setSelectedQuantity(1);
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
    if (!selectedCustomerId) {
      alert("Please select a customer");
      return;
    }
    if (cart.length === 0) {
      alert("Please add at least one product to the cart");
      return;
    }
    const orderData = {
      customer_id: selectedCustomerId.customer_id,
      customer_name: selectedCustomerId.customer_name,
      products: cart,
      status: "20 - Order Placed",
      date: new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      }).format(new Date()).replace(/[/]/g, '.'),
      price: cart.reduce((total, product) => total + product.product_cost * product.quantity, 0),
    };

    axios
      .post(
        "http://localhost:8000/orders",
        orderData,
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        alert("Order created successfully");
        navigate("/orders");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <Button startIcon={<ArrowBackIcon />} href="/orders">
        Return
      </Button>
      <div className="main">
        <h1>Create new order</h1>
        <div style={{ display: "flex", flexDirection: "row" }}>
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
                    sx={{ width: "30vw" }}
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
                    sx={{ width: "30vw" }}
                  >
                    {products.map((product) => (
                      <MenuItem key={product.product_id} value={product}>
                        {product.product_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Container>
              <Container sx={{ margin: "10px" }}>
                <TextField
                  id="quantity"
                  label="Quantity"
                  type="number"
                  value={selectedQuantity}
                  onChange={handleQuantityChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Container>
            </Box>
          </div>
          <TextField
            id="Product-list"
            label="Cart"
            multiline
            rows={4}
            value={cart.map((product) => {
              return `${product.product_name} x ${product.quantity} = ${
                product.product_cost * product.quantity
              }`;
            })}
          />
        </div>
        <Button variant="contained" onClick={addToCart} sx={{ margin: "20px" }}>
          Add to cart
        </Button>
        <Button
          variant="contained"
          onClick={createProduct}
          sx={{ margin: "20px" }}
        >
          Create order
        </Button>
        <Footer />
      </div>
    </>
  );
}

export default CreateOrder;
