
import { useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

export default function Services({ services }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortPrice, setSortPrice] = useState("default");
  const [acceptedOnly, setAcceptedOnly] = useState(false);

  const categories = [
    "All",
    ...new Set(services.map((service) => service.category)),
  ];

  const filteredServices = services
    .filter((service) => {
      const matchesSearch = service.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || service.category === category;

      const matchesAvailability =
        !acceptedOnly || service.accepted;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAvailability
      );
    })
    .sort((a, b) => {
      if (sortPrice === "low") return a.price - b.price;
      if (sortPrice === "high") return b.price - a.price;
      return 0;
    });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <section className="mb-10 text-center">
        <p className="font-semibold uppercase tracking-[0.3em] text-[#A17A32]">
          Made with Care
        </p>

        <h1 className="mt-3 text-4xl font-black text-[#17243A] sm:text-5xl">
          Our Tailoring Services
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-[#6D6254]">
          Custom tailoring, clothing, and repair services.
        </p>
      </section>

      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search services..."
          aria-label="Search services"
          className="rounded-xl border border-[#D6B779] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#D6B779]"
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="Filter by category"
          className="rounded-xl border border-[#D6B779] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#D6B779]"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={sortPrice}
          onChange={(event) => setSortPrice(event.target.value)}
          aria-label="Sort by price"
          className="rounded-xl border border-[#D6B779] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#D6B779]"
        >
          <option value="default">Default Order</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </section>

      <label className="mb-8 flex cursor-pointer items-center gap-3 text-sm font-medium text-[#17243A]">
        <input
          type="checkbox"
          checked={acceptedOnly}
          onChange={(event) => setAcceptedOnly(event.target.checked)}
          className="h-4 w-4 accent-[#A17A32]"
        />
        Show only services accepting orders
      </label>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filteredServices.map((service) => (
          <ProductCard
            key={service.id}
            title={service.title}
            description={service.description}
            image={service.image}
            price={service.price}
            workdays={service.workdays}
            category={service.category}
            accepted={service.accepted}
          />
        ))}
      </section>

      {filteredServices.length === 0 && (
        <p className="py-12 text-center text-[#6D6254]">
          No services found.
        </p>
      )}
    </main>
  );
}
