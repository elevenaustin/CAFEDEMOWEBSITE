import { createFileRoute } from "@tanstack/react-router";
import hearth from "@/assets/hearth.jpg";
import chef from "@/assets/chef.jpg";
import dining from "@/assets/dining.jpg";
import burrata from "@/assets/dish-burrata.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, RevealImage } from "@/components/site/Reveal";
import { ReserveBand } from "@/components/site/ReserveBand";

const title = "Our Story — Maison Ember";
const description = "How one wood fire, a handful of growers and a small team became Maison Ember. Meet our chef and our philosophy.";

export const Route = createFileRoute("/story")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }] }),
  component: Story,
});

const pillars = [
  { n: "I", title: "Fire first", text: "No gas burners on the line. Everything is coaxed from oak and maple embers — slower, and far more alive." },
  { n: "II", title: "Grown nearby", text: "Most of what we cook travels fewer than 150 kilometres, from farms we visit every season." },
  { n: "III", title: "Unhurried", text: "We seat fewer tables than we could, so every evening has space to breathe." },
];

function Story() {
  return (
    <>
      <PageHero image={hearth} eyebrow="Our Story" title="A dining room built around a fire." intro="Maison Ember opened in 2019 with a single idea: that the oldest way of cooking could still feel new." />

      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="eyebrow mb-8 text-accent">Philosophy</p>
          <p className="font-serif text-3xl leading-snug md:text-5xl">
            “We cook the way you would at home if home had a hearth, a cellar and a few extra hours. <em>Honest ingredients, patient heat, generous plates.</em>”
          </p>
        </Reveal>
        <div className="mt-24 grid gap-12 md:grid-cols-3 md:gap-10">
          {pillars.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.1} className="border-t border-foreground/20 pt-8">
              <span className="font-serif text-xl italic text-accent">{p.n}</span>
              <h3 className="mt-3 text-3xl">{p.title}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 pb-24 md:grid-cols-12 md:px-10 md:pb-36">
        <RevealImage src={dining} alt="Guests sharing plates at a candlelit table" className="aspect-[4/3] md:col-span-7" />
        <Reveal className="md:col-span-4 md:col-start-9">
          <p className="eyebrow mb-6 text-accent">How it began</p>
          <h2 className="text-4xl leading-tight md:text-5xl">From a backyard grill to Wellington Street.</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            What started as weekend suppers for friends — a borrowed grill, long tables, too much wine — became a restaurant when a former smokehouse came up for lease. We kept the brick, built the hearth by hand, and opened with eleven dishes.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">Today the menu changes with every season, but that first fire has never gone out.</p>
        </Reveal>
      </section>

      <section className="bg-ink py-24 text-ink-foreground md:py-36">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 md:grid-cols-12 md:px-10">
          <Reveal className="order-2 md:order-1 md:col-span-5">
            <p className="eyebrow mb-6 text-brass">The Chef</p>
            <h2 className="text-5xl leading-none md:text-7xl">Julien <em>Moreau</em></h2>
            <p className="mt-8 leading-relaxed text-ink-muted">
              Trained in Lyon and San Sebastián, Julien spent a decade cooking over fire across Europe before returning home. His cooking is precise but never fussy — built on smoke, acidity and the confidence to leave a beautiful ingredient alone.
            </p>
            <p className="mt-6 font-serif text-2xl italic text-brass">“The fire decides. I just listen.”</p>
          </Reveal>
          <div className="order-1 grid grid-cols-5 gap-4 md:order-2 md:col-span-6 md:col-start-7">
            <RevealImage src={chef} alt="Chef Julien Moreau plating" className="col-span-3 aspect-[3/4]" />
            <RevealImage src={burrata} alt="Seasonal starter" className="col-span-2 mt-20 aspect-[3/4]" />
          </div>
        </div>
      </section>

      <ReserveBand title="Come and sit by our fire." />
    </>
  );
}
