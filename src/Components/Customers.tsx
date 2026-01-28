"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Plus, Download } from "lucide-react";

/* ---------------- TYPES ---------------- */

type Customer = {
  id: string;
  name: string;
  initials?: string;
  avatar?: string;
  phone: string;
  email: string;
  joined: string;
  orders: number;
};

/* ---------------- DATA ---------------- */

const data: Customer[] = [
  {
    id: "99402",
    name: "John Doe",
    initials: "JD",
    phone: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    joined: "Oct 12, 2023",
    orders: 12,
  },
  {
    id: "99395",
    name: "Sarah Williams",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    phone: "+1 (555) 987-6543",
    email: "sarah.w@email.com",
    joined: "Sep 28, 2023",
    orders: 5,
  },
  {
    id: "99382",
    name: "Michael Brown",
    initials: "MB",
    phone: "+1 (555) 444-2222",
    email: "m.brown@provider.net",
    joined: "Sep 15, 2023",
    orders: 24,
  },
  {
    id: "99371",
    name: "Robert Lee",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    phone: "+1 (555) 777-8888",
    email: "robert.lee@webmail.com",
    joined: "Aug 30, 2023",
    orders: 18,
  },
];

/* ---------------- COLUMNS ---------------- */

const columns: ColumnDef<Customer>[] = [
  {
    header: "Customer Profile",
    accessorKey: "name",
    cell: ({ row }) => {
      const c = row.original;
      return (
        <div className="flex items-center gap-3">
          {c.avatar ? (
            <img
              src={c.avatar}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
              {c.initials}
            </div>
          )}
          <div>
            <p className="font-semibold">{c.name}</p>
            <p className="text-xs text-slate-500">ID #{c.id}</p>
          </div>
        </div>
      );
    },
  },
  {
    header: "Contact Number",
    accessorKey: "phone",
    cell: info => <span className="text-slate-600">{info.getValue<string>()}</span>,
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: info => <span className="text-slate-500">{info.getValue<string>()}</span>,
  },
  {
    header: "Date Joined",
    accessorKey: "joined",
  },
  {
    header: "Total Orders",
    accessorKey: "orders",
    cell: info => <span className="font-bold">{info.getValue<number>()} Orders</span>,
  },
  {
    header: "Actions",
    cell: () => (
      <button className="text-primary text-sm font-semibold hover:underline">
        View History
      </button>
    ),
  },
];

/* ---------------- COMPONENT ---------------- */

export default function CustomerManagement() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-h-screen bg-[#f8f6f6] p-8 flex flex-col gap-8">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black tracking-tight">
            Customer Management
          </h1>
          <p className="text-slate-500 mt-1">
            Review and manage your user base activity and history.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-(--primary) cursor-pointer text-white px-4 py-2 rounded-lg font-bold hover:bg-primary/90 transition">
          <Plus size={16} /> Add Customer
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Customers" value="12,450" growth="+5.2%" />
        <StatCard title="New This Week" value="120" growth="+12.4%" />
        <StatCard title="Total Items Ordered" value="45,892" growth="+8.1%" />
      </div>

      {/* FILTER BAR */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center">
        <select className="px-4 py-2 rounded-lg bg-slate-50 text-sm cursor-pointer">
          <option>Filter by Orders</option>
          <option>Most Orders</option>
          <option>Least Orders</option>
        </select>

        <button className="flex items-center  gap-2 px-4 cursor-pointer py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-sm font-semibold">
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl cursor-pointer shadow-[0_12px_40px_rgba(16,24,40,0.06)] p-4">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            {table.getHeaderGroups().map(group => (
              <tr key={group.id}>
                {group.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-xs uppercase tracking-wider text-slate-500 text-left"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                className="
                  bg-slate-50
                  even:bg-slate-100/60
                  rounded-xl
                  shadow-[0_2px_12px_rgba(16,24,40,0.06)]
                  hover:bg-white
                  hover:shadow-[0_6px_22px_rgba(16,24,40,0.12)]
                  transition
                "
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 text-sm first:rounded-l-xl last:rounded-r-xl"
                  >
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

        {/* FOOTER */}
        <div className="flex justify-between items-center mt-6 px-2">
          <span className="text-sm text-slate-500">
            Showing 1–4 of 12,450 results
          </span>

          <div className="flex gap-2 ">
            <button className="h-9 w-9 rounded-lg hover:bg-slate-100">‹</button>
            <button className="h-9 w-9 rounded-lg bg-(--primary) text-white font-bold">1</button>
            <button className="h-9 w-9 rounded-lg hover:bg-slate-100">2</button>
            <button className="h-9 w-9 rounded-lg hover:bg-slate-100">3</button>
            <span className="text-slate-400">…</span>
            <button className="h-9 w-9 rounded-lg hover:bg-slate-100">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- STAT CARD ---------------- */

function StatCard({
  title,
  value,
  growth,
}: {
  title: string;
  value: string;
  growth: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm flex justify-between items-start">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-black">{value}</p>
      </div>
      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
        {growth}
      </span>
    </div>
  );
}