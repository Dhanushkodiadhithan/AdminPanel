type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function Sidebar({ activeTab, setActiveTab }: Props) {
  const menuItems = [
    { icon: <i className="fa-solid fa-chart-line"></i>, label: "Dashboard" },
    { icon: <i className="fa-solid fa-shop"></i>, label: "Shops" },
    { icon: <i className="fa-solid fa-people-carry-box"></i>, label: "Delivery Partners" },
    { icon: <i className="fa-solid fa-utensils"></i>, label: "Orders" },
    { icon: <i className="fa-solid fa-user-group"></i>, label: "Customers" },
    { icon: <i className="fa-solid fa-comments"></i>, label: "Requests" },
    { icon: <i className="fa-solid fa-database"></i>, label: "Database" },
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
                w-full flex items-center gap-4 px-4 py-3 rounded-lg 
                text-sm font-medium transition-all duration-200
                ${isActive
                  ? "bg-white text-black shadow"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"}
              `}
            >
              <span
                className={`text-lg ${isActive ? "text-black" : "text-slate-400"}`}
              >
                {item.icon}
              </span>

              {item.label}
            </button>
          );
        })}

      </nav>
    </aside>
  );
}
