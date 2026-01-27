import { LogOut } from "lucide-react";
export default function Navbar() {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 z-50">
      
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <span className="material-icons-round">
            <img src="Logo.png" alt="" />
          </span>
        </div>
        <span className="font-bold text-xl tracking-tight hidden md:block text-white">
          ADMIN PANEL
        </span>
      </div>

      {/* Center */}
      <div className="flex-1 text-center">
        <h1 className="text-lg font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
          Hello Sir
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="flex items-center cursor-pointer gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700">
          <span className="material-icons-round text-lg"><LogOut /></span>
          Logout
        </button>

      </div>

    </header>
  );
}
