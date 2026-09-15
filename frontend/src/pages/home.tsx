import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import UserRate from "./components/user-rate";
import Menu from "./menu";

export default function Home() {
  return (
    <div>
      <section className="relative flex min-h-[calc(100vh-30px)] w-full flex-col justify-center overflow-hidden px-6 py-12 md:px-12">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/Pizza4Ps-Cambodia-1.mp4" type="video/mp4" />
        </video>

        <div className="pointer-events-none absolute inset-0 bg-black/50" />

        <div className="relative max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-[10vw] uppercase leading-[1.05] text-transparent [-webkit-text-stroke:1.5px_white] md:text-[70px]"
          >
            Artisanal Slices, Zero Waste.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-6 max-w-xl text-lg text-white/90"
          >
            Inspired by the concept of "Oneness" from Earth to people, 4P's
            original products are born from collaborations with thoughtful
            producers and creators who share our values.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              to="/reserve"
              className="flex items-center gap-4 rounded-full bg-[#02499D] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-black"
            >
              Reserve a table
              <MoveRight />
            </Link>

            <Link
              to="/menu"
              className="rounded-full border border-white px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
            >
              See the menu
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--color-cream)] px-6 py-32 md:py-44">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[var(--color-clay)]/50" />
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-clay)]">
              Our story
            </p>
            <span className="h-px w-10 bg-[var(--color-clay)]/50" />
          </div>

          <h2 className="font-display mb-2 text-5xl font-bold uppercase leading-none text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)] md:text-7xl">
            "Oneness"
          </h2>
          <p className="font-display mb-10 text-5xl text-[#242E52] md:text-7xl">
            Compassion through
            <span className="block italic">Zero Waste</span>
          </p>

          <div className="space-y-5 leading-relaxed text-[var(--color-ink)]/70">
            <p>
              Our vision for long-term sustainability is rooted in the belief
              that having compassion for the Earth or future generations may
              lead to true happiness. Through our zero-waste journey, we aim to
              inspire people to cultivate a deep sense of compassion for
              something greater than ourselves.
            </p>
            <p>
              Inspired by the concept of "Oneness" from Earth to people, 4P's
              original products are born from collaborations with thoughtful
              producers and creators who share our values. Each piece represents
              a small step toward our mission:{" "}
              <strong className="font-semibold">
                "Make the World Smile for Peace."
              </strong>
            </p>
          </div>
        </div>
      </section>
      <UserRate />
      <Menu />
    </div>
  );
}
