import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call POST /auth/login once backend is built
    console.log("Login:", form);
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[var(--color-cream,#fdfbf7)] px-6 py-12">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-[#242E52]/10 md:p-10">
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-[#242E52] md:text-4xl">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-[#242E52]/70">
          Sign in to access your reservations and account settings.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#242E52]/70">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              className="w-full rounded-lg border border-[#242E52]/20 bg-[var(--color-cream,#fdfbf7)] px-4 py-3 text-sm text-[#242E52] transition-colors focus:border-[#242E52] focus:outline-none"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#242E52]/70">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-[#242E52]/70 hover:text-[#02499D] hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-[#242E52]/20 bg-[var(--color-cream,#fdfbf7)] px-4 py-3 text-sm text-[#242E52] transition-colors focus:border-[#242E52] focus:outline-none"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-[#242E52] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#02499D]"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#242E52]/70">
          No account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-[#242E52] underline hover:text-[#02499D]"
          >
            Sign up
          </Link>
        </p>
      </section>
    </div>
  );
}
