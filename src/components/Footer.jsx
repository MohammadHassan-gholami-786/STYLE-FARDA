import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mx-3 mb-3 rounded-2xl border border-[#D6B779]/40 bg-[#081426] px-5 py-6 text-white sm:mx-5 sm:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 text-center sm:grid-cols-3 sm:text-left">

        {/* Brand */}
        <div>
          <NavLink
            to="/"
            className="text-xl font-black tracking-wider text-[#E8C77E]"
          >
            STYLE FARDA
          </NavLink>

          <p className="mt-2 text-xs italic text-white/60">
            Your Style, Our Passion.
          </p>

          <p className="mt-2 text-sm leading-6 text-white/70">
            Elegant designs, quality tailoring, and a style made for you.
          </p>
        </div>

        {/* Contact */}
        <div className="sm:text-center">
          <h3 className="text-base font-bold text-[#E8C77E]">
            Contact Us
          </h3>

          <p className="mt-2 text-xs text-white/65">
            Address: Herat, Afghanistan
          </p>

          <NavLink
            to="/contact"
            className="mt-3 inline-block rounded-full border border-[#D6B779] bg-[#D6B779] px-5 py-2 text-sm font-bold text-[#081426] transition hover:bg-transparent hover:text-[#E8C77E]"
          >
            Contact Us
          </NavLink>

          <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm sm:justify-center">
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="text-white/75 transition hover:text-[#E8C77E]"
            >
              WhatsApp
            </a>

            <a
              href="https://t.me/"
              target="_blank"
              rel="noreferrer"
              className="text-white/75 transition hover:text-[#E8C77E]"
            >
              Telegram
            </a>

            <a
              href="mailto:"
              className="text-white/75 transition hover:text-[#E8C77E]"
            >
              Email
            </a>
          </div>
        </div>

        {/* Tailoring Quote */}
        <div className="sm:text-right">
          <p className="text-sm italic leading-6 text-white/75">
            “Elegance is in every stitch.”
          </p>

          <p className="mt-2 text-[10px] uppercase tracking-widest text-[#D6B779]">
            The Art of Tailoring
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto mt-5 max-w-7xl border-t border-white/10 pt-4 text-center">
        <p className="text-[11px] text-white/45">
          © 2026 STYLE FARDA · All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
