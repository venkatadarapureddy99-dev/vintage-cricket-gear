/* ============================================================
   products.js - the DATA for the shop (separate from the code).
   Why separate? When you move to WooCommerce/Shopify later, this
   list is replaced by their database, and the rest of the code
   barely changes. This pattern is called "separation of concerns".

   Each product is an OBJECT with the fields below.
   NOTE: these are SAMPLE items for the prototype. Replace with your
   real stock and your own photos.
   ============================================================ */

const PRODUCTS = [
  {
    id: 1,                      // unique number so we can find the product again when it's added to the basket
    title: "England ODI 1997",  // shown on the card
    team: "England",
    year: 1997,
    size: "XL",                 // one of S, M, L, XL
    grade: 10,                  // condition out of 10
    player: false,              // true = match/player-issue shirt
    price: 199.99,              // current price in GBP
    was: null,                  // original price if on sale, otherwise null
    stock: 1,                   // 0 = sold out (vintage items are usually one-offs)
    colors: ["#0b2a6b", "#c8102e"] // [main colour, trim colour] used to paint the placeholder shirt
  },
  { id: 2, title: "Hampshire One Day 1995", team: "Hampshire", year: 1995, size: "L", grade: 9.5, player: false, price: 99.99, was: null, stock: 1, colors: ["#1b3a8a", "#f2c200"] },
  { id: 3, title: "Northamptonshire One Day 1993", team: "Northamptonshire", year: 1993, size: "XL", grade: 9.5, player: true, price: 299.99, was: null, stock: 1, colors: ["#6b1230", "#f5e6b3"] },
  { id: 4, title: "Yorkshire One Day 1995", team: "Yorkshire", year: 1995, size: "XL", grade: 9.5, player: false, price: 99.99, was: null, stock: 1, colors: ["#fff8e0", "#6b1230"] },
  { id: 5, title: "England Training 2012", team: "England", year: 2012, size: "M", grade: 10, player: false, price: 39.99, was: 59.99, stock: 1, colors: ["#0b1f4b", "#8fb8ff"] },
  { id: 6, title: "Sri Lanka ODI 2004", team: "Sri Lanka", year: 2004, size: "XL", grade: 9.5, player: false, price: 49.99, was: null, stock: 1, colors: ["#1a2e8f", "#f2b705"] },
  { id: 7, title: "South Africa World Cup 1999", team: "South Africa", year: 1999, size: "XL", grade: 10, player: true, price: 199.99, was: null, stock: 0, colors: ["#0d6b3a", "#f2c200"] },
  { id: 8, title: "New Zealand Travel 2000s", team: "New Zealand", year: 2003, size: "S", grade: 9, player: false, price: 24.99, was: 34.99, stock: 1, colors: ["#101010", "#d9d9d9"] },
  { id: 9, title: "Kent One Day 1993", team: "Kent", year: 1993, size: "L", grade: 9.5, player: false, price: 99.99, was: null, stock: 1, colors: ["#d8d8d8", "#0b2a6b"] },
  { id: 10, title: "Middlesex One Day 1997", team: "Middlesex", year: 1997, size: "L", grade: 10, player: false, price: 114.99, was: null, stock: 1, colors: ["#0b2a6b", "#c8102e"] },
  { id: 11, title: "Australia ODI 2007", team: "Australia", year: 2007, size: "M", grade: 9.5, player: false, price: 54.99, was: null, stock: 1, colors: ["#f2c200", "#0d6b3a"] },
  { id: 12, title: "Yorkshire Training Trousers 2021", team: "Yorkshire", year: 2021, size: "M", grade: 10, player: false, price: 19.99, was: 29.99, stock: 1, colors: ["#0b1f4b", "#f5f5f5"] }
];
