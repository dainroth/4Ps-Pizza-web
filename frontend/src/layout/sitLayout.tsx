import { Outlet, Link, NavLink } from "react-router-dom";

const navLinks = [
  { to: "/vision", label: "Story" },
  { to: "/menu", label: "Menu" },
  { to: "/visit", label: "Visit" },
  { to: "/reserve", label: "Reserve" },
];

export default function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 md:px-12 py-6">
        <Link
          to="/"
          className="font-display text-xl tracking-tight text-[var(--color-ink)]"
        >
          Kravan
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition-colors hover:text-[var(--color-clay)] ${
                  isActive
                    ? "text-[var(--color-clay)]"
                    : "text-[var(--color-ink)]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <Link
          to="/login"
          className="text-sm border border-[var(--color-ink)] rounded-full px-4 py-2 hover:bg-[var(--color-ink)] hover:text-[var(--color-parchment)] transition-colors"
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
