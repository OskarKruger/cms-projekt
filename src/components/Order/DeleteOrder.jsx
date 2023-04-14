import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function DeleteOrder() {
  const [orders, setorders] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  const [selectedCustomerId, setSelectedCustomerId] = React.useState("");
  const [selectedProductId, setSelectedProductId] = React.useState("");
  const [selectedOrderId, setSelectedOrderId] = React.useState("");
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleCustomerChange = (event) => {
    setSelectedCustomerId(event.target.value);
  };

  const handleProductChange = (event) => {
    setSelectedProductId(event.target.value);
  };

  const handleOrderChange = (event) => {
    setSelectedOrderId(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/customers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8000/orders")
      .then((response) => {
        setorders(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const deleteorderbyid = () => {
    if (selectedOrderId) {
      axios
        .delete(`http://localhost:8000/orders/${selectedOrderId.id}`, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          alert("order deleted successfully");
          navigate("/orders");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toString().toLowerCase().includes(searchValue.toLowerCase()) &&
      (!selectedCustomerId ||
        order.customer_id === parseInt(selectedCustomerId))
  );

  return (
    <div>
      <Header />
      <Container sx={{ margin: "10px" }}>
        <TextField
          label="Search by ID"
          value={searchValue}
          onChange={handleSearchChange}
          fullWidth
        />
      </Container>
      <Container sx={{ margin: "10px" }}>
        <FormControl fullWidth>
          <InputLabel id="order-selector-label">Order</InputLabel>
          <Select
            labelId="order-selector-label"
            id="order-selector"
            value={selectedOrderId}
            required
            label="order"
            onChange={handleOrderChange}
            sx={{ width: "50vw" }}
          >
            {filteredOrders.map((order) => (
              <MenuItem
                key={order.id}
                value={order}
                sx={{ marginBottom: "8px" }}
              >
                {order.id} - {order.customer_name} - {order.date}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Container>

      <Container sx={{ margin: "10px" }}>
        <TextField
          InputProps={{
            readOnly: true,
          }}
          label="Order price"
          id="filled"
          value={
            selectedOrderId ? `${selectedOrderId.price.toFixed(2)} DKK` : ""
          }
        />
      </Container>

      <Container sx={{ margin: "10px" }}>
        <TextField
          InputProps={{
            readOnly: true,
          }}
          label="Order date"
          id="filled"
          value={selectedOrderId ? selectedOrderId.date : ""}
        />
      </Container>
      <Container sx={{ margin: "10px" }}>
        <TextField
          InputProps={{
            readOnly: true,
          }}
          label="Order date"
          id="filled"
          value={selectedOrderId ? selectedOrderId.status : ""}
        />
      </Container>
      <Container sx={{ margin: "10px" }}>
        <TextField
          InputProps={{
            readOnly: true,
          }}
          label="Products"
          id="filled"
          multiline
          rows={4}
          value={
            selectedOrderId
              ? selectedOrderId.products
                  .map((product) => product.product_name)
                  .join(", ")
              : ""
          }
        />
      </Container>

      <Button
        variant="contained"
        sx={{ paddingleft: "10px", margin: "10px" }}
        onClick={deleteorderbyid}
      >
        Delete
      </Button>

      <Footer />
    </div>
  );
}

export default DeleteOrder;
