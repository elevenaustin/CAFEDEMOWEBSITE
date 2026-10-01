// Placeholder brand details — replace with the real restaurant's information.
export const restaurant = {
  name: "Maison Ember",
  tagline: "Fire, season and patience — cooked over open flame.",
  cuisine: "Modern hearth cuisine",
  address: { street: "214 Wellington Street West", city: "Toronto", region: "ON", postal: "M5V 3C2", country: "CA" },
  phone: "+1 (416) 555-0148",
  email: "hello@maisonember.com",
  instagram: "https://instagram.com/",
  mapsUrl: "https://maps.google.com/?q=214+Wellington+Street+West+Toronto",
  hours: [
    { days: "Tuesday – Thursday", time: "5:00 pm – 10:30 pm" },
    { days: "Friday – Saturday", time: "5:00 pm – 11:30 pm" },
    { days: "Sunday", time: "4:30 pm – 9:30 pm" },
    { days: "Monday", time: "Closed" },
  ],
};

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/story", label: "Our Story" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reservations", label: "Reservations" },
  { to: "/contact", label: "Contact" },
] as const;
