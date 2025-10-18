import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingRoutes from "./routes/LandingRoutes";
import StoreOwnerRoutes from "./routes/StoreOwnerRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./routes/ProtectedRoute";
import InvoiceDownload from "./components/common/InvoiceDownload";
import DeliveryRoutes from "./routes/DeliveryRoutes";
import { AppProvider } from "./context/AppContext";

function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* Public Pages */}

          <Route
            element={
              <ProtectedRoute
                allowedRoles={["Customer", "StoreOwner", "DeliveryStaff"]}
              />
            }
          >
            <Route
              path="/invoice/download/:orderId"
              element={<InvoiceDownload />}
            />
          </Route>

          <Route path="/*" element={<LandingRoutes />} />
          {/* Authentication Pages */}
          <Route path="/auth/*" element={<AuthRoutes />} />
          {/* Store Owner Pages */}
          <Route path="/store-owner/*" element={<StoreOwnerRoutes />} />
          {/* Customer Pages */}
          <Route path="/customer/*" element={<CustomerRoutes />} />

          {/* Delivery Pages */}
          <Route
            path="/delivery/*"
            element={
              <AppProvider>
                <DeliveryRoutes />
              </AppProvider>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
