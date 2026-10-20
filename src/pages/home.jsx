
import { Link } from "react-router-dom";
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
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="mb-10 text-center">
        <p className="mb-3 font-semibold uppercase tracking-[0.3em] text-[#A17A32]">
          Discover Your Style
        </p>

        <h1 className="text-4xl font-black leading-tight text-[#17243A] sm:text-6xl lg:text-7xl">
          Style the Moment.
          <span className="mt-2 block text-[#A17A32]">
            Be the Trend.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6D6254] sm:text-lg">
          Experience the latest in fashion, every moment.
        </p>
      </section>

      <section className="space-y-6">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard {...product} />

            <div className="mt-3 text-right">
              <Link
                to="/services"
                className="inline-block rounded-full border border-[#D6B779] bg-[#D6B779] px-6 py-2 text-sm font-bold text-[#081426] transition hover:bg-[#081426] hover:text-[#E8C77E]"
              >
                Explore ↗
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
