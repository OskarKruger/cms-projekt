import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import {
  getAllCustomers,
  getAllOrders,
  getAllProducts,
  updateOrder,
} from '../../data/api';

function EditOrder() {
  const [orders, setOrders] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  const [selectedOrderId, setSelectedOrderId] = React.useState(null);
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  const handleOrderChange = (event) => {
    setSelectedOrderId(event.target.value);
    setCart(
        event.target.value.products.map((product) => ({
          ...product,
          productId: product.id, })))
  };

  const handleData = async () => {
    const allCustomers = await getAllCustomers();
    const allOrders = await getAllOrders();
    const allProducts = await getAllProducts();
    setProducts(allProducts);
    setOrders(allOrders);
    setCustomers(allCustomers);
  };
  useEffect(() => {
    handleData();
  }, []);

  const updateSelectedOrder = async () => {
    if (!selectedOrderId) {
      alert('Please select an order to edit');
      return;
    }

    const updatedOrder = {
      ...selectedOrderId,
      products: cart,
    };

    updateOrder(updatedOrder)
      .then((response) => {
        alert('Order updated successfully');
        navigate('/orders');
      })
      .catch((error) => {
        alert('Error updating order');
        console.error('Error updating order:', error);
      });
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  return (
    <div>
      <Header />
      <Button startIcon={<ArrowBackIcon />} href="/orders">
        Return
      </Button>
      <Container sx={{ margin: '10px' }}>
        <FormControl fullWidth>
          <InputLabel id="order-selector-label">Order</InputLabel>
          <Select
            labelId="order-selector-label"
            id="order-selector"
            value={selectedOrderId}
            required
            label="Order"
            onChange={handleOrderChange}
            sx={{ width: '50vw' }}
          >
            {orders.map((order) => (
              <MenuItem
                key={order.id}
                value={order}
                sx={{ marginBottom: '8px' }}
              >
                {order.id} - {order.customerName} - {order.date}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Container>

      <Container sx={{ margin: "10px" }}>
        <h2>Cart</h2>
        {cart.map((product, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <TextField
              label="Quantity"
              type="number"
              value={product.quantity || ""}
              onChange={(e) =>
                handleQuantityChange(product.productId, Number(e.target.value))
              }
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ marginRight: "10px" }}
            />
            <span>
              {product.productName || ""} x {product.quantity || 0} ={" "}
              {(product.productCost * (product.quantity || 0)).toFixed(2)} DKK
            </span>
          </div>
        ))}
      </Container>
        <Button
        variant="contained"
        sx={{marginTop: '10px' }}
        onClick={updateSelectedOrder}
      >
        Update Order
      </Button>

      

      <Footer />
    </div>
  );
}

export default EditOrder;
