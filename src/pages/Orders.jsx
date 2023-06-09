import React, { useEffect } from "react";
import "../main.css";
import Header from "../components/Header";
import { Box, Container, Stack } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Button,
} from "@mui/material";
import { getAllOrders } from "../data/api";
import Footer from "../components/Footer";

function Orders() {

  const [orders, setOrders] = React.useState([]);
  const handleData = async() => {
    const AllOrders = await getAllOrders();
    setOrders(AllOrders);
  }
  useEffect(() => {
    handleData();
  }, []);

  return (
    <div>
      <Header />
      <div className="main">
        <Container>
         
          <TableContainer component={Paper} sx={{margin: '10px'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{border: "2px solid black"}}>
                <TableRow sx={{ backgroundColor: "lightgrey" }}>
                  <TableCell>Customer Name</TableCell>
                  <TableCell align="left">Customer Id</TableCell>
                  <TableCell align="left">Order Id</TableCell>
                  <TableCell align="left">Product(s)</TableCell>
                  <TableCell align="left">Order Status</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Order Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{border: "1px solid darkgrey"}}>
                {orders.map((order) => (
                  <TableRow
                    key={order.date}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {order.customerName}
                    </TableCell>
                    <TableCell align="left">{order.customerId}</TableCell>
                    <TableCell align="left">{order.id}</TableCell>
                    <TableCell align="left">{order.products.map((product) => product.productName).join(', ')}</TableCell>
                    <TableCell align="left">{order.status}</TableCell>
                    <TableCell align="left">{order.date}</TableCell>
                    <TableCell align="left">{order.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack spacing={1} sx={{padding: '2px', marginTop: '20px'}}>
      
      <Pagination count={8} />
    </Stack>
        <Button variant="contained" sx={{margin: "10px"}} href="/create-order" startIcon={<ShoppingCartIcon />}>New Order</Button>
        <Button variant="outlined" sx={{margin: "10px"}} href="/delete-order" startIcon={<DeleteIcon />}>Delete Order</Button>
        <Button variant="outlined" sx={{margin: "10px"}} href="/edit-order" startIcon={<DesignServicesIcon />}>Edit Order</Button>
        </Container>
      </div>
      <Footer/>
    </div>
  );
}

export default Orders;
