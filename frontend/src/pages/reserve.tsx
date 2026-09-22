import { useState } from "react";
import { motion } from "framer-motion";
import { createReservation } from "@/lib/reservations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import confetti from "canvas-confetti";
import ServiceTypePicker from "./components/ServiceTypePicker";

const venues = ["Pizza 4P's 313 Quayside", "Pizza 4P's BKK1"];

const heroImage = "https://pizza4ps.com/wp-content/uploads/2024/11/Central.jpg";

export default function Reserve() {
  const [form, setForm] = useState({
    venue: venues[0],
    date: "",
    time: "",
    guests: 2,
    serviceType: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmedDetails, setConfirmedDetails] = useState<{
    venue: string;
    date: string;
    time: string;
    guests: number;
  } | null>(null);

  const fireConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#242E52", "#02499D", "#ea9cc2", "#ffffff"],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.serviceType) {
      setError("Please select a service type.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await createReservation(form);

      if (data.success) {
        setConfirmedDetails({
          venue: form.venue,
          date: form.date,
          time: form.time,
          guests: form.guests,
        });
        setShowSuccess(true);
        fireConfetti();
        setForm({
          venue: venues[0],
          date: "",
          time: "",
          guests: 2,
          serviceType: "",
        });
      } else {
        setError(data.message || "Unable to reserve a table.");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="grid min-h-[calc(110vh-80px)] lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-[#242E52] lg:block">
          <img
            src={heroImage}
            alt="Kravan dining room"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />

          {/* Text box */}
          <div className="absolute bottom-10 left-10 max-w-md bg-[#f8f4ee] p-8 text-[#242E52]">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#242E52]/60">
              Reservations
            </p>

            <h1 className="font-display mt-5 text-4xl leading-tight">
              A table
              <br />
              <span className="italic text-[#242E52]/70">worth the wait.</span>
            </h1>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#242E52]/65">
              Whether it's a quiet dinner or a celebration, we hold every table
              with the same care we put into every dish.
            </p>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="flex items-center justify-center bg-[var(--color-cream,#fdfbf7)] px-6 py-16 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <h2 className="font-display font-bold text-3xl text-[#242E52]">
              Reserve a table
            </h2>
            <p className="mt-2 text-sm text-[#242E52]/60">
              Pick your venue, date, and party size — we'll hold your seat.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="venue"
                  className="text-xs font-semibold uppercase tracking-wider text-[#242E52]/60"
                >
                  Venue
                </Label>
                <select
                  id="venue"
                  value={form.venue}
                  onChange={(e) => setForm({ ...form, venue: e.target.value })}
                  className="w-full rounded-xl cursor-pointer border border-[#242E52]/15 bg-white px-4 py-3 text-sm text-[#242E52] shadow-sm outline-none transition-colors focus:border-[#242E52]"
                >
                  {venues.map((venue) => (
                    <option key={venue} value={venue}>
                      {venue}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="date"
                    className="text-xs font-semibold uppercase tracking-wider text-[#242E52]/60"
                  >
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="rounded-xl cursor-pointer border-[#242E52]/15 bg-white py-5 shadow-sm focus-visible:border-[#242E52] focus-visible:ring-[#242E52]/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="time"
                    className="text-xs font-semibold uppercase tracking-wider text-[#242E52]/60"
                  >
                    Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    required
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="rounded-xl cursor-pointer border-[#242E52]/15 bg-white py-5 shadow-sm focus-visible:border-[#242E52] focus-visible:ring-[#242E52]/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="guests"
                  className="text-xs font-semibold uppercase tracking-wider text-[#242E52]/60"
                >
                  Party size
                </Label>
                <Input
                  id="guests"
                  type="number"
                  min={1}
                  max={20}
                  required
                  value={form.guests}
                  onChange={(e) =>
                    setForm({ ...form, guests: Number(e.target.value) })
                  }
                  className="rounded-xl border-[#242E52]/15 bg-white py-5 shadow-sm focus-visible:border-[#242E52] focus-visible:ring-[#242E52]/20"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-wider text-[#242E52]/60">
                  Service type
                </Label>
                <ServiceTypePicker
                  value={form.serviceType}
                  onChange={(value) => setForm({ ...form, serviceType: value })}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer rounded-full bg-[#242E52] py-6 text-sm font-semibold tracking-wide text-white shadow-lg shadow-[#242E52]/20 transition-all hover:-translate-y-0.5 hover:bg-[#02499D] hover:shadow-xl"
              >
                {isLoading ? "Reserving..." : "Request reservation"}
              </Button>

              {error && (
                <p className="text-center text-sm text-red-600">{error}</p>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="text-center sm:max-w-sm">
          <DialogHeader className="items-center">
            <div className="mb-2 text-5xl">🎉</div>
            <DialogTitle className="text-2xl">You're all set!</DialogTitle>
            <DialogDescription>
              Your table is reserved. We can't wait to see you.
            </DialogDescription>
          </DialogHeader>

          {confirmedDetails && (
            <div className="mt-2 space-y-1 rounded-lg bg-[#242E52]/5 p-4 text-sm text-[#242E52]">
              <p>
                <span className="font-semibold">Venue:</span>{" "}
                {confirmedDetails.venue}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {confirmedDetails.date}
              </p>
              <p>
                <span className="font-semibold">Time:</span>{" "}
                {confirmedDetails.time}
              </p>
              <p>
                <span className="font-semibold">Guests:</span>{" "}
                {confirmedDetails.guests}
              </p>
            </div>
          )}

          <DialogFooter>
            <Button
              onClick={() => setShowSuccess(false)}
              className="w-full rounded-full bg-[#242E52] text-white hover:bg-[#02499D]"
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
