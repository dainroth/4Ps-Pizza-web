import { useEffect, useState } from "react";
import {
  Outlet,
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/authContext";
import Footer from "@/pages/footer";
import { CalendarCheck, CalendarPlus, ChevronDown, LogOut } from "lucide-react";

const navLinks = [
  { to: "/#story", label: "Story" },
  { to: "/#menu", label: "Menu" },
  { to: "/#visit", label: "Visit" },
  { to: "/reserve", label: "Reserve" },
];
export default function SiteLayout() {
  const [isScroll, setIsScroll] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    if (location.pathname !== "/") return;

    const hash = location.hash;

    if (!hash) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    // Wait for Home sections to render
    const timer = setTimeout(() => {
      const section = document.querySelector(hash);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  const isHomePage = location.pathname === "/";
  const showLightNavbar = isScroll || !isHomePage;

  const textClass = showLightNavbar ? "text-[#242E52]" : "text-white";

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
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 transition-all duration-300 md:px-12 ${
          showLightNavbar
            ? "border-b border-[#242E52]/10 bg-[var(--color-cream)]/90 shadow-sm backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <Link
          to="/"
          className={`font-display text-xl tracking-widest transition-colors duration-300 ${textClass}`}
        >
          PIZZA 4P'S
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition-colors duration-300 hover:text-[#02499D] ${textClass}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {isAuthenticated && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button
                className={`flex items-center cursor-pointer gap-2 rounded-full px-2 py-1.5 transition-colors hover:bg-black/5 ${
                  textClass
                }`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-[#242E52] text-white text-xs font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <span className="text-sm font-medium">{user.name}</span>

                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-64 rounded-2xl p-2 shadow-lg"
            >
              {/* User info */}
              <div className="flex items-center gap-3 px-3 py-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-[#242E52] text-white font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#242E52]">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">Welcome back!</p>
                </div>
              </div>

              <DropdownMenuSeparator />

              {/* Navigation */}
              <div className="py-1">
                <DropdownMenuItem
                  onClick={() => navigate("/reserve")}
                  className="cursor-pointer rounded-xl px-3 py-2.5"
                >
                  <CalendarPlus className="mr-3 h-4 w-4 text-[#242E52]" />
                  <div className="flex flex-col">
                    <span className="font-medium">Reserve a table</span>
                    <span className="text-xs text-muted-foreground">
                      Book your next visit
                    </span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate("/my-reservations")}
                  className="cursor-pointer rounded-xl px-3 py-2.5"
                >
                  <CalendarCheck className="mr-3 h-4 w-4 text-[#242E52]" />
                  <div className="flex flex-col">
                    <span className="font-medium">My reservations</span>
                    <span className="text-xs text-muted-foreground">
                      View your bookings
                    </span>
                  </div>
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator />

              {/* Sign out */}
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer rounded-xl px-3 py-2.5 text-red-600 focus:bg-red-50 focus:text-red-600"
              >
                <LogOut className="mr-3 h-4 w-4" />
                <span className="font-medium">Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            to="/login"
            className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
              showLightNavbar
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
