import React from "react";
import { Home, User, Settings } from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <nav>
        <a href="#"><Home /> Home</a>
        <a href="#"><User /> Profile</a>
        <a href="#"><Settings /> Settings</a>
      </nav>
    </aside>
  );
};

export default Sidebar;
