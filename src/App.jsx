import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from "./pages/Orders";
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import StoreManagement from "./pages/StoreManagement";
import CreateOrder from "./components/Order/CreateOrder";
import DeleteOrder from "./components/Order/DeleteOrder";
import CreateCustomer from "./components/Customer/CreateCustomer";
import DeleteCustomer from "./components/Customer/DeleteCustomer";
import EditOrder from "./components/Order/EditOrder";
import EditCustomer from "./components/Customer/EditCustomer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/store-management" element={<StoreManagement />} />
        <Route path="/create-order" element={<CreateOrder />} />
        <Route path="/delete-order" element={<DeleteOrder />} />
        <Route path="/edit-order" element={<EditOrder />} />
        <Route path="/create-customer" element={<CreateCustomer />} />
        <Route path="/delete-customer" element={<DeleteCustomer />} />
        <Route path="/edit-customer" element={<EditCustomer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
