import { NavLink } from "react-router-dom";

export default function About() {
  return (
    <main className="min-h-screen bg-[#F8F3E9] px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 text-center">
          <p className="font-bold uppercase tracking-[0.35em] text-[#A17A32]">
            Our Story
          </p>

          <h1 className="mt-4 text-4xl font-black text-[#17243A] sm:text-6xl">
            About STYLE FARDA
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#6D6254]">
            Discover our passion for fashion, quality tailoring, and creating
            outfits that match your unique style.
          </p>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-[#D6B779]" />
        </header>

        <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-3xl bg-gradient-to-br from-[#0E1D35] to-[#081426] p-7 shadow-xl sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#E8C77E]">
              Who We Are
            </p>

            <h2 className="mt-4 text-3xl font-black text-white">
              Fashion Made for You
            </h2>

            <p className="mt-5 leading-8 text-white/75">
              STYLE FARDA is a tailoring service focused on helping customers
              find and order clothing that suits their needs. We value
              creativity, careful workmanship, and a personal approach to
              every order.
            </p>
          </div>

          <div className="rounded-3xl border border-[#D6B779]/50 bg-white p-7 shadow-lg sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#A17A32]">
              Our Mission
            </p>

            <h2 className="mt-4 text-3xl font-black text-[#17243A]">
              Quality and Care
            </h2>

            <p className="mt-5 leading-8 text-[#6D6254]">
              Our mission is to provide a simple and reliable way to request
              tailoring services. We aim to make every step clear, from
              choosing a service to tracking an order.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-[#D6B779]/40 bg-[#17243A] p-7 text-center shadow-xl sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#E8C77E]">
            Why Choose Us?
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <span className="text-3xl">✂️</span>
              <h3 className="mt-3 text-lg font-bold text-white">
                Careful Work
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Attention to detail in every order.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <span className="text-3xl">◇</span>
              <h3 className="mt-3 text-lg font-bold text-white">
                Personal Style
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Services designed around your preferences.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <span className="text-3xl">✓</span>
              <h3 className="mt-3 text-lg font-bold text-white">
                Clear Process
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Simple ordering and order status updates.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}