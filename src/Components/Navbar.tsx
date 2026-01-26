export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-(--primary) border-b border-gray-100 shadow-sm ">
      <div className="max-w-360 mx-auto px-6 lg:px-12 h-20 flex items-center justify-between relative">

        {/* Left - Logo + Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="size-10 rounded-lg overflow-hidden">
            <img
              src="/Logo.png"
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>

          <span className="text-xl font-bold tracking-tight text-white">
            NIT
          </span>
        </div>

        {/* Center - Greeting */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <h2 className="text-white text-2xl lg:text-3xl font-bold tracking-tight">
            Hello SIR !!
          </h2>
        </div>

        {/* Right - Logout */}
        <div className="flex items-center gap-4 shrink-0">
          <button className="flex items-center gap-2 py-2 px-2 rounded-lg bg-white hover:bg-white text-black transition-all active:scale-95 shadow-md shadow-(--secondary)/30">
            <span className="text-sm tracking-wide font-bold">
             <i className="fa-solid fa-right-from-bracket"></i> Logout
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}
