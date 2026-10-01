import scallops from "@/assets/dish-scallops.jpg";
import steak from "@/assets/dish-steak.jpg";
import dessert from "@/assets/dish-dessert.jpg";
import burrata from "@/assets/dish-burrata.jpg";
import cocktail from "@/assets/cocktail.jpg";

export type Dietary = "V" | "VG" | "GF" | "N";
export type Dish = { name: string; description: string; price: number; dietary?: Dietary[]; image?: string };
export type MenuCategory = { id: string; title: string; note: string; dishes: Dish[] };

export const dietaryLabels: Record<Dietary, string> = { V: "Vegetarian", VG: "Vegan", GF: "Gluten free", N: "Contains nuts" };

export const menu: MenuCategory[] = [
  {
    id: "starters", title: "Starters", note: "To begin, to share",
    dishes: [
      { name: "Burrata & Heirloom Tomato", description: "Basil oil, toasted hazelnut, smoked sea salt", price: 22, dietary: ["V", "GF", "N"], image: burrata },
      { name: "Ember-Roasted Beets", description: "Whipped feta, blood orange, pistachio dukkah", price: 18, dietary: ["V", "GF", "N"] },
      { name: "Beef Tartare", description: "Hand-cut striploin, cured yolk, grilled sourdough", price: 24 },
      { name: "Oysters, Half Dozen", description: "Mignonette, charred lemon, horseradish", price: 26, dietary: ["GF"] },
    ],
  },
  {
    id: "mains", title: "Main Courses", note: "From the hearth",
    dishes: [
      { name: "Hearth Half Chicken", description: "Brined 24 hours, salsa verde, crisp potatoes", price: 38, dietary: ["GF"] },
      { name: "Wild Mushroom Risotto", description: "Carnaroli, aged parmesan, brown butter", price: 34, dietary: ["V", "GF"] },
      { name: "Black Cod", description: "Miso glaze, charred bok choy, dashi beurre blanc", price: 46, dietary: ["GF"] },
      { name: "Lamb Shoulder", description: "Slow-cooked eight hours, smoked yoghurt, flatbread", price: 44 },
    ],
  },
  {
    id: "signature", title: "Signature Dishes", note: "What we are known for",
    dishes: [
      { name: "Seared Scallops", description: "Brown butter, charred leek, bonito crumb", price: 36, dietary: ["GF"], image: scallops },
      { name: "45-Day Dry-Aged Ribeye", description: "Bone marrow jus, roasted shallot, thyme", price: 92, dietary: ["GF"], image: steak },
      { name: "Coal-Baked Celeriac", description: "Truffle, hazelnut praline, sherry glaze", price: 32, dietary: ["VG", "GF", "N"] },
    ],
  },
  {
    id: "desserts", title: "Desserts", note: "A sweet ending",
    dishes: [
      { name: "Dark Chocolate Tart", description: "Burnt honey meringue, gold leaf, sea salt", price: 16, dietary: ["V"], image: dessert },
      { name: "Basque Cheesecake", description: "Caramelised top, seasonal compote", price: 15, dietary: ["V"] },
      { name: "Grilled Peach", description: "Brown sugar, vanilla gelato, almond crumble", price: 14, dietary: ["V", "GF", "N"] },
    ],
  },
  {
    id: "beverages", title: "Beverages", note: "Cocktails, wine & more",
    dishes: [
      { name: "Ember Sour", description: "Smoked bourbon, orange, demerara, egg white", price: 19, image: cocktail },
      { name: "Garden Spritz", description: "Elderflower, cucumber, sparkling wine", price: 17 },
      { name: "Sommelier's Glass", description: "Ask for today's selection by the glass", price: 18 },
      { name: "Zero-Proof Highball", description: "Seedlip, yuzu, tonic, rosemary", price: 12, dietary: ["VG"] },
    ],
  },
];
