import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDate(formatted);
  }, []);

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
      
      <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <main className={`main-content ${isOpen ? "shifted" : ""}`}>
        <div className="top-bar">
          <h2>{date}</h2>
          <button className="toggle-mode" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
        <h1>Welcome to My Website</h1>
        <p>This is the main content of the webpage.</p>
      </main>
    </div>
  );
}

export default App;
