# Wild Bean Coffee — Website

This project is a small, responsive multi-page website for a coffee shop called "Wild Bean Coffee." It uses Tailwind CSS via the CDN for utility-first styling and a compact JavaScript file for interactivity.

Files
- index.html — Home page with hero, menu highlights, gallery, newsletter, and a client-side cart modal.
- about.html — Story, mission, timeline, and team.
- contact.html — Contact form, location details, and hours.
- script.js — Shared JavaScript for menu filtering, cart logic (stored in localStorage), and simple form handlers.

Key Features
- Full-width responsive layout: All main wrappers use w-full / max-w-none to fill the viewport width on all devices.
- Tailwind CSS classes are used directly in the HTML for styling.
- Google Fonts: Poppins (body) and Playfair Display (headings).
- Image placeholders use the format required by the asset system: {{image: description}} — replaceable by an automated image fetcher.
- Interactive menu filtering and a simple cart (add items, increase/decrease quantity, checkout simulation).
- Contact form and newsletter subscription (simulated; no backend).
- Mobile-friendly navigation and layout.

How to use
1. Open index.html in a browser to view the site locally. Because Tailwind is loaded via CDN, no build step is required.
2. All pages are linked via relative paths: index.html, about.html, and contact.html.

Notes
- Images are placeholders in the format `{{image: description}}`. The system that consumes this project will replace them with actual image URLs.
- The cart logic is client-side only. Checkout is simulated and does not process payments.
- Tailwind CDN is used for convenience. For production, consider compiling Tailwind for better performance and purging unused styles.

Customization
- Edit text and prices directly in the HTML.
- Add or remove menu items by duplicating/removing the <article class="menu-item"> blocks in index.html.
- Update script.js for custom behavior or to connect to a backend API for orders and forms.

Enjoy building your coffee shop site!
