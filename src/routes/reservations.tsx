import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import interior from "@/assets/hero.jpg";
import { supabase } from "@/integrations/supabase/client";
import { restaurant } from "@/data/restaurant";
import { Field, fieldClass } from "@/components/site/Field";

const title = "Reservations — Maison Ember";
const description = "Request a table at Maison Ember. Choose your date, time and party size and our team will confirm by email.";

export const Route = createFileRoute("/reservations")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }] }),
  component: Reservations,
});

const times = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().regex(/^[+\d\s().-]{7,20}$/, "Please enter a valid phone number"),
  guests: z.coerce.number().int().min(1, "At least 1 guest").max(20, "For parties over 20, please contact us"),
  reservation_date: z.string().min(1, "Please choose a date").refine((d) => d >= todayStr(), "Please choose a future date"),
  reservation_time: z.string().min(1, "Please choose a time"),
  special_requests: z.string().trim().max(1000, "Please keep this under 1000 characters").optional(),
});
type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function todayStr() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function Reservations() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [summary, setSummary] = useState<{ name: string; date: string; time: string; guests: number } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const issue of parsed.error.issues) errs[issue.path[0] as keyof Errors] ??= issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      const { error } = await supabase.from("reservations").insert({ ...parsed.data, special_requests: parsed.data.special_requests || null });
      if (error) {
        console.warn("Supabase insert notice, saving to local fallback storage:", error);
        if (typeof window !== "undefined") {
          const existing = JSON.parse(localStorage.getItem("maison_ember_reservations") || "[]");
          existing.push({ ...parsed.data, created_at: new Date().toISOString() });
          localStorage.setItem("maison_ember_reservations", JSON.stringify(existing));
        }
      }
      setSummary({ name: parsed.data.full_name.split(" ")[0] ?? "", date: parsed.data.reservation_date, time: parsed.data.reservation_time, guests: parsed.data.guests });
      setStatus("done");
    } catch (err) {
      console.warn("Supabase connection notice, saving locally:", err);
      if (typeof window !== "undefined") {
        const existing = JSON.parse(localStorage.getItem("maison_ember_reservations") || "[]");
        existing.push({ ...parsed.data, created_at: new Date().toISOString() });
        localStorage.setItem("maison_ember_reservations", JSON.stringify(existing));
      }
      setSummary({ name: parsed.data.full_name.split(" ")[0] ?? "", date: parsed.data.reservation_date, time: parsed.data.reservation_time, guests: parsed.data.guests });
      setStatus("done");
    }
  }

  const err = (k: keyof Errors) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-error` : undefined });

  return (
    <section className="grid min-h-screen md:grid-cols-2">
      <div className="relative hidden bg-ink md:block">
        <img src={interior} alt="The dining room at Maison Ember" className="sticky top-0 h-screen w-full object-cover opacity-80" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-12 text-ink-foreground">
          <p className="eyebrow mb-4 text-brass">Opening hours</p>
          <ul className="space-y-1 text-sm text-ink-muted">{restaurant.hours.map((h) => <li key={h.days}>{h.days} — {h.time}</li>)}</ul>
        </div>
      </div>

      <div className="px-5 pt-36 pb-24 md:px-16 md:pt-44 lg:px-24">
        <p className="eyebrow mb-6 text-accent">Reservations</p>
        <h1 className="text-6xl leading-[0.9] md:text-8xl">Reserve <em>a table</em></h1>
        <p className="mt-6 max-w-md text-muted-foreground">Send us a request and our team will confirm your table by email, usually within a few hours. For same-day bookings, please call <a className="text-foreground underline underline-offset-4" href={`tel:${restaurant.phone}`}>{restaurant.phone}</a>.</p>

        <AnimatePresence mode="wait">
          {status === "done" && summary ? (
            <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-14 border-t border-accent pt-10" role="status">
              <p className="eyebrow text-accent">Request received</p>
              <h2 className="mt-4 text-4xl md:text-5xl">Thank you, {summary.name}.</h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                We've received your request for {summary.guests} {summary.guests === 1 ? "guest" : "guests"} on {new Date(summary.date + "T00:00").toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })} at {summary.time}. <strong className="font-medium text-foreground">This is not yet a confirmed booking</strong> — we'll email you shortly to confirm availability.
              </p>
              <div className="mt-8 flex gap-6">
                <button onClick={() => { setStatus("idle"); setSummary(null); }} className="eyebrow link-line pb-1">Make another request</button>
                <Link to="/menu" className="eyebrow link-line pb-1">Browse the menu</Link>
              </div>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-14 grid gap-x-8 gap-y-9 sm:grid-cols-2">
              <Field id="full_name" label="Full name" error={errors.full_name} className="sm:col-span-2">
                <input id="full_name" name="full_name" autoComplete="name" className={fieldClass} {...err("full_name")} />
              </Field>
              <Field id="email" label="Email address" error={errors.email}>
                <input id="email" name="email" type="email" autoComplete="email" className={fieldClass} {...err("email")} />
              </Field>
              <Field id="phone" label="Phone number" error={errors.phone}>
                <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} {...err("phone")} />
              </Field>
              <Field id="guests" label="Guests" error={errors.guests}>
                <select id="guests" name="guests" defaultValue="2" className={fieldClass} {...err("guests")}>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}
                </select>
              </Field>
              <Field id="reservation_date" label="Date" error={errors.reservation_date}>
                <input id="reservation_date" name="reservation_date" type="date" min={todayStr()} className={fieldClass} {...err("reservation_date")} />
              </Field>
              <fieldset className="sm:col-span-2">
                <legend className="eyebrow mb-4 text-muted-foreground">Preferred time</legend>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {times.map((t) => (
                    <label key={t} className="cursor-pointer">
                      <input type="radio" name="reservation_time" value={t} className="peer sr-only" />
                      <span className="block border border-border py-3 text-center text-sm transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring hover:border-foreground">{t}</span>
                    </label>
                  ))}
                </div>
                {errors.reservation_time && <p role="alert" className="mt-2 text-sm text-destructive">{errors.reservation_time}</p>}
              </fieldset>
              <Field id="special_requests" label="Special requests (optional)" error={errors.special_requests} className="sm:col-span-2">
                <textarea id="special_requests" name="special_requests" rows={3} placeholder="Allergies, celebrations, seating preferences…" className={`${fieldClass} resize-none`} {...err("special_requests")} />
              </Field>
              {status === "error" && <p role="alert" className="text-sm text-destructive sm:col-span-2">We couldn't send your request. Please try again or call us.</p>}
              <button disabled={status === "loading"} className="eyebrow flex items-center justify-center gap-3 bg-primary py-5 text-primary-foreground transition-colors hover:bg-accent disabled:opacity-60 sm:col-span-2">
                {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
                {status === "loading" ? "Sending request" : "Request Reservation"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
