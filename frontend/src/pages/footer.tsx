import { Link } from "react-router-dom";
// import { Instagram, Youtube, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="  bg-[#f8f4ee] px-8 py-14 text-[#242E52] md:px-12">
      <div className="mx-auto max-w-full">
        <div className=" border-t border-t-[#242E52] pt-10" />
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1fr_1fr]">
          {/* Logo */}
          <div className="flex items-start">
            <Link
              to="/"
              className="font-display text-3xl font-bold tracking-[0.15em]"
            >
              <img
                src="https://a0f3c3-d9.myshopify.com/cdn/shop/files/4Ps_Logo_Indigo.png?v=1741591768&width=600"
                alt=""
                className="h-20 w-auto"
              />
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-5 text-xl">
            <Link to="#" className="transition-opacity hover:opacity-60">
              Company Profile
            </Link>

            <Link to="#" className="transition-opacity hover:opacity-60">
              Privacy Policy
            </Link>

            <Link to="#" className="transition-opacity hover:opacity-60">
              Career
            </Link>
          </div>

          <div>
            <p className="mb-5 font-serif text-2xl">Follow Us!</p>

            <div className="flex items-center gap-7">
              <a
                href="#"
                aria-label="YouTube"
                className="transition-opacity hover:opacity-60"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-current"
                >
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="transition-opacity hover:opacity-60"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-none stroke-current"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="transition-opacity hover:opacity-60"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-current"
                >
                  <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7A10 10 0 0 0 22 12.06c0-5.53-4.5-10.02-10-10.02Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-24 flex flex-col gap-6 text-sm md:flex-row md:items-center md:justify-between">
          {/* Contact */}
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-12">
            <p>
              <span className="mr-3 font-bold">For Inquiry</span>
              info@pizza4ps.com
            </p>

            <p>
              <span className="mr-3 font-bold">For Feedback</span>
              feedback@pizza4ps.com
            </p>
          </div>

          {/* Copyright */}
          <p className="text-[#242E52]/80">
            &copy; {new Date().getFullYear()} Pizza 4Ps
          </p>
        </div>
      </div>
    </footer>
  );
}
