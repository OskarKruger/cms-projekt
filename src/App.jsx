import React from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import Orders from "./pages/Orders";
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import StoreManagement from "./pages/StoreManagement";
import CreateOrder from "./components/Order/CreateOrder";
import DeleteOrder from "./components/Order/DeleteOrder";
import CreateCustomer from "./components/Customer/CreateCustomer";
import DeleteCustomer from "./components/Customer/DeleteCustomer";

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
        <Route path="/create-customer" element={<CreateCustomer />} />
        <Route path="/delete-customer" element={<DeleteCustomer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
