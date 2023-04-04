import React, { useEffect } from "react";
import "../main.css";
import Header from "../components/Header";
import Grid from "@mui/material/Grid"; // Grid version 1
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Box, Container, Stack } from "@mui/system";
import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
} from "@mui/material";
import Footer from "../components/Footer";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Ellen Hansen", 215879112, "20 - Order Placed", "30-03-2023, 03:13", 869.00),
  createData("Oskar Krüger", 215872967, "25 - Order Confirmed", "27-03-2023, 08:59", 4399.00),
  createData("Pasha Biceps", 215876305, " 100 - Order Complete", "29-04-2021, 08:18", 1299.00),
  createData("Rasmus Winther", 215877563, "25 - Order Confirmed", "29-03-2023, 08:23", 1439.00),
  createData("Peter Nord", 215870500, "90 - Order Cancelled", "13-06-2021, 19:45", 99.00),
];

function Orders() {
  
const [orders, setOrders] = React.useState([]);

useEffect(() => {
  fetch("http://localhost:8000/orders")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setOrders(data);
    });
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
                  <TableCell align="left">Order Id</TableCell>
                  <TableCell align="left">Order Status</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Order Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{border: "1px solid darkgrey"}}>
                {orders.map((order) => (
                  <TableRow
                    key={order.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {order.customer_name}
                    </TableCell>
                    <TableCell align="left">{order.id}</TableCell>
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
        </Container>
      </div>
      <Footer/>
    </div>
  );
}

export default Orders;
