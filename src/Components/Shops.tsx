"use client";
import { Store, CheckCircle, Clock ,Star } from "lucide-react";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

// --------------------
// Types & Static Data
// --------------------

type Shop = {
  id: string;
  name: string;
  category: "Grocery" | "Pharma" | "Electronics";
  rating: number;
  status: "Open" | "Closed";
};

const DATA: Shop[] = [
  {
    id: "#SH-48291",
    name: "Fresh Mart Central",
    category: "Grocery",
    rating: 4.8,
    status: "Open",
  },
  {
    id: "#SH-48295",
    name: "HealCare Pharmacy",
    category: "Pharma",
    rating: 4.5,
    status: "Closed",
  },
  {
    id: "#SH-48312",
    name: "TechHub Electronics",
    category: "Electronics",
    rating: 4.9,
    status: "Open",
  },
];

// --------------------
// Helpers (UI)
// --------------------

function StatCard({
  title,
  value,
  icon,
  iconBg,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center gap-4 shadow-sm">
      
      {/* Icon Box */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}
      >
        {icon}
      </div>

      {/* Text */}
      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>

    </div>
  );
}


function CategoryBadge({ value }: { value: string }) {
  const map: Record<string, string> = {
    Grocery: "bg-blue-100 text-blue-600",
    Pharma: "bg-purple-100 text-purple-600",
    Electronics: "bg-orange-100 text-orange-600",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${map[value]}`}>
      {value}
    </span>
  );
}

function StatusBadge({ value }: { value: string }) {
  return value === "Open" ? (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
      <span className="w-2 h-2 rounded-full bg-green-500" /> Open
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
      <span className="w-2 h-2 rounded-full bg-red-500" /> Closed
    </span>
  );
}

// --------------------
// Main Component
// --------------------

export default function Shops() {
  const [data] = React.useState(() => [...DATA]);

  const columns = React.useMemo<ColumnDef<Shop>[]>(
    () => [
      {
        accessorKey: "name",
        header: "SHOP NAME",
        cell: ({ row }) => (
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
              🏪
            </div>
            <div>
              <p className="font-semibold text-slate-900">{row.original.name}</p>
              <p className="text-xs text-slate-500">ID: {row.original.id}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: "CATEGORY",
        cell: ({ getValue }) => <CategoryBadge value={getValue() as string} />,
      },
      {
        accessorKey: "rating",
        header: "RATING",
        cell: ({ getValue }) => (
          <div className="flex items-center gap-1 text-amber-500 font-medium">
          <Star size={20}/>   <span className="text-slate-800">{getValue() as number}</span>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "STATUS",
        cell: ({ getValue }) => <StatusBadge value={getValue() as string} />,
      },
      {
        id: "actions",
        header: "ACTIONS",
        cell: () => (
          <button className="text-(--primary) text-sm font-medium hover:underline cursor-pointer">
            Quick Edit
          </button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-10 flex flex-col gap-4">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Shop Management</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage and oversee your platform's vendors.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard
  title="Total Shops"
  value="1,284"
  iconBg="bg-blue-100 text-blue-600"
  icon={<Store size={22} />}
/>

<StatCard
  title="Active Shops"
  value="1,156"
  iconBg="bg-green-100 text-green-600"
  icon={<CheckCircle size={22} />}
/>

<StatCard
  title="Pending Approvals"
  value="12"
  iconBg="bg-yellow-100 text-yellow-600"
  icon={<Clock size={22} />}
/>

      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row gap-6 justify-between">
        <input
          className="w-full sm:w-96 px-5 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary"
          placeholder="Search shops by name or ID..."
        />

        <div className="flex items-center gap-4">
          <select className="px-4 py-3 border border-slate-200 rounded-xl text-sm cursor-pointer">
            <option>All Categories</option>
            <option>Grocery</option>
            <option>Pharma</option>
            <option>Electronics</option>
          </select>

          <button className="bg-blue-600 hover:bg-blue-500 cursor-pointer text-white px-6 py-3 rounded-xl text-sm font-medium transition">
            + Add New Shop
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} className="px-8 py-5 text-left">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-slate-100">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-8 py-6 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>

        {/* Footer / Pagination */}
        <div className="px-8 py-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-sm text-slate-500">
            Showing {table.getRowModel().rows.length} of 1,284 results
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm disabled:opacity-40"
            >
              Previous
            </button>

            {[1, 2, 3].map((n) => (
              <button
                key={n}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${n === 1 ? "bg-primary text-white" : "border border-slate-300"}`}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
