
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mx-3 mb-3 rounded-2xl border border-[#D6B779]/40 bg-[#081426] px-5 py-5 text-white sm:mx-5 sm:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-5 text-center sm:grid-cols-3 sm:text-left">

        {/* Right: Brand */}
        <div className="sm:order-1 sm:text-left">
          <Link
            to="/"
            className="text-xl font-black tracking-wider text-[#E8C77E]"
          >
            STYLE FARDA
          </Link>
          <p className="mt-1 text-xs italic text-white/55">
            Your Style, Our Passion.
          </p>
        </div>

        {/* Center: Address and Contact */}
        <div className="sm:order-2 sm:text-center">
          <p className="text-xs text-white/65">
            <span className="text-[#E8C77E]">Address:</span>{" "}
            Herat, Afghanistan
          </p>
          <Link
  to="/contact"
  className="mt-2 inline-block rounded-full border border-[#D6B779] bg-[#D6B779] px-5 py-2 text-sm font-bold text-[#081426] transition hover:bg-transparent hover:text-[#E8C77E]"
>
  Contact Us
</Link>


        </div>

        {/* Left: Tailoring Quote */}
        <div className="sm:order-3 sm:text-right">
          <p className="text-sm italic leading-6 text-white/75">
            “Elegance is in every stitch.”
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-widest text-[#D6B779]">
            The Art of Tailoring
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto mt-4 max-w-7xl border-t border-white/10 pt-3 text-center">
        <p className="text-[11px] text-white/40">
          © 2026 STYLE FARDA · All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
