import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { Container, Stack } from "@mui/system";
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
import { getAllCustomers, getAllOrders  } from "../data/api";

function Customers() {
  const [orders, setOrders] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);

  const handleData = async() => {
    const AllCustomers = await getAllCustomers();
    const AllOrders = await getAllOrders();
    setOrders(AllOrders);
    setCustomers(AllCustomers);
  }
  useEffect(() => {
    handleData();
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <TableContainer component={Paper} sx={{ margin: "10px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ border: "2px solid black" }}>
              <TableRow sx={{ backgroundColor: "lightgrey" }}>
                <TableCell>Customer Name</TableCell>
                <TableCell>Customer Id</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ border: "1px solid darkgrey" }}>
              {customers.map((customer) => (
                <TableRow
                  key={customer.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {customer.customerName}
                  </TableCell>
                  <TableCell align="left">{customer.customerId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={1} sx={{ padding: "2px", marginTop: "20px" }}>
          <Pagination count={8} />
        </Stack>
        <Button variant="contained" sx={{margin: "10px"}} href="/create-customer" startIcon={<PersonIcon />}>New Customer</Button>
        <Button variant="outlined" sx={{margin: "10px"}} href="/delete-customer" startIcon={<DeleteIcon />}>Delete Customer</Button>
        <Button variant="outlined" sx={{margin: "10px"}} href="/edit-customer" startIcon={<DesignServicesIcon />}>Edit Customer</Button>
        
      </Container>

      <Footer />
    </div>
  );
}

export default Customers;
