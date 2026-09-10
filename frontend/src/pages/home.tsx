import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[calc(100vh-80px)] w-full flex flex-col justify-center overflow-hidden px-6 md:px-12 py-12">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/Pizza4Ps-Cambodia-1.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-[10vw] md:text-[5vw] leading-[1.05] text-white"
          >
            Wood-Fired Perfection in Phnom Penh.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-6 max-w-md text-lg text-white/90"
          >
            Inspired by the concept of “Oneness” Earth to People,4P’s Original
            products are born from collaborations with thoughtful producers and
            creators who share our values.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex gap-4"
          >
            <Link
              to="/reserve"
              className="bg-white text-black rounded-full px-6 py-3 text-sm font-medium hover:bg-[var(--color-clay)] hover:text-white transition-colors"
            >
              Reserve a table
            </Link>
            <Link
              to="/menu"
              className="border border-white text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-white hover:text-black transition-colors"
            >
              See the menu
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Story teaser */}
      <section className="px-6 md:px-12 py-20 grid md:grid-cols-2 gap-10 items-center bg-[var(--color-cream)]">
        <div className="aspect-[4/3] bg-[var(--color-sage)]/30 rounded-md" />
        <div>
          <p className="text-sm uppercase tracking-wide text-[var(--color-clay)] mb-3">
            Our story
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-4">
            Pizza for Peace.
          </h2>
          <p className="text-[var(--color-ink)]/80 max-w-md mb-6">
            Pizza 4P’s didn’t start as a multi-million dollar business plan—it
            started in a backyard in Tokyo.
          </p>
          <Link
            to="/vision"
            className="text-sm underline underline-offset-4 hover:text-[var(--color-clay)]"
          >
            Read our story
          </Link>
        </div>
      </section>

      {/* Featured items */}
      <section className="px-6 md:px-12 py-20">
        <h2 className="font-display text-3xl md:text-4xl mb-10">
          A few favorites
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {["Amok Trey", "Kroeung Pork Belly", "Lemongrass Iced Tea"].map(
            (item) => (
              <div key={item}>
                <div className="aspect-square bg-[var(--color-sage)]/20 rounded-md mb-4" />
                <h3 className="font-display text-lg">{item}</h3>
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
