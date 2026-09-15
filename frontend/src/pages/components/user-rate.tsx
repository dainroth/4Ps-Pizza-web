import { Carousel_002 } from "@/components/ui/skiper-ui/skiper48";

const pizzaMascot = "/assets/4ps.png";
const heroCard = "/assets/hero.png";
const storyImages = [
  {
    src: pizzaMascot,
    alt: "Pizza 4P's character",
  },
  {
    src: heroCard,
    alt: "Layered Pizza 4P's story card",
  },
  {
    src: pizzaMascot,
    alt: "Pizza 4P's character illustration",
  },
  {
    src: heroCard,
    alt: "Pizza 4P's sustainability card",
  },
];

export default function UserRate() {
  return (
    <section className="relative over   flow-hidden bg-[#242E52] px-6 py-28 text-white md:px-12 md:py-40">
      <svg
        className="absolute left-0 top-0 h-16 w-full text-[var(--color-cream)] md:h-24"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M0,0 H1440 V34 C1180,8 938,6 712,28 C470,52 244,58 0,6 Z" />
      </svg>

      <svg
        className="absolute bottom-0 left-0 h-16 w-full text-[var(--color-cream)] md:h-24"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M0,92 C250,126 493,128 730,98 C986,66 1198,64 1440,96 V120 H0 Z" />
      </svg>

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-12deg, transparent 0 92px, rgba(255,255,255,.7) 92px 95px, transparent 95px 170px)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_0.95fr]">
        <div className="mx-auto max-w-xl text-center lg:text-left">
          <div className="mb-8 flex items-center justify-center gap-4 lg:justify-start">
            <span className="h-px w-10 bg-white/35" />
            <p className="text-xs uppercase tracking-[0.3em] text-white/55">
              Our story
            </p>
            <span className="h-px w-10 bg-white/35" />
          </div>

          <img
            src={pizzaMascot}
            alt="4P Pizza mascot"
            className="mx-auto mb-8 h-36 w-36 object-contain  md:h-44 md:w-44 lg:mx-0"
          />

          <p className="font-display mt-2 text-4xl text-white md:text-6xl">
            Compassion through
            <span className="block italic">Zero Waste</span>
          </p>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-white/72 md:text-lg">
            <p>
              Inspired by the concept of "Oneness" from Earth to people, 4P's
              original products are born from collaborations with thoughtful
              producers and creators who share our values. Each piece represents
              a small step toward our mission:{" "}
              <strong className="font-semibold text-white">
                "Make the World Smile for Peace."
              </strong>
            </p>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[520px] flex-col items-center">
          <p className="mb-10 hidden text-center text-xs font-bold uppercase tracking-[0.45em] text-white/35 md:block">
            Drag me <span className="ml-3">-&gt;</span>
          </p>

          <Carousel_002
            images={storyImages}
            className="max-w-[320px] md:max-w-[380px]"
            loop
            autoplay
            showPagination
            spaceBetween={28}
          />
        </div>
      </div>
    </section>
  );
}
