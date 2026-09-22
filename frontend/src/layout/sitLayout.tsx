import { useEffect, useState } from "react";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/authContext";
import Footer from "@/pages/footer";

const navLinks = [
  { to: "/vision", label: "Story" },
  { to: "/menu", label: "Menu" },
  { to: "/visit", label: "Visit" },
  { to: "/reserve", label: "Reserve" },
];

export default function SiteLayout() {
  const [isScroll, setIsScroll] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

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

  const textClass = isScroll ? "text-[#242E52]" : "text-white";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

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

        {isAuthenticated && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-full bg-transparent border-none cursor-pointer">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-[#242E52] text-white text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className={`text-sm font-medium ${textClass}`}>
                {user.name}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem onClick={() => navigate("/reserve")}>
                Reserve a table
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/my-reservations")}>
                My reservations
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            to="/login"
            className={`text-sm border rounded-full px-4 py-2 transition-colors duration-300 ${
              isScroll
                ? "border-[#242E52] text-[#242E52] hover:bg-[#242E52] hover:text-white"
                : "border-white text-white hover:bg-white hover:text-[#242E52]"
            }`}
          >
            Sign in
          </Link>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
