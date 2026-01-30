"use client";

import { Download } from "lucide-react";

export default function OrdersPage() {
  return (
    <div className="flex w-full min-h-screen bg-[#f6f7fb]">
      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 flex flex-col gap-6">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-[#0d121b]">
              Orders
            </h1>
            <p className="text-slate-500 mt-1">
              Manage and track live meat deliveries
            </p>
          </div>

          {/* PRIMARY CTA */}
          <button
            className="
              flex items-center gap-2
              bg-(--primary) text-white
              px-5 py-2.5
              rounded-xl font-semibold
              shadow-lg shadow-(--primary)/30
              hover:opacity-90 cursor-pointer
              active:scale-95
              transition
            "
          >
            <Download className="w-4 h-4 " />
            Export Orders
          </button>
        </div>

        {/* FILTER TABS */}
        <div className="flex gap-3 ">
          <Tab label="All Orders" active />
          <Tab label="Fish" />
          <Tab label="Chicken" />
          <Tab label="Mutton" />
        </div>

        {/* TABLE */}
        <div
          className="
            bg-white
            rounded-2xl cursor-pointer
            shadow-[0_12px_40px_rgba(16,24,40,0.06)]
            overflow-hidden
          "
        >
          <table className="w-full text-left">
            <thead className="bg-slate-50 shadow-[inset_0_-1px_0_#eef2f7]">
              <tr>
                <Th>Order ID</Th>
                <Th>Customer</Th>
                <Th>Items</Th>
                <Th>Status</Th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              <OrderRow
                id="MEAT-9921"
                customer="Rahul S."
                location="Andheri West, Mumbai"
                items="1kg Mutton Biryani Cut"
                status="Processing"
                color="blue"
              />

              <OrderRow
                id="MEAT-9918"
                customer="Kiran K."
                location="Koramangala, BLR"
                items="2kg Rohu Fish (Whole)"
                status="Delivered"
                color="green"
              />

              <OrderRow
                id="MEAT-9915"
                customer="Amit V."
                location="Salt Lake, Kolkata"
                items="1kg Chicken Curry Cut"
                status="Out for Delivery"
                color="orange"
              />

              <OrderRow
                id="MEAT-9912"
                customer="Natasha M."
                location="Banjara Hills, HYD"
                items="500g Prawns, 1kg Chicken"
                status="Cancelled"
                color="red"
              />

              <OrderRow
                id="MEAT-9910"
                customer="Kiran P."
                location="Sector 15, GGN"
                items="2kg Mutton Leg"
                status="Delivered"
                color="green"
              />
            </tbody>
          </table>

          {/* PAGINATION */}
          <div
            className="
              flex items-center justify-between
              px-6 py-4
              bg-slate-50
              shadow-[inset_0_1px_0_#eef2f7]
            "
          >
            <span className="text-sm text-slate-500">
              Showing 1–10 of 42 orders
            </span>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 cursor-pointer rounded-lg bg-white shadow-sm hover:bg-slate-100 transition">
                Previous
              </button>
              <button
                className="
                  px-3 py-1.5 rounded-lg
                  bg-(--primary) text-white
                  font-semibold cursor-pointer
                  shadow shadow-(--primary)/30
                  hover:opacity-90
                  transition
                "
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="w-80 bg-white p-6 shadow-[inset_1px_0_0_#eef2f7] flex flex-col gap-6">
        <h3 className="text-lg font-bold">Quick Insights</h3>

        <StatCard title="Active Deliveries" value="12" change="+15%" />
        <StatCard title="Pending Deliveries" value="3" />
      </aside>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
      {children}
    </th>
  );
}

function Tab({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`
        px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer
        ${
          active
            ? "bg-(--primary) text-white shadow shadow-(--primary)/30"
            : "bg-white text-slate-600 hover:bg-(--primary)/10"
        }
      `}
    >
      {label}
    </button>
  );
}

function OrderRow(props: any) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-5 font-bold text-(--primary)">
        #{props.id}
      </td>

      <td className="px-6 py-5">
        <p className="font-bold">{props.customer}</p>
        <p className="text-xs text-slate-500">{props.location}</p>
      </td>

      <td className="px-6 py-5 text-slate-600">
        {props.items}
      </td>

      <td className="px-6 py-5">
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${colorMap[props.color]}`}
        >
          {props.status}
        </span>
      </td>
    </tr>
  );
}

function StatCard(props: any) {
  return (
    <div className="p-4 rounded-xl bg-slate-50">
      <p className="text-xs font-bold text-slate-400 uppercase">
        {props.title}
      </p>
      <div className="flex justify-between items-end mt-1">
        <span className="text-3xl font-black text-(--primary)">
          {props.value}
        </span>
        {props.change && (
          <span className="text-xs font-bold text-green-600">
            {props.change}
          </span>
        )}
      </div>
    </div>
  );
}