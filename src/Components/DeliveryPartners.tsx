'use client';
import { Filter } from 'lucide-react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

// --------------------
// Types
// --------------------

type Partner = {
  id: string;
  name: string;
  avatar: string;
  deliveries: number;
  vehicle: string;
  status: 'Available' | 'On Delivery' | 'Offline';
};

// --------------------
// Static Data
// --------------------

const data: Partner[] = [
  {
    id: 'DP-9402',
    name: 'Marcus Thompson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    deliveries: 1242,
    vehicle: 'Electric Bike',
    status: 'Available',
  },
  {
    id: 'DP-8812',
    name: 'Elena Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    deliveries: 842,
    vehicle: 'Motorcycle',
    status: 'On Delivery',
  },
  {
    id: 'DP-1209',
    name: 'David Chen',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    deliveries: 1095,
    vehicle: 'Van',
    status: 'Offline',
  },
];

// --------------------
// Status Badge
// --------------------

function StatusBadge({ status }: { status: Partner['status'] }) {
  if (status === 'Available')
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-green-600" /> Available
      </span>
    );

  if (status === 'On Delivery')
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> On Delivery
      </span>
    );

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" /> Offline
    </span>
  );
}

// --------------------
// Columns
// --------------------

const columns: ColumnDef<Partner>[] = [
  {
    id: 'select',
    header: () => <input type="checkbox" className="rounded" />,
    cell: () => <input type="checkbox" className="rounded" />,
  },
  {
    header: 'Partner',
    accessorKey: 'name',
    cell: ({ row }) => {
      const p = row.original;
      return (
        <div className="flex items-center gap-3">
          <img
            src={p.avatar}
            className="w-10 h-10 rounded-full "
            alt={p.name}
          />
          <div>
            <p className="text-sm font-semibold text-slate-900">{p.name}</p>
            <p className="text-xs text-slate-500">ID: {p.id}</p>
          </div>
        </div>
      );
    },
  },
  {
    header: 'Total Deliveries',
    accessorKey: 'deliveries',
  },
  {
    header: 'Vehicle Type',
    accessorKey: 'vehicle',
    cell: info => <span className="text-slate-500">{info.getValue<string>()}</span>,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: info => <StatusBadge status={info.getValue<Partner['status']>()} />,
  },
  {
    header: 'Action',
    cell: () => (
      <button className="text-blue-600 hover:underline text-sm font-semibold">
        Manage Partner
      </button>
    ),
  },
];

// --------------------
// Component
// --------------------

export default function DeliveryPartnersProfessional() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col gap-8">

      {/* Title Section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Delivery Partners</h1>
        <p className="text-slate-500 mt-1">
          Monitor partner availability, operational status, and fleet performance.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Active Partners" value="1,248" color="green" subtitle="Full fleet capacity" />
        <StatCard title="Available Now" value="384" color="green" subtitle="Ready for dispatch" />
        <StatCard title="On Delivery" value="812" color="blue" subtitle="Currently in transit" />
        <StatCard title="Inactive" value="52" color="red" subtitle="Offline or break" />
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl  shadow-sm p-4 flex flex-wrap gap-4 justify-between">
        <div className="flex gap-3">
          <input
            placeholder="Search partner..."
            className="px-4 py-2 border rounded-lg w-64 text-sm"
          />
          <button className="px-4 py-2  rounded-lg text-sm"><Filter size={20} color='gray'/></button>
        </div>
        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">
          + Add New Delivery Partner
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl  shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-slate-500">
              {table.getHeaderGroups().map(group => (
                <tr key={group.id}>
                  {group.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-left"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-slate-50 transition">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 -t bg-white">
          <p className="text-sm text-slate-500">Showing 1 to 3 of 1,248 results</p>

          <div className="flex items-center gap-2">
            <button className="h-9 w-9  rounded-lg">‹</button>
            <button className="h-9 w-9 bg-blue-600 text-white rounded-lg">1</button>
            <button className="h-9 w-9  rounded-lg">2</button>
            <button className="h-9 w-9  rounded-lg">3</button>
            <span className="text-slate-400">…</span>
            <button className="h-9 w-9  rounded-lg">416</button>
            <button className="h-9 w-9  rounded-lg">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------
// Small Stat Card Component
// --------------------

function StatCard({
  title,
  value,
  subtitle,
  color,
}: {
  title: string;
  value: string;
  subtitle: string;
  color: 'green' | 'blue' | 'red';
}) {
  const colorMap = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    red: 'text-red-600',
  };

  return (
    <div className="bg-white  rounded-xl p-6 shadow-sm flex flex-col gap-2">
      <p className="text-xs uppercase tracking-wider text-slate-500 font-medium">
        {title}
      </p>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
      <p className={`text-sm font-semibold ${colorMap[color]}`}>{subtitle}</p>
    </div>
  );
}
