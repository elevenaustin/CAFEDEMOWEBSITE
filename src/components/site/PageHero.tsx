import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function PageHero({ image, eyebrow, title, intro, height = "h-[78svh]" }: { image: string; eyebrow: string; title: string; intro?: string; height?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  return (
    <section ref={ref} className={`relative ${height} min-h-[520px] overflow-hidden bg-ink text-ink-foreground`}>
      <motion.img style={{ y }} src={image} alt="" className="absolute inset-0 h-[115%] w-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40" />
      <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-16 md:px-10 md:pb-24">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="eyebrow mb-6 text-brass">{eyebrow}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }} className="max-w-4xl text-5xl leading-[0.95] md:text-8xl">
          {title}
        </motion.h1>
        {intro && <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.9 }} className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted md:text-lg">{intro}</motion.p>}
      </div>
    </section>
  );
}
