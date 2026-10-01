import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import scallops from "@/assets/dish-scallops.jpg";
import { menu, dietaryLabels } from "@/data/menu";
import { PageHero } from "@/components/site/PageHero";

const title = "Menu — Maison Ember";
const description = "Starters, hearth-cooked mains, signature dishes, desserts and cocktails. Our seasonal menu at Maison Ember.";

export const Route = createFileRoute("/menu")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }] }),
  component: MenuPage,
});

function MenuPage() {
  const [active, setActive] = useState(menu[0]!.id);
  const category = menu.find((c) => c.id === active)!;
  const photo = category.dishes.find((d) => d.image)?.image;

  return (
    <>
      <PageHero image={scallops} eyebrow="The Menu" title="Seasonal, and cooked over fire." height="h-[62svh]" />

      <div className="sticky top-[68px] z-30 border-b border-border bg-background/95 backdrop-blur">
        <div role="tablist" aria-label="Menu categories" className="mx-auto flex max-w-[1440px] gap-8 overflow-x-auto px-5 md:justify-center md:gap-14 md:px-10 [scrollbar-width:none]">
          {menu.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={active === c.id}
              onClick={() => setActive(c.id)}
              className={`eyebrow relative shrink-0 py-6 transition-colors ${active === c.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {c.title}
              {active === c.id && <motion.span layoutId="tab-line" className="absolute inset-x-0 bottom-0 h-px bg-accent" />}
            </button>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <AnimatePresence mode="wait">
          <motion.div key={active} role="tabpanel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow mb-4 text-accent">{category.note}</p>
              <h2 className="mb-14 text-5xl md:text-7xl">{category.title}</h2>
              <ul className="divide-y divide-border">
                {category.dishes.map((d) => (
                  <li key={d.name} className="py-7">
                    <div className="flex items-baseline gap-4">
                      <h3 className="text-2xl md:text-3xl">{d.name}</h3>
                      <span aria-hidden className="mb-1 flex-1 border-b border-dotted border-foreground/25" />
                      <span className="font-serif text-2xl">${d.price}</span>
                    </div>
                    <p className="mt-2 text-muted-foreground">{d.description}</p>
                    {d.dietary && (
                      <div className="mt-3 flex gap-2">
                        {d.dietary.map((t) => (
                          <abbr key={t} title={dietaryLabels[t]} className="eyebrow border border-border px-2 py-1 text-[0.6rem] no-underline text-muted-foreground">{t}</abbr>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            {photo && (
              <div className="hidden md:col-span-4 md:col-start-9 md:block">
                <div className="sticky top-44 aspect-[3/4] overflow-hidden">
                  <img src={photo} alt={category.dishes.find((d) => d.image)?.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-border pt-10 md:flex-row md:items-center">
          <p className="text-sm text-muted-foreground">V vegetarian · VG vegan · GF gluten free · N contains nuts. Please tell us about any allergies.</p>
          <Link to="/reservations" className="eyebrow bg-primary px-8 py-4 text-primary-foreground transition-colors hover:bg-accent">Reserve a Table</Link>
        </div>
      </section>
    </>
  );
}
