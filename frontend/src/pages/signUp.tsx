import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call POST /auth/signup once backend is built
    console.log("Signup:", form);
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[var(--color-cream,#fdfbf7)] px-6 py-12">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-[#242E52]/10 md:p-10">
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-[#242E52] md:text-4xl">
          Create an account
        </h1>
        <p className="mt-2 text-sm text-[#242E52]/70">
          Join us to experience artisanal slices and zero waste.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#242E52]/70">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="John Doe"
              className="w-full rounded-lg border border-[#242E52]/20 bg-[var(--color-cream,#fdfbf7)] px-4 py-3 text-sm text-[#242E52] transition-colors focus:border-[#242E52] focus:outline-none"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

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
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#242E52]/70">
              Password
            </label>
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
            Sign up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#242E52]/70">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#242E52] underline hover:text-[#02499D]"
          >
            Sign in
          </Link>
        </p>
      </section>
    </div>
  );
}
