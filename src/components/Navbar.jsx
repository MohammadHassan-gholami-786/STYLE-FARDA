
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
    <header className="sticky top-0 z-50 border-b border-[#D6B779] bg-[#F8F3E9]/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <NavLink
          to="/"
          className="shrink-0 text-xl font-black tracking-wide text-[#17243A] sm:text-2xl"
        >
          STYLE FARDA
        </NavLink>

        <div className="flex min-w-0 items-center gap-1 overflow-x-auto whitespace-nowrap">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-[#17243A] text-white"
                    : "text-[#17243A] hover:bg-[#E8DCC5]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
