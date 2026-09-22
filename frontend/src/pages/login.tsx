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
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[var(--color-cream,#fdfbf7)] px-6 py-12">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-[#242E52]/10 md:p-10">
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-[#242E52] md:text-4xl">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-[#242E52]/70">
          Sign in to manage your reservations.
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
            disabled={isLoading}
            className="mt-2 w-full rounded-full bg-[#242E52] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#02499D]"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-[#242E52]">
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-[#242E52]/70">
          Don't have an account?{" "}
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
