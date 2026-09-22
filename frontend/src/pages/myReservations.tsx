import { useEffect, useState } from "react";
import {
  getMyReservations,
  cancelReservation,
  type Reservation,
} from "@/lib/reservations";
import { Button } from "@/components/ui/button";

const statusStyles: Record<Reservation["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-gray-200 text-gray-600",
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
    <section className="min-h-[calc(100vh-80px)] bg-[var(--color-cream,#fdfbf7)] px-6 py-16 md:px-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl text-[#242E52] mb-2">
          My Reservations
        </h1>
        <p className="text-sm text-[#242E52]/70 mb-8">
          Every table you've booked, in one place.
        </p>

        {loading && (
          <p className="text-sm text-[#242E52]/60">
            Loading your reservations...
          </p>
        )}

        {error && !loading && <p className="text-sm text-red-600">{error}</p>}

        {!loading && !error && reservations.length === 0 && (
          <p className="text-sm text-[#242E52]/60">
            You haven't made any reservations yet.
          </p>
        )}

        <div className="space-y-4">
          {reservations.map((r) => (
            <div
              key={r._id}
              className="flex items-center gap-5 rounded-2xl border border-[#242E52]/10 bg-white p-5 shadow-sm"
            >
              <img
                src={serviceTypeImages[r.serviceType] || "/assets/4ps.png"}
                alt={r.serviceType}
                className="h-20 w-20 shrink-0 rounded-xl object-cover"
              />

              <div className="flex-1 text-left">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-[#242E52]">{r.venue}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[r.status]}`}
                  >
                    {r.status}
                  </span>
                </div>
                <p className="text-sm text-[#242E52]/70">
                  {r.date} · {r.time} · {r.guests}{" "}
                  {r.guests === 1 ? "guest" : "guests"} · {r.serviceType}
                </p>
              </div>

              {r.status !== "cancelled" && (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={cancellingId === r._id}
                  onClick={() => handleCancel(r._id)}
                  className="shrink-0 rounded-full border-[#242E52]/30 text-[#242E52] hover:bg-[#242E52]/5"
                >
                  {cancellingId === r._id ? "Cancelling..." : "Cancel"}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
