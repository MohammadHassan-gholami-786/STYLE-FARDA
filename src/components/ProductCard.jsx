
import { Link } from "react-router-dom";

export default function ProductCard({
  title,
  description,
  image,
  price,
  workdays,
  category,
  accepted = true,
  path = "/orders",
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#D6B779] bg-[#081426] shadow-lg transition duration-500 hover:-translate-y-1 hover:shadow-2xl">
     <div className="flex min-h-60">
        <div className="flex w-[70%] flex-col justify-between bg-gradient-to-r from-[#081426] to-[#0E1D35] p-4 sm:p-7">
          <div>
            <span className="inline-block text-xs font-bold tracking-[0.2em] text-[#E8C77E]">
              STYLE FARDA
            </span>

            <h2 className="mt-3 break-words text-2xl font-black uppercase leading-tight text-white sm:text-4xl">
              {title}
            </h2>

            {category && (
              <p className="mt-2 text-xs font-semibold text-[#E8C77E]">
                {category}
              </p>
            )}

            <p className="mt-3 text-sm leading-6 text-white/80">
              {description}
            </p>

            <span
              className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-bold ${
                accepted
                  ? "bg-green-500/15 text-green-400"
                  : "bg-red-500/15 text-red-400"
              }`}
            >
              {accepted
                ? "Accepting Orders"
                : "Not Accepting Orders"}
            </span>
          </div>

          <div className="mt-6">
            <div className="mb-5 flex flex-wrap gap-2">
              <div className="rounded-xl border border-[#E8C77E]/50 bg-[#0F223D] px-3 py-3">
                <p className="text-[11px] uppercase tracking-wider text-[#E8C77E]">
                  Price
                </p>
                <p className="mt-1 text-base font-black text-white sm:text-lg">
                  {price} AFN
                </p>
              </div>

              <div className="rounded-xl border border-white/20 bg-white/5 px-3 py-3">
                <p className="text-[11px] uppercase tracking-wider text-white/70">
                  Work Time
                </p>
                <p className="mt-1 text-base font-black text-white sm:text-lg">
                  {workdays} Days
                </p>
              </div>
            </div>

            {accepted ? (
              <Link
                to={`/orders?title=${encodeURIComponent(title)}&price=${price}&category=${encodeURIComponent(category || "")}`}
                className="inline-flex items-center rounded-xl bg-[#D6B779] px-4 py-3 text-sm font-bold text-[#081426] transition hover:bg-[#E8C77E]"
              >
                Order Now →
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="cursor-not-allowed rounded-xl bg-gray-500/30 px-4 py-3 text-sm font-bold text-gray-400"
              >
                Orders Unavailable
              </button>
            )}
          </div>
        </div>

        <div className="w-[30%] overflow-hidden bg-white">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
      </div>
    </article>
  );
}
