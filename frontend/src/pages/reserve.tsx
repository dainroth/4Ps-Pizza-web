import { useState } from "react";
import { motion } from "framer-motion";
import { createReservation } from "@/lib/reservations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface Reservation {
  venue: string;
  date?: string;
  time?: string;
  guests: number;
  serviceType: string;
}

const venues = [" Pizza 4P's 313 Quayside", "Pizza 4P's BKK1"];
const serviceTypes = ["Inside", "Outside", "Pizza Counter", "Semi-Private"];

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
      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[var(--color-cream,#fdfbf7)] px-6 py-16">
        <Card className="w-full max-w-md border-[var(--color-ink)]/10 shadow-sm">
          <CardHeader>
            <CardTitle className="font-display text-3xl">
              Reserve a table
            </CardTitle>
            <CardDescription>
              Pick your venue, date, and party size — we'll hold your seat.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Select
                  value={form.venue}
                  onValueChange={(value) =>
                    setForm({ ...form, venue: value ?? "" })
                  }
                >
                  <SelectTrigger id="venue" className="w-full">
                    <SelectValue placeholder="Select a venue" />
                  </SelectTrigger>
                  <SelectContent>
                    {venues.map((venue) => (
                      <SelectItem key={venue} value={venue}>
                        {venue}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    required
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests">Party size</Label>
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
                />
              </div>

              <div className="w-full">
                <ServiceTypePicker
                  value={form.serviceType}
                  onChange={(value) => setForm({ ...form, serviceType: value })}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-full cursor-pointer bg-[#242E52] text-white hover:bg-[#02499D]"
              >
                {isLoading ? "Reserving..." : "Request reservation"}
              </Button>

              {error && (
                <p className="text-center text-sm text-red-600">{error}</p>
              )}
            </form>
          </CardContent>
        </Card>
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
