import { useState } from "react";

export default function Reserve() {
  const [form, setForm] = useState({ date: "", time: "", partySize: 2 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call POST /reservations once backend is built
    console.log("Reservation request:", form);
  };

  return (
    <section className="px-6 md:px-12 py-16 max-w-md">
      <h1 className="font-display text-4xl mb-8">Reserve a table</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm mb-1">Date</label>
          <input
            type="date"
            required
            className="w-full border border-[var(--color-ink)]/30 rounded-md px-3 py-2 bg-[var(--color-cream)]"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Time</label>
          <input
            type="time"
            required
            className="w-full border border-[var(--color-ink)]/30 rounded-md px-3 py-2 bg-[var(--color-cream)]"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Party size</label>
          <input
            type="number"
            min={1}
            max={20}
            required
            className="w-full border border-[var(--color-ink)]/30 rounded-md px-3 py-2 bg-[var(--color-cream)]"
            value={form.partySize}
            onChange={(e) =>
              setForm({ ...form, partySize: Number(e.target.value) })
            }
          />
        </div>
        <button
          type="submit"
          className="bg-[var(--color-ink)] text-[var(--color-parchment)] rounded-full px-6 py-3 text-sm hover:bg-[var(--color-clay)] transition-colors"
        >
          Request reservation
        </button>
      </form>
    </section>
  );
}
