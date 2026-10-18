"use client";
import { useState } from "react";
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";
import CalBookingButton from "@/components/CalModal";
import { testimonials, TestimonialDialog } from "@/components/Testimonials";

/**
 * About, rebuilt: one job (would an owner trust this person with their
 * operation?), no repeated proof, nothing hidden behind a click.
 * Facts from the CV (see CV-AUDIT.md).
 */

type PathRow = {
  when: string;
  where: string;
  owned: string;
  taught: string;
  logo?: string;
  /** is-tile: square mark as a rounded tile; is-wide: taller wide logo */
  logoClass?: "is-tile" | "is-wide";
  live?: boolean;
};

/* The "taught" column is drafted copy adapted from the previous About
   page; Riz to check it sounds like him. */
const PATH: PathRow[] = [
  {
    when: "2015–17",
    where: "Perbal Clothing",
    logo: "/logos/perbal.jpg",
    logoClass: "is-tile",
    owned: "My own clothing brand in Pakistan. Sourcing, cash, stock, people.",
    taught: "A good product with bad operations is an expensive hobby.",
  },
  {
    when: "2017–19",
    where: "S&P Global",
    logo: "/logos/spglobal.svg",
    owned: "Insurance client operations. 2,000+ cases across Product, Support and Content.",
    taught: "Big companies run on somebody's undocumented spreadsheet.",
  },
  {
    when: "2019–20",
    where: "Careem",
    logo: "/logos/careem.png",
    owned: "Emergency dispatch with the KPK Ministry of Health. 3 minutes down to 20 seconds.",
    taught: "When the stakes are real, the process is the product.",
  },
  {
    when: "2020–21",
    where: "Motive",
    logo: "/logos/motive.svg",
    owned: "Taking a certified ELD product into Canada.",
    taught: "‘Launch a market’ is thirty unglamorous tasks wearing one word.",
  },
  {
    when: "2021–25",
    where: "Bolt",
    logo: "/logos/bolt.png",
    owned: "Courier cost, reporting and compliance across 20 countries. $3.9M saved in 6 months.",
    taught: "Constraint is the best operator I've worked with.",
  },
  {
    when: "2025",
    where: "Wise",
    logo: "/logos/wise.svg",
    owned: "Finance operations. Month-end close from 8 days to 3.",
    taught: "The fastest close is the one nobody has to chase.",
  },
  {
    when: "2025–26",
    where: "Shaping Wealth",
    logo: "/logos/shapingwealth.png",
    logoClass: "is-wide",
    owned: "Product, operations and delivery on Lydia, an AI coaching platform.",
    taught: "In a small team, the job is whatever is stuck.",
  },
  {
    when: "Now",
    where: "Soch",
    owned: "Co-founder. AI workflow automation for founder-led teams: 20+ workflows live across 7+ clients.",
    taught: "Fix the process first. Then automate it.",
    live: true,
  },
];

const PRINCIPLES = [
  {
    title: "Think before you build.",
    body: "Most failed automation was never a tool problem. Get clear on the process, then pick the tool.",
  },
  {
    title: "AI scales what you feed it.",
    body: "Messy input, messy output, faster. Clean up the work before you hand it to a machine.",
  },
  {
    title: "One owner per number.",
    body: "If two people own a metric, nobody does. Name the person, then build the dashboard.",
  },
  {
    title: "If it's in one head, it's a risk.",
    body: "A process nobody wrote down isn't a process. Write it down, then automate it.",
  },
];

const TRACK_LOGOS = [
  { src: "/logos/spglobal.svg", alt: "S&P Global", h: 22 },
  { src: "/logos/careem.png", alt: "Careem", h: 26 },
  { src: "/logos/bolt.png", alt: "Bolt", h: 30 },
  { src: "/logos/wise.svg", alt: "Wise", h: 24 },
];

export function AboutCtas() {
  return (
    <div className="ab-ctas">
      <CalBookingButton className="btn-coral">Book a call →</CalBookingButton>
      <Link href="/case-studies" className="btn-ghost">See what I&apos;ve built</Link>
    </div>
  );
}

export function AboutTrackRecord() {
  return (
    <div className="ab-track">
      <p className="ab-track-label">Track record</p>
      <div className="ab-track-row">
        {TRACK_LOGOS.map((l) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={l.alt} src={l.src} alt={l.alt} style={{ height: l.h }} />
        ))}
      </div>
    </div>
  );
}

export function AboutPath() {
  return (
    <section className="ab-section ab-path-section">
      <div className="max-w-site">
        <h2 className="block-title ab-h2">How I got here.</h2>
        <div className="ab-board" role="table" aria-label="Career path">
          <div className="ab-head" role="row">
            <span role="columnheader">When</span>
            <span role="columnheader">Where</span>
            <span role="columnheader">What I owned</span>
            <span role="columnheader">What it taught me</span>
          </div>
          {PATH.map((r, i) => (
            <AnimateIn key={r.when + r.where} delay={i * 60}>
              <div className={`ab-row${r.live ? " is-live" : ""}`} role="row">
                <span className="ab-when" role="cell">
                  {r.live && <span className="ab-dot" aria-hidden="true" />}
                  {r.when}
                </span>
                <span className="ab-logo" role="cell">
                  {r.live ? (
                    /* no logo file for Soch here: the badge links to the build offer */
                    <Link href="/services/projects" className="ab-now-pill">
                      <span className="ab-now-pill-dot" aria-hidden="true" />
                      <span>{"Soch · Co-founder"}</span>
                    </Link>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={r.logo} alt={r.where} className={r.logoClass} />
                  )}
                </span>
                <span className="ab-owned" role="cell">{r.owned}</span>
                <span className="ab-taught" role="cell">{r.taught}</span>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutPrinciples() {
  return (
    <section className="ab-section" style={{ background: "#fff" }}>
      <div className="max-w-site">
        <h2 className="block-title ab-h2">How I work.</h2>
        <div className="ab-principles">
          {PRINCIPLES.map((p, i) => (
            <AnimateIn key={p.title} delay={i * 80}>
              <article className="ab-principle">
                <span className="ab-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Four small cards; each opens the full testimonial in the shared dialog. */
export function AboutTestimonials() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <section className="ab-section ab-quote-section">
      <div className="max-w-site">
        <h2 className="block-title ab-h2">In their words.</h2>
        <div className="ab-tcards">
          {testimonials.map((t, i) => (
            <AnimateIn key={t.id} delay={i * 80}>
              <button type="button" className="ab-tcard" onClick={() => setOpenId(t.id)} aria-haspopup="dialog">
                <span className="ab-tcard-who">
                  <span className="ab-tcard-photo" style={{ background: t.accent }}>
                    {t.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.image} alt="" />
                    ) : (
                      t.initials
                    )}
                  </span>
                  <span className="ab-tcard-name">
                    <b>{t.name}</b>
                    {t.company}
                  </span>
                </span>
                <span className="ab-tcard-quote">&ldquo;{t.quote}&rdquo;</span>
                <span className="ab-tcard-more">Read more →</span>
              </button>
            </AnimateIn>
          ))}
        </div>
      </div>
      <TestimonialDialog t={testimonials.find((t) => t.id === openId) ?? null} onClose={() => setOpenId(null)} />
    </section>
  );
}

export function AboutStyles() {
  return (
    <style>{`
      .ab-section { padding: 72px 0; }
      .ab-h2 { text-align: left; margin: 0 0 var(--heading-gap); }
      .ab-ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 28px; }
      .ab-intro .ab-role { color: var(--coral); font-weight: 600; font-size: 1.25rem; margin: 18px 0 24px; }
      .ab-intro p { font-size: 1.125rem; line-height: 1.65; color: var(--ink); margin: 0 0 14px; max-width: 54ch; }
      .ab-accent {
        background: linear-gradient(90deg, #22332C 0%, #ff5c35 100%);
        -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
      }

      .ab-track { margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--line-2); }
      .ab-intro .ab-track-label {
        font-family: var(--font-geist-mono), monospace;
        font-size: 12px; font-weight: 600; letter-spacing: 0.12em;
        text-transform: uppercase; color: var(--coral); margin: 0 0 14px;
      }
      .ab-track-row { display: flex; align-items: center; flex-wrap: wrap; gap: 18px 30px; }
      .ab-track-row img { width: auto; display: block; }

      .ab-path-section { background: var(--cream); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
      .ab-board { --board-ink: #1C1B19; }
      .ab-head, .ab-row {
        display: grid;
        grid-template-columns: 88px 200px minmax(0, 1fr) minmax(0, 1fr);
        align-items: stretch;
      }
      .ab-head {
        padding-bottom: 10px;
        border-bottom: 1.5px solid var(--board-ink);
        font-family: var(--font-geist-mono), monospace;
        font-size: 12px; font-weight: 600; letter-spacing: 0.12em;
        text-transform: uppercase; color: var(--board-ink);
      }
      .ab-head > span, .ab-row > span { padding: 0 16px; display: flex; align-items: center; }
      .ab-head > span:first-child, .ab-row > span:first-child { padding-left: 0; }
      .ab-head > span + span, .ab-row > span + span { border-left: 1px solid var(--line-2); }
      .ab-row { padding: 20px 0; border-bottom: 1px solid var(--line-2); transition: background 0.25s ease; }
      .ab-row:hover { background: #F0E8DC; }
      .ab-when {
        gap: 8px;
        font-family: var(--font-geist-mono), monospace;
        font-size: 13.5px; font-weight: 500; color: var(--board-ink); white-space: nowrap;
      }
      .ab-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--coral); box-shadow: 0 0 0 4px rgba(255,92,53,0.18); flex-shrink: 0; }
      .ab-logo img { display: block; max-width: 92px; max-height: 26px; width: auto; height: auto; object-fit: contain; }
      .ab-logo img.is-tile { width: 34px; height: 34px; max-height: none; border-radius: 8px; object-fit: cover; }
      .ab-logo img.is-wide { max-height: 36px; }
      .ab-now-pill {
        display: inline-flex; align-items: center; gap: 8px;
        line-height: 1.25; font-size: 13px; font-weight: 600; white-space: nowrap;
        color: #fff; background: var(--coral); border-radius: 10px; padding: 7px 12px;
        text-decoration: none; transition: background 0.2s ease, transform 0.2s ease;
      }
      .ab-now-pill:hover { background: #e8431b; transform: translateY(-1px); }
      .ab-now-pill:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
      .ab-now-pill-dot { width: 6px; height: 6px; border-radius: 50%; background: #fff; flex-shrink: 0; }
      .ab-owned { font-size: 15px; font-weight: 500; line-height: 1.5; color: var(--board-ink); }
      .ab-taught { font-size: 15px; line-height: 1.5; color: var(--coral); font-weight: 500; }

      .ab-principles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
      .ab-principle {
        height: 100%; padding: 26px 24px; display: flex; flex-direction: column; gap: 10px;
        background: var(--cream); border: 1px solid var(--line); border-radius: var(--radius-card);
      }
      .ab-num { font-family: var(--font-geist-mono), monospace; font-size: 13px; font-weight: 600; color: var(--coral); }
      .ab-principle h3 { font-size: 1.2rem; font-weight: 600; color: var(--ink); line-height: 1.3; margin: 0; }
      .ab-principle p { font-size: 15px; line-height: 1.6; color: var(--body); margin: 0; }

      .ab-quote-section { background: var(--paper); border-top: 1px solid var(--line); }
      .ab-tcards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
      .ab-tcard {
        width: 100%; height: 100%;
        display: flex; flex-direction: column; gap: 16px;
        text-align: left; font: inherit; cursor: pointer;
        background: #fff; border: 1px solid var(--line); border-radius: var(--radius-card);
        padding: 22px 22px 20px;
        transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease), border-color 0.25s var(--ease);
      }
      .ab-tcard:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--coral); }
      .ab-tcard:focus-visible { outline: 2px solid var(--coral); outline-offset: 2px; }
      .ab-tcard-who { display: flex; align-items: center; gap: 12px; }
      .ab-tcard-photo {
        width: 48px; height: 48px; border-radius: 50%; overflow: hidden; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 600;
      }
      .ab-tcard-photo img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
      .ab-tcard-name { display: flex; flex-direction: column; font-size: 13.5px; color: var(--body); line-height: 1.35; }
      .ab-tcard-name b { font-size: 15px; color: var(--ink); font-weight: 600; }
      .ab-tcard-quote {
        font-size: 15px; line-height: 1.6; color: var(--ink); flex-grow: 1;
        display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden;
      }
      .ab-tcard-more { font-size: 14px; font-weight: 600; color: var(--coral); }

      @media (max-width: 1023px) {
        .ab-principles, .ab-tcards { grid-template-columns: 1fr 1fr; }
        .ab-head, .ab-row { grid-template-columns: 76px 170px minmax(0, 1fr) minmax(0, 1fr); }
        .ab-head > span, .ab-row > span { padding: 0 12px; }
      }
      /* Four columns can't survive a phone: each row becomes a stacked record. */
      @media (max-width: 767px) {
        .ab-section { padding: 48px 0; }
        .ab-head { display: none; }
        .ab-row { grid-template-columns: 1fr; gap: 6px; padding: 18px 0; }
        .ab-row > span, .ab-row > span + span { border-left: 0; padding: 0; }
        .ab-logo { margin: 2px 0; }
        .ab-principles, .ab-tcards { grid-template-columns: 1fr; }
      }
    `}</style>
  );
}
