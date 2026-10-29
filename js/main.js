/* ============================================================
   main.js - small site-wide behaviours: header shadow, scroll
   reveal, toast pop-up, era shortcuts, newsletter form, footer year.
   ============================================================ */

/* ---- Toast: shows a message for 2 seconds. Global so shop.js can call it. ---- */
const toastEl = document.getElementById("toast");
let toastTimer; // remembers the timeout so quick repeat clicks don't hide the toast early
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2000);
}

/* ---- Header gets a shadow once the page is scrolled ---- */
const header = document.getElementById("siteHeader");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 10); // toggle(class, condition) adds or removes in one line
}, { passive: true }); // passive: promises we won't block scrolling = smoother on phones

/* ---- Scroll reveal: fade elements in when they enter the viewport ---- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // reveal once, then stop watching (saves work)
    }
  });
}, { threshold: 0.15 }); // trigger when 15% of the element is visible
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* ---- Era tiles: jump to the shop and show that decade's shirts ---- */
document.querySelectorAll(".era").forEach((tile) => {
  tile.addEventListener("click", () => {
    const decade = Number(tile.dataset.era.slice(0, 4)); // "1990s" -> 1990
    // Reuse the shop's own state (declared in shop.js) and redraw the grid
    currentEra = decade;
    currentFilter = "all";
    document.querySelectorAll("#filters .chip").forEach((c) => c.classList.toggle("active", c.dataset.filter === "all"));
    render();
    toast("Showing shirts from the " + tile.dataset.era);
  });
});

/* ---- Newsletter form: validate, then fake-submit (prototype has no server) ---- */
const form = document.getElementById("signupForm");
const msg = document.getElementById("formMsg");
form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop the browser reloading the page
  const email = document.getElementById("email").value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // simple "something@something.tld" check
  msg.className = "form-msg " + (valid ? "ok" : "err");
  msg.textContent = valid ? "Thanks! You're on the list." : "Please enter a valid email address.";
  if (valid) form.reset();
  // TODO for production: send `email` to Mailchimp/Klaviyo, or a WordPress/WooCommerce endpoint
});

/* ---- Footer year updates itself so you never have to edit it again ---- */
document.getElementById("year").textContent = new Date().getFullYear();
