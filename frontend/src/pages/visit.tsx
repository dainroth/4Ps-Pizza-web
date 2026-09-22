import { MessageCircle } from "lucide-react";

const mapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15635.106659208204!2d104.92037611738282!3d11.567861900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109511ac9974107%3A0x95cc4e2d790d6ea9!2sPizza%204P's%20313%20Quayside!5e0!3m2!1sen!2skh!4v1790046549034!5m2!1sen!2skh";

export default function Visit() {
  return (
    <section className="bg-[#242E52] px-6 py-20 text-white md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-white/35" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              Come on over
            </p>
            <span className="h-px w-10 bg-white/35" />
          </div>
          <h1 className="font-display text-5xl uppercase tracking-tight md:text-7xl">
            Find us in
          </h1>
          <p className="font-display mt-1 text-5xl italic md:text-7xl">
            Phnom Penh.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Map */}
          <div className="relative overflow-hidden rounded-2xl">
            <iframe
              src={mapEmbedUrl}
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pizza 4Ps location map"
            />

            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-[#242E52]/90 p-4 backdrop-blur-sm sm:right-auto sm:max-w-xs">
              <p className="text-sm font-bold uppercase tracking-wide">
                Street 313, Quayside
              </p>
              <p className="text-sm text-white/80">Chamkarmon, Phnom Penh</p>
              <a
                href="https://maps.app.goo.gl/pdnPzyzNYpk2i4bH6"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-white/70 underline underline-offset-4 hover:text-white"
              >
                Open in maps →
              </a>
            </div>
          </div>

          {/* Info panel */}
          <div className="rounded-2xl bg-white/5 p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
                Hours
              </p>
              <div className="mt-3 space-y-1.5 text-sm">
                <p>Mon–Fri · 11:00–22:00</p>
                <p>Sat–Sun · 10:00–23:00</p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
                Phone
              </p>
              <p className="mt-2 text-sm font-medium">+855 23 63 62 000</p>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
                Email
              </p>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
                Follow us
              </p>
              <div className="mt-3 flex gap-3">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10"
                  aria-label="Instagram"
                >
                  {/* <Instagram className="h-4 w-4" /> */}
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
