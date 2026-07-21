import { useEffect, useRef, useState, useCallback } from "react";

/* ════════════════════════════════════════════════════════════════
   OUSAMA HASSAN — PORTFOLIO
   ----------------------------------------------------------------
   PROJECTS: add every new app here — it appears automatically in
   "Selected work". Put the live URL in `link`, the repo in `repo`.
   ════════════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: "orbit",
    year: "2026",
    name: "Orbit",
    tagline: "Personal app hub — every project I ship, deployed in one place",
    tech: "React · Node.js · CI/CD",
    link: "https://orbit.epita.online",
    repo: "https://github.com/its-ousama/orbit",
    live: true,
  },
  {
    id: "finance-coach",
    year: "2025",
    name: "Finance Coach",
    tagline: "AI chatbot for personal finance — transactions, JWT auth, tailored advice",
    tech: "React · Node.js · MongoDB · OpenAI",
    link: null,
    repo: "https://github.com/its-ousama/finance-coach-chatbot",
    live: false,
  },
  {
    id: "sole-archive",
    year: "2026",
    name: "Sole Archive",
    tagline: "E-commerce landing with fluid parallax product showcases",
    tech: "React · TypeScript · Tailwind CSS",
    link: "https://sole-archive.epita.online",
    repo: "https://github.com/its-ousama/sole-archive",
    live: true,
  },
  {
    id: "math-wars",
    year: "2024",
    name: "Math Wars",
    tagline: "Android quiz game — timed challenges, persistent scores, haptics",
    tech: "Java · Android SDK",
    link: null,
    repo: "https://github.com/its-ousama",
    live: false,
  },
];

/* Swap any background: drop a file in public/images/ and change the url. */
const IMG = {
  portrait: "/images/ousama.png",
  sncf: "https://images.unsplash.com/photo-1563274642-51e43b8dd966?q=80&w=2400&auto=format&fit=crop",
  pub: "https://images.unsplash.com/photo-1558210598-89ba75b1724e?q=80&w=2400&auto=format&fit=crop",
  travel: "https://images.unsplash.com/photo-1542336423-e251474b8a4a?q=80&w=2400&auto=format&fit=crop",
};

const LINKS = {
  github: "https://github.com/its-ousama",
  linkedin: "https://www.linkedin.com/in/ousama-hassan/",
  email: "its.samhassan@gmail.com",
  phone: "+33 7 58 67 34 69",
  cv: "/CV_Ousama_HASSAN_FR.pdf",
};

const EXPERIENCE = [
  {
    id: "sncf",
    img: IMG.sncf,
    alt: "TGV high-speed train at a French station",
    period: "APR 2026 — OCT 2026",
    role: "Engineering Intern",
    company: "e.SNCF Solutions · SNCF Group",
    location: "Saint-Denis, FR",
    status: "CURRENT",
    points: [
      "Building internal tools for network infrastructure within the Automation team using TypeScript and Node.js",
      "Growing networking expertise while shipping apps that automate network equipment",
    ],
    tech: ["TypeScript", "Node.js", "Networking", "Dashboards"],
  },
  {
    id: "frog",
    img: IMG.pub,
    alt: "Busy pub bar at night",
    period: "DEC 2024 — PRESENT",
    role: "Waiter / Bartender",
    company: "FrogPubs · FROG XVI + The Frog & British Library ",
    location: "Paris, FR",
    status: "IN PARALLEL",
    points: [
      "Floor and bar service in high-traffic Parisian pubs — orders, cocktails, draft beer, always in motion.",
      "Held alongside full-time studies at EPITA (FROG XVI), then alongside the SNCF internship (The Frog & British Library). Pressure is a familiar environment.",
    ],
    tech: ["Service", "Speed", "Teamwork"],
  },
  {
    id: "mercure",
    img: IMG.travel,
    alt: "Airplane wing above the clouds",
    period: "JUN 2024 — AUG 2024",
    role: "Web Development Intern",
    company: "Mercure Voyages",
    location: "Paris, FR",
    status: "COMPLETED",
    points: [
      "Maintained and updated the travel agency's website — bug fixes and UX improvements across the customer journey.",
    ],
    tech: ["JavaScript", "PHP", "UX"],
  },
];

const STACK = [
  { k: "LANGUAGES & WEB", v: "TypeScript · JavaScript · Node.js · React · Python · Java · PHP · REST APIs · Microservices" },
  { k: "NETWORKS", v: "Cisco · GNS3" },
  { k: "DEVOPS & TOOLS", v: "Docker · Git · CI/CD · Linux" },
  { k: "DATABASES", v: "SQL · MongoDB · Redis" },
  { k: "MOBILE", v: "Android (Java) · PWA" },
  { k: "PRACTICES", v: "Agile · Web security · Software architecture · GDPR" },
];

const MARQUEE = ["TYPESCRIPT", "REACT", "NODE.JS", "PYTHON", "JAVA", "DOCKER", "CISCO", "MONGODB", "LINUX", "GIT"];

const BOT_LINES = {
  hero: "Hey — I'm the co-pilot.",
  about: "The pilot: EPITA engineer,bartender,  three languages ",
  experience: "Current mission: interning at SNCF | bartending at FrogPubs",
  work: "Selected work — new projects dock here regularly.",
  stack: "Full stack, from the UI down to the networks.",
  contact: "Open for an alternance from Feb 2027. Say hi.",
};


/* ─────────────── chatbot brain — guided Q&A ───────────────
   Visitors don't type: they pick a question. To add one, add an
   object here. `next` = ids of follow-up questions offered after
   the answer. ROOT = the questions shown at the start. */
const QA = [
  {
    id: "hire",
    q: "Why should I hire him? 👀",
    a: "He's a developer who moves between two worlds that usually don't overlap: web apps (React, Node.js, TypeScript) and network automation — writing code that configures and monitors network infrastructure. On top of that, a track record of delivering under pressure: EPITA, a real engineering internship, and bar shifts in a packed Paris pub, all at the same time. Meticulous, fast to learn, ships things that get used.",
    next: ["sncf", "network", "available"],
  },
  {
    id: "available",
    q: "When is he available?",
    a: "He's looking for an alternance starting February/April 2027, as part of a Master's degree. If the timing works for your team, email its.samhassan@gmail.com — he replies fast.",
    next: ["contact", "cv", "hire"],
  },
  {
    id: "sncf",
    q: "What's this SNCF mission about? 🚄",
    a: "He's an engineering intern on the Automation team at e.SNCF Solutions (SNCF Group) in Saint-Denis, until Oct 2026. He builds internal tools in TypeScript and Node.js for the teams that run SNCF's network infrastructure — and what he builds shifts with each project. Two so far: a tool that lets engineers configure switches from a template instead of from scratch, and a dashboard that pulls live data off network equipment to show the state of SNCF's technicentres (the sites housing that gear).",
    next: ["network", "stack", "experience"],
  },
  {
    id: "experience",
    q: "Walk me through his experience",
    a: "Newest first. Right now: engineering intern on the Automation team at e.SNCF Solutions (Apr–Oct 2026), building network-automation tools in TypeScript/Node — with bar shifts at The Frog & British Library running in parallel. Before that: FROG XVI (Dec 2024–Feb 2026), the pub job he held right through his EPITA studies. And where it started: web dev intern at Mercure Voyages (summer 2024) — site maintenance, bug fixes, UX.",
    next: ["sncf", "bartender", "projects"],
  },
  {
    id: "bartender",
    q: "Wait — he's a bartender too?!",
    a: "Yes, that part is real. FROG XVI, then The Frog & British Library — high-traffic Parisian pubs, run in parallel with EPITA and even the SNCF internship. Deadlines don't scare someone who's survived a Friday-night rush.",
    next: ["hire", "funfact", "experience"],
  },
  {
    id: "stack",
    q: "What's in his toolbox? 🧰",
    a: "Core: TypeScript, JavaScript, Node.js and React. Also Python, Java, PHP, plus REST APIs and microservice architecture. Tooling: Docker, Git, Linux, SQL, MongoDB and Redis. On the network side he's worked with Cisco, GNS3, and protocols like SNMP and LLDP. And Android in Java for good measure.",
    next: ["network", "projects", "hire"],
  },
  {
    id: "network",
    q: "Web AND networks? Explain.",
    a: "That combination is his edge — most web devs stop the moment a task touches network gear. He builds web apps, and he also writes code that automates and monitors network infrastructure: configuring devices and pulling data from them, all programmatically. To be clear: he's not a network engineer and doesn't touch hardware. He's a developer who learned enough networking to build tools a network team actually relies on.",
    next: ["sncf", "stack"],
  },
  {
    id: "projects",
    q: "What has he built?",
    a: "Orbit (his live app hub at orbit.epita.online), Finance Coach (an AI finance chatbot — React/Node/MongoDB/OpenAI, with JWT auth and transaction tracking), Sole Archive (an animated, responsive e-commerce landing page in React/TS/Tailwind), and Math Wars (an Android quiz game in Java — timed challenges, persistent scores, haptics). New ones dock regularly.",
    next: ["orbit", "stack", "funfact"],
  },
  {
    id: "orbit",
    q: "What's Orbit exactly? 🛰️",
    a: "His personal launchpad: a live hub at orbit.epita.online where every app he ships gets deployed and linked. One address, all the work — this portfolio's 'Work' section feeds from the same idea.",
    next: ["projects", "contact"],
  },
  {
    id: "education",
    q: "Where did he study?",
    a: "EPITA Paris — Bachelor in Science & Engineering, specialising in Computer Science (2023–2026), after a Lebanese Baccalaureate. Next step: a Master's, which is what the alternance is for.",
    next: ["available", "languages"],
  },
  {
    id: "languages",
    q: "Which languages does he speak?",
    a: "Arabic (native), English (fluent) and French (intermediate) — comfortable working in international teams. The programming-language list is a separate, longer one.",
    next: ["stack", "education"],
  },
  {
    id: "funfact",
    q: "Give me a fun fact ⚡",
    a: null, // cycles through FUN_FACTS below
    next: ["funfact", "bartender", "projects"],
  },
  {
    id: "contact",
    q: "How do I reach him? 📡",
    a: "Email its.samhassan@gmail.com — or use the phone, LinkedIn and GitHub links in the contact section below. Recruiters: mention 'alternance 2027' and you've got his full attention.",
    next: ["available", "cv"],
  },
  {
    id: "cv",
    q: "Can I get the CV?",
    a: "One click away: the spinning DOWNLOAD CV badge in the hero, or the CV (PDF) link in the contact section.",
    next: ["contact", "hire"],
  },
];
 
const FUN_FACTS = [
  "He can debug a Node.js service and pour a proper pint — sometimes in the same day.",
  "Every app he ships 'docks' at orbit.epita.online. This site is mission control.",
  "He plays table tennis. Challenge him at the office at your own risk.",
  "His first web internship was at a travel agency — he's been shipping for real users since 2024.",
];

const ROOT = ["hire", "available", "sncf", "projects", "stack", "funfact"];
const qaById = (id) => QA.find((x) => x.id === id);

/* ───────────────────────── hooks ───────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useParallax() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf;
    const tick = () => {
      document.querySelectorAll("[data-plx]").forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight; // -1..1
        el.style.transform = `translateY(${p * -9}%) scale(1.18)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
}

function useActiveSection(setActive) {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-38% 0px -52% 0px" }
    );
    ["hero", "about", "experience", "work", "stack", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [setActive]);
}

/* ───────────────────────── cursor ───────────────────────── */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.body.classList.add("has-cursor");
    let x = 0, y = 0, rx = 0, ry = 0, raf;
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`;
      const t = e.target.closest("a, button, .hov");
      ring.current?.classList.toggle("big", !!t);
    };
    const loop = () => {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-cursor");
    };
  }, []);
  return (
    <>
      <div className="cur-dot" ref={dot} aria-hidden="true" />
      <div className="cur-ring" ref={ring} aria-hidden="true" />
    </>
  );
}

function Bot({ active }) {
  const ref = useRef(null);
  const bodyRef = useRef(null);
  const [eye, setEye] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState(0);
  const [blink, setBlink] = useState(false);
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { role: "assistant", text: "Hi, I'm ORB-1 — Sam's co-pilot. I don't do small talk, but I do take questions. Pick one:" },
  ]);
  const [sugs, setSugs] = useState(ROOT);
  const [showAll, setShowAll] = useState(false);
  const [factIdx, setFactIdx] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height - 46;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      const d = Math.max(Math.hypot(dx, dy), 1);
      setEye({ x: (dx / d) * 3.4, y: (dy / d) * 2.6 });
      setTilt(Math.max(-8, Math.min(8, dx / 60)));
    };
    window.addEventListener("mousemove", onMove);
    const b = setInterval(() => { setBlink(true); setTimeout(() => setBlink(false), 130); }, 4200);
    return () => { window.removeEventListener("mousemove", onMove); clearInterval(b); };
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, typing, sugs, showAll, open]);

  const ask = useCallback((id) => {
    if (typing) return;
    const item = qaById(id);
    if (!item) return;
    setMsgs((m) => [...m, { role: "user", text: item.q }]);
    setSugs([]);
    setShowAll(false);
    setTyping(true);
    setTimeout(() => {
      let answer = item.a;
      if (id === "funfact") {
        answer = FUN_FACTS[factIdx % FUN_FACTS.length];
        setFactIdx((i) => i + 1);
      }
      setMsgs((m) => [...m, { role: "assistant", text: answer }]);
      setTyping(false);
      setSugs((item.next || []).filter((n) => qaById(n)));
    }, 480 + Math.random() * 420);
  }, [typing, factIdx]);

  const visible = showAll ? QA.map((x) => x.id) : sugs;

  return (
    <div className="bot" ref={ref}>
      {open && (
        <div className="chat" role="dialog" aria-label="Questions for ORB-1">
          <div className="chat-head">
            <span className="chat-title"><i className="dot-live" />ORB-1 · CO-PILOT</span>
            <button className="chat-x hov" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
          </div>
          <div className="chat-body" ref={bodyRef}>
            {msgs.map((m, i) => (
              <div key={i} className={`msg ${m.role === "user" ? "me" : ""}`}>{m.text}</div>
            ))}
            {typing && <div className="msg typing"><span /><span /><span /></div>}
            {!typing && visible.length > 0 && (
              <div className="qa-block">
                <p className="qa-label">{showAll ? "ALL QUESTIONS" : "PICK A QUESTION"}</p>
                <div className="sugs">
                  {visible.map((id) => (
                    <button key={id} className="sug hov" onClick={() => ask(id)}>{qaById(id).q}</button>
                  ))}
                  <button className="sug sug-all hov" onClick={() => setShowAll((s) => !s)}>
                    {showAll ? "− fewer questions" : "⋯ all questions"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {!open && <div className="bot-chip" key={active}>{BOT_LINES[active] || BOT_LINES.hero}</div>}
      <button
        className="bot-btn hov"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close ORB-1" : "Ask ORB-1 a question"}
      >
        {!open && <span className="bot-ask">ASK ME</span>}
        <div className="bot-float">
          <svg viewBox="0 0 120 130" width="86" height="93" aria-hidden="true">
            <defs>
              <linearGradient id="bg1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#26262B" /><stop offset="1" stopColor="#151518" />
              </linearGradient>
              <linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#3A3A42" /><stop offset="1" stopColor="#1C1C21" />
              </linearGradient>
            </defs>
            <rect x="34" y="78" width="52" height="38" rx="17" fill="url(#bg1)" stroke="#3A3A42" strokeWidth="1.5" />
            <circle cx="60" cy="97" r="5.5" fill="none" stroke="#FF4D24" strokeWidth="1.5" className="bot-core" />
            <g style={{ transform: `rotate(${tilt}deg)`, transformOrigin: "60px 52px", transition: "transform .14s ease-out" }}>
              <line x1="60" y1="8" x2="60" y2="18" stroke="#3A3A42" strokeWidth="2.5" />
              <circle cx="60" cy="6" r="3.4" fill="#FF4D24" className="bot-tip" />
              <rect x="18" y="18" width="84" height="58" rx="26" fill="url(#bg2)" stroke="#45454E" strokeWidth="1.5" />
              <rect x="27" y="28" width="66" height="38" rx="17" fill="#0A0A0C" />
              {open ? (
                <g>
                  <path d="M38 52 q6.5 -9 13 0" stroke="#F2EFE9" strokeWidth="5" fill="none" strokeLinecap="round" />
                  <path d="M69 52 q6.5 -9 13 0" stroke="#F2EFE9" strokeWidth="5" fill="none" strokeLinecap="round" />
                </g>
              ) : (
                <g style={{ transform: `translate(${eye.x}px, ${eye.y}px)` }}>
                  <rect x="41" y={blink ? 46 : 39} width="7" height={blink ? 2.5 : 16} rx="3.5" fill="#F2EFE9" />
                  <rect x="72" y={blink ? 46 : 39} width="7" height={blink ? 2.5 : 16} rx="3.5" fill="#F2EFE9" />
                </g>
              )}
              <rect x="10" y="38" width="8" height="18" rx="4" fill="#2C2C33" />
              <rect x="102" y="38" width="8" height="18" rx="4" fill="#2C2C33" />
            </g>
          </svg>
        </div>
      </button>
    </div>
  );
}

/* ───────────────────────── app ───────────────────────── */
export default function App() {
  const [active, setActive] = useState("hero");
  const [progress, setProgress] = useState(0);
  useReveal();
  useParallax();
  useActiveSection(setActive);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = useCallback((id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), []);

  return (
    <div className="site">
      <style>{CSS}</style>
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <Bot active={active} />

      {/* ── nav ── */}
      <header className="nav">
        <button className="nav-logo" onClick={() => go("hero")}>SAM<span className="acc">.</span></button>
        <nav className="nav-links" aria-label="Sections">
          {[["about", "Profile"], ["experience", "Experience"], ["work", "Work"], ["stack", "Stack"], ["contact", "Contact"]].map(([id, l]) => (
            <button key={id} className={active === id ? "on" : ""} onClick={() => go(id)}>{l}</button>
          ))}
        </nav>
        <a className="nav-pill" href={`mailto:${LINKS.email}`}>
          <span className="dot-live" /> OPEN TO ALTERNANCE — 2027
        </a>
      </header>

      <main>
        {/* ── hero ── */}
        <section id="hero" className="hero">
          <p className="hero-eyebrow rv">SOFTWARE ENGINEER — PARIS</p>
          <h1 className="hero-name" aria-label="Ousama Hassan">
            <span className="hero-line rv">OUSAMA</span>
            <span className="hero-line rv d1">HASSAN<span className="acc">.</span></span>
          </h1>
          <div className="hero-foot">
            <p className="hero-intro rv d2">
              I build web apps, network tooling and everything in between —
              currently automating railway infrastructure at <b>SNCF</b>,
              finishing my CS degree at <b>EPITA</b>, and shipping side
              projects .
            </p>
            <div className="hero-side rv d3">
              <a className="hero-badge hov" href={LINKS.cv} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 100 100" className="badge-spin">
                  <defs><path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
                  <text><textPath href="#circ">—DOWNLOAD CV —DOWNLOAD CV</textPath></text>
                </svg>
                <span className="badge-arrow">↓</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── marquee ── */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={i}>{m}<i className="acc"> ✦ </i></span>
            ))}
          </div>
        </div>

        {/* ── about ── */}
        <section id="about" className="sec">
          <div className="sec-head rv"><span className="sec-num">01</span><span className="sec-title">PROFILE</span></div>
          <div className="about">
            <div className="about-photo rv">
              <img src={IMG.portrait} alt="Portrait of Ousama Hassan" loading="lazy" />
              <span className="about-frame" />
            </div>
            <div className="about-body">
              <p className="about-lead rv">
                CS engineering student with a taste for the <em>full picture</em> —
                from the interface people see to the automation logic running behind it. I like building things that work end to end: clean frontends, solid APIs, and the tooling that ties them together.
                Currently balancing an engineering internship and bar shifts
                <em> at the same time</em>.
              </p>
              <div className="about-facts">
                <div className="fact rv"><span className="fk">BASED</span><span>Vitry-sur-Seine — Paris, France</span></div>
                <div className="fact rv d1"><span className="fk">EDUCATION</span><span>EPITA · Bachelor in Science & Engineering, 2023–2026</span></div>
                <div className="fact rv d2"><span className="fk">LANGUAGES</span><span>Arabic (native) · English (fluent) · French (intermediate)</span></div>
                <div className="fact rv d3"><span className="fk">NEXT</span><span>Alternance as part of a Master's degree in computer science — available Feb/Apr 2027</span></div>
                <div className="fact rv d4"><span className="fk">OFF-DUTY</span><span>Finance · Literature · Table tennis · Fitness</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── experience ── */}
        <section id="experience" className="sec">
          <div className="sec-head rv"><span className="sec-num">02</span><span className="sec-title">EXPERIENCE</span></div>
          <div className="xp-stack">
            {EXPERIENCE.map((x, i) => (
              <article className="panel rv" key={x.id}>
                <div className="panel-media">
                  <img src={x.img} alt={x.alt} data-plx loading="lazy" />
                </div>
                <div className="panel-shade" />
                <span className="panel-idx">{String(i + 1).padStart(2, "0")}</span>
                <div className="panel-body">
                  <div className="panel-meta">
                    <span className="pm-date">{x.period}</span>
                    <span className={`pm-status ${x.status === "CURRENT" ? "live" : ""}`}>{x.status}</span>
                  </div>
                  <h3>{x.role}</h3>
                  <p className="panel-co">{x.company} — {x.location}</p>
                  <ul>{x.points.map((p, j) => <li key={j}>{p}</li>)}</ul>
                  <div className="tags">{x.tech.map((t) => <span key={t}>{t}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── work ── */}
        <section id="work" className="sec">
          <div className="sec-head rv"><span className="sec-num">03</span><span className="sec-title">SELECTED WORK</span></div>
          <div className="work-list">
            {PROJECTS.map((p, i) => (
              <a
                key={p.id}
                className="work-row rv hov"
                href={p.link || p.repo}
                target="_blank"
                rel="noreferrer"
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <span className="wr-idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="wr-main">
                  <span className="wr-name">
                    {p.name}
                    {p.live && <span className="wr-live"><i className="dot-live" />LIVE</span>}
                  </span>
                  <span className="wr-tag">{p.tagline}</span>
                </span>
                <span className="wr-tech">{p.tech}</span>
                <span className="wr-year">{p.year}</span>
                <span className="wr-arr">↗</span>
              </a>
            ))}
          </div>
          <p className="work-note rv">
            More on the way — new projects are added here as they ship.
            Follow along on <a className="ln" href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>.
          </p>
        </section>

        {/* ── stack ── */}
        <section id="stack" className="sec">
          <div className="sec-head rv"><span className="sec-num">04</span><span className="sec-title">STACK</span></div>
          <div className="stack">
            {STACK.map((s, i) => (
              <div className="stack-row rv" key={s.k} style={{ transitionDelay: `${i * 0.04}s` }}>
                <span className="fk">{s.k}</span>
                <span className="sv">{s.v}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── contact ── */}
        <section id="contact" className="sec contact">
          <div className="sec-head rv"><span className="sec-num">05</span><span className="sec-title">CONTACT</span></div>
          <h2 className="contact-big rv">
            LET'S BUILD<br /><span className="stroke">SOMETHING</span><span className="acc">.</span>
          </h2>
          <p className="contact-sub rv">
            Looking for an <b>alternance from February/April 2027</b> as part of a Master's degree in computer science.
            For opportunities, collaborations or just to talk shop:
          </p>
          <a className="contact-mail rv hov" href={`mailto:${LINKS.email}`}>{LINKS.email}<span className="mail-line" /></a>
          <div className="contact-meta rv">
            <a href={`tel:${LINKS.phone.replace(/ /g, "")}`}>{LINKS.phone}</a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a>
            <a href={LINKS.github} target="_blank" rel="noreferrer">GITHUB ↗</a>
            <a href={LINKS.cv} target="_blank" rel="noreferrer">CV (PDF) ↓</a>
          </div>
          <footer className="footer">
            <span>© {new Date().getFullYear()} OUSAMA HASSAN</span>
            <span>PARIS, FRANCE</span>
            <button className="hov" onClick={() => go("hero")}>BACK TO TOP ↑</button>
          </footer>
        </section>
      </main>
    </div>
  );
}

/* ════════════════════════════ styles ════════════════════════════ */
const CSS = `
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@500,600&f[]=satoshi@400,500,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --ink: #0C0C0E;
  --ink2: #131316;
  --paper: #F2EFE9;
  --mute: #85858F;
  --acc: #FF4D24;
  --line: rgba(242,239,233,.12);
  --fd: 'Clash Display', 'Space Grotesk', system-ui, sans-serif;
  --fb: 'Satoshi', 'Inter', system-ui, sans-serif;
  --fm: 'JetBrains Mono', ui-monospace, monospace;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
.site { background: var(--ink); color: var(--paper); font-family: var(--fb); min-height: 100vh; overflow-x: clip; }
::selection { background: var(--acc); color: var(--ink); }
.acc { color: var(--acc); }
body.has-cursor, body.has-cursor a, body.has-cursor button { cursor: none; }

/* grain + progress */
.grain { position: fixed; inset: -50%; z-index: 60; pointer-events: none; opacity: .06;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation: grain 8s steps(10) infinite; }
@keyframes grain { 0%,100%{transform:translate(0,0)} 20%{transform:translate(-4%,3%)} 40%{transform:translate(3%,-4%)} 60%{transform:translate(-3%,-2%)} 80%{transform:translate(4%,2%)} }
.progress { position: fixed; top: 0; left: 0; right: 0; height: 2px; background: var(--acc); transform-origin: left; z-index: 70; }

/* cursor */
.cur-dot, .cur-ring { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 90; border-radius: 50%; display: none; }
body.has-cursor .cur-dot, body.has-cursor .cur-ring { display: block; }
.cur-dot { width: 6px; height: 6px; background: var(--acc); margin: -3px 0 0 -3px; }
.cur-ring { width: 34px; height: 34px; border: 1px solid rgba(242,239,233,.45); margin: -17px 0 0 -17px; transition: width .25s, height .25s, margin .25s, border-color .25s; }
.cur-ring.big { width: 58px; height: 58px; margin: -29px 0 0 -29px; border-color: var(--acc); }

/* reveal */
.rv { opacity: 0; transform: translateY(26px); transition: opacity .8s cubic-bezier(.2,.65,.25,1), transform .8s cubic-bezier(.2,.65,.25,1); }
.rv.in { opacity: 1; transform: none; }
.rv.d1 { transition-delay: .08s } .rv.d2 { transition-delay: .16s } .rv.d3 { transition-delay: .24s } .rv.d4 { transition-delay: .32s }

/* nav */
.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; display: flex; align-items: center; justify-content: space-between; padding: 20px clamp(20px, 4vw, 56px); mix-blend-mode: normal; background: linear-gradient(to bottom, rgba(12,12,14,.9), rgba(12,12,14,0)); }
.nav-logo { font-family: var(--fd); font-weight: 600; font-size: 21px; color: var(--paper); background: none; border: none; letter-spacing: .02em; }
.nav-links { display: flex; gap: 26px; }
.nav-links button { font-family: var(--fm); font-size: 11.5px; letter-spacing: .14em; color: var(--mute); background: none; border: none; text-transform: uppercase; padding: 4px 0; transition: color .2s; }
.nav-links button:hover, .nav-links button.on { color: var(--paper); }
.nav-links button.on { border-bottom: 1px solid var(--acc); }
.nav-pill { font-family: var(--fm); font-size: 10.5px; letter-spacing: .12em; color: var(--paper); border: 1px solid var(--line); border-radius: 999px; padding: 9px 15px; text-decoration: none; display: flex; align-items: center; gap: 8px; transition: border-color .2s, background .2s; }
.nav-pill:hover { border-color: var(--acc); background: rgba(255,77,36,.07); }
.dot-live { width: 7px; height: 7px; border-radius: 50%; background: #4ADE80; display: inline-block; animation: blip 2.2s infinite; }
@keyframes blip { 0%,100%{opacity:1} 50%{opacity:.3} }

main { position: relative; z-index: 1; }

/* hero */
.hero { min-height: 100svh; display: flex; flex-direction: column; justify-content: flex-end; padding: 120px clamp(20px, 4vw, 56px) 48px; position: relative; }
.hero::before { content: ''; position: absolute; top: -20%; right: -10%; width: 60vw; height: 60vw; background: radial-gradient(circle, rgba(255,77,36,.09), transparent 65%); pointer-events: none; }
.hero-eyebrow { font-family: var(--fm); font-size: clamp(11px, 1.2vw, 13px); letter-spacing: .3em; color: var(--acc); margin-bottom: 3vh; }
.hero-name { font-family: var(--fd); font-weight: 600; font-size: clamp(64px, 15.5vw, 230px); line-height: .88; letter-spacing: -.02em; }
.hero-line { display: block; }
.hero-foot { display: flex; flex-direction: row; justify-content: flex-start; align-items: flex-end; gap: clamp(28px, 4vw, 60px); margin-top: 6vh; }
.hero-foot .hero-badge { flex: none; margin-bottom: 6px; }
.hero-intro { max-width: 46ch; color: var(--mute); font-size: clamp(15px, 1.5vw, 18px); line-height: 1.65; }
.hero-intro b { color: var(--paper); font-weight: 600; }
.hero-side { display: flex; align-items: flex-end; gap: 34px; }
.hero-scroll { font-family: var(--fm); font-size: 10.5px; letter-spacing: .2em; color: var(--mute); text-align: right; line-height: 1.9; }
.hero-badge { position: relative; width: 108px; height: 108px; display: block; text-decoration: none; flex: none; }
.badge-spin { width: 100%; height: 100%; animation: rot 14s linear infinite; }
.badge-spin text { font-family: var(--fm); font-size: 11.5px; letter-spacing: .22em; fill: var(--paper); }
.badge-arrow { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 24px; color: var(--acc); }
@keyframes rot { to { transform: rotate(360deg) } }

/* marquee */
.marquee { border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); overflow: hidden; padding: 18px 0; background: var(--ink2); }
.marquee-track { display: flex; gap: 0; white-space: nowrap; animation: mq 30s linear infinite; width: max-content; }
.marquee-track span { font-family: var(--fd); font-weight: 500; font-size: clamp(18px, 2.4vw, 28px); letter-spacing: .06em; color: transparent; -webkit-text-stroke: 1px rgba(242,239,233,.4); padding: 0 6px; }
.marquee-track span i { -webkit-text-stroke: 0; font-style: normal; }
@keyframes mq { to { transform: translateX(-50%) } }

/* sections */
.sec { padding: clamp(90px, 12vh, 150px) clamp(20px, 4vw, 56px) 20px; max-width: 1380px; margin: 0 auto; }
.sec-head { display: flex; align-items: baseline; gap: 18px; border-bottom: 1px solid var(--line); padding-bottom: 18px; margin-bottom: clamp(36px, 5vh, 60px); }
.sec-num { font-family: var(--fm); font-size: 13px; color: var(--acc); }
.sec-title { font-family: var(--fd); font-weight: 600; font-size: clamp(26px, 3.6vw, 44px); letter-spacing: .01em; }

/* about */
.about { display: grid; grid-template-columns: minmax(240px, 340px) 1fr; gap: clamp(36px, 5vw, 80px); align-items: start; }
.about-photo { position: relative; }
.about-photo img { width: 100%; border-radius: 18px; display: block; filter: grayscale(1) contrast(1.05); transition: filter .5s; }
.about-photo:hover img { filter: grayscale(0); }
.about-frame { position: absolute; inset: 14px -14px -14px 14px; border: 1px solid var(--acc); border-radius: 18px; z-index: -1; }
.about-lead { font-family: var(--fd); font-weight: 500; font-size: clamp(21px, 2.6vw, 32px); line-height: 1.35; letter-spacing: .005em; }
.about-lead em { font-style: normal; color: var(--acc); }
.about-facts { margin-top: 44px; border-top: 1px solid var(--line); }
.fact { display: grid; grid-template-columns: 170px 1fr; gap: 16px; padding: 15px 0; border-bottom: 1px solid var(--line); font-size: 15px; color: var(--paper); }
.fk { font-family: var(--fm); font-size: 11px; letter-spacing: .18em; color: var(--mute); padding-top: 3px; }

/* experience panels */
.xp-stack { display: flex; flex-direction: column; gap: clamp(24px, 4vh, 44px); }
.panel { position: relative; border-radius: 24px; overflow: hidden; min-height: clamp(480px, 72vh, 680px); display: flex; align-items: flex-end; isolation: isolate; border: 1px solid var(--line); }
.panel-media { position: absolute; inset: 0; z-index: -2; overflow: hidden; }
.panel-media img { width: 100%; height: 100%; object-fit: cover; transform: scale(1.18); will-change: transform; filter: saturate(.85); }
.panel-shade { position: absolute; inset: 0; z-index: -1; background: linear-gradient(to top, rgba(10,10,12,.96) 8%, rgba(10,10,12,.55) 45%, rgba(10,10,12,.25) 100%); }
.panel-idx { position: absolute; top: 26px; right: 32px; font-family: var(--fd); font-weight: 600; font-size: clamp(56px, 8vw, 110px); line-height: 1; color: transparent; -webkit-text-stroke: 1px rgba(242,239,233,.35); }
.panel-body { padding: clamp(26px, 4vw, 52px); max-width: 780px; }
.panel-meta { display: flex; gap: 14px; align-items: center; margin-bottom: 16px; flex-wrap: wrap; }
.pm-date { font-family: var(--fm); font-size: 12px; letter-spacing: .16em; color: var(--paper); background: rgba(242,239,233,.1); border: 1px solid var(--line); border-radius: 999px; padding: 7px 13px; backdrop-filter: blur(6px); }
.pm-status { font-family: var(--fm); font-size: 11px; letter-spacing: .16em; color: var(--mute); }
.pm-status.live { color: #4ADE80; }
.panel h3 { font-family: var(--fd); font-weight: 600; font-size: clamp(30px, 4.6vw, 58px); line-height: 1.02; letter-spacing: -.01em; }
.panel-co { font-family: var(--fm); font-size: 13px; letter-spacing: .08em; color: var(--acc); margin: 12px 0 18px; }
.panel ul { list-style: none; }
.panel li { color: rgba(242,239,233,.82); font-size: clamp(14.5px, 1.4vw, 16.5px); line-height: 1.6; max-width: 62ch; padding-left: 20px; position: relative; }
.panel li::before { content: '—'; position: absolute; left: 0; color: var(--acc); }
.panel li + li { margin-top: 8px; }
.tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; }
.tags span { font-family: var(--fm); font-size: 11px; letter-spacing: .1em; color: var(--paper); border: 1px solid rgba(242,239,233,.28); border-radius: 999px; padding: 6px 12px; backdrop-filter: blur(6px); }

/* work list */
.work-list { border-top: 1px solid var(--line); }
.work-row { display: grid; grid-template-columns: 56px 1fr 300px 70px 40px; align-items: center; gap: 20px; padding: 30px 10px; border-bottom: 1px solid var(--line); text-decoration: none; color: var(--paper); position: relative; overflow: hidden; transition: padding-left .3s; }
.work-row::before { content: ''; position: absolute; inset: 0; background: var(--ink2); transform: scaleY(0); transform-origin: bottom; transition: transform .35s cubic-bezier(.2,.65,.25,1); z-index: -1; }
.work-row:hover::before { transform: scaleY(1); }
.work-row:hover { padding-left: 26px; }
.wr-idx { font-family: var(--fm); font-size: 12px; color: var(--mute); }
.wr-main { display: flex; flex-direction: column; gap: 6px; }
.wr-name { font-family: var(--fd); font-weight: 600; font-size: clamp(24px, 3.2vw, 40px); line-height: 1; display: flex; align-items: center; gap: 14px; }
.wr-live { font-family: var(--fm); font-size: 10px; letter-spacing: .16em; color: #4ADE80; border: 1px solid rgba(74,222,128,.4); border-radius: 999px; padding: 4px 9px; display: inline-flex; align-items: center; gap: 6px; }
.wr-tag { color: var(--mute); font-size: 14px; }
.wr-tech { font-family: var(--fm); font-size: 11.5px; letter-spacing: .06em; color: var(--mute); text-align: right; }
.wr-year { font-family: var(--fm); font-size: 12px; color: var(--mute); text-align: right; }
.wr-arr { font-size: 22px; color: var(--acc); transform: translate(-6px, 6px); opacity: 0; transition: transform .3s, opacity .3s; }
.work-row:hover .wr-arr { transform: none; opacity: 1; }
.work-note { margin-top: 26px; color: var(--mute); font-size: 14.5px; }
.ln { color: var(--paper); text-decoration: underline; text-underline-offset: 4px; text-decoration-color: var(--acc); }

/* stack */
.stack { border-top: 1px solid var(--line); }
.stack-row { display: grid; grid-template-columns: 240px 1fr; gap: 20px; padding: 22px 10px; border-bottom: 1px solid var(--line); transition: background .25s, padding-left .25s; }
.stack-row:hover { background: var(--ink2); padding-left: 24px; }
.sv { font-family: var(--fd); font-weight: 500; font-size: clamp(16px, 2vw, 22px); letter-spacing: .01em; }

/* contact */
.contact { padding-bottom: 40px; }
.contact-big { font-family: var(--fd); font-weight: 600; font-size: clamp(52px, 10.5vw, 150px); line-height: .95; letter-spacing: -.02em; margin-bottom: 30px; }
.stroke { color: transparent; -webkit-text-stroke: 1.5px var(--paper); }
.contact-sub { color: var(--mute); max-width: 54ch; font-size: 16.5px; line-height: 1.65; margin-bottom: 40px; }
.contact-sub b { color: var(--paper); }
.contact-mail { position: relative; display: inline-block; font-family: var(--fd); font-weight: 500; font-size: clamp(22px, 4vw, 44px); color: var(--paper); text-decoration: none; padding-bottom: 8px; }
.mail-line { position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: var(--acc); transform: scaleX(.25); transform-origin: left; transition: transform .35s cubic-bezier(.2,.65,.25,1); }
.contact-mail:hover .mail-line { transform: scaleX(1); }
.contact-meta { display: flex; flex-wrap: wrap; gap: clamp(18px, 3vw, 40px); margin-top: 44px; }
.contact-meta a { font-family: var(--fm); font-size: 12px; letter-spacing: .14em; color: var(--mute); text-decoration: none; transition: color .2s; }
.contact-meta a:hover { color: var(--acc); }
.footer { margin-top: clamp(70px, 10vh, 120px); border-top: 1px solid var(--line); padding: 24px 0 8px; display: flex; justify-content: space-between; gap: 14px; flex-wrap: wrap; font-family: var(--fm); font-size: 11px; letter-spacing: .14em; color: var(--mute); }
.footer button { font: inherit; color: var(--mute); background: none; border: none; letter-spacing: inherit; transition: color .2s; }
.footer button:hover { color: var(--paper); }

/* bot */
.bot { position: fixed; right: 26px; bottom: 24px; z-index: 40; display: flex; flex-direction: column; align-items: flex-end; pointer-events: none; }
.chat, .bot-btn { pointer-events: auto; }
.bot-btn { background: none; border: none; padding: 0; position: relative; }
.bot-ask { position: absolute; top: -2px; left: -14px; transform: rotate(-12deg); font-family: var(--fm); font-size: 9.5px; letter-spacing: .18em; color: var(--acc); animation: blip 2.4s infinite; }
.bot-float { animation: hover 5s ease-in-out infinite; filter: drop-shadow(0 12px 20px rgba(0,0,0,.5)); transition: transform .25s; }
.bot-btn:hover .bot-float { transform: scale(1.06); }
@keyframes hover { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
.bot-chip { font-family: var(--fm); font-size: 11px; letter-spacing: .04em; line-height: 1.55; color: var(--paper); background: rgba(19,19,22,.92); border: 1px solid var(--line); border-radius: 12px 12px 3px 12px; padding: 10px 13px; margin: 0 14px 10px 0; max-width: 224px; backdrop-filter: blur(8px); animation: chip .35s ease; }
@keyframes chip { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
.bot-tip { animation: blip 2.4s infinite; }
.bot-core { animation: blip 3.2s infinite; }

/* chat panel */
.chat { width: min(348px, calc(100vw - 32px)); height: 470px; max-height: calc(100svh - 140px); background: rgba(15,15,18,.97); border: 1px solid var(--line); border-radius: 18px; margin-bottom: 14px; display: flex; flex-direction: column; overflow: hidden; backdrop-filter: blur(14px); box-shadow: 0 24px 60px rgba(0,0,0,.55); animation: chatin .3s cubic-bezier(.2,.65,.25,1); }
@keyframes chatin { from { opacity: 0; transform: translateY(14px) scale(.97) } to { opacity: 1; transform: none } }
.chat-head { display: flex; justify-content: space-between; align-items: center; padding: 13px 16px; border-bottom: 1px solid var(--line); }
.chat-title { font-family: var(--fm); font-size: 11px; letter-spacing: .18em; color: var(--paper); display: flex; align-items: center; gap: 9px; }
.chat-x { background: none; border: none; color: var(--mute); font-size: 13px; transition: color .2s; }
.chat-x:hover { color: var(--paper); }
.chat-body { flex: 1; overflow-y: auto; padding: 16px 14px; display: flex; flex-direction: column; gap: 10px; scrollbar-width: thin; scrollbar-color: #2C2C33 transparent; }
.msg { font-size: 13.5px; line-height: 1.55; color: var(--paper); background: var(--ink2); border: 1px solid var(--line); border-radius: 13px 13px 13px 4px; padding: 10px 13px; max-width: 88%; align-self: flex-start; animation: chip .3s ease; overflow-wrap: break-word; }
.msg.me { align-self: flex-end; border-radius: 13px 13px 4px 13px; background: rgba(255,77,36,.12); border-color: rgba(255,77,36,.4); }
.msg.typing { display: flex; gap: 5px; padding: 13px 15px; }
.msg.typing span { width: 6px; height: 6px; border-radius: 50%; background: var(--mute); animation: tp 1.1s infinite; }
.msg.typing span:nth-child(2) { animation-delay: .18s } .msg.typing span:nth-child(3) { animation-delay: .36s }
@keyframes tp { 0%,100%{opacity:.25; transform:translateY(0)} 50%{opacity:1; transform:translateY(-3px)} }
.qa-block { margin-top: 6px; }
.qa-label { font-family: var(--fm); font-size: 9.5px; letter-spacing: .22em; color: var(--mute); margin: 0 2px 8px; }
.sugs { display: flex; flex-direction: column; gap: 7px; align-items: stretch; }
.sug { font-family: var(--fm); font-size: 11px; letter-spacing: .03em; line-height: 1.4; color: var(--paper); background: none; border: 1px solid var(--line); border-radius: 11px; padding: 10px 13px; transition: color .2s, border-color .2s, background .2s, transform .15s; text-align: left; }
.sug:hover { color: var(--acc); border-color: var(--acc); background: rgba(255,77,36,.06); transform: translateX(3px); }
.sug-all { color: var(--mute); border-style: dashed; text-align: center; }
.sug-all:hover { color: var(--paper); border-color: var(--mute); background: none; transform: none; }

/* responsive */
@media (max-width: 1080px) {
  .nav-links { display: none; }
  .wr-tech { display: none; }
  .work-row { grid-template-columns: 42px 1fr 56px 30px; }
}
@media (max-width: 760px) {
  .nav-pill span + * {}
  .nav-pill { font-size: 9.5px; padding: 8px 11px; }
  .hero { padding-bottom: 120px; }
  .hero-foot { flex-direction: column; align-items: flex-start; gap: 30px; }
  .hero-side { width: 100%; justify-content: space-between; }
  .about { grid-template-columns: 1fr; }
  .about-photo { max-width: 280px; }
  .fact { grid-template-columns: 1fr; gap: 4px; padding: 13px 0; }
  .panel { min-height: 540px; }
  .panel-idx { top: 18px; right: 20px; }
  .work-row { grid-template-columns: 34px 1fr 30px; gap: 12px; padding: 24px 6px; }
  .wr-year { display: none; }
  .stack-row { grid-template-columns: 1fr; gap: 8px; }
  .bot { transform: scale(.72); transform-origin: bottom right; right: 12px; bottom: 12px; }
  .bot-chip { max-width: 180px; }
}

/* reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
  html { scroll-behavior: auto; }
  .rv { opacity: 1; transform: none; }
  .panel-media img { transform: none !important; }
}
`;
