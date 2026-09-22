import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f5ef] px-6 py-25 md:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-104px)] max-w-5xl items-center justify-center">
        <div className="relative w-full overflow-hidden rounded-[28px] border border-[#242E52]/10 bg-white px-8 py-14 text-center shadow-[0_20px_60px_rgba(36,46,82,0.08)] sm:px-12 md:py-20">
          <div className="absolute -left-28 -top-28 h-72 w-72 rounded-full border border-[#242E52]/5" />
          <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full border border-[#242E52]/5" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#242E52]/40">
              404 • Page not found
            </span>

            <div className="mx-auto mt-6 flex justify-center">
              <img
                src="/assets/404.gif"
                alt="Page not found"
                className="h-48 w-auto object-contain sm:h-56 md:h-64"
              />
            </div>

            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-[#242E52] sm:text-5xl md:text-6xl">
              The page you try to find does not exist!
            </h1>

            <div className="mx-auto mt-6 h-px w-12 bg-[#242E52]/20" />

            <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-[#242E52]/55 sm:text-base">
              Looks like you wandered somewhere we haven't set up yet. Let's get
              you back to somewhere familiar.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/"
                className="w-full rounded-xl bg-[#242E52] px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#02499D] hover:shadow-lg hover:shadow-[#242E52]/15 sm:w-auto"
              >
                Back to home
              </Link>

              <Link
                to="/reserve"
                className="w-full rounded-xl border border-[#242E52]/15 px-7 py-3.5 text-sm font-bold text-[#242E52] transition-all duration-300 hover:border-[#242E52]/30 hover:bg-[#f8f5ef] sm:w-auto"
              >
                Make a reservation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
