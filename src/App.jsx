import React from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import Orders from "./pages/Orders";
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import StoreManagement from "./pages/StoreManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/store-management" element={<StoreManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
