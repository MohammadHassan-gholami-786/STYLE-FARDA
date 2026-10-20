
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/home.jsx";
import Services from "./pages/Services.jsx";
import ManageServices from "./pages/ManageServices.jsx";
import Orders from "./pages/Orders.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Footer from "./components/Footer.jsx";

const initialServices = [
  {
    id: 1,
    title: "Formal Manto",
    price: 800,
    workdays: 4,
    category: "Dresses",
    accepted: true,
    image: "woman1.png",
  },
  {
    id: 2,
    title: "Simple Manto",
    price: 850,
    workdays: 4,
    category: "Dresses",
    accepted: true,
    image: "woman2.png",
  },
  {
    id: 3,
    title: "Girle Dress",
    price: 1000,
    workdays: 5,
    category: "Dresses",
    accepted: true,
    image: "woman3.png",
  },
  {
    id: 4,
    title: "White Dress",
    price: 700,
    workdays: 5,
    category: "Dresses",
    accepted: false,
    image: "woman4.png",
  },
  {
    id: 5,
    title: "Black Uniform",
    price: 650,
    workdays: 4,
    category: "Masculine",
    accepted: true,
    image: "black_suit.jpg",
  },
  {
    id: 6,
    title: "Uniform Tailoring",
    price: 850,
    workdays: 5,
    category: "Masculine",
    accepted: true,
    image: "white_suit.jpg",
  },
  {
    id: 7,
    title: "Blue T-shirt",
    price: 500,
    workdays: 3,
    category: "Masculine",
    accepted: true,
    image: "blue_t-shirt.png",
  },
  {
    id: 8,
    title: "White T-shirt",
    price: 500,
    workdays: 1,
    category: "Masculine",
    accepted: false,
    image: "white_t-shirt.jpg",
  },
  {
    id: 9,
    title: "White Hoodie",
    price: 500,
    workdays: 1,
    category: "Masculine",
    accepted: true,
    image: "hodi1.png",
  },
  {
    id: 10,
    title: "Black Hoodie",
    price: 700,
    workdays: 3,
    category: "Masculine",
    accepted: false,
    image: "hodi3.png",
  },
  {
    id: 11,
    title: "Black Hoodie",
    price: 900,
    workdays: 3,
    category: "Masculine",
    accepted: false,
    image: "1.png",
  },
  {
    id: 12,
    title: "Elegant Manteau",
    price: 1800,
    workdays: 5,
    category: "Dresses",
    accepted: false,
    image: "2.png",
  },
  {
    id: 13,
    title: "Men's Jacket",
    price: 2200,
    workdays: 4,
    category: "Masculine",
    accepted: false,
    image: "3.png",
  },
  {
    id: 14,
    title: "Clothing Repairs",
    price: 150,
    workdays: 1,
    category: "Repairs",
    accepted: false,
    image: "work.png",
  },
];

function Placeholder({ title }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-3 text-[#6D6254]">This page is coming soon.</p>
    </section>
  );
}

export default function App() {
  const [services, setServices] = useState(initialServices);

 return (
  <BrowserRouter>
    <div className="min-h-screen bg-[#F8F3E9] text-[#17243A]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/services"
          element={<Services services={services} />}
        />

        <Route
          path="/manage-services"
          element={
            <ManageServices
              services={services}
              setServices={setServices}
            />
          }
        />

        <Route
          path="/orders"
          element={<Orders services={services} />}
        />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </div>
  </BrowserRouter>
);
}
