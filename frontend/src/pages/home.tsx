import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import UserRate from "./components/user-rate";
import Menu from "./menu";
import ReserverSeat from "./components/reserver-seat";
import Visit from "./visit";

export default function Home() {
  return (
    <div>
      <section className="relative flex min-h-[calc(100vh-30px)] w-full items-end overflow-hidden px-6 pb-16 pt-32 md:px-12 md:pb-20">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/Pizza4Ps-Cambodia-1.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl">
          {/* Small label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-white/70" />

            <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/80">
              Pizza 4P's · Cambodia
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl font-display text-[15vw] uppercase leading-[0.88] tracking-tight text-white md:text-[110px] lg:text-[130px]"
          >
            Artisanal
            <br />
            <span className="text-transparent [-webkit-text-stroke:1.5px_white]">
              Slices.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="mt-7 max-w-lg text-sm leading-6 text-white/75 md:text-base"
          >
            Inspired by the concept of oneness — from Earth to people.
            Thoughtfully crafted with producers and creators who share our
            values.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.35,
              ease: "easeOut",
            }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/reserve"
              className="group flex items-center gap-4 rounded-full bg-[#02499D] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#242E52]"
            >
              Reserve a table
              <MoveRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/menu"
              className="rounded-full border border-white/50 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-[#242E52]"
            >
              Explore the menu
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 right-8 hidden items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/60 md:flex"
        >
          <span>Scroll to explore</span>
          <span className="h-px w-10 bg-white/40" />
        </motion.div>
      </section>

      <section
        id="story"
        className="relative scroll-mt-24 overflow-hidden bg-[var(--color-cream)] px-6 py-32 md:py-32"
      >
        <div className="mx-auto max-w-3xl text-center">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-8 flex items-center justify-center gap-4"
          >
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 40, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="h-px bg-[#242E52]/50"
            />

            <p className="text-xs uppercase tracking-[0.3em] text-[#242E52]">
              Our story
            </p>

            <motion.span
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 40, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="h-px bg-[#242E52]/50"
            />
          </motion.div>

          {/* Oneness */}
          <motion.h2
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display mb-2 text-5xl font-bold uppercase leading-none text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)] md:text-7xl"
          >
            "Oneness"
          </motion.h2>

          {/* Main statement */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: "easeOut",
            }}
            className="font-display mb-10 text-5xl text-[#242E52] md:text-7xl"
          >
            Compassion through
            <span className="block italic">Zero Waste</span>
          </motion.p>

          {/* Description */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.18,
                },
              },
            }}
            className="space-y-5 leading-relaxed text-[var(--color-ink)]/70"
          >
            <motion.p
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
            >
              Our vision for long-term sustainability is rooted in the belief
              that having compassion for the Earth or future generations may
              lead to true happiness. Through our zero-waste journey, we aim to
              inspire people to cultivate a deep sense of compassion for
              something greater than ourselves.
            </motion.p>

            <motion.p
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
            >
              Inspired by the concept of "Oneness" from Earth to people, 4P's
              original products are born from collaborations with thoughtful
              producers and creators who share our values. Each piece represents
              a small step toward our mission:{" "}
              <strong className="font-semibold">
                "Make the World Smile for Peace."
              </strong>
            </motion.p>
          </motion.div>
        </div>
      </section>
      <UserRate />
      <section id="menu" className="scroll-mt-24">
        <Menu />
      </section>
      <ReserverSeat />
      <section id="visit" className="scroll-mt-24">
        <Visit />
      </section>
    </div>
  );
}
