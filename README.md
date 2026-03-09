# 🏠 Harvin Properties — Website Documentation

> **Buy, Sell, Rent & Manage — All Under One Roof**
> A fully responsive, full-service real estate website for buyers, sellers, tenants, landlords, and property managers — with built-in analytics and an admin dashboard.

🌐 **Live site:** [harvinproperties.com](http://harvinproperties.com)
📦 **Repo:** [github.com/santvs/harvin-properties](https://github.com/santvs/harvin-properties)

---

## 📁 Project Structure

```
HarvinProperties/
├── index.html          ← Legacy homepage (original)
├── index2.html         ← ✅ MAIN homepage (Buy/Sell toggle, default active)
├── buy.html            ← Buy & Sell dedicated page (buyer/seller services)
├── about.html          ← Company story, mission, values, team
├── contact.html        ← Contact form (mailto-based) with info sidebar
├── features.html       ← Feature bento grid + pricing tiers
├── CNAME               ← Custom domain: harvinproperties.com
├── README.md
├── css/
│   └── styles.css      ← All styling, colours, layout, responsive rules
├── images/
│   └── vinutha.png     ← CEO headshot
├── js/
│   ├── theme.js        ← ThemeManager: 5 colour palettes, localStorage
│   ├── config.js       ← Site content: brand, team members, footer, user types
│   ├── analytics.js    ← Visitor tracking: page views, clicks, section views
│   └── app.js          ← All site logic: modals, forms, rendering, animations
└── admin/
    └── index.html      ← Analytics dashboard (password-protected admin view)
```

> **Main homepage is `index2.html`** — this is the file that GitHub Pages and harvinproperties.com serve via the CNAME redirect.

---

## 🏗️ Pages Overview

### `index2.html` — Homepage
The primary landing page with a **Buy & Sell / Rent toggle** in the hero. Buy & Sell is the default active mode.

- **Hero toggle** — Switches between Buy & Sell (purple) and Rent (blue) content, auth cards, and stats
- **Value Proposition** — Tabbed comparison table (Buy & Sell first, Renting second)
- **How It Works** — Tabbed steps for Buyers, Sellers, Landlords, Tenants, and Managers
- **CTA Band** — Links to contact and buy pages
- **Team section** — Rendered dynamically from `config.js`

### `buy.html` — Buy & Sell
Full-service real estate page covering all four buy-side services:
- Buyer representation (agent-assisted home search)
- Seller listing & representation
- Free home valuation / CMA
- Mortgage & financing referrals

### `about.html` — About
Company story, founding vision, mission statement, core values, and the team section.

### `contact.html` — Contact
Contact form that generates a `mailto:` email pre-filled with form data. Includes a success state, info sidebar (emails, phone, hours), and a map/service area card.

### `features.html` — Features
Bento-grid feature showcase with tabs: All Features / For Landlords / For Tenants / For Managers / Buy & Sell. Includes a 3-tier pricing section.

### `admin/index.html` — Admin Dashboard
Login: `admin` / `admin`. Five analytics pages covering traffic, clicks, section views, and auth/role data.

---

## 🎨 Theming

The site ships with **5 colour palettes** managed by `js/theme.js`:

| Theme | Primary Colour | Key Mood |
|-------|---------------|----------|
| `ocean` | Sky Blue `#0EA5E9` | Default / clean |
| `blaze` | Amber `#F59E0B` | Warm / energetic |
| `emerald` | Green `#10B981` | Fresh / natural |
| `midnight` | Dark navy | Professional / dark |
| `rose` | Pink-rose | Modern / friendly |

Switch themes via the palette picker in the navbar. The selected theme is saved to `localStorage` (`hp_site_theme`) and applied on every page load via `ThemeManager.init()` in the `<head>`.

**Buy & Sell accent colour** — Purple (`#8B5CF6`) is used throughout the buy-side experience and is independent of the site theme.

---

## 👥 User Roles

The site supports **five user roles** across two service lines:

### Rent & Manage
| Role | Icon | Accent | Description |
|------|------|--------|-------------|
| **Tenant** | 🏠 | Blue | Finds & rents a home |
| **Landlord** | 🏢 | Amber | Lists & manages property |
| **Manager** | 📋 | Green | Manages portfolios for owners |

### Buy & Sell
| Role | Icon | Accent | Description |
|------|------|--------|-------------|
| **Buyer** | 🔑 | Purple | Agent-assisted home search |
| **Seller** | 🏷️ | Red | Listing, marketing & sale |

---

## ✏️ How to Customise Content

All content lives in **`js/config.js`**.

### Change Company Name / Tagline
```js
const SITE_CONFIG = {
  name: "Harvin Properties",
  tagline: "Buy, Sell, Rent & Manage",
  description: "Your full-service real estate partner in the Pacific Northwest.",
};
```

### Update Team Members
```js
const TEAM_MEMBERS = [
  {
    name: "Vinutha Narayan",
    role: "CEO & Co-Founder",
    bio: "Licensed RE/MAX agent with deep Pacific Northwest market expertise.",
    photo: "images/vinutha.png",   // or null to show initials avatar
    avatar: "VN",
    accentColor: "#0EA5E9",
    linkedin: "https://remax-integrity.com/agents/1964848/Vinutha+Narayana",
  },
  // Add more members here
];
```

When `photo` is set, the card renders a `<img>` with `object-fit: cover`. When `photo` is `null`, it shows a coloured circle with the `avatar` initials.

### Update Footer Links
```js
const FOOTER_CONFIG = {
  columns: [
    { title: "Services", links: ["Buy a Home", "Sell a Home", "Rent", "Property Management"] },
    { title: "Company", links: ["About", "Contact", "Features"] },
  ],
  social: [
    { name: "LinkedIn", icon: "in", url: "https://linkedin.com/company/harvin" },
  ],
};
```

### Change Brand Colours
```css
/* css/styles.css */
:root {
  --blue:       #0EA5E9;   /* Primary brand / rent accent */
  --blue-dark:  #0284C7;
  --bg:         #F8FAFF;
  --text-primary: #0F172A;
}
```

The buy-side purple (`#8B5CF6`) is hardcoded inline throughout `index2.html` and `buy.html` — search for `#8B5CF6` to update it.

---

## 📊 Analytics System

All tracking uses the browser's `localStorage` — no external service or server needed.

### What Is Tracked
| Event | Description |
|-------|-------------|
| **Page Views** | Every page load |
| **Unique Sessions** | Estimated daily unique visitors |
| **Section Views** | Which sections users scroll to |
| **Link & Button Clicks** | Nav, auth pills, footer links, social links |
| **Login / Register Attempts** | Per role |
| **Role Interest** | Which role gets the most engagement |

### Admin Dashboard
Open `admin/index.html` → login `admin` / `admin`:
- **Dashboard** — Overview stats, 14-day chart, top clicks
- **Traffic** — Daily page views and sessions
- **Clicks** — Full click log + category donut chart
- **Section Views** — Engagement per section
- **Auth & Roles** — Login vs register counts, role breakdown

> ⚠️ Analytics data is per-browser/device. For shared analytics across all visitors, a backend server is required.

---

## 🌐 Deployment

**Live on:** [harvinproperties.com](http://harvinproperties.com) via GitHub Pages

### GitHub Pages Setup
- Repo: `github.com/santvs/harvin-properties` (public, `main` branch)
- `CNAME` file contains: `harvinproperties.com`
- GitHub Pages serves `index.html` by default — the main page is `index2.html`, so either rename it to `index.html` or keep the original `index.html` as a redirect

### GoDaddy DNS Records
| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |
| CNAME | www | santvs.github.io | 600 |

### Enable HTTPS
In GitHub → **Settings → Pages → Enforce HTTPS** ✅ (enable after DNS propagates)

---

## 🛠️ Quick Reference

| Task | Where |
|------|-------|
| Edit company name / tagline | `js/config.js` → `SITE_CONFIG` |
| Add / remove team members | `js/config.js` → `TEAM_MEMBERS` |
| Change footer links | `js/config.js` → `FOOTER_CONFIG` |
| Change brand colours | `css/styles.css` → `:root` |
| Change buy-side purple | Search `#8B5CF6` in `index2.html`, `buy.html` |
| Switch default hero mode | `index2.html` → `<body class="buy-mode">` and first `.mode-btn.active` |
| Add a team member photo | Drop image in `images/`, set `photo:` in `config.js` |
| View analytics | Open `admin/index.html` |
| Clear analytics data | Admin → **Clear Data** button (top right) |

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic, accessible, ARIA-labelled) |
| Styling | CSS3 with custom properties (no frameworks) |
| Logic | Vanilla JavaScript ES6+ (zero dependencies) |
| Fonts | Google Fonts — Playfair Display + Plus Jakarta Sans |
| Theming | Custom ThemeManager (5 palettes, localStorage) |
| Analytics | Custom-built, localStorage-based |
| Hosting | GitHub Pages (static) |

---

## 👨‍💼 Team

| Name | Role |
|------|------|
| **Vinutha Narayan** | CEO & Co-Founder — Licensed real estate agent |
| **Santosh** | CTO & Co-Founder — Engineering & product |
| **Disha** | Head of Product |

---

## 📞 Contact & Support

**Email:** hello@harvinproperties.com · listings@harvinproperties.com
**Phone:** (425) 555-0100 · Mon–Fri 9AM–6PM PT · Sat 10AM–4PM PT
**Service Area:** King & Pierce County, Pacific Northwest WA

### Roadmap / Next Steps
- [ ] Enable HTTPS on GitHub Pages
- [ ] Add last names, bios, and photos for Santosh and Disha
- [ ] Connect contact form to a real backend (e.g. Formspree, Resend)
- [ ] Build out buy-side agent profile pages
- [ ] Add property search / listings page
- [ ] Upgrade analytics to server-side (Plausible, Fathom, or custom)

---

*Last updated: March 2026 · Harvin Properties, Inc.*
