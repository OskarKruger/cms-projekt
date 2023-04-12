import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { Box, Container, Stack } from "@mui/system";
import axios from 'axios';
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
  Button,
} from "@mui/material";

function Customers() {
  const [orders, setOrders] = React.useState([]);

  const [customers, setCustomers] = React.useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/customers')
      .then(response => {
        console.log(response.data);
        setCustomers(response.data);
      })
      .catch(error => console.error(error));
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
                    {customer.customer_name}
                  </TableCell>
                  <TableCell align="left">{customer.customer_id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={1} sx={{ padding: "2px", marginTop: "20px" }}>
          <Pagination count={8} />
        </Stack>
        <Button variant="contained" sx={{margin: "10px"}} startIcon={<PersonIcon />}>New Customer</Button>
        <Button variant="outlined" sx={{margin: "10px"}} startIcon={<DeleteIcon />}>Removes Customer</Button>
        <Button variant="outlined" sx={{margin: "10px"}} startIcon={<DesignServicesIcon />}>Edit Customer</Button>
        
      </Container>

      <Footer />
    </div>
  );
}

export default Customers;
