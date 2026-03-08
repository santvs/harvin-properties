# 🏠 Harvin Properties — Website Documentation

> **Your Home, Our Priority**
> A fully responsive property management website for tenants, landlords, and property managers — with built-in analytics and an admin dashboard.

---

## 📁 Project Structure

```
HarvinProperties/
├── index.html          ← Main homepage (open this in your browser)
├── css/
│   └── styles.css      ← All styling, colours, layout, responsive rules
├── js/
│   ├── config.js       ← Site content: brand name, team, footer links, user types
│   ├── analytics.js    ← Visitor tracking: page views, clicks, section views
│   └── app.js          ← All site logic: modals, forms, rendering, animations
└── admin/
    └── index.html      ← Analytics dashboard (admin view)
```

---

## 🚀 Getting Started

### Open Locally
1. Navigate to the `HarvinProperties` folder on your computer
2. Double-click **`index.html`** to open in your browser
3. No server, no install, no dependencies required — it runs entirely in the browser

### Open the Admin Dashboard
1. From the homepage, click **📊 Analytics** in the navigation bar, **or**
2. Open `admin/index.html` directly in your browser

---

## ✏️ How to Customise Content

All website content lives in **`js/config.js`** — you never need to touch the HTML or CSS for content changes.

### Change the Company Name / Tagline
```js
const SITE_CONFIG = {
  name: "Harvin Properties",
  tagline: "Your Home, Our Priority",
  description: "Harvin Properties connects tenants, landlords, and managers...",
  heroImage: "https://...",   // URL of the hero background image
  year: new Date().getFullYear(),
};
```

### Update Team Members
Find the `TEAM_MEMBERS` array in `config.js` and edit or add entries:
```js
{
  name: "Jane Smith",
  role: "Head of Operations",
  bio: "Short bio about this person goes here.",
  avatar: "JS",           // 2-letter initials shown in the avatar circle
  accentColor: "#0EA5E9", // Hex colour for this card's accent
  linkedin: "https://linkedin.com/in/janesmith",
  twitter: "https://twitter.com/janesmith",
},
```

### Update Footer Links
Find the `FOOTER_CONFIG` object in `config.js`:
```js
const FOOTER_CONFIG = {
  columns: [
    { title: "Platform", links: ["Features", "Pricing", ...] },
    { title: "For Tenants", links: ["Find a Home", ...] },
    ...
  ],
  social: [
    { name: "Twitter", icon: "𝕏", url: "https://twitter.com/harvinproperties" },
    { name: "LinkedIn", icon: "in", url: "https://linkedin.com/company/harvin" },
  ],
};
```

### Change Brand Colours
Open `css/styles.css` and edit the CSS variables at the top:
```css
:root {
  --blue:       #0EA5E9;  /* Primary brand colour */
  --blue-dark:  #0284C7;  /* Hover state */
  --amber:      #F59E0B;  /* Landlord accent */
  --bg:         #F8FAFF;  /* Page background */
  --text-primary: #0F172A; /* Main text colour */
}
```

---

## 🔐 User Roles & Login / Registration

The site supports **three distinct user types**, each with their own login and registration forms:

| Role | Icon | Accent Colour | Unique Fields |
|------|------|--------------|---------------|
| **Tenant** | 🏠 | Sky Blue | Move-in date, current address |
| **Landlord** | 🏢 | Amber | Company name, Tax ID, property count |
| **Property Manager** | 📋 | Green | Firm name, license number, licensed state |

### To add or remove form fields for a role
Edit the `loginFields` or `registerFields` arrays inside the relevant role in `config.js`:
```js
tenant: {
  registerFields: [
    { id: "firstName", type: "text", label: "First Name", placeholder: "Jane", required: true },
    // Add a new field:
    { id: "petName", type: "text", label: "Pet Name (if applicable)", placeholder: "Buddy", required: false },
  ]
}
```

---

## 📊 Analytics System

The site automatically tracks visitor behaviour using the built-in analytics module. All data is stored in the visitor's browser (`localStorage`) — no external service or server needed.

### What is tracked
| Event | Description |
|-------|-------------|
| **Page Views** | Every time someone loads the homepage |
| **Unique Sessions** | Estimated unique visitors per day |
| **Section Views** | Which sections visitors scroll to (Hero, Team, Footer) |
| **Link & Button Clicks** | Navigation, auth pills, footer links, social links |
| **Login Attempts** | How many times each role's Sign In was clicked |
| **Registrations** | How many times each role's Register was clicked |
| **Role Interest** | Which role (Tenant / Landlord / Manager) gets the most engagement |

### Admin Dashboard Pages
Open `admin/index.html` to access:
- **Dashboard** — Overview stats, 14-day bar chart, top clicks, role interest
- **Traffic** — Daily page views and sessions table
- **Clicks** — Full click log, category breakdown donut chart
- **Section Views** — Engagement bar chart per section
- **Auth & Roles** — Login vs registration counts, role interest breakdown

### Clearing Analytics Data
In the admin dashboard, click the **Clear Data** button (top right) to wipe all stored analytics. This cannot be undone.

> ⚠️ **Note:** Because analytics data is stored in `localStorage`, it is per-browser and per-device. If you want shared analytics across all visitors, you will need a backend server. Ask your developer or contact us to upgrade.

---

## 🌐 Deploying to Your Domain (GoDaddy)

### Option A — Netlify (Recommended, Free)
1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag the entire `HarvinProperties` folder onto the Netlify dashboard
3. Netlify gives you a live URL instantly
4. Go to **Domain Settings → Add custom domain** → enter your GoDaddy domain
5. Follow Netlify's instructions to update your GoDaddy nameservers

### Option B — GoDaddy Web Hosting
1. Log in to GoDaddy → **My Products → Web Hosting → Manage**
2. Open **cPanel → File Manager → public_html**
3. Upload all files from the `HarvinProperties` folder into `public_html`
4. Your domain will automatically serve the site

### Option C — GitHub Pages (Free)
1. Create a free account at [github.com](https://github.com)
2. Create a new public repository called `harvin-properties`
3. Upload all project files
4. Go to **Settings → Pages → Branch: main → Save**
5. Add your GoDaddy domain under **Custom domain**
6. In GoDaddy DNS, add these A records pointing to GitHub:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

---

## 🛠️ Making Changes — Quick Reference

| Task | File to Edit |
|------|-------------|
| Change company name or tagline | `js/config.js` → `SITE_CONFIG` |
| Add/remove team members | `js/config.js` → `TEAM_MEMBERS` |
| Change footer links | `js/config.js` → `FOOTER_CONFIG` |
| Change colours / fonts | `css/styles.css` → `:root` variables |
| Add a form field to registration | `js/config.js` → role's `registerFields` |
| Change hero background image | `js/config.js` → `SITE_CONFIG.heroImage` |
| View visitor analytics | Open `admin/index.html` |
| Add a new page section | Edit `index.html` + `css/styles.css` |

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic, accessible) |
| Styling | CSS3 with custom properties (no frameworks) |
| Logic | Vanilla JavaScript (ES6+, no dependencies) |
| Fonts | Google Fonts — Playfair Display + Plus Jakarta Sans |
| Analytics | Custom built, localStorage-based |
| Hosting | Static files — works anywhere |

---

## 📞 Support & Next Steps

- **Add a contact form** — Integrate with [Formspree](https://formspree.io) (free) to receive emails from your site
- **Real backend** — Connect to a database for real user login/registration
- **Shared analytics** — Upgrade to server-side analytics (e.g. Plausible, Fathom, or a custom Node.js backend)
- **Blog / listings** — Add a property listings page pulling from a CMS

---

*Last updated: March 2026 · Harvin Properties, Inc.*
