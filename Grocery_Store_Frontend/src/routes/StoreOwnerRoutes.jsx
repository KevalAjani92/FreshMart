import { Route, Routes } from "react-router-dom";
import StoreOwnerLayout from "../layouts/StoreOwnerLayout";
import ProtectedRoute from "./ProtectedRoute";
import { AnimatePresence } from "framer-motion";
import AssignedOrders from "../pages/StoreOwner/AssignedOrders";
import Categories from "../pages/StoreOwner/Categories";
import CategoryDetail from "../pages/StoreOwner/CategoryDetail";
import CustomerDetail from "../pages/StoreOwner/CustomerDetail";
import Customers from "../pages/StoreOwner/Customers";
import Dashboard from "../pages/StoreOwner/Dashboard";
import DeliveryStaff from "../pages/StoreOwner/DeliveryStaff";
import Discounts from "../pages/StoreOwner/Discounts";
import Earnings from "../pages/StoreOwner/Earnings";
import Inventory from "../pages/StoreOwner/Inventory";
import Notifications from "../pages/StoreOwner/Notifications";
import OrderDetail from "../pages/StoreOwner/OrderDetail";
import ProductDetail from "../pages/StoreOwner/ProductDetail";
import Products from "../pages/StoreOwner/Products";
import Profile from "../pages/StoreOwner/Profile";
import Reports from "../pages/StoreOwner/Reports";
import Orders from "../pages/StoreOwner/Orders";

const StoreOwnerRoutes = () => {
  return (
    <div className="storeowner-layout min-h-screen bg-gray-50">
      <Routes>
        <Route element={<ProtectedRoute allowedRoles={["StoreOwner"]} />}>
          <Route path="/" element={<StoreOwnerLayout />}>
            {/* <AnimatePresence mode="wait"> */}
              {/* <Route index element={<Dashboard />} />
             */}


              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<OrderDetail />} />
              <Route path="/delivery-staff" element={<DeliveryStaff />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/discounts" element={<Discounts />} />
              <Route path="/earnings" element={<Earnings />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/reports" element={<Reports />} />
              {/* <Route path="/settings" element={<Settings />} /> */}
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:id" element={<CategoryDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/customers/:id" element={<CustomerDetail />} />
              <Route path="/assigned-orders" element={<AssignedOrders />} />
            {/* </AnimatePresence> */}
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
export default StoreOwnerRoutes;
