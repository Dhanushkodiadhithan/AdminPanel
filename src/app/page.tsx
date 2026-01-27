"use client";

import { useState } from "react";
import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import DashboardContent from "@/Components/DashboardContent";
import Shops from "@/Components/Shops";
import Orders from "@/Components/Orders";

export default function Page() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="h-screen flex flex-col overflow-hidden">

      {/* Top Navbar (fixed height) */}
      <Navbar />

      {/* Main Area: Sidebar + Content */}
      <div className="flex flex-1 min-h-0">

        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Area */}
        <div className="flex-1 p-6 bg-slate-50 overflow-y-auto">

          {activeTab === "Dashboard" && <DashboardContent />}
          {activeTab === "Shops" && <Shops />}
          {activeTab === "Delivery Partners" && <div>Delivery Partners Page</div>}
          {activeTab === "Orders" && <Orders />}
          {activeTab === "Customers" && <div>Customers Page</div>}
          {activeTab === "Requests" && <div>Requests Page</div>}
          {activeTab === "Database" && <div>Database Page</div>}

        </div>

      </div>
    </div>
  );
}
