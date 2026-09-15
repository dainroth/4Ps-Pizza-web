export default function Visit() {
  return (
    <section className="px-6 md:px-12 py-16 grid md:grid-cols-2 gap-10">
      <div>
        <h1 className="font-display text-4xl md:text-5xl mb-8">Find us</h1>
        <div className="space-y-4 text-[var(--color-ink)]/85">
          <p>Street 240, Phnom Penh</p>
          <p>Open daily · 11:00 – 21:00</p>
          <p>+855 XX XXX XXX</p>
        </div>
      </div>
      <div className="aspect-square bg-[var(--color-sage)]/20 rounded-md flex items-center justify-center text-sm text-[var(--color-ink)]/50">
        Map goes here (Mapbox GL)
      </div>
    </section>
  );
}
