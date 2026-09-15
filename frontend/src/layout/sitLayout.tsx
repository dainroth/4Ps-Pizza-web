import { useEffect, useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";

const navLinks = [
  { to: "/vision", label: "Story" },
  { to: "/menu", label: "Menu" },
  { to: "/visit", label: "Visit" },
  { to: "/reserve", label: "Reserve" },
];

export default function SiteLayout() {
  const [isScroll, setIsScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textClass = isScroll ? "text-[var(--color-ink)]" : "text-white";
  return (
    <div className="min-h-screen flex flex-col">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex items-center justify-between px-6 md:px-12 py-6 ${
          isScroll
            ? "bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <Link
          to="/"
          className={`font-display text-xl tracking-widest transition-colors duration-300 ${textClass}`}
        >
          PIZZA 4P'S
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition-colors duration-300 hover:text-[#02499D] ${
                  isActive ? "text-[#02499D]" : textClass
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/login"
          className={`text-sm border rounded-full px-4 py-2 transition-colors duration-300 ${
            isScroll
              ? "border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-parchment)]"
              : "border-white text-white hover:bg-white hover:text-black"
          }`}
        >
          Sign in
        </Link>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="px-6 md:px-12 py-10 border-t border-[var(--color-ink)]/10 text-sm flex flex-col md:flex-row md:justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} Kravan. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/visit" className="hover:text-[var(--color-clay)]">
            Find us
          </Link>
          <a href="#" className="hover:text-[var(--color-clay)]">
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
}
