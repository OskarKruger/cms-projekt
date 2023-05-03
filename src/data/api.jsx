import axios from "axios";

const API_BASE_URL = "http://5.75.228.26:8080";

export const getAllOrders = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/orders/orders`);
  return response.data;
};

export const getAllCustomers = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/customers/customers`);
  return response.data;
};

export const getAllProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/products/products`);
  return response.data;
};

export const deleteOrderById = async (selectedOrderId, navigate) => {
  if (selectedOrderId) {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/orders/DeleteOrders/${selectedOrderId.id}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("order deleted successfully");
      navigate("/orders");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};

export const createNewOrder = async (orderData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/orders/CreateOrders`,
      orderData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createNewCustomer = async (newCustomer) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/customers/CreateCustomers`,
      newCustomer,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const deleteCustomerById = async (selectedCustomerId) => {
  if (selectedCustomerId) {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/customers/DeleteCustomers/${selectedCustomerId}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return { success: true, data: response.data };
    } catch (error) {
      console.log(error);
      return { success: false, error: error };
    }
  }
};
export const updateOrder = async (orderData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/orders/${orderData.id}`, orderData);
      return response.data;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  };
  export const updateCustomer = async (customerData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/customers/${customerData.id}`, customerData);
      return response.data;
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  };
  