import { NavLink } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";

const products = [
  {
    id: 11,
    title: "Black Hoodie",
    description: "Everyday comfort with a bold, modern streetwear look.",
    price: 900,
    workdays: 3,
    category: "Masculine",
    accepted: false,
    image: "1.png",
  },
  {
    id: 12,
    title: "Elegant Manteau",
    description: "Timeless elegance designed for a confident, graceful style.",
    price: 1800,
    workdays: 5,
    category: "Dresses",
    image: "2.png",
  },
  {
    id: 13,
    title: "Men's Jacket",
    description: "Classic design with a polished finish for everyday wear.",
    price: 2200,
    workdays: 4,
    category: "Masculine",
    accepted: true,
    image: "3.png",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">

      {/* Main Brand Card */}
      <section className="relative mb-12 overflow-hidden rounded-[2rem] bg-[#081426] shadow-xl">

        <div className="grid min-h-[520px] lg:grid-cols-2">

          {/* Brand Information */}
          <div className="relative z-10 flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 lg:py-14">

            <p className="mb-4 font-semibold uppercase tracking-[0.25em] text-[#E8C77E]">
              Welcome to STYLE FARDA
            </p>

            <h1 className="text-4xl font-black leading-tight text-[#F8F3E9] sm:text-5xl lg:text-6xl">
              Style the Moment.
              <span className="mt-2 block text-[#E8C77E]">
                Be the Trend.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-8 text-[#E8E1D5] sm:text-lg">
              Experience the latest in fashion, every moment. Discover
              modern styles designed to express your personality and
              make every moment special.
            </p>

            <div className="mt-7">
              <h2 className="text-xl font-bold text-[#E8C77E]">
                Why Choose Us?
              </h2>

              <p className="mt-3 max-w-lg leading-7 text-[#E8E1D5]">
                We bring you the latest fashion trends and unique styles
                in one place. Our goal is to help you find clothing that
                matches your taste, keeps you up to date, and makes you
                feel confident.
              </p>
            </div>

            <NavLink
              to="/services"
              className="mt-8 inline-flex w-fit items-center rounded-full bg-[#E8C77E] px-7 py-3 font-bold text-[#081426] transition hover:bg-[#F8F3E9]"
            >
              Explore Our Styles <span className="ml-2">↗</span>
            </NavLink>
          </div>

          {/* Fashion Images */}
          <div className="relative min-h-[350px] overflow-hidden bg-[#D6B779] lg:min-h-full">

            <div className="absolute inset-0 bg-gradient-to-br from-[#D6B779] via-[#B99A62] to-[#17243A]" />

            <div className="absolute inset-0 [clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)] lg:[clip-path:polygon(20%_0,100%_0,100%_100%,0_100%)]">

              <img
                src="/1.png"
                alt="Modern hoodie style"
                className="absolute left-[2%] top-[18%] h-[68%] w-[38%] rounded-t-full object-cover object-center shadow-2xl"
              />

              <img
                src="/2.png"
                alt="Elegant manteau style"
                className="absolute left-[33%] top-[7%] h-[84%] w-[38%] rounded-t-full object-cover object-center shadow-2xl"
              />

              <img
                src="/3.png"
                alt="Classic men's jacket"
                className="absolute right-[-2%] top-[20%] h-[68%] w-[35%] rounded-t-full object-cover object-center shadow-2xl"
              />

            </div>

            <div className="absolute bottom-5 right-5 rounded-full border border-white/40 bg-[#081426]/80 px-4 py-2 text-xs font-semibold tracking-wide text-[#F8F3E9] backdrop-blur sm:bottom-8 sm:right-8 sm:text-sm">
              FRESH LOOKS · TIMELESS STYLE
            </div>

          </div>
        </div>
      </section>

      {/* Sample Collection Introduction */}
      <section className="mb-8 rounded-2xl border border-[#D6B779]/60 bg-white/60 px-5 py-6 sm:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#A17A32]">
          A Look at Our Collection
        </p>

        <h2 className="mt-2 text-2xl font-black text-[#17243A] sm:text-3xl">
          Just a Few Examples of Our Styles
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-[#6D6254]">
          The three designs below are only a small sample of the styles
          we offer. They are here to give you an idea of our fashion and
          tailoring options. Explore our Services page to discover more
          designs and find a style that suits you.
        </p>

        <NavLink
          to="/services"
          className="mt-4 inline-flex font-bold text-[#8B6728] underline decoration-[#D6B779] underline-offset-4 transition hover:text-[#17243A]"
        >
          View All Services ↗
        </NavLink>
      </section>

      {/* Featured Sample Products */}
      <section className="space-y-8">

        <div className="mb-5">
          <p className="font-semibold uppercase tracking-[0.2em] text-[#A17A32]">
            Featured Examples
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#17243A] sm:text-4xl">
            The day stayles.
          </h2>
        </div>

        {products.map((product) => (
          <div key={product.id}>
            <ProductCard {...product} />

            <div className="mt-3 text-right">
              <NavLink
                to="/services"
                className="inline-block rounded-full border border-[#D6B779] bg-[#D6B779] px-6 py-2 text-sm font-bold text-[#081426] transition hover:bg-[#081426] hover:text-[#E8C77E]"
              >
                Explore ↗
              </NavLink>
            </div>
          </div>
        ))}

      </section>
    </main>
  );
}
