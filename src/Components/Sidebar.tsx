type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

import {
  LayoutDashboard,
  Store,
  Truck,
  Utensils,
  Users,
  MessageCircle,
  Database,
} from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab }: Props) {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { icon: <Store size={20} />, label: "Shops" },
    { icon: <Truck size={20} />, label: "Delivery Partners" },
    { icon: <Utensils size={20} />, label: "Orders" },
    { icon: <Users size={20} />, label: "Customers" },
    { icon: <MessageCircle size={20} />, label: "Requests" },
    { icon: <Database size={20} />, label: "Database" },
  ];

  return (
    <aside className="w-72 bg-[#0b1530] text-white flex flex-col h-full">

      {/* Navigation */}
      <nav className="py-6 px-4 flex-1 overflow-y-auto flex flex-col gap-2">

        {menuItems.map((item) => {
          const isActive = activeTab === item.label;

          return (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`
                w-full flex items-center gap-4 px-4 py-3 rounded-lg  cursor-pointer
                text-sm font-medium transition-all duration-200
                ${isActive
                  ? "bg-white text-black shadow"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"}
              `}
            >
              {/* Icon */}
              <span
                className={`
                  flex items-center justify-center
                  ${isActive ? "text-black" : "text-slate-400"}
                `}
              >
                {item.icon}
              </span>

              {/* Label */}
              {item.label}
            </button>
          );
        })}

      </nav>
    </aside>
  );
}
