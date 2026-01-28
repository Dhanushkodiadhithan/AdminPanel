'use client';

import { Filter } from 'lucide-react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

/* --------------------
   Types
-------------------- */

type Partner = {
  id: string;
  name: string;
  avatar: string;
  deliveries: number;
  vehicle: string;
  status: 'Available' | 'On Delivery' | 'Offline';
};

/* --------------------
   Static Data
-------------------- */

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

/* --------------------
   Status Badge
-------------------- */

function StatusBadge({ status }: { status: Partner['status'] }) {
  const base =
    'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold';

  if (status === 'Available')
    return (
      <span className={`${base} bg-green-100 text-green-700`}>
        <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
        Available
      </span>
    );

  if (status === 'On Delivery')
    return (
      <span className={`${base} bg-(--primary)/10 text-(--primary)`}>
        <span className="w-1.5 h-1.5 rounded-full bg-(--primary)" />
        On Delivery
      </span>
    );

  return (
    <span className={`${base} bg-slate-100 text-slate-600`}>
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
      Offline
    </span>
  );
}

/* --------------------
   Columns
-------------------- */

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
            className="w-10 h-10 rounded-full"
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
    cell: info => (
      <span className="text-slate-500">{info.getValue<string>()}</span>
    ),
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: info => (
      <StatusBadge status={info.getValue<Partner['status']>()} />
    ),
  },
  {
    header: 'Action',
    cell: () => (
      <button className="text-(--primary) hover:underline text-sm font-semibold">
        Manage Partner
      </button>
    ),
  },
];

/* --------------------
   Component
-------------------- */

export default function DeliveryPartnersProfessional() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col gap-8">

      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Delivery Partners
        </h1>
        <p className="text-slate-500 mt-1">
          Monitor partner availability, operational status, and fleet performance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Active Partners" value="1,248" subtitle="Full fleet capacity" />
        <StatCard title="Available Now" value="384" subtitle="Ready for dispatch" />
        <StatCard title="On Delivery" value="812" subtitle="Currently in transit" />
        <StatCard title="Inactive" value="52" subtitle="Offline or break" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap gap-4 justify-between">
        <div className="flex gap-3">
          <input
            placeholder="Search partner..."
            className="px-4 py-2 border rounded-lg w-64 text-sm focus:outline-none focus:ring-2 focus:ring-(--primary)/30"
          />
          <button className="px-4 py-2 rounded-lg hover:bg-slate-100 transition">
            <Filter size={18} className="text-slate-500" />
          </button>
        </div>

        <button
          className="
            px-5 py-2
            bg-(--primary) text-white
            rounded-lg text-sm font-semibold
            shadow shadow-(--primary)/30
            hover:opacity-90 cursor-pointer
            transition
          "
        >
          + Add New Delivery Partner
        </button>
      </div>
{/* Table */}
<div className="bg-white rounded-2xl shadow-sm p-4 cursor-pointer">
  <div className="overflow-x-auto">
    <table className="w-full border-separate border-spacing-y-3">
      <thead>
        {table.getHeaderGroups().map(group => (
          <tr key={group.id}>
            {group.headers.map(header => (
              <th
                key={header.id}
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 text-left"
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
              hover:bg-white
              transition
              rounded-xl
              shadow-[0_2px_10px_rgba(16,24,40,0.06)]
              hover:shadow-[0_6px_20px_rgba(16,24,40,0.10)]
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
  </div>

  {/* Footer */}
  <div className="flex items-center justify-between px-6 py-4 mt-4">
    <p className="text-sm text-slate-500">
      Showing 1 to 3 of 1,248 results
    </p>

    <div className="flex items-center gap-2">
      <button className="h-9 w-9 rounded-lg hover:bg-slate-100">‹</button>
      <button className="h-9 w-9 bg-(--primary) text-white rounded-lg font-semibold">
        1
      </button>
      <button className="h-9 w-9 rounded-lg hover:bg-slate-100">2</button>
      <button className="h-9 w-9 rounded-lg hover:bg-slate-100">3</button>
      <span className="text-slate-400">…</span>
      <button className="h-9 w-9 rounded-lg hover:bg-slate-100">416</button>
      <button className="h-9 w-9 rounded-lg hover:bg-slate-100">›</button>
    </div>
  </div>
</div>
        
      </div>
  );
}

/* --------------------
   Stat Card
-------------------- */

function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-2">
      <p className="text-xs uppercase tracking-wider text-slate-500 font-medium">
        {title}
      </p>
      <p className="text-3xl font-bold text-(--primary)">{value}</p>
      <p className="text-sm font-semibold text-slate-600">{subtitle}</p>
    </div>
  );
}