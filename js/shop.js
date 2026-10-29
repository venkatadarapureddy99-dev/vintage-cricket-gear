/* ============================================================
   shop.js - builds the product cards, handles filters and the basket.
   Flow: PRODUCTS (data) -> render() -> HTML cards on the page.
   When the user clicks a filter, we change `currentFilter` and call
   render() again. The page is always a function of the data + state.
   ============================================================ */

const grid = document.getElementById("productGrid");
const filtersEl = document.getElementById("filters");
const cartCountEl = document.getElementById("cartCount");

let currentFilter = "all"; // STATE: which filter chip is active
let currentEra = null;     // STATE: start year of the chosen decade, or null for "any era"
let basket = [];           // STATE: ids of products the user added

/* Draws a simple shirt in SVG using the product's two colours.
   Placeholder art so the prototype looks real without photos.
   In production you'd swap this for <img src="photo.jpg">. */
function shirtSVG(main, trim) {
  return `
  <svg viewBox="0 0 200 200" role="img" aria-label="Cricket shirt illustration">
    <path d="M70 20 L30 45 L10 95 L45 108 L52 85 L52 185 L148 185 L148 85 L155 108 L190 95 L170 45 L130 20 Q100 48 70 20Z"
          fill="${main}" stroke="rgba(0,0,0,.25)" stroke-width="2"/>
    <path d="M70 20 Q100 48 130 20 L122 18 Q100 38 78 18Z" fill="${trim}"/>
    <rect x="52" y="120" width="96" height="10" fill="${trim}" opacity=".9"/>
    <circle cx="100" cy="85" r="9" fill="${trim}" opacity=".9"/>
  </svg>`; // template literal (backticks) lets us drop ${variables} straight into the markup
}

/* Does this product match the active filter? Returns true/false. */
function matches(p) {
  // An era (e.g. 1990) set by the "Shop by Era" tiles in main.js narrows results to that decade
  if (currentEra !== null && !(p.year >= currentEra && p.year < currentEra + 10)) return false;
  switch (currentFilter) {
    case "all": return true;
    case "player": return p.player;      // player-issue shirts only
    case "sale": return p.was !== null;  // only items with an original price
    default: return p.size === currentFilter; // otherwise the filter is a size code like "M"
  }
}

/* Turns a number like 99.9 into "£99.90" using the browser's built-in currency formatter. */
const gbp = (n) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(n);

/* Builds the whole grid. Called once on load and again after every filter click. */
function render() {
  const list = PRODUCTS.filter(matches); // keep only matching products
  if (list.length === 0) {               // friendly empty state instead of a blank page
    grid.innerHTML = `<p class="empty">No shirts match that filter right now. New stock lands weekly!</p>`;
    return;
  }
  grid.innerHTML = list.map((p, i) => `
    <article class="card" style="animation-delay:${i * 60}ms"> <!-- stagger so cards pop in one by one -->
      <div class="card-img">
        ${p.player ? '<span class="badge">Player Issue</span>' : ""}
        ${p.was ? '<span class="badge sale">Sale</span>' : ""}
        ${shirtSVG(p.colors[0], p.colors[1])}
      </div>
      <div class="card-body">
        <h3 class="card-title">${p.title}</h3>
        <p class="card-meta">Size ${p.size} &middot; Condition ${p.grade}/10</p>
        <p class="price">${gbp(p.price)}${p.was ? `<s>${gbp(p.was)}</s>` : ""}</p>
        <button class="add" data-id="${p.id}" ${p.stock === 0 ? "disabled" : ""}>
          ${p.stock === 0 ? "Sold out" : "Add to basket"}
        </button>
      </div>
    </article>`).join(""); // .map makes one HTML string per product, .join glues them together
}

/* EVENT DELEGATION: one listener on the parent instead of one per chip. Fewer listeners = faster, and it works for chips added later. */
filtersEl.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip"); // find the chip even if a child element was clicked
  if (!chip) return;
  currentEra = null;                      // picking a chip clears any decade selection
  currentFilter = chip.dataset.filter;    // reads data-filter="M" from the HTML
  filtersEl.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === chip)); // highlight only the clicked chip
  render();
});

/* Same delegation idea for the Add to basket buttons. */
grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".add");
  if (!btn || btn.disabled) return;
  const id = Number(btn.dataset.id);                  // dataset values are strings, so convert to number
  if (basket.includes(id)) { toast("Already in your basket (one-off item)"); return; } // vintage = only one of each
  basket.push(id);
  cartCountEl.textContent = basket.length;
  cartCountEl.classList.remove("bump"); void cartCountEl.offsetWidth; cartCountEl.classList.add("bump"); // remove/reflow/add restarts the CSS animation
  toast("Added to basket");
});

render(); // first paint
