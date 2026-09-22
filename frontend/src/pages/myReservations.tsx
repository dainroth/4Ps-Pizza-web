import { useEffect, useState } from "react";
import {
  getMyReservations,
  cancelReservation,
  type Reservation,
} from "@/lib/reservations";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock3, Users, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const statusStyles: Record<Reservation["status"], string> = {
  pending: "bg-[#f3dfad] text-[#765a18]",
  confirmed: "bg-[#dce8df] text-[#315d43]",
  cancelled: "bg-[#e7e5e2] text-[#77736d]",
};

const serviceTypeImages: Record<string, string> = {
  Inside:
    "https://1.image.cdn.tablecheck.com/unsafe/fit-in/1920x1080/filters:format(webp)/https://cdn0.tablecheck.com/service_categories/6a62eab95153ed3654cb17c6/images/xl/55c1c40c.jpg?1786784709",

  Outside:
    "https://image.cdn.tablecheck.com/unsafe/fit-in/1920x1080/filters:format(webp)/https://cdn2.tablecheck.com/service_categories/6a62eac5286bac824693ebcf/images/xl/3ef201b1.jpg?1786784345",

  "Pizza Counter":
    "https://image.cdn.tablecheck.com/unsafe/fit-in/1920x1080/filters:format(webp)/https://cdn1.tablecheck.com/service_categories/6a802c1e1a6112fa355533b5/images/xl/d56f5e21.jpg?1786784798",

  "Semi-Private":
    "https://3.image.cdn.tablecheck.com/unsafe/fit-in/1920x1080/filters:format(webp)/https://cdn2.tablecheck.com/service_categories/6a8034e60613f5d156763032/images/xl/8fe7a09f.jpeg?1787276317",
};

export default function MyReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const loadReservations = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getMyReservations();

      if (data.success && data.reservations) {
        setReservations(data.reservations);
      } else {
        setError(data.message || "Unable to load your reservations.");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const handleCancel = async (id: string) => {
    setCancellingId(id);

    try {
      const data = await cancelReservation(id);

      if (data.success) {
        setReservations((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status: "cancelled" } : r)),
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <section className="min-h-[calc(100vh-80px)] bg-[#f8f4ee] px-6 py-16 text-[#242E52] md:px-12 md:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="mb-14">
          <div className="mb-5 flex items-center gap-2">
            <span className="h-px w-6 bg-[#242E52]/60" />

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#242E52]/60">
              Your table
            </p>

            <span className="h-px w-6 bg-[#242E52]/60" />
          </div>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h1 className="font-display text-5xl leading-none md:text-6xl">
                My Reservations
              </h1>

              <p className="mt-5 max-w-lg text-sm leading-relaxed text-[#242E52]/60">
                Every table you've booked, in one place. Keep track of your
                upcoming dining experiences and reservation details.
              </p>
            </div>

            {!loading && reservations.length > 0 && (
              <Link to="/reservation">
                <Button
                  className="
                    rounded-full
                    bg-[#242E52]
                    px-6
                    text-white
                    hover:bg-[#242E52]/90
                  "
                >
                  Make a reservation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </header>

        {/* Loading */}
        {loading && (
          <div className="space-y-6">
            {[1, 2].map((item) => (
              <div
                key={item}
                className=" animate-pulse overflow-hidden border border-[#242E52]/10 bg-white
                "
              >
                <div className="grid md:grid-cols-[240px_1fr]">
                  <div className="h-56 bg-[#242E52]/5 md:h-full" />

                  <div className="space-y-5 p-7">
                    <div className="h-5 w-32 rounded bg-[#242E52]/5" />

                    <div className="h-8 w-48 rounded bg-[#242E52]/5" />

                    <div className="h-4 w-64 rounded bg-[#242E52]/5" />

                    <div className="h-4 w-40 rounded bg-[#242E52]/5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && reservations.length === 0 && (
          <div className="relative overflow-hidden border border-[#242E52]/10 bg-white px-6 py-20 text-center md:px-12">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#f8f4ee]" />

            <div className="relative">
              <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-[#f8f4ee]">
                <CalendarDays className="h-7 w-7 text-[#242E52]/60" />
              </div>

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#242E52]/50">
                Nothing here yet
              </p>

              <h2 className="font-display text-4xl md:text-5xl">
                Your table is waiting.
              </h2>

              <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#242E52]/60">
                You don't have any reservations yet. Find a table and make your
                next dining experience something to look forward to.
              </p>

              <Link to="/reserve">
                <Button
                  className="
                    mt-8
                    rounded-full
                    bg-[#242E52]
                    px-7
                    text-white
                    hover:bg-[#242E52]/90
                  "
                >
                  Make a reservation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {!loading && !error && reservations.length > 0 && (
          <div className="space-y-6">
            {reservations.map((r) => (
              <article
                key={r._id}
                className=" group overflow-hidden border border-[#242E52]/10 bg-white transition-shadow hover:shadow-[0_12px_40px_rgba(36,46,82,0.08)]
                "
              >
                <div className="grid md:grid-cols-[260px_1fr]">
                  <div className="relative h-56 overflow-hidden md:h-full">
                    <img
                      src={
                        serviceTypeImages[r.serviceType] || "/assets/4ps.png"
                      }
                      alt={r.serviceType}
                      className=" h-full w-full object-cover transition-transform duration-700 group-hover:scale-105
                      "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white/90 px-3 py-1.5 text-xs font-medium text-[#242E52] backdrop-blur-sm">
                        {r.serviceType}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-7 md:p-8">
                    <div>
                      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#242E52]/40">
                            Restaurant
                          </p>

                          <h2 className="font-display text-2xl">{r.venue}</h2>
                        </div>

                        <span
                          className={` rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[r.status]}
                          `}
                        >
                          {r.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-y-5 border-y border-[#242E52]/10 py-6 sm:grid-cols-4">
                        <div className="flex items-start gap-3">
                          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#242E52]/50" />

                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#242E52]/40">
                              Date
                            </p>

                            <p className="mt-1 text-sm font-medium">{r.date}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#242E52]/50" />

                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#242E52]/40">
                              Time
                            </p>

                            <p className="mt-1 text-sm font-medium">{r.time}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Users className="mt-0.5 h-4 w-4 shrink-0 text-[#242E52]/50" />

                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#242E52]/40">
                              Guests
                            </p>

                            <p className="mt-1 text-sm font-medium">
                              {r.guests} {r.guests === 1 ? "guest" : "guests"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#242E52]/50" />

                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#242E52]/40">
                              Seating
                            </p>

                            <p className="mt-1 text-sm font-medium">
                              {r.serviceType}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {r.status !== "cancelled" && (
                      <div className="mt-6 flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={cancellingId === r._id}
                          onClick={() => handleCancel(r._id)}
                          className="rounded-full   cursor-pointer   border-[#242E52]/20   px-5   text-[#242E52]   hover:bg-[#242E52]/5
                          "
                        >
                          {cancellingId === r._id
                            ? "Cancelling..."
                            : "Cancel reservation"}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
