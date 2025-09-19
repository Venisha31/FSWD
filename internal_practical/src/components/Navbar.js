import React from "react";

export default function Navbar() {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      width: "100%",
      height: "60px",
      backgroundColor: "#111",
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
      zIndex: 1000
    }}>
      <h2 style={{ color: "red", fontWeight: "bold" }}>NETFLIX</h2>
    </div>
  );
}
