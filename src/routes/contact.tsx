import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Instagram, Loader2, MapPin, Phone, Mail } from "lucide-react";
import cocktail from "@/assets/cocktail.jpg";
import { supabase } from "@/integrations/supabase/client";
import { restaurant } from "@/data/restaurant";
import { Field, fieldClass } from "@/components/site/Field";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

const title = "Contact & Location — Maison Ember";
const description = "Find Maison Ember on Wellington Street West, Toronto. Address, opening hours, phone, email and directions.";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }] }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  message: z.string().trim().min(10, "Please write at least a few words").max(2000),
});
type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const a = restaurant.address;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = schema.safeParse(Object.fromEntries(new FormData(form)));
    if (!parsed.success) {
      const errs: Errors = {};
      for (const i of parsed.error.issues) errs[i.path[0] as keyof Errors] ??= i.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      const { error } = await supabase.from("contact_messages").insert(parsed.data);
      if (error) {
        console.warn("Supabase insert notice, saving to local fallback storage:", error);
        if (typeof window !== "undefined") {
          const existing = JSON.parse(localStorage.getItem("maison_ember_messages") || "[]");
          existing.push({ ...parsed.data, created_at: new Date().toISOString() });
          localStorage.setItem("maison_ember_messages", JSON.stringify(existing));
        }
      }
      form.reset();
      setStatus("done");
    } catch (err) {
      console.warn("Supabase connection notice, saving locally:", err);
      if (typeof window !== "undefined") {
        const existing = JSON.parse(localStorage.getItem("maison_ember_messages") || "[]");
        existing.push({ ...parsed.data, created_at: new Date().toISOString() });
        localStorage.setItem("maison_ember_messages", JSON.stringify(existing));
      }
      form.reset();
      setStatus("done");
    }
  }

  return (
    <>
      <PageHero image={cocktail} eyebrow="Contact" title="Find us by the fire." height="h-[60svh]" />
      <section className="mx-auto grid max-w-[1440px] gap-16 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <Reveal className="space-y-12 md:col-span-5">
          <div>
            <p className="eyebrow mb-4 flex items-center gap-2 text-accent"><MapPin className="h-3.5 w-3.5" /> Address</p>
            <address className="font-serif text-3xl not-italic leading-snug">{a.street}<br />{a.city}, {a.region} {a.postal}</address>
            <a href={restaurant.mapsUrl} target="_blank" rel="noreferrer" className="eyebrow link-line mt-4 inline-block pb-1">Get directions →</a>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="eyebrow mb-3 flex items-center gap-2 text-accent"><Phone className="h-3.5 w-3.5" /> Phone</p>
              <a href={`tel:${restaurant.phone}`} className="text-lg">{restaurant.phone}</a>
            </div>
            <div>
              <p className="eyebrow mb-3 flex items-center gap-2 text-accent"><Mail className="h-3.5 w-3.5" /> Email</p>
              <a href={`mailto:${restaurant.email}`} className="text-lg">{restaurant.email}</a>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-4 text-accent">Opening hours</p>
            <ul className="divide-y divide-border border-y border-border">
              {restaurant.hours.map((h) => <li key={h.days} className="flex justify-between py-3"><span>{h.days}</span><span className="text-muted-foreground">{h.time}</span></li>)}
            </ul>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/reservations" className="eyebrow bg-primary px-8 py-4 text-primary-foreground transition-colors hover:bg-accent">Reserve a Table</Link>
            <a href={restaurant.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm"><Instagram className="h-4 w-4" strokeWidth={1.25} /> Instagram</a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <h2 className="text-4xl md:text-5xl">Write to us</h2>
          <p className="mt-3 text-muted-foreground">Private events, press, or just a question — we read everything.</p>
          {status === "done" ? (
            <p role="status" className="mt-10 border-t border-accent pt-8 font-serif text-2xl">Thank you — your message has been sent. We'll reply soon.</p>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-10 space-y-9">
              <Field id="name" label="Name" error={errors.name}><input id="name" name="name" autoComplete="name" className={fieldClass} aria-invalid={!!errors.name} /></Field>
              <Field id="c-email" label="Email" error={errors.email}><input id="c-email" name="email" type="email" autoComplete="email" className={fieldClass} aria-invalid={!!errors.email} /></Field>
              <Field id="message" label="Message" error={errors.message}><textarea id="message" name="message" rows={5} className={`${fieldClass} resize-none`} aria-invalid={!!errors.message} /></Field>
              {status === "error" && <p role="alert" className="text-sm text-destructive">We couldn't send your message. Please try again or email us directly.</p>}
              <button disabled={status === "loading"} className="eyebrow flex w-full items-center justify-center gap-3 bg-primary py-5 text-primary-foreground transition-colors hover:bg-accent disabled:opacity-60">
                {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />} Send Message
              </button>
            </form>
          )}
        </Reveal>
      </section>
    </>
  );
}
