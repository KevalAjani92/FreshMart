import React, { useState } from "react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/StoreOwner/Navbar";
import Sidebar from "../components/layout/StoreOwner/Sidebar";
import './storeOwner.css';

const StoreOwnerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full h-full">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <main
          className={`
            flex-1 w-full h-full overflow-x-hidden overflow-y-auto bg-gray-50
            transition-all duration-300
            ${
              sidebarOpen
                ? "blur-sm pointer-events-none lg:pointer-events-auto"
                : ""
            }
          `}
          // ✅ Clicking main UI closes sidebar
          onClick={() => {
            if (sidebarOpen) setSidebarOpen(false);
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full px-6 py-4"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
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
  );
};

export default StoreOwnerLayout;
