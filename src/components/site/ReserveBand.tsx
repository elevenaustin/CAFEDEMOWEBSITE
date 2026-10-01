import { Link } from "@tanstack/react-router";
import dining from "@/assets/dining.jpg";
import { Reveal } from "./Reveal";

export function ReserveBand({ title = "An evening by the fire awaits." }: { title?: string }) {
  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      <img src={dining} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-35" />
      <div className="relative mx-auto max-w-[1440px] px-5 py-28 text-center md:px-10 md:py-40">
        <Reveal>
          <p className="eyebrow mb-6 text-brass">Reservations</p>
          <h2 className="mx-auto max-w-3xl text-5xl leading-none md:text-7xl">{title}</h2>
          <Link to="/reservations" className="eyebrow mt-12 inline-block bg-brass px-10 py-5 text-ink transition-colors hover:bg-ink-foreground">
            Reserve a Table
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
