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
import {
  getAllCustomers,
  getAllOrders,
  getAllProducts,
  createNewOrder,
} from "../../data/api";
import { useNavigate } from "react-router-dom";

function CreateOrder() {
  const [customers, setCustomers] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [cart, setCart] = React.useState([]);

  const [selectedCustomerId, setSelectedCustomerId] = React.useState("");
  const [selectedProductId, setSelectedProductId] = React.useState("");
  const [selectedQuantity, setSelectedQuantity] = React.useState(1);
  const [id, setId] = useState(uuidv4());

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
      (item) => item.productId === selectedProductId.productId
    );

    if (existingProductIndex > -1) {
      updatedCart[existingProductIndex].quantity += Number(selectedQuantity);
    } else {
      updatedCart.push({
        productId: selectedProductId.productId,
        productName: selectedProductId.productName,
        productCost: selectedProductId.productCost,
        quantity: Number(selectedQuantity),
      });
    }

    setCart(updatedCart);
    setSelectedProductId("");
    setSelectedQuantity(1);
  };

  const handleData = async () => {
    const AllCustomers = await getAllCustomers();
    const AllOrders = await getAllOrders();
    const AllProducts = await getAllProducts();
    setProducts(AllProducts);
    setOrders(AllOrders);
    setCustomers(AllCustomers);
  };
  useEffect(() => {
    handleData();
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
      customerId: selectedCustomerId.customerId,
      customerName: selectedCustomerId.customerName,
      products: cart,
      status: "20 - Order Placed",
      price: cart.reduce(
        (total, product) => total + product.productCost * product.quantity,
        0
      ),
    };
    console.log(orderData);

    createNewOrder(orderData).then((response) => {
      alert("Order created successfully");
      navigate("/orders");
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
                        {customer.customerName}
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
                      <MenuItem key={product.productId} value={product}>
                        {product.productName}
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
              return `${product.productName} x ${product.quantity} = ${
                product.productCost * product.quantity
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
