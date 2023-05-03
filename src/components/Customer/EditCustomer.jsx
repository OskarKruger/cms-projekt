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
  updateCustomer,
} from '../../data/api';

function EditCustomer() {
  const [customers, setCustomers] = React.useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = React.useState(null);
  const [customerName, setCustomerName] = React.useState('');

  const navigate = useNavigate();

  const handleCustomerChange = (event) => {
    setSelectedCustomerId(event.target.value.id);
    setCustomerName(event.target.value.customerName);
  };

  const handleData = async () => {
    const allCustomers = await getAllCustomers();
    setCustomers(allCustomers);
  };
  useEffect(() => {
    handleData();
  }, []);

  const updateSelectedCustomer = async () => {
    if (!selectedCustomerId) {
      alert('Please select a customer to edit');
      return;
    }

    const updatedCustomer = {
      id: selectedCustomerId,
      customerName: customerName,
    };

    updateCustomer(updatedCustomer)
      .then((response) => {
        alert('Customer updated successfully');
        navigate('/customers');
      })
      .catch((error) => {
        alert('Error updating customer');
        console.error('Error updating customer:', error);
      });
  };

  return (
    <div>
      <Header />
      <Button startIcon={<ArrowBackIcon />} href="/customers">
        Return
      </Button>
      <Container sx={{ margin: '10px' }}>
        <FormControl fullWidth>
          <InputLabel id="customer-selector-label">Customer</InputLabel>
          <Select
            labelId="customer-selector-label"
            id="customer-selector"
            value={selectedCustomerId ? customers.find(c => c.id === selectedCustomerId) : ''}
            required
            label="Customer"
            onChange={handleCustomerChange}
            sx={{ width: '50vw' }}
          >
            {customers.map((customer) => (
              <MenuItem
                key={customer.id}
                value={customer}
                sx={{ marginBottom: '8px' }}
              >
                {customer.customerName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Container>
      <Container sx={{ margin: '10px' }}>
        <TextField
          label="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          sx={{ width: '50vw' }}
        />
      </Container>
      <Button
        variant="contained"
        sx={{ marginTop: '10px' }}
        onClick={updateSelectedCustomer}
      >
        Update Customer
      </Button>

      <Footer />
    </div>
  );
}

export default EditCustomer;
