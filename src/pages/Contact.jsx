
import { NavLink } from "react-router-dom";

const contactLinks = [
  {
    name: "WhatsApp",
    detail: "0782351628",
    href: "https://wa.me/93782351628",
    icon: "◉",
    color: "bg-green-500/15 text-green-400",
  },
  {
    name: "Telegram",
    detail: "@MHG078",
    href: "https://t.me/MHG078",
    icon: "➤",
    color: "bg-sky-500/15 text-sky-400",
  },
  {
    name: "Email",
    detail: "mohammadhassang81@gmail.com",
    href: "mailto:mohammadhassang81@gmail.com",
    icon: "✉",
    color: "bg-purple-500/15 text-purple-400",
  },
];

const socialLinks = [
  {
    name: "WhatsApp",
    detail: "Chat with us",
    href: "https://wa.me/93782351628",
    icon: "◉",
    color: "bg-green-500/15 text-green-400",
  },
  {
    name: "Instagram",
    detail: "Follow our page",
    href: "",
    icon: "◎",
    color: "bg-pink-500/15 text-pink-400",
  },
  {
    name: "Telegram",
    detail: "@MHG078",
    href: "https://t.me/MHG078",
    icon: "➤",
    color: "bg-sky-500/15 text-sky-400",
  },
];

function ContactCard({ title, subtitle, items }) {
  return (
    <section className="rounded-3xl border border-[#D6B779]/40 bg-gradient-to-br from-[#0E1D35] to-[#081426] p-6 shadow-xl sm:p-8">
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#E8C77E]">
          STYLE FARDA
        </p>
        <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/60">
          {subtitle}
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => {
          const content = (
            <>
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl ${item.color}`}
              >
                {item.icon}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block font-bold text-white">
                  {index + 1}. {item.name}
                </span>
                <span className="mt-1 block break-words text-sm text-white/60">
                  {item.detail}
                </span>
              </span>

              <span className="text-xl text-[#E8C77E]">↗</span>
            </>
          );

          return item.href ? (
            <a
              key={item.name}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#D6B779]/60 hover:bg-white/10"
            >
              {content}
            </a>
          ) : (
            <div
              key={item.name}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 opacity-80"
            >
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <main className="min-h-screen bg-[#F8F3E9] px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 text-center">
          <p className="font-bold uppercase tracking-[0.35em] text-[#A17A32]">
            We Are Here For You
          </p>

          <h1 className="mt-4 text-4xl font-black text-[#17243A] sm:text-6xl">
            Get In Touch
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#6D6254]">
            Have a question or need a custom outfit?
            Contact us or follow STYLE FARDA on social media.
          </p>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-[#D6B779]" />
        </header>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          <ContactCard
            title="Contact Us"
            subtitle="Choose the best way to contact us directly."
            items={contactLinks}
          />

          <ContactCard
            title="Social Media"
            subtitle="Connect with us and follow our latest styles."
            items={socialLinks}
          />
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-[#6D6254]">
            Thank you for choosing STYLE FARDA.
          </p>
          <NavLink
            to="/services"
            className="mt-4 inline-flex rounded-xl bg-[#17243A] px-6 py-3 font-bold text-white transition hover:bg-[#263B5A]"
          >
            Explore Our Services →
          </NavLink>
        </div>
      </div>
    </main>
  );
}
