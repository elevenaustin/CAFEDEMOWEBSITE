import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { gallery } from "@/data/gallery";
import { Reveal } from "@/components/site/Reveal";
import { ReserveBand } from "@/components/site/ReserveBand";

const title = "Gallery — Maison Ember";
const description = "Inside Maison Ember: the hearth, the dining room, and the dishes that come out of the fire.";

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }] }),
  component: GalleryPage,
});

const aspect = { portrait: "aspect-[3/4]", landscape: "aspect-[4/3]", square: "aspect-square" };

function GalleryPage() {
  const [index, setIndex] = useState<number | null>(null);
  const close = () => setIndex(null);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + gallery.length) % gallery.length)), []);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [index, step]);

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 pt-40 pb-16 md:px-10 md:pt-52">
        <Reveal>
          <p className="eyebrow mb-6 text-accent">Gallery</p>
          <h1 className="max-w-4xl text-6xl leading-[0.9] md:text-9xl">Smoke, flame & <em>candlelight.</em></h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-28 md:px-10">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {gallery.map((img, i) => (
            <Reveal key={img.src + i} delay={(i % 3) * 0.08} className="mb-5 break-inside-avoid">
              <button onClick={() => setIndex(i)} className={`group relative block w-full overflow-hidden ${aspect[img.shape]}`} aria-label={`Open image: ${img.alt}`}>
                <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 to-transparent p-5 text-left text-sm text-ink-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100">{img.alt}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {index !== null && (
          <motion.div role="dialog" aria-modal="true" aria-label="Image viewer" className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 text-ink-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
            <button onClick={close} className="absolute top-5 right-5 flex h-12 w-12 items-center justify-center" aria-label="Close"><X strokeWidth={1.25} /></button>
            <button onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-2 flex h-12 w-12 items-center justify-center md:left-8" aria-label="Previous image"><ChevronLeft strokeWidth={1.25} className="h-8 w-8" /></button>
            <motion.figure key={index} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="max-h-[85vh] max-w-[85vw]" onClick={(e) => e.stopPropagation()}>
              <img src={gallery[index]!.src} alt={gallery[index]!.alt} className="max-h-[78vh] w-auto object-contain" />
              <figcaption className="mt-4 flex justify-between gap-6 text-sm text-ink-muted"><span>{gallery[index]!.alt}</span><span>{index + 1} / {gallery.length}</span></figcaption>
            </motion.figure>
            <button onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-2 flex h-12 w-12 items-center justify-center md:right-8" aria-label="Next image"><ChevronRight strokeWidth={1.25} className="h-8 w-8" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <ReserveBand />
    </>
  );
}
