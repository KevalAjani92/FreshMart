import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <Outlet />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#10b981",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};
export default AuthLayout;