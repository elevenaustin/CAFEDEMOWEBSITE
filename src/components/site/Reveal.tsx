import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, className, y = 28 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Image that unveils with a clip-path wipe as it enters view. */
export function RevealImage({ src, alt, className, imgClassName, width, height, eager }: { src: string; alt: string; className?: string; imgClassName?: string; width?: number; height?: number; eager?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`overflow-hidden ${className ?? ""}`}
      initial={reduce ? false : { clipPath: "inset(12% 0 12% 0)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0 0% 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src={src} alt={alt} width={width} height={height} loading={eager ? "eager" : "lazy"} className={`h-full w-full object-cover ${imgClassName ?? ""}`} />
    </motion.div>
  );
}
