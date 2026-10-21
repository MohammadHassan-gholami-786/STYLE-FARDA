
import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Orders", path: "/orders" },
  { name: "Manage Services", path: "/manage-services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#D6B779]/60 bg-[#F8F3E9]/95 shadow-[0_4px_20px_rgba(23,36,58,0.07)] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:py-4">

        {/* Brand */}
        <NavLink
          to="/"
          className="group flex shrink-0 items-center gap-3 self-center lg:self-auto"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#17243A] text-lg font-black text-[#E8C77E] shadow-md transition duration-300 group-hover:rotate-3 group-hover:scale-105">
            SF
          </span>

          <span className="flex flex-col">
            <span className="text-xl font-black tracking-[0.12em] text-[#17243A] sm:text-2xl">
              STYLE FARDA
            </span>
            <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#9A7737] sm:text-[10px]">
              Define Your Style
            </span>
          </span>
        </NavLink>

        {/* Navigation Links */}
        <div className="flex w-full items-center gap-1 overflow-x-auto pb-1 sm:justify-center lg:w-auto lg:justify-end lg:overflow-visible lg:pb-0">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `relative shrink-0 rounded-xl px-3 py-2.5 text-xs font-bold transition-all duration-200 sm:px-4 sm:text-sm ${
                  isActive
                    ? "bg-[#17243A] text-[#E8C77E] shadow-md"
                    : "text-[#17243A]/80 hover:bg-[#E8DCC5] hover:text-[#17243A]"
                }`
              }
            >
              {({ isActive }) => (
                <span className="flex items-center gap-1.5">
                  {link.name}
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E8C77E]" />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </div>

      </nav>
    </header>
  );
}
