import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import hero from "@/assets/hero.jpg";
import chef from "@/assets/chef.jpg";
import hearth from "@/assets/hearth.jpg";
import { menu } from "@/data/menu";
import { gallery } from "@/data/gallery";
import { restaurant } from "@/data/restaurant";
import { Reveal, RevealImage } from "@/components/site/Reveal";
import { ReserveBand } from "@/components/site/ReserveBand";

const title = "Maison Ember — Wood-Fired Dining in Toronto";
const description = "A modern hearth restaurant cooking seasonal produce over open flame. Reserve a table for an unhurried evening by the fire.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: restaurant.name,
          servesCuisine: restaurant.cuisine,
          telephone: restaurant.phone,
          address: { "@type": "PostalAddress", streetAddress: restaurant.address.street, addressLocality: restaurant.address.city, addressRegion: restaurant.address.region, postalCode: restaurant.address.postal, addressCountry: restaurant.address.country },
          acceptsReservations: true,
        }),
      },
    ],
  }),
  component: Home,
});

const ease = [0.22, 1, 0.36, 1] as const;

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  return (
    <section ref={ref} className="relative h-[100svh] min-h-[600px] overflow-hidden bg-ink text-ink-foreground">
      <motion.img style={{ y, scale }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6 }} src={hero} alt="Candlelit dining room at Maison Ember" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-[30%_center]" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-ink/50" />
      <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-24 md:px-10 md:pb-28">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9 }} className="eyebrow mb-6 text-brass">
          {restaurant.cuisine} · {restaurant.address.city}
        </motion.p>
        <h1 className="overflow-hidden text-[18vw] leading-[0.85] md:text-[10.5rem]">
          <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.5, duration: 1.2, ease }} className="block">Maison</motion.span>
        </h1>
        <h1 aria-hidden className="overflow-hidden text-[18vw] italic leading-[0.9] md:pl-[12vw] md:text-[10.5rem]">
          <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.65, duration: 1.2, ease }} className="block">Ember</motion.span>
        </h1>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.9 }} className="max-w-sm text-lg leading-relaxed text-ink-muted">{restaurant.tagline}</motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.9 }} className="flex flex-col gap-3 sm:flex-row">
            <Link to="/reservations" className="eyebrow bg-brass px-8 py-5 text-center text-ink transition-colors hover:bg-ink-foreground">Reserve a Table</Link>
            <Link to="/menu" className="eyebrow border border-ink-foreground/40 px-8 py-5 text-center transition-colors hover:bg-ink-foreground hover:text-ink">Explore Our Menu</Link>
          </motion.div>
        </div>
      </div>
      <motion.div aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="eyebrow text-[0.6rem] text-ink-muted">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-ink-foreground/50" />
      </motion.div>
    </section>
  );
}

function Home() {
  const signature = menu.find((c) => c.id === "signature")!.dishes.filter((d) => d.image);
  const featured = [...signature, menu.find((c) => c.id === "desserts")!.dishes[0]!];
  return (
    <>
      <Hero />

      {/* Introduction */}
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:gap-8 md:px-10 md:py-40">
        <div className="md:col-span-5 md:col-start-1 md:pt-24">
          <Reveal>
            <p className="eyebrow mb-8 text-accent">Welcome</p>
            <h2 className="text-5xl leading-[0.95] md:text-7xl">Cooking with <em>one fire</em>, and everything it teaches us.</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-10 max-w-md text-lg leading-relaxed text-muted-foreground">
              Every plate at Maison Ember passes through the hearth — embers for roasting, flame for searing, smoke for depth. We buy from growers we know by name and let the season write the menu.
            </p>
            <Link to="/story" className="eyebrow link-line mt-10 inline-block pb-1">Discover Our Story →</Link>
          </Reveal>
        </div>
        <div className="relative md:col-span-6 md:col-start-7">
          <RevealImage src={chef} alt="Our chef plating a dish" width={896} height={1152} className="aspect-[4/5]" />
          <RevealImage src={hearth} alt="The wood-fired hearth" width={1600} height={1024} className="absolute -bottom-12 -left-6 hidden aspect-[4/3] w-1/2 border-8 border-background md:-left-24 md:block" />
        </div>
      </section>

      {/* Signature dishes */}
      <section className="bg-ink py-24 text-ink-foreground md:py-36">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <Reveal className="mb-20 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-6 text-brass">Signature Dishes</p>
              <h2 className="max-w-2xl text-5xl leading-none md:text-7xl">From the hearth, to the table.</h2>
            </div>
            <Link to="/menu" className="eyebrow link-line self-start pb-1 md:self-end">View Full Menu →</Link>
          </Reveal>
          <div className="space-y-24 md:space-y-32">
            {featured.map((d, i) => (
              <article key={d.name} className={`grid items-center gap-8 md:grid-cols-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className={`group overflow-hidden md:col-span-7 ${i % 2 ? "md:col-start-6" : ""}`}>
                  <RevealImage src={d.image!} alt={d.name} className="aspect-[4/3]" imgClassName="transition-transform duration-[1.4s] ease-out group-hover:scale-105" />
                </div>
                <Reveal className={`md:col-span-4 ${i % 2 ? "md:col-start-1 md:row-start-1" : "md:col-start-9"}`} delay={0.1}>
                  <span className="font-serif text-2xl italic text-brass">0{i + 1}</span>
                  <h3 className="mt-4 text-4xl md:text-5xl">{d.name}</h3>
                  <p className="mt-4 text-ink-muted">{d.description}</p>
                  <p className="mt-6 font-serif text-2xl">${d.price}</p>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery teaser */}
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <Reveal className="mb-14 flex items-end justify-between">
          <h2 className="text-5xl md:text-7xl">Moments at <em>Ember</em></h2>
          <Link to="/gallery" className="eyebrow link-line hidden pb-1 md:inline-block">Full Gallery →</Link>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5">
          <RevealImage src={gallery[3]!.src} alt={gallery[3]!.alt} className="col-span-2 aspect-[16/10] md:col-span-7" />
          <RevealImage src={gallery[5]!.src} alt={gallery[5]!.alt} className="aspect-[3/4] md:col-span-3 md:mt-24" />
          <RevealImage src={gallery[7]!.src} alt={gallery[7]!.alt} className="aspect-[3/4] md:col-span-2 md:aspect-square md:self-end" />
        </div>
        <Link to="/gallery" className="eyebrow link-line mt-10 inline-block pb-1 md:hidden">Full Gallery →</Link>
      </section>

      <ReserveBand />
    </>
  );
}
