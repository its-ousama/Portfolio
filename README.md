# Portfolio — Ousama Hassan

Personal portfolio site: dark editorial design, scroll-driven photo parallax,
custom cursor, and **ORB-1** — a robot co-pilot that tracks the cursor and
answers visitors' questions through a guided Q&A panel.

🔗 **Live:** [sam.epita.online](https://sam.epita.online) · 💼 [LinkedIn](https://www.linkedin.com/in/ousama-hassan/)

![Built with React](https://img.shields.io/badge/React-18-000?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-000?logo=vite)
![Deployed on Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-live-000?logo=cloudflare)

---

## Stack

| | |
|---|---|
| **Framework** | React 18 + Vite |
| **Styling** | Hand-written CSS (custom properties, no framework) |
| **Type** | Fully static — no backend, no database, no tracking |
| **Hosting** | Cloudflare Pages |

No UI library, no animation library. Every effect — the parallax panels, the
custom cursor, the reveal-on-scroll, the marquee, the robot — is built from
scratch with `IntersectionObserver`, `requestAnimationFrame` and CSS.

## Features

- **Scroll parallax panels** — each experience is a full-height photographic
  panel whose background drifts at its own speed.
- **ORB-1 chatbot** — a guided Q&A assistant. Visitors pick from curated
  questions; each answer branches into related follow-ups. Runs entirely
  client-side, so it costs nothing and can't go off-script.
- **Custom cursor** — dot plus trailing ring that expands over interactive
  elements. Disabled automatically on touch devices.
- **Accessible by default** — semantic landmarks, ARIA labels on controls,
  visible focus states, and full `prefers-reduced-motion` support.
- **Responsive** from 360px phones to ultrawide displays.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
npm run preview  # preview the production build
```

Requires Node 18+.

## Project structure

```
├── public/
│   ├── images/            # portrait + any self-hosted photos
│   └── CV_....pdf         # downloadable CV
├── src/
│   ├── App.jsx            # entire site: data, components, styles
│   ├── main.jsx
│   └── index.css
├── index.html
└── vite.config.js
```

Everything lives in `App.jsx` on purpose — the content is defined as plain data
objects at the top of the file, so updating the site never means hunting through
components.

## Editing the content

All of it sits in clearly marked constants at the top of `src/App.jsx`:

| Constant | What it controls |
|---|---|
| `PROJECTS` | The "Selected work" list — one object per project |
| `EXPERIENCE` | Experience panels (dates, role, bullet points, tags) |
| `STACK` | The skills table |
| `LINKS` | Email, phone, GitHub, LinkedIn, CV path |
| `IMG` | Background photos and portrait |
| `QA` / `FUN_FACTS` / `ROOT` | ORB-1's questions, answers and follow-ups |
| `BOT_LINES` | The robot's idle one-liner per section |

**Add a project:** append one object to `PROJECTS` — it renders automatically.

```jsx
{
  id: "my-app",
  year: "2026",
  name: "My App",
  tagline: "One-line pitch",
  tech: "React · Node.js",
  link: "https://sam.epita.online",
  repo: "https://github.com/its-ousama/Portfolio",
  live: true,
}
```

**Add a chatbot question:** append one object to `QA`, then reference its `id`
in `ROOT` (to show it at the start) and/or in another question's `next` array
(to offer it as a follow-up).

**Swap a photo:** drop the file in `public/images/` and point the matching entry
in `IMG` at `/images/yourfile.jpg`.

## Deployment

Deployed on Cloudflare Pages, connected to this repository — every push to
`main` triggers a rebuild.

| Setting | Value |
|---|---|
| Framework preset | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |

`public/_headers` sets caching and security headers; Cloudflare picks it up
automatically at deploy time.

## Credits

Background photography from [Unsplash](https://unsplash.com).
Typefaces: Clash Display & Satoshi ([Fontshare](https://fontshare.com)),
JetBrains Mono ([Google Fonts](https://fonts.google.com)).

## License

Code is MIT — feel free to learn from it or reuse the techniques.
Personal content (CV, portrait, copy, project descriptions) is not.

---

Built in Paris. Currently looking for an **alternance from February/April 2027**
as part of a Master's in Computer Science — reach me at
**its.samhassan@gmail.com**.