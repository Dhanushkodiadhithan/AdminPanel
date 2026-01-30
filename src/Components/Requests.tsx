"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {MapPin } from "lucide-react";
type Request = {
  name: string;
  type: string;
  business: string;
  contact: string;
  time: string;
  location: string;
};

const data: Request[] = [
  {
    name: "Premium Fish Hub",
    type: "Shop",
    business: "Fish",
    contact: "+1 234 567 890",
    time: "2h ago",
    location: "MAP",
  },
  {
    name: "Chicken Corner",
    type: "Shop",
    business: "Chicken",
    contact: "contact@chicken.com",
    time: "5h ago",
    location: "MAP",
  },
  {
    name: "Mutton Masters",
    type: "Shop",
    business: "Mutton",
    contact: "+1 987 654 321",
    time: "1d ago",
    location: "MAP",
  },
  {
    name: "Daily Fresh Meat",
    type: "Shop",
    business: "Chicken",
    contact: "support@fresh.com",
    time: "3d ago",
    location: "MAP",
  },
  {
    name: "John Delivery Service",
    type: "Partner",
    business: "N/A",
    contact: "+1 555 0199",
    time: "4h ago",
    location: "MAP",
  },
];

const columns: ColumnDef<Request>[] = [
  {
    accessorKey: "name",
    header: "REQUESTER NAME",
  },
  {
    accessorKey: "type",
    header: "REQUEST TYPE",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return (
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium
          ${
            value === "Shop"
              ? "bg-blue-100 text-blue-700"
              : "bg-purple-100 text-purple-700"
          }`}
        >
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: "business",
    header: "BUSINESS TYPE",
  },
  {
    accessorKey: "contact",
    header: "CONTACT INFO",
  },
  {
    accessorKey: "time",
    header: "TIME",
  },
  {
    accessorKey: "location",
    header: "LOCATION",
    cell: () => (
      <button className="text-sky-600 flex gap-1 items-center font-medium hover:underline cursor-pointer">
       <MapPin/> <span>MAP</span>
      </button>
    ),
  },
  {
    id: "actions",
    header: "ACTIONS",
    cell: () => (
      <div className="flex gap-3 justify-end">
        <button className="bg-sky-600 text-white px-4 py-1.5 rounded-md text-sm shadow hover:bg-sky-700">
          Approve
        </button>
        <button className="bg-slate-100 px-4 py-1.5 rounded-md text-sm shadow hover:bg-slate-200">
          Reject
        </button>
      </div>
    ),
  },
];

export default function Reviews() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-slate-100/60 min-h-screen p- flex flex-col gap-8 p-8">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Onboarding Requests</h1>
        <p className="text-slate-500 mt-1">
          Manage pending applications for shops, partners, and support
          inquiries.
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
        <table className="w-full text-left cursor-pointer">
          {/* Header */}
          <thead className="bg-slate-50/70 text-slate-500 text-xs uppercase">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} className="px-6 py-4 font-semibold">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Body */}
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-slate-50 hover:shadow-sm transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-6 text-sm">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex justify-between items-center px-6 py-4 bg-slate-50/50 shadow-inner">
          <p className="text-sm text-slate-500">
            Showing <b>5</b> of <b>12</b> requests
          </p>

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white cursor-pointer shadow rounded-md text-sm">
              Previous
            </button>
            <button className="px-4 py-2 bg-white shadow rounded-md  cursor-pointer text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
