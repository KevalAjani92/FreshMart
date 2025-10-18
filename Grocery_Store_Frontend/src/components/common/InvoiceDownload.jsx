import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";

const InvoiceDownload = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const invoiceRef = useRef();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7188/api/Invoice/GetInvoiceDetails/${orderId}`
        );
        setOrder(response.data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleDownload = () => {
    if (!invoiceRef.current || !order) return;
    const element = invoiceRef.current;
    const opt = {
      margin: 0.5,
      filename: `Invoice_${order.orderNumber || "NA"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .catch((err) => {
        console.error("PDF download failed:", err);
      });
  };

  if (!order) return <p>Loading invoice...</p>;

  return (
    <>
      <div style={{ textAlign: "center", margin: "2rem 0" }}>
        <button
          onClick={handleDownload}
          style={{
            cursor: "pointer",
            backgroundColor: "#22c55e", // Tailwind green-500
            color: "#fff",
            padding: "0.75rem 1.5rem",
            borderRadius: "1rem",
            fontWeight: "600",
            border: "none",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          Download Invoice
        </button>
      </div>

      <div
        ref={invoiceRef}
        style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          backgroundColor: "#f3f4f6", // Tailwind gray-100
          padding: "1rem",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "2rem",
            overflow: "hidden",
            boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#22c55e", // Tailwind green-500
              color: "#fff",
              textAlign: "center",
              padding: "2rem",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem", // spacing between icon and text
              }}
            >
              {/* Basket Icon */}
              <svg
                style={{ width: "3rem", height: "3rem", flexShrink: 0 }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>

              {/* Store Name */}
              <h1
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                KIRANA STORE
              </h1>
            </div>

            <p style={{ marginTop: "0.5rem" }}>
              Your daily essentials, delivered with care.
            </p>
            <p style={{ fontSize: "0.8rem", marginTop: "0.25rem" }}>
              support@kiranastore.com | +91-XXXXXXXXXX
            </p>
          </div>

          {/* Invoice & Customer Info */}
          <div style={{ padding: "2rem" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                marginBottom: "2rem",
                borderBottom: "1px solid #e5e7eb",
                paddingBottom: "1rem",
              }}
            >
              {/* Invoice */}
              <div style={{ flex: "1 1 45%", marginBottom: "1rem" }}>
                <h2
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    marginBottom: "0.5rem",
                  }}
                >
                  Invoice
                </h2>
                <p>
                  <strong>Invoice Number:</strong> INV-{order.orderNumber}
                </p>
                <p>
                  <strong>Order Number:</strong> {order.orderNumber}
                </p>
                <p>
                  <strong>Invoice Date:</strong>{" "}
                  {new Date(order.invoiceDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>

              {/* Customer */}
              <div style={{ flex: "1 1 45%", marginBottom: "1rem" }}>
                <h2
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    marginBottom: "0.5rem",
                  }}
                >
                  Customer
                </h2>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.75rem",
                  }}
                >
                  {/* Name Icon */}
                  <svg
                    style={{
                      width: "1.2rem",
                      height: "1.2rem",
                      marginRight: "0.5rem",
                    }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong>Name:</strong> {order.customerName}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.75rem",
                  }}
                >
                  {/* Phone Icon */}
                  <svg
                    style={{
                      width: "1.2rem",
                      height: "1.2rem",
                      marginRight: "0.5rem",
                    }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.823 18 2 12.177 2 5V3z"></path>
                  </svg>
                  <span>
                    <strong>Phone:</strong> {order.phoneNumber}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.75rem",
                  }}
                >
                  {/* Address Icon */}
                  <svg
                    style={{
                      width: "1.2rem",
                      height: "1.2rem",
                      marginRight: "0.5rem",
                    }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong>Address:</strong> {order.deliveryAddress}
                  </span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                backgroundColor: "#d1fae5",
                padding: "1rem",
                borderRadius: "1rem",
                marginBottom: "2rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* Payment Icon */}
                <svg
                  style={{
                    width: "1.2rem",
                    height: "1.2rem",
                    marginRight: "0.5rem",
                  }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 002-2V4H4z"></path>
                  <path
                    fillRule="evenodd"
                    d="M18 9v3.75a.75.75 0 01-.75.75H15V9h3zM12 9v5.25h-1.5V9H12zM9 9v5.25H7.5V9H9zM4 12.25V16h12.25a.75.75 0 00.75-.75V12.25h-13z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>Payment:</strong> {order.paymentStatus} (
                  {order.paymentMode})
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                {/* Delivery Icon */}
                <svg
                  style={{
                    width: "1.2rem",
                    height: "1.2rem",
                    marginRight: "0.5rem",
                  }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>Delivery:</strong> {order.deliveryStatus}
                </span>
              </div>
            </div>

            {/* Items Table */}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "2rem",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#f9fafb" }}>
                  <th
                    style={{ padding: "0.75rem", border: "1px solid #e5e7eb" }}
                  >
                    #
                  </th>
                  <th
                    style={{ padding: "0.75rem", border: "1px solid #e5e7eb" }}
                  >
                    Product
                  </th>
                  <th
                    style={{ padding: "0.75rem", border: "1px solid #e5e7eb" }}
                  >
                    Category
                  </th>
                  <th
                    style={{ padding: "0.75rem", border: "1px solid #e5e7eb" }}
                  >
                    Qty
                  </th>
                  <th
                    style={{ padding: "0.75rem", border: "1px solid #e5e7eb" }}
                  >
                    Unit Price
                  </th>
                  <th
                    style={{ padding: "0.75rem", border: "1px solid #e5e7eb" }}
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr
                    key={item.productID}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb",
                    }}
                  >
                    <td
                      style={{ padding: "0.5rem", border: "1px solid #e5e7eb" }}
                    >
                      {index + 1}
                    </td>
                    <td
                      style={{ padding: "0.5rem", border: "1px solid #e5e7eb" }}
                    >
                      {item.name}
                    </td>
                    <td
                      style={{ padding: "0.5rem", border: "1px solid #e5e7eb" }}
                    >
                      {item.category}
                    </td>
                    <td
                      style={{ padding: "0.5rem", border: "1px solid #e5e7eb" }}
                    >
                      {item.quantity}
                    </td>
                    <td
                      style={{ padding: "0.5rem", border: "1px solid #e5e7eb" }}
                    >
                      ₹{item.price.toFixed(2)}
                    </td>
                    <td
                      style={{ padding: "0.5rem", border: "1px solid #e5e7eb" }}
                    >
                      ₹{(item.quantity * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Summary */}
            <div style={{ textAlign: "right", paddingRight: "1rem" }}>
              <p>
                <strong>Subtotal:</strong> ₹{order.totalAmount.toFixed(2)}
              </p>
              <p>
                <strong>Delivery:</strong> ₹{order.deliveryCharge.toFixed(2)}
              </p>
              <p>
                <strong>Discount:</strong> ₹0.00
              </p>
              <p>
                <strong>Tax (5%):</strong> ₹0.00
              </p>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  marginTop: "0.5rem",
                }}
              >
                Total: ₹{order.finalAmount.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              textAlign: "center",
              padding: "1rem",
              backgroundColor: "#f9fafb",
              fontSize: "0.8rem",
              color: "#6b7280",
            }}
          >
            <p>Thank you for shopping with Kirana Store!</p>
            <p>Contact support within 24 hours for any issues.</p>
            <p>&copy; 2025 Kirana Store. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceDownload;
