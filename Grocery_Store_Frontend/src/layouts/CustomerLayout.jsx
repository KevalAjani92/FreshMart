import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/common/ScrollToTop";
import LandingFooter from "../components/layout/Landing/LandingFooter";
import CustomerHeader from "../components/layout/customer/CustomerHeader";
import { Toaster } from "react-hot-toast";
import '../index.css'

const CustomerLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-white relative">
        <ScrollToTop />
        <CustomerHeader />
        <Outlet />
        <LandingFooter />

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              borderRadius: "16px",
              padding: "16px",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            },
          }}
        />
      </div>
    </>
  );
};
export default CustomerLayout;
