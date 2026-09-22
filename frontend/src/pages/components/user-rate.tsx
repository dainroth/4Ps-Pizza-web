import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css/effect-cards";
import "swiper/css";

const pizzaMascot = "/assets/4ps.png";

interface Review {
  name: string;
  rating: number;
  quote: string;
  date: string;
  image: string;
}

const reviews: Review[] = [
  {
    name: "Anthony Plaxen",
    rating: 5,
    quote:
      "One of my favourite pizza restaurants in south east Asia. Got the salmon lox half with burrata cheese and it was fantastic.",
    date: "a months ago",
    image:
      "https://lh3.googleusercontent.com/grass-cs/ACvplmO_3-oqyPZr9p5Xy-PAP_kIpY3tja-JgjezRgkxhH5mOLSPEBECgafaULCGNjPwjkOUHhkZxRjb4GMyHxNhs5w_-SXs6Lvios02b-o6HyH68INRtj_2SfFQsLp0w7gQ-tLesE6M1UCDD8Iv=w300-h225-p-k-no",
  },
  {
    name: "Dara the Puppy",
    rating: 5,
    quote:
      "Came here for lunch today with a group of 10 people, and the food is great as usual, from their cheese platters to their pizza and pasta all with affordable prices ranging from 5 to 10 dollars. The place has a great vibe with an open kitchen, wooden interior and a nice river view to go along it.",
    date: "8 months ago",
    image:
      "https://lh3.googleusercontent.com/grass-cs/ACvplmMwuOhFGqfZOVpfarMwymW8nZGQFyIlCPaSoUkylXj31gENeR9fw8HGqbd7iDxTQviyoh4hAtbz6IFmeF9FNyo6wcQDsAMSbx2eRkrTED799r8ZhWbIxHOCLGdEVk2cS4ejI-w0cLBSWYrS=w300-h225-p-k-no",
  },
  {
    name: "Me Learn",
    rating: 4,
    quote:
      "Exceptional wood-fired flavors and thoughtful hospitality. We dropped in for a late lunch and were immediately impressed by the seamless experience: ​The Vibe: Clean, air-conditioned, and comfortable indoor seating on the second floor with a nice elevated view and an interesting bar counter.",

    date: "3 month ago",
    image:
      "https://lh3.googleusercontent.com/grass-cs/ACvplmOhJWp8EMw4QBjnwN5JHCTBXFeQdYyD7SctAlzx6cyjJFUgsh3_G_3J8-93sZ9v6XXL1pCHHmr62idRD-xPslAgdy30oXm2dbHZbuhfgUXK6LfI30CU4-Jzb3BaCC7aq067AFWw8WYL4AGp=w300-h225-p-k-no",
  },
  {
    name: "Emma",
    rating: 5,
    quote:
      "Amazing experience at Pizza 4P’s! The food is absolutely delicious, and the service is truly outstanding. A special thank you to Sophorn, who took great care of us and made our visit even better. Friendly, attentive, and professional throughout. He even offered us a free dessert to celebrate the Khmer new year!",
    date: "5 month ago",
    image:
      "https://lh3.googleusercontent.com/grass-cs/ACvplmPOpWITD7Fp7AGN-fMnH8MC2yNfj5qQ_6CZQaZpVL7q2K9rOZLJKBsen78SkZ7YpqQpOMv-XDks23QkEc7L9ycGOqmGziERAWNm6H5WLmZ9iwelNWFbQtTbjoo8YpvWegXaTE4DJuzZsUc=w300-h450-p-k-no",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-yellow-400" : "fill-white/20"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

export default function UserRate() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const activeReview = reviews[activeIndex];

  return (
    <section className="relative overflow-hidden bg-[#242E52] px-6 py-28 text-white md:px-12 md:py-40">
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
        {/* LEFT: mascot + synced review text */}
        <div className="mx-auto max-w-xl text-center lg:text-left">
          <img
            src={pizzaMascot}
            alt="4P Pizza mascot"
            className="mx-auto mb-8 h-32 w-32 object-contain md:h-40 md:w-40 lg:mx-0"
          />

          <p className="font-display text-2xl leading-snug text-white md:text-3xl">
            Because 4P's is{" "}
            <strong className="font-semibold">not just a pizzeria</strong>. It's
            a place where tradition is reimagined.
          </p>

          <div className="mt-8 border-t border-white/15 pt-6">
            <StarRating rating={activeReview.rating} />
            <p className="mt-3 text-base leading-relaxed text-white/80 md:text-lg">
              "{activeReview.quote}"
            </p>
            <p className="mt-3 text-sm font-semibold text-white">
              {activeReview.name}
            </p>
            <p className="text-xs text-white/50">{activeReview.date}</p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 lg:justify-start">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous review"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next review"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <span className="text-sm text-white/50">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(reviews.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* RIGHT: stacked photo carousel */}
        <div className="relative mx-auto flex w-full max-w-[420px] items-center justify-center">
          <Swiper
            effect="cards"
            grabCursor
            modules={[EffectCards]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="h-[450px] w-full max-w-[400px]"
          >
            {reviews.map((review) => (
              <SwiperSlide
                key={review.name}
                className="overflow-hidden rounded-3xl"
              >
                <img
                  src={review.image}
                  alt={`Photo shared by ${review.name}`}
                  className="h-full w-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
