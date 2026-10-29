# Vintage Cricket Gear (prototype)

Animated, Union Jack-themed storefront home page for vintagecricketgear.com.
Built with plain HTML, CSS and JavaScript. Every file has line-by-line comments explaining what and why.

## Run it locally

```bash
python3 serve.py
```

Then open http://localhost:8000. Edits in VS Code show up on refresh.

## Project layout

| File | Job |
|---|---|
| `index.html` | Page structure and SEO tags |
| `css/styles.css` | All styling, animations, responsive rules |
| `js/products.js` | Sample product data (replace with real stock) |
| `js/flag.js` | Waving flag animation (SVG filter + requestAnimationFrame) |
| `js/shop.js` | Product cards, filters, basket |
| `js/main.js` | Scroll reveal, toast, newsletter form, era tiles |
| `serve.py` | Local preview server |

## Roadmap to a live store (GoDaddy)

1. Finish and approve the prototype design.
2. Buy GoDaddy WordPress hosting and install WooCommerce.
3. Convert this design into a WordPress theme (`header.php`, `front-page.php`, `style.css`), replacing `products.js` with WooCommerce products.
4. Point vintagecricketgear.com at the hosting, add real photos and payments.

## Portfolio talking points

- Pure CSS/SVG animation (no libraries), respects `prefers-reduced-motion`
- Accessible: skip link, focus styles, ARIA labels, semantic HTML
- SEO: title, meta description, Open Graph tags
- Data separated from rendering; event delegation; IntersectionObserver for performance
