
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Navbar from "./components/Navbar.jsx";
import Home from "./pages/home.jsx";
import Services from "./pages/Services.jsx";
import ManageServices from "./pages/ManageServices.jsx";
import Orders from "./pages/Orders.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Footer from "./components/Footer.jsx";



function Placeholder({ title }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-3 text-[#6D6254]">This page is coming soon.</p>
    </section>
  );
}


export default function App() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/services")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load services");
        }
        return response.json();
      })
      .then((data) => {
        setServices(data);
        setError("");
      })
      .catch(() => {
        setError("Could not connect to the backend.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-10 text-center">Loading services...</p>;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F8F3E9] text-[#17243A]">
        <Navbar />
        {error && (
          <p className="mx-auto max-w-7xl px-4 py-3 text-center text-red-600">
            {error} Services may be unavailable until the backend is working.
          </p>
        )}

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
