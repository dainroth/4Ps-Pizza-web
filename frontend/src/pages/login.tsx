import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "@/lib/auth";
import { useAuth } from "@/context/authContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const data = await loginUser(form.email, form.password);

      if (data.success && data.token && data.user) {
        login(data.token, data.user);
        navigate("/reserve");
      } else {
        setMessage(data.message || "Unable to log in.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f5ef] px-6 py-18 md:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-104px)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[28px] border border-[#242E52]/10 bg-white shadow-[0_20px_60px_rgba(36,46,82,0.08)] md:grid-cols-2">
          <div className="relative hidden min-h-[600px] overflow-hidden bg-[#242E52] p-10 text-white md:flex md:flex-col md:justify-between lg:p-14">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -right-12 top-0 h-40 w-40 rounded-full border border-white/10" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full border border-white/10" />

            <div className="relative z-10">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                Welcome back
              </span>

              <h2 className="mt-6 max-w-sm font-display text-5xl font-bold leading-[1.05] tracking-tight lg:text-6xl">
                Good food
                <br />
                deserves
                <br />
                good company.
              </h2>
            </div>

            <div className="relative z-10">
              <div className="mb-5 h-px w-16 bg-white/30" />

              <p className="max-w-sm text-sm leading-6 text-white/65">
                Sign in to keep track of your reservations and discover your
                next favorite place.
              </p>
            </div>
          </div>

          <div className="flex items-center p-8 sm:p-12 lg:p-16">
            <div className="w-full max-w-md">
              <div className="mb-10 md:hidden">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#242E52]/50">
                  Welcome back
                </span>

                <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-[#242E52]">
                  Sign in
                </h1>
              </div>

              <div className="hidden md:block">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#242E52]/50">
                  Your table awaits
                </span>

                <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-[#242E52] lg:text-5xl">
                  Welcome back.
                </h1>

                <p className="mt-3 text-sm leading-6 text-[#242E52]/60">
                  Sign in to manage your reservations.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#242E52]/60">
                    Email address
                  </label>

                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-[#242E52]/15 bg-[#f8f5ef]/60 px-4 py-3.5 text-sm text-[#242E52] placeholder:text-[#242E52]/35 transition-all duration-200 focus:border-[#242E52]/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#242E52]/5"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#242E52]/60">
                      Password
                    </label>
                  </div>

                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-[#242E52]/15 bg-[#f8f5ef]/60 px-4 py-3.5 text-sm text-[#242E52] placeholder:text-[#242E52]/35 transition-all duration-200 focus:border-[#242E52]/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#242E52]/5"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </div>

                {/* Error */}
                {message && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm font-medium text-red-700">
                      {message}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full overflow-hidden rounded-xl bg-[#242E52] px-6 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-[#02499D] hover:shadow-lg hover:shadow-[#242E52]/15 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="relative z-10">
                    {isLoading ? "Signing in..." : "Sign in"}
                  </span>
                </button>
              </form>

              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#242E52]/10" />
                <span className="text-xs text-[#242E52]/35">OR</span>
                <div className="h-px flex-1 bg-[#242E52]/10" />
              </div>

              <p className="text-center text-sm text-[#242E52]/60">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-bold text-[#242E52] underline decoration-[#242E52]/30 underline-offset-4 transition-colors hover:text-[#02499D] hover:decoration-[#02499D]"
                >
                  Create one
                </Link>
              </p>

              <p className="mt-8 text-center text-[11px] uppercase tracking-wider text-[#242E52]/30">
                Reserve • Dine • Enjoy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
