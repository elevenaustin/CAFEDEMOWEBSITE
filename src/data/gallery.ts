import hero from "@/assets/hero.jpg";
import chef from "@/assets/chef.jpg";
import scallops from "@/assets/dish-scallops.jpg";
import steak from "@/assets/dish-steak.jpg";
import dessert from "@/assets/dish-dessert.jpg";
import burrata from "@/assets/dish-burrata.jpg";
import cocktail from "@/assets/cocktail.jpg";
import hearth from "@/assets/hearth.jpg";
import dining from "@/assets/dining.jpg";

export type GalleryImage = { src: string; alt: string; shape: "portrait" | "landscape" | "square" };

export const gallery: GalleryImage[] = [
  { src: hero, alt: "Candlelit dining room with dark panelled walls", shape: "landscape" },
  { src: chef, alt: "Chef plating a dish with tweezers", shape: "portrait" },
  { src: scallops, alt: "Seared scallops with charred leek", shape: "square" },
  { src: hearth, alt: "Wood-fired hearth with cast iron pans", shape: "landscape" },
  { src: steak, alt: "Sliced dry-aged ribeye with roasted shallots", shape: "portrait" },
  { src: cocktail, alt: "Ember Sour cocktail on a marble bar", shape: "portrait" },
  { src: dining, alt: "Guests sharing plates by candlelight", shape: "landscape" },
  { src: dessert, alt: "Dark chocolate tart with burnt meringue", shape: "square" },
  { src: burrata, alt: "Burrata with heirloom tomatoes", shape: "portrait" },
];
