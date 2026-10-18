import AnimateIn from "@/components/AnimateIn";
import {
  AboutCtas,
  AboutPath,
  AboutPrinciples,
  AboutStyles,
  AboutTestimonials,
  AboutTrackRecord,
} from "@/components/about/AboutSections";

export const metadata = {
  title: "About · Rizwan Mahmood",
  description:
    "Operator and AI builder. Ten years in operations at S&P Global, Careem, Bolt and Wise; now co-founder of Soch, building AI workflow automation.",
};

/**
 * About has one job the other pages can't do: would an owner trust this
 * person with their operation? It carries the story and the judgment and
 * leaves the numbers to the homepage and case studies.
 */
export default function About() {
  return (
    <>
      <AboutStyles />
      <style>{`
        .about-hero { background: var(--cream); padding: 120px 0 64px; }
        .about-grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 56px; align-items: center; }
        .about-title {
          font-size: clamp(2.3rem, 1.4rem + 2.6vw, 3.6rem);
          line-height: 1.06; letter-spacing: -0.02em; font-weight: 500; color: var(--ink); margin: 0;
        }
        .about-photo {
          border-radius: 20px; overflow: hidden; aspect-ratio: 4 / 5;
          box-shadow: 0 28px 72px -16px rgba(14,14,13,0.32);
        }
        .about-photo img { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 36px; }
          .about-photo { max-width: 420px; }
        }
        @media (max-width: 767px) {
          .about-hero { padding: 96px 0 40px; }
        }
      `}</style>

      <section className="about-hero">
        <div className="max-w-site about-grid">
          <div className="ab-intro">
            <AnimateIn>
              <h1 className="about-title">
                Ten years running operations.{" "}
                <span className="ab-accent">Now I automate them.</span>
              </h1>
              <p className="ab-role">Operator and AI builder.</p>
            </AnimateIn>
            <AnimateIn delay={120}>
              <p>
                At Careem, Bolt and Wise I owned the numbers that hurt: dispatch time, courier
                cost, month-end close. Different businesses, same job. Find where the work waits.
                Fix it. Make it boring.
              </p>
              <p>
                Now I help owners think clearly enough that automation actually works, and I build
                the systems that prove it through Soch, the AI workflow automation studio I
                co-founded.
              </p>
              <p>
                ACCA-qualified, so I read the P&amp;L before the roadmap. I also talk about this
                stuff: workshops, talks, and writing every week.
              </p>
              <AboutCtas />
              <AboutTrackRecord />
            </AnimateIn>
          </div>
          <AnimateIn delay={160}>
            <div className="about-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/riz-photo-new.jpg" alt="Rizwan Mahmood" />
            </div>
          </AnimateIn>
        </div>
      </section>

      <AboutPath />
      <AboutPrinciples />
      <AboutTestimonials />
    </>
  );
}
