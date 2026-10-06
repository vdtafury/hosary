# Mohamed Ahmed — Junior System Administrator Portfolio & Technical Resume

[![Production Status](https://img.shields.io/badge/Deployment-Vercel%20Live-brightgreen)](https://hosary.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![WCAG 2.1 AA](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-success)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Zero Dependencies](https://img.shields.io/badge/Runtime%20Dependencies-0-informational)]()

A high-performance, accessible, and responsive technical portfolio website for **Mohamed Ahmed**, Junior System Administrator and IT Support Specialist. Engineered with zero client runtime dependencies, strict semantic HTML5, modular CSS design tokens, and vanilla ES6+ JavaScript.

- **Live URL**: [https://hosary.vercel.app](https://hosary.vercel.app)
- **Repository**: [https://github.com/vdtafury/hosary](https://github.com/vdtafury/hosary)

---

## 🎯 Problem Statement & Motivation

Many entry-level technical portfolios suffer from common anti-patterns:
1. **Bloated Bundles**: Simple resume sites packaged with heavy JavaScript frameworks (React, Next.js) and 50MB+ dependencies that introduce unnecessary maintenance overhead and slow initial paint times.
2. **Generic "AI/Template" Aesthetics**: Overuse of heavy glow effects, artificial percentage bars (e.g., *"Windows OS 90%"*), and visual clutter that distract from real engineering and operational capabilities.
3. **Poor Accessibility & Utility**: Lacking keyboard navigation, broken focus traps in modals, unlabelled form controls, and no direct offline/print support for recruiters.

### Solution
This project was engineered to deliver an **ultra-clean, highly credible, and functional digital resume** tailored specifically for IT Operations and Systems Administration hiring managers. It emphasizes:
- **Zero build-step overhead**: Pure static web standards running directly in any modern browser.
- **Immediate recruiter utility**: 1-click clipboard copy for email and phone numbers, direct WhatsApp chat integration, and an instant accessible CV preview modal with physical print export styling.
- **Enterprise IT credibility**: Accurately maps competencies across real certification tracks (CompTIA A+, Cisco CCNA, Microsoft MCSA) and operational experience gained at Vodafone Egypt.

---

## 🧱 Architecture & Directory Structure

```text
hosary/
├── assets/
│   ├── css/
│   │   └── style.css         # Token-based CSS architecture (Tokens -> Base -> Components -> Print)
│   ├── js/
│   │   └── main.js           # Vanilla ES6+ modules (Focus trap, Clipboard API, Form validation)
│   └── images/
│       ├── profile.jpg       # Profile portrait asset
│       └── cv-document.jpg   # High-resolution original CV document
├── index.html                # Semantic HTML5 document with Schema.org JSON-LD metadata
├── README.md                 # Engineering documentation
└── .gitignore                # Git hygiene configuration
```

---

## 🛠 Technology Stack & Decisions

| Layer | Technology | Decision Rationale |
| :--- | :--- | :--- |
| **Markup** | Semantic HTML5 | Uses native landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<aside>`), WAI-ARIA modal semantics, and Schema.org `Person` microdata for search engines. |
| **Styling** | Vanilla CSS3 (Custom Properties) | Modular design tokens (`--canvas`, `--surface-*`, `--border-*`) avoid the runtime and bundle cost of Tailwind or CSS-in-JS. Includes complete `@media print` rules for physical resume generation. |
| **Logic** | Vanilla JavaScript (ES6+) | Strict mode execution with zero third-party dependencies. Manages accessible dialog focus trapping, mobile navigation drawer state, native clipboard copy, and input validation. |
| **Hosting & CI/CD** | Vercel & GitHub Webhooks | Static edge distribution with automated redeployments on every push to `main`. Instant TTFB worldwide. |

---

## ⚡ Key Engineering Features

### 1. WAI-ARIA Accessible CV Modal
- Uses `role="dialog"` and `aria-modal="true"`.
- Implements an active keyboard **focus trap** that cycles focus between the modal's interactive elements and prevents tabbing into background content.
- Listens for `Escape` key events and scrim clicks to dismiss.
- Automatically restores focus to the triggering button upon dismissal.

### 2. Recruiter Productivity (1-Click Clipboard Utilities)
- Integrates the modern `navigator.clipboard` API with backward-compatible `execCommand('copy')` fallbacks.
- Dispatches accessible, self-dismissing toast notifications (`role="status"`) to confirm actions without page reload.

### 3. Native Constraint Form Validation
- Prevents invalid form submissions client-side with regex pattern matching and length checks.
- Dispatches pre-formatted `mailto:` inquiries with sanitized query strings, accompanied by an alternative direct WhatsApp link for mobile recruiters.

### 4. Dedicated Print Engine (`@media print`)
- When printing via `Ctrl+P` or selecting "Save as PDF", the stylesheet automatically strips interactive UI widgets (navbar, contact forms, modals, toast boxes) and recalculates color contrasts for high-density, ink-friendly monochrome paper printing.

---

## 🚀 Local Development & Setup

Since this project relies purely on standardized web technologies, no build tools or dependency installations (`npm install`) are required.

### 1. Clone the repository
```bash
git clone https://github.com/vdtafury/hosary.git
cd hosary
```

### 2. Run locally
You can open `index.html` directly in your browser:
```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

Or serve via any static HTTP server for accurate header simulation:
```bash
# Python 3
python3 -m http.server 8080

# Node.js (npx)
npx serve .
```

---

## 🔒 Security & Performance Considerations

- **No Third-Party Tracker / Zero External Scripts**: No analytics pixels, telemetry scripts, or foreign CDN dependencies that could leak user data or introduce XSS vectors.
- **Rel Security**: External links utilize `rel="noopener noreferrer"` to prevent window opener hijacking and tabnabbing.
- **Resource Hints**: Preconnect headers (`preconnect`) for Google Fonts to minimize render-blocking round trips.
- **Optimized Asset Delivery**: Image assets are compressed and loaded with explicit aspect ratios and responsive sizing to prevent Cumulative Layout Shift (CLS).

---

## 📈 Technical Challenges & Trade-offs

1. **Trade-off: Static Zero-Backend Form vs. API Service**:
   - *Challenge*: A full serverless backend (Node.js/AWS Lambda/SendGrid) adds secret management and API key rotation overhead.
   - *Decision*: A client-side `mailto:` dispatcher paired with direct WhatsApp integration provides zero-failure reliability without recurring third-party costs or database dependencies.
2. **Trade-off: Framework vs. Vanilla Web Standards**:
   - *Decision*: Avoided React/Vue/Svelte entirely. A portfolio of this scope requires fast time-to-first-byte (TTFB) and sub-100ms Largest Contentful Paint (LCP). Vanilla code guarantees a 100/100 Lighthouse performance score with zero maintenance debt.

---

## 🔮 Future Roadmap

- [ ] Add dual-language toggle (Arabic / English) with RTL support (`dir="rtl"`).
- [ ] Incorporate interactive Cisco Packet Tracer lab topology diagrams (SVG/Canvas).
- [ ] Provide downloadable `.ovf` / lab runbooks for homelab virtualization projects.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
