import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, restaurant } from "@/data/restaurant";

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overHero = !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          overHero ? "bg-transparent py-6" : "bg-ink/95 py-3 backdrop-blur-md"
        } text-ink-foreground`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 md:px-10">
          <Link to="/" className="font-serif text-2xl tracking-wide md:text-[1.7rem]">
            {restaurant.name}
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
            {navLinks.filter((l) => l.to !== "/" && l.to !== "/reservations").map((l) => (
              <Link key={l.to} to={l.to} className="eyebrow link-line pb-1 opacity-80 transition-opacity hover:opacity-100" activeProps={{ className: "opacity-100" }}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/reservations" className="eyebrow hidden border border-ink-foreground/50 px-5 py-3 transition-colors hover:bg-ink-foreground hover:text-ink sm:inline-block">
              Reserve a Table
            </Link>
            <button onClick={() => setOpen(true)} className="flex h-11 w-11 items-center justify-center lg:hidden" aria-label="Open menu" aria-expanded={open}>
              <Menu className="h-6 w-6" strokeWidth={1.25} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-ink text-ink-foreground"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between px-5 py-6">
              <span className="font-serif text-2xl">{restaurant.name}</span>
              <button onClick={() => setOpen(false)} className="flex h-11 w-11 items-center justify-center" aria-label="Close menu">
                <X className="h-6 w-6" strokeWidth={1.25} />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-2 px-6">
              {navLinks.map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06, duration: 0.6 }}>
                  <Link to={l.to} className="block py-2 font-serif text-5xl" activeProps={{ className: "italic text-brass" }} activeOptions={{ exact: true }}>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="space-y-4 px-6 pb-10">
              <Link to="/reservations" className="eyebrow block bg-brass py-5 text-center text-ink">Reserve a Table</Link>
              <p className="text-sm text-ink-muted">{restaurant.address.street}, {restaurant.address.city} · {restaurant.phone}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
