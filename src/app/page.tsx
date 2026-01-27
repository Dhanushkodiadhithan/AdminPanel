"use client";

import { useState } from "react";
import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import Dashboard from "@/Components/Dashboard";
import Shops from "@/Components/Shops";
import Orders from "@/Components/Orders";
import Customers from "@/Components/Customers";
import Requests from "@/Components/Requests";
import Database from "@/Components/Database";
import DeliveryPartners from "@/Components/DeliveryPartners";

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

          {activeTab === "Dashboard" && <Dashboard />}
          {activeTab === "Shops" && <Shops />}
          {activeTab === "Delivery Partners" && <DeliveryPartners />}
          {activeTab === "Orders" && <Orders />}
          {activeTab === "Customers" && <Customers />}
          {activeTab === "Requests" && <Requests />}
          {activeTab === "Database" && <Database />}

        </div>

      </div>
    </div>
  );
}
