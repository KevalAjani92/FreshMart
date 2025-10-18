import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingLayout from "../layouts/LandingLayout";
import Home from "../pages/Landing/Home";
import Contact from "../pages/Landing/Contact";
import About from "../pages/Landing/About";
import Products from "../pages/Landing/Products";

const LandingRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingLayout />}>
        <Route index element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
      </Route>
    </Routes>
  );
};

export default LandingRoutes;
