import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { useState } from "react";
import { navLinks, restaurant } from "@/data/restaurant";

export function Footer() {
  const [joined, setJoined] = useState(false);
  return (
    <footer className="overflow-hidden bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 pt-20 pb-10 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <p className="font-serif text-3xl">{restaurant.name}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">A neighbourhood dining room built around one wood fire, seasonal produce and unhurried evenings.</p>
          <a href={restaurant.instagram} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink-foreground">
            <Instagram className="h-4 w-4" strokeWidth={1.25} /> @maisonember
          </a>
        </div>
        <nav aria-label="Footer" className="md:col-span-2">
          <p className="eyebrow mb-5 text-brass">Explore</p>
          <ul className="space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}><Link to={l.to} className="link-line text-ink-muted hover:text-ink-foreground">{l.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="text-sm md:col-span-3">
          <p className="eyebrow mb-5 text-brass">Visit</p>
          <address className="not-italic text-ink-muted">{restaurant.address.street}<br />{restaurant.address.city}, {restaurant.address.region} {restaurant.address.postal}</address>
          <p className="mt-4 text-ink-muted"><a href={`tel:${restaurant.phone}`}>{restaurant.phone}</a><br /><a href={`mailto:${restaurant.email}`}>{restaurant.email}</a></p>
          <ul className="mt-4 space-y-1 text-ink-muted">
            {restaurant.hours.map((h) => <li key={h.days}>{h.days}: {h.time}</li>)}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-5 text-brass">Letters from the hearth</p>
          {joined ? (
            <p className="text-sm text-ink-muted">Thank you — newsletter signups will be enabled soon.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setJoined(true); }} className="flex border-b border-ink-foreground/30">
              <label htmlFor="nl" className="sr-only">Email</label>
              <input id="nl" type="email" required placeholder="Your email" className="w-full bg-transparent py-3 text-sm placeholder:text-ink-muted focus:outline-none" />
              <button className="eyebrow px-2">Join</button>
            </form>
          )}
        </div>
      </div>
      <p aria-hidden className="select-none whitespace-nowrap text-center font-serif text-[22vw] leading-[0.8] text-ink-foreground/[0.06] italic">Maison Ember</p>
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-2 border-t border-ink-foreground/10 px-5 py-6 text-xs text-ink-muted md:flex-row md:px-10">
        <p>© {new Date().getFullYear()} {restaurant.name}. All rights reserved.</p>
        <p>{restaurant.cuisine} · {restaurant.address.city}</p>
      </div>
    </footer>
  );
}
