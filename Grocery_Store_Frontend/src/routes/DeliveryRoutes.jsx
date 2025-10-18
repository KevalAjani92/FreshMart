import { Route, Routes } from "react-router-dom";
import DeliveryLayout from "../layouts/DeliveryLayout";
import AssignedOrders from "../pages/Delivery/AssignedOrders";
import Dashboard from "../pages/Delivery/Dashboard";
import DeliveryHistory from "../pages/Delivery/DeliveryHistory";
import Earnings from "../pages/Delivery/Earnings";
import Notifications from "../pages/Delivery/Notifications";
import OrderDetails from "../pages/Delivery/OrderDetails";
import Profile from "../pages/Delivery/Profile";
import Support from "../pages/Delivery/Support";
import ProtectedRoute from "./ProtectedRoute";

const DeliveryRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={["DeliveryStaff"]} />}>
        {/* <Route path="/" element={<Navigate to="/delivery/dashboard" replace />} /> */}
        <Route path="/" element={<DeliveryLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<AssignedOrders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/history" element={<DeliveryHistory />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/support" element={<Support />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default DeliveryRoutes;
