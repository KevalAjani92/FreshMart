import { Route, Routes } from "react-router-dom";
import CustomerLayout from "../layouts/CustomerLayout";
import Home from "../pages/Landing/Home";
import Contact from "../pages/Landing/Contact";
import About from "../pages/Landing/About";
import Products from "../pages/Landing/Products";
import Cart from "../pages/Customer/Cart";
import Checkout from "../pages/Customer/Checkout";
import OrderConfirmation from "../pages/Customer/OrderConfirmation";
import MyOrders from "../pages/Customer/MyOrders";
import OrderDetails from "../pages/Customer/OrderDetails";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/Customer/Profile";
import ProductDetail from "../pages/Customer/ProductDetail";
import Feedback from "../pages/Customer/Feedback";

const CustoerRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={["Customer"]} />}>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/order-confirmation/:orderId"
            element={<OrderConfirmation />}
          />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feedback" element={<Feedback />} />
          
        </Route>
      </Route>
    </Routes>
  );
};
export default CustoerRoutes;
