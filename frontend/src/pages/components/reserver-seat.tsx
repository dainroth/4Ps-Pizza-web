import { Link } from "react-router-dom";

const catererImage =
  "https://scontent-sea5-1.cdninstagram.com/v/t39.30808-6/416366832_781053820727398_1441402853454683941_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ig_cache_key=MzI3Nzg4NTU3MDEwODIzODcwMw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMjA0OC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=_McKwAlyEt8Q7kNvwHhEJb8&_nc_oc=AdqVauR5i_vHG2IjojoQun6meDYXW0NwHJNBxcYJ4dKJ5f4iItdFCSN2aDmcrpZgw9CEEqCAEujJaE68rF9wdei_&_nc_zt=23&_nc_ht=scontent-sea5-1.cdninstagram.com&_nc_gid=SHQqnh0coibKcDlgl64A5Q&_nc_ss=706cf&oh=00_AQJ_n9cuHN6m7iZnB902CbMwUCXAB3eiR4NEu5glM3tIoA&oe=6AB70431";

export default function ReserverSeat() {
  return (
    <section className="relative overflow-hidden">
      <img
        src={catererImage}
        alt="Table spread with pastry boxes and desserts"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      <div className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 py-24 text-center text-white md:px-12">
        <div className="mb-6 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-white/50" />
          <p className="text-xs  font-semibold uppercase tracking-[0.35em] text-white/70">
            Reservations
          </p>
          <span className="h-px w-10 bg-white/50" />
        </div>

        <h1 className="font-display leading-[0.95]">
          <span className=" block text-5xl uppercase tracking-tight text-white/30 [-webkit-text-stroke:1px_white] md:text-7xl">
            Big Nights,
          </span>
          <span className="block text-6xl font-bold uppercase tracking-tight md:text-8xl">
            4P's
          </span>
          <span className="block text-6xl font-bold uppercase tracking-tight md:text-8xl">
            Evenings
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
          Birthdays, first dates, a Tuesday that deserves better. We hold tables
          for occasions big and small —{" "}
          <strong className="font-semibold text-white">book ahead</strong> so
          your seat is waiting.
        </p>

        <Link
          to="/reserve"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#242E52] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f8f4ee] hover:shadow-xl active:translate-y-0"
        >
          Reserve your seat
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
