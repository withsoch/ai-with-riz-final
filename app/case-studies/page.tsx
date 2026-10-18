"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AnimateIn from "@/components/AnimateIn";
import ScrollProgressBar from "@/components/ScrollProgressBar";

/* ─── data ──────────────────────────────────────────────────────────────────── */

const STAT_CARDS = [
  { label: "SYSTEMS", number: "20", desc: "shipped across industries" },
  { label: "INDUSTRIES", number: "12", desc: "covered end to end" },
  { label: "MAX SAVING", number: "89%", desc: "time reduction achieved" },
  { label: "FASTEST", number: "1 WK", desc: "from brief to live" },
];

/* One-line takeaway per case, for a founder reading the card. Drafted from
   each case's own problem and outcome; no new facts. */
const TAKEAWAYS: Record<string, string> = {
  "cs-01": "Speed to first contact decides most deals. Automate the reply, not the relationship.",
  "cs-02": "Intake is where cases go missing. Route them the moment they arrive.",
  "cs-03": "A no-show is a slot you can still sell. Remind early, refill automatically.",
  "cs-04": "Most tickets repeat. Let the system answer those so people handle the rest.",
  "cs-05": "Trials convert when someone shows up at the right moment. Make that moment automatic.",
  "cs-06": "Screening is pattern-matching. Give it to the system, keep the judgement for people.",
  "cs-07": "Leads rarely die from a bad pitch. They die from no follow-up.",
  "cs-08": "Every booking is a chance to sell more and learn more. Ask at the right time, every time.",
  "cs-09": "If a report takes a day to build, it stops getting built. Make it build itself.",
  "cs-10": "Drop-off is quiet. Spot the signal early and nudge before the student leaves.",
  "cs-11": "Urgent and routine look the same in an inbox. Triage first, then dispatch.",
  "cs-12": "Invoices follow rules. Anything that follows rules can run on its own.",
  "cs-13": "The prep before a call is work too. Automate it and buy back selling time.",
  "cs-14": "Churn shows up in the data before the cancellation. Watch it weekly.",
  "cs-15": "Alerts nobody trusts get ignored. Fewer false positives beat more alerts.",
  "cs-16": "One piece of work can feed every channel. Repurpose once, publish everywhere.",
  "cs-17": "The first reply sets the tone. Match people to the right person fast.",
  "cs-18": "Generic reminders get ignored. A personal one gets the cart back.",
  "cs-19": "Tell customers about a delay before they ask, and the tickets never arrive.",
  "cs-20": "A proposal is a template plus judgement. Automate the template.",
};

const caseRowsBase = [
  {
    id: "cs-01",
    num: "01",
    tag: "REAL ESTATE · SALES",
    title: "AI Lead Qualification & Agent Routing",
    result: "8 min first contact · 34% conversion rate",
    industry: "Real Estate",
    details: {
      before: [
        "40 leads/week, called in arrival order",
        "24-48 hr average first contact",
        "18% lead-to-appointment rate",
        "No prioritisation",
      ],
      after: [
        "High-intent leads contacted in 8 min",
        "Automated nurture for unqualified leads",
        "34% lead-to-appointment rate",
        "Agents working only qualified leads",
      ],
      outcomes: [
        { number: "8 min", label: "lead to first contact / was 24-48 hrs" },
        { number: "34%", label: "lead-to-appointment / was 18%" },
        { number: "22 hrs", label: "per week recovered" },
      ],
      stack: ["n8n", "Claude API", "GoHighLevel", "Twilio", "Gmail"],
      delivered: "2 weeks",
    },
  },
  {
    id: "cs-02",
    num: "02",
    tag: "LAW FIRM · OPERATIONS",
    title: "Client Intake Automation & Case Routing",
    result: "12 min response · 3 hrs/day saved",
    industry: "Professional Services",
    details: {
      before: [
        "3 hrs/day paralegal time on intake",
        "24-48 hr response to inquiries",
        "1 in 5 urgent matters missed same-day",
        "Manual routing errors",
      ],
      after: [
        "<12 min average first response",
        "100% urgent matters flagged same-day",
        "0 hrs/day paralegal triage time",
        "97% correct practice area routing",
      ],
      outcomes: [
        { number: "12 min", label: "average first response / was 24-48 hrs" },
        { number: "3 hrs", label: "per day recovered" },
        { number: "100%", label: "urgent matters flagged same-day" },
      ],
      stack: ["n8n", "Claude API", "Clio", "Calendly", "Gmail", "Slack"],
      delivered: "2 weeks",
    },
  },
  {
    id: "cs-03",
    num: "03",
    tag: "HEALTHCARE · OPERATIONS",
    title: "Appointment Reminder & Slot Recovery",
    result: "50% fewer no-shows · 73% slots refilled",
    industry: "Healthcare",
    details: {
      before: [
        "18% no-show rate (32 appts/week lost)",
        "2.5 hrs/day manual reminder calls",
        "Cancelled slots left empty",
        "No confirmation tracking",
      ],
      after: [
        "9% no-show rate",
        "0 hrs/day manual reminders",
        "73% cancelled slots filled same day",
        "Confirmation tracked automatically",
      ],
      outcomes: [
        { number: "50%", label: "reduction in no-shows / 18% → 9%" },
        { number: "2.5 hrs", label: "per day recovered" },
        { number: "73%", label: "cancelled slots refilled same day" },
      ],
      stack: ["n8n", "Twilio", "Google Calendar", "Gmail"],
      delivered: "1 week",
    },
  },
  {
    id: "cs-04",
    num: "04",
    tag: "E-COMMERCE · SUPPORT",
    title: "AI Support Triage & Auto-Resolution",
    result: "67% auto-resolved · 18 min response",
    industry: "E-commerce",
    details: {
      before: [
        "120+ tickets/week, 100% manual",
        "4-6 hr average first response",
        "2 agents on routine queries only",
        "No prioritisation",
      ],
      after: [
        "67% tickets auto-resolved",
        "<18 min average first response",
        "Agents on complex tickets only",
        "Routine queries resolved before agents start",
      ],
      outcomes: [
        { number: "67%", label: "tickets auto-resolved" },
        { number: "18 min", label: "average first response / was 4-6 hrs" },
        { number: "24 hrs", label: "per week recovered" },
      ],
      stack: ["n8n", "Claude API", "Shopify", "Gmail", "Zendesk"],
      delivered: "2 weeks",
    },
  },
  {
    id: "cs-05",
    num: "05",
    tag: "B2B SAAS · SALES",
    title: "Trial-to-Paid Conversion Workflow",
    result: "2.1× conversion · 9% → 19%",
    industry: "Technology",
    details: {
      before: [
        "9% trial-to-paid conversion",
        "Sales chasing 200 trials equally",
        "3-4 day follow-up lag",
        "No behavioural signals in CRM",
      ],
      after: [
        "19% trial-to-paid conversion",
        "Sales focused on top 20% only",
        "<4 hr contact for high-intent users",
        "Weekly behavioural scoring",
      ],
      outcomes: [
        { number: "2.1×", label: "trial-to-paid conversion / 9% → 19%" },
        { number: "<4 hrs", label: "response to high-intent" },
        { number: "28 hrs", label: "per week saved" },
      ],
      stack: ["n8n", "Clay", "Claude API", "HubSpot", "Slack"],
      delivered: "3 weeks",
    },
  },
  {
    id: "cs-06",
    num: "06",
    tag: "RECRUITMENT · HR",
    title: "CV Screening & Candidate Ranking",
    result: "Same-day shortlist · 75% less time",
    industry: "Recruitment",
    details: {
      before: [
        "80 applications per role average",
        "4-5 days to produce shortlist",
        "60% of week on screening",
        "Inconsistent scoring",
      ],
      after: [
        "Same-day shortlist every role",
        "15% of week on screening",
        "Consistent 8-criteria scoring",
        "Top candidates invited same day",
      ],
      outcomes: [
        { number: "Same day", label: "shortlist every time / was 4-5 days" },
        { number: "75%", label: "less recruiter screening time" },
        { number: "0", label: "qualified CVs missed" },
      ],
      stack: ["n8n", "Claude API", "Airtable", "Gmail"],
      delivered: "1 week",
    },
  },
  {
    id: "cs-07",
    num: "07",
    tag: "INSURANCE · SALES",
    title: "Lead Qualification & Personalised Nurture",
    result: "100% follow-up · 22% conversion",
    industry: "Financial Services",
    details: {
      before: [
        "40% follow-up rate on inbound leads",
        "No nurture sequence",
        "2 hrs per quote preparation",
        "12% conversion rate",
      ],
      after: [
        "100% leads followed up in 10 min",
        "5-touch automated nurture",
        "45 min quote prep average",
        "22% conversion rate",
      ],
      outcomes: [
        { number: "100%", label: "lead follow-up rate / was 40%" },
        { number: "22%", label: "lead-to-client conversion / was 12%" },
        { number: "31 hrs", label: "per month recovered" },
      ],
      stack: ["n8n", "Claude API", "HubSpot", "Gmail", "Slack"],
      delivered: "2 weeks",
    },
  },
  {
    id: "cs-08",
    num: "08",
    tag: "HOSPITALITY · GUEST EXPERIENCE",
    title: "Reservation Upsell & Guest Feedback Loop",
    result: "14% upsell conversion · 31% feedback rate",
    industry: "Hospitality",
    details: {
      before: [
        "No pre-visit communication",
        "0% upsell attempts",
        "Feedback ad hoc and unstructured",
        "No visibility on guest sentiment",
      ],
      after: [
        "Every guest gets personalised message",
        "14% upsell conversion",
        "31% feedback response rate",
        "Weekly sentiment summary automated",
      ],
      outcomes: [
        { number: "14%", label: "upsell conversion rate" },
        { number: "31%", label: "feedback response rate" },
        { number: "18 hrs", label: "per week admin recovered" },
      ],
      stack: ["n8n", "Twilio", "OpenTable", "Gmail", "Claude API"],
      delivered: "1 week",
    },
  },
  {
    id: "cs-09",
    num: "09",
    tag: "MARKETING AGENCY · OPERATIONS",
    title: "Automated Monthly Client Reporting",
    result: "89% time reduction · on time every month",
    industry: "Marketing",
    details: {
      before: [
        "3 days per client per month on reporting",
        "12 clients = 36 analyst-days monthly",
        "Reports consistently late",
        "Formulaic commentary",
      ],
      after: [
        "4 hrs per client per month",
        "Delivered 1st of every month",
        "Claude-written commentary",
        "Analyst doing strategy work",
      ],
      outcomes: [
        { number: "89%", label: "reduction in reporting time" },
        { number: "1st", label: "of every month without fail" },
        { number: "12 hrs", label: "analyst time freed per week" },
      ],
      stack: ["n8n", "Claude API", "Google Ads API", "Meta API", "PDFShift", "Gmail"],
      delivered: "3 weeks",
    },
  },
  {
    id: "cs-10",
    num: "10",
    tag: "EDUCATION · STUDENT SUCCESS",
    title: "Student Engagement & Completion",
    result: "Drop-off 42% → 28% · 5 hrs/week saved",
    industry: "Education",
    details: {
      before: [
        "42% student drop-off rate",
        "6 hrs/week on manual outreach",
        "No early warning system",
        "No completion recognition",
      ],
      after: [
        "28% drop-off rate",
        "1 hr/week reviewing AI drafts",
        "7-day early warning on disengagement",
        "Automated completion + upsell",
      ],
      outcomes: [
        { number: "72%", label: "course completion rate / was 58%" },
        { number: "5 hrs", label: "per week recovered" },
        { number: "−14pp", label: "drop-off improvement" },
      ],
      stack: ["n8n", "Claude API", "Teachable", "Gmail", "Airtable"],
      delivered: "2 weeks",
    },
  },
  {
    id: "cs-11",
    num: "11",
    tag: "PROPERTY MANAGEMENT · OPERATIONS",
    title: "Maintenance Request Triage & Dispatch",
    result: "<4 hr urgent dispatch · 12 hrs/week saved",
    industry: "Real Estate",
    details: {
      before: [
        "14 hrs/week ops manager on triage",
        "2-3 day dispatch on standard requests",
        "No audit trail",
        "No proactive tenant updates",
      ],
      after: [
        "2 hrs/week (manager reviews escalations)",
        "<4 hr urgent, same-day standard dispatch",
        "Full Airtable audit trail",
        "Automated tenant status updates",
      ],
      outcomes: [
        { number: "<4 hrs", label: "urgent dispatch / was 2-3 days" },
        { number: "12 hrs", label: "per week recovered" },
        { number: "100%", label: "requests tracked" },
      ],
      stack: ["n8n", "Claude API", "Retell AI", "Airtable", "Twilio"],
      delivered: "2 weeks",
    },
  },
  {
    id: "cs-12",
    num: "12",
    tag: "ACCOUNTING · FINANCE",
    title: "Accounts Payable Automation",
    result: "77% time reduction · same-day processing",
    industry: "Financial Services",
    details: {
      before: [
        "22 hrs/week manual AP processing",
        "3% data entry error rate",
        "5-7 day invoice-to-approval cycle",
        "Discrepancies found at payment stage",
      ],
      after: [
        "5 hrs/week (exceptions only)",
        "<0.5% error rate",
        "Same-day invoice processing",
        "100% discrepancies flagged before approval",
      ],
      outcomes: [
        { number: "77%", label: "reduction in AP time / 22 → 5 hrs" },
        { number: "<0.5%", label: "error rate / was 3%" },
        { number: "Same day", label: "invoice processing / was 5-7 days" },
      ],
      stack: ["n8n", "Claude API", "Xero API", "Gmail"],
      delivered: "3 weeks",
    },
  },
  {
    id: "cs-13",
    num: "13",
    tag: "HEALTH COACHING · SALES",
    title: "Discovery Call Booking & Pre-Call Prep",
    result: "52% conversion · 6 more coaching hrs/week",
    industry: "Healthcare",
    details: {
      before: [
        "90 min/day on intake admin",
        "20 hrs/week for coaching",
        "35% discovery-to-client conversion",
        "Coach gathering context during calls",
      ],
      after: [
        "15 min/day reviewing AI briefs",
        "26 hrs/week for coaching",
        "52% discovery-to-client conversion",
        "Full brief 30 min before each call",
      ],
      outcomes: [
        { number: "52%", label: "discovery-to-client rate / was 35%" },
        { number: "6 hrs", label: "more coaching per week" },
        { number: "75 min", label: "per day recovered" },
      ],
      stack: ["n8n", "Claude API", "Calendly", "Notion", "Gmail"],
      delivered: "1 week",
    },
  },
  {
    id: "cs-14",
    num: "14",
    tag: "B2B SAAS · CUSTOMER SUCCESS",
    title: "Churn Risk Detection & Intervention",
    result: "65% churn reduction · weekly health scores",
    industry: "Technology",
    details: {
      before: [
        "4-6 churns per month, all reactive",
        "Monthly manual check-ins",
        "No health scores",
        "CSM time split equally",
      ],
      after: [
        "1-2 churns per month",
        "Weekly automated health scoring",
        "CSMs on at-risk accounts only",
        "Proactive outreach before concerns raised",
      ],
      outcomes: [
        { number: "65%", label: "reduction in monthly churn" },
        { number: "Weekly", label: "health scores all accounts" },
        { number: "2× more", label: "time on high-risk accounts" },
      ],
      stack: ["n8n", "Claude API", "HubSpot", "Slack", "Product webhook"],
      delivered: "3 weeks",
    },
  },
  {
    id: "cs-15",
    num: "15",
    tag: "FINTECH · OPERATIONS",
    title: "Transaction Anomaly Detection & Alerts",
    result: "<25 min merchant alert · 50% fewer false positives",
    industry: "Financial Services",
    details: {
      before: [
        "6-8 hr merchant notification delay",
        "8 hrs/day manual triage",
        "12% false positive rate",
        "Reactive only",
      ],
      after: [
        "<25 min automated merchant alert",
        "2 hrs/day for genuine risk only",
        "6% false positive rate",
        "100% anomalies communicated proactively",
      ],
      outcomes: [
        { number: "<25 min", label: "merchant alert / was 6-8 hrs" },
        { number: "6 hrs", label: "per day analyst time saved" },
        { number: "50%", label: "false positive reduction" },
      ],
      stack: ["n8n", "Claude API", "Stripe API", "Slack", "Gmail"],
      delivered: "3 weeks",
    },
  },
  {
    id: "cs-16",
    num: "16",
    tag: "CONTENT · MARKETING",
    title: "Content Repurposing Pipeline",
    result: "4× output · $800/month saved · same day",
    industry: "Marketing",
    details: {
      before: [
        "$800/month VA cost for repurposing",
        "3-4 day lag from publish to social",
        "Inconsistent voice across channels",
        "1 content format per week",
      ],
      after: [
        "$0 additional cost",
        "Content repurposed same day",
        "Consistent voice, 20 min review",
        "4 formats per piece",
      ],
      outcomes: [
        { number: "4×", label: "content output per piece" },
        { number: "$800", label: "per month saved" },
        { number: "20 min", label: "coach review time per set" },
      ],
      stack: ["n8n", "Claude API", "Webflow", "Beehiiv", "Buffer", "Slack"],
      delivered: "1 week",
    },
  },
  {
    id: "cs-17",
    num: "17",
    tag: "MENTAL HEALTH · OPERATIONS",
    title: "Patient Intake & Therapist Matching",
    result: "<20 min response · 2 hrs/day saved",
    industry: "Healthcare",
    details: {
      before: [
        "2 hrs/day on intake and matching",
        "48-72 hr wait for first response",
        "Matching based on memory",
        "Inconsistent onboarding",
      ],
      after: [
        "0 hrs/day on intake",
        "<20 min first response",
        "AI matching on 5 criteria",
        "Standardised onboarding every patient",
      ],
      outcomes: [
        { number: "<20 min", label: "first response / was 48-72 hrs" },
        { number: "2 hrs", label: "per day recovered" },
        { number: "100%", label: "consistent intake process" },
      ],
      stack: ["n8n", "Claude API", "Typeform", "Gmail", "Airtable"],
      delivered: "1 week",
    },
  },
  {
    id: "cs-18",
    num: "18",
    tag: "E-COMMERCE · MARKETING",
    title: "AI Personalised Abandoned Cart Recovery",
    result: "6.4% recovery rate · was 2.1%",
    industry: "E-commerce",
    details: {
      before: [
        "68% cart abandonment",
        "2.1% cart recovery rate",
        "1 generic recovery email",
        "Single touchpoint only",
      ],
      after: [
        "68% cart abandonment (unchanged)",
        "6.4% cart recovery rate",
        "3-email personalised sequence",
        "Style-matched messaging",
      ],
      outcomes: [
        { number: "6.4%", label: "cart recovery rate / was 2.1%" },
        { number: "3×", label: "more recovered revenue" },
        { number: "0 extra", label: "staff hours per week" },
      ],
      stack: ["n8n", "Claude API", "Shopify", "Klaviyo"],
      delivered: "2 weeks",
    },
  },
  {
    id: "cs-19",
    num: "19",
    tag: "LOGISTICS · OPERATIONS",
    title: "Proactive Shipment Delay Communication",
    result: "82% fewer WISMO tickets · 100% proactive",
    industry: "Logistics",
    details: {
      before: [
        "340+ WISMO tickets per month",
        "1.5 support roles on WISMO full-time",
        "Reactive, customers contacting first",
        "No branded delay communication",
      ],
      after: [
        "<60 WISMO tickets per month",
        "1.5 roles redeployed to value work",
        "100% of delays communicated proactively",
        "Client-branded delay communications",
      ],
      outcomes: [
        { number: "82%", label: "fewer WISMO tickets / 340+ → <60" },
        { number: "100%", label: "delays communicated proactively" },
        { number: "1.5 roles", label: "redeployed to value work" },
      ],
      stack: ["n8n", "Claude API", "ShipStation", "Shopify", "Gmail", "Slack"],
      delivered: "2 weeks",
    },
  },
  {
    id: "cs-20",
    num: "20",
    tag: "CONSULTING · BUSINESS DEV",
    title: "Automated Proposal Generation",
    result: "76% time reduction · same-day delivery",
    industry: "Professional Services",
    details: {
      before: [
        "6-8 hrs per proposal writing",
        "Proposals delivered Thursday-Friday",
        "Max 3 proposals per week",
        "Inconsistent quality",
      ],
      after: [
        "1.5 hrs per proposal",
        "Delivered same evening as discovery",
        "7 proposals per week capacity",
        "Consistent structure every time",
      ],
      outcomes: [
        { number: "76%", label: "reduction in proposal time" },
        { number: "Same eve", label: "proposal delivery / was Thu-Fri" },
        { number: "7/week", label: "proposal capacity / was 3" },
      ],
      stack: ["n8n", "Claude API", "Notion", "PDFShift", "Gmail"],
      delivered: "2 weeks",
    },
  },
];

const caseRows = caseRowsBase;

/* ─── page ───────────────────────────────────────────────────────────────────── */

function CaseStudiesContent() {
  const [activeCase, setActiveCase] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const caseParam = searchParams.get("case");
    if (!caseParam) return;
    setActiveCase(caseParam);
    requestAnimationFrame(() => {
      document.getElementById(caseParam)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [searchParams]);


  return (
    <main style={{ background: "var(--bg)" }}>
      <style>{`
        /* hero section */
        .case-hero-band {
          background: var(--cream);
          border-bottom: 1px solid var(--line);
        }
        .case-hero-section {
          padding: 112px 60px 72px;
          max-width: 1360px;
          margin: 0 auto;
        }
        .case-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .case-hero-heading {
          font-family: inherit;
          font-size: clamp(2.4rem, 1.5rem + 3vw, 3.7rem);
          line-height: 1.02;
          letter-spacing: -0.018em;
          font-weight: 500;
          color: #22332C;
          margin-bottom: 20px;
        }
        .case-hero-heading .outline-num {
          color: #22332C;
          -webkit-text-fill-color: #22332C;
        }
        .case-hero-subtitle {
          font-family: inherit;
          font-size: 16px;
          color: rgba(34,51,44,0.72);
          margin-bottom: 36px;
        }
        .case-hero-inline-stats {
          display: flex;
          gap: 40px;
        }
        .case-hero-inline-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .case-hero-inline-stat-number {
          font-size: 28px;
          font-weight: 500;
          color: #ff5c35;
          font-family: inherit;
        }
        .case-hero-inline-stat-label {
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 1rem;
          font-weight: 600;
          color: #ff5c35;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .case-stats-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .case-stat-card {
          background: #FFFFFF;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 28px 24px;
          transition: all 0.25s ease;
        }
        .case-stat-card:hover {
          transform: translateY(-5px);
          border-color: #ff5c35;
          box-shadow: 0 8px 32px rgba(255,92,53,0.1);
        }
        .case-stat-card-label {
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 1rem;
          font-weight: 600;
          color: #ff5c35;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .case-stat-card-number {
          font-size: 40px;
          font-weight: 500;
          line-height: 1;
          background: linear-gradient(135deg, #22332C 0%, #ff5c35 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: cardStat 4s ease infinite alternate;
        }
        @keyframes cardStat {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .case-stat-card-divider {
          width: 24px;
          height: 2px;
          background: #ff5c35;
          border-radius: 2px;
          margin: 8px 0;
        }
        .case-stat-card-desc {
          font-size: 14px;
          color: rgba(34,51,44,0.72);
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .case-hero-section {
            padding: 96px 24px 48px;
          }
          .case-hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        /* ===== CASE CARDS ===== */
        .cases-section { padding: 72px 0; background: var(--paper); }
        .cases-wrap { max-width: 1360px; margin: 0 auto; padding: 0 60px; }
        .cases-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--grid-gap); }
        .case-card {
          position: relative; background: #fff;
          border: 1px solid var(--line); border-radius: var(--radius-card);
          padding: 30px 30px 26px; display: flex; flex-direction: column; gap: 16px;
          transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease), border-color 0.25s var(--ease);
        }
        .case-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--line-2); }
        .case-card.is-target { border-color: var(--coral); box-shadow: 0 18px 44px rgba(255,92,53,0.14); }
        .case-card.is-wide { grid-column: 1 / -1; }
        .case-anchor { position: absolute; top: -96px; }
        .case-card-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
        .case-card-num { font-family: var(--font-geist-mono), monospace; font-size: 13px; font-weight: 600; color: var(--muted); }
        .case-card-chip {
          font-family: var(--font-geist-mono), monospace; font-size: 11.5px; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase; color: var(--coral);
          background: rgba(255,92,53,0.08); padding: 4px 10px; border-radius: var(--radius-chip);
        }
        .case-card-hero { display: flex; align-items: baseline; flex-wrap: wrap; gap: 4px 14px; }
        .case-card-big { font-size: clamp(2.4rem, 1.9rem + 1.8vw, 3.2rem); font-weight: 500; line-height: 1; letter-spacing: -0.02em; color: var(--ink); }
        .case-card-biglabel { font-size: 15px; color: var(--body); line-height: 1.4; max-width: 28ch; }
        .case-card-title { margin: 0; font-size: 1.3rem; font-weight: 600; color: var(--ink); line-height: 1.3; }
        .case-card-ba { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .case-card-label {
          font-family: var(--font-geist-mono), monospace; font-size: 11.5px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); margin: 0 0 8px;
        }
        .case-card-label.after { color: var(--coral); }
        .case-card-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
        .case-card-list li { display: flex; gap: 8px; font-size: 14.5px; line-height: 1.5; color: var(--body); }
        .case-card-list li::before { content: "→"; color: rgba(34,51,44,0.45); flex-shrink: 0; }
        .case-card-list.after li { color: var(--ink); }
        .case-card-list.after li::before { color: var(--coral); }
        .case-card-metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; padding-top: 14px; border-top: 1px solid var(--line); }
        .case-card-metric b { display: block; font-size: 1.35rem; font-weight: 600; color: var(--ink); line-height: 1.1; }
        .case-card-metric span { display: block; font-size: 13px; line-height: 1.4; color: var(--muted); margin-top: 4px; }
        .case-card-box {
          margin-top: auto; background: var(--cream); border-radius: 12px; padding: 12px 14px;
          display: flex; align-items: center; justify-content: space-between; gap: 10px 16px; flex-wrap: wrap;
        }
        .case-card-take { flex-basis: 100%; margin: 0 0 4px; padding-bottom: 10px; border-bottom: 1px solid var(--line-2); font-size: 15px; line-height: 1.55; color: var(--ink); }
        .case-card-take strong { color: var(--coral); font-weight: 600; }
        .case-card-delivered { font-size: 14px; color: var(--ink); }
        .case-card-delivered strong { color: var(--coral); font-weight: 600; }
        .case-card-stack { display: flex; flex-wrap: wrap; gap: 6px; }
        .case-card-stack span {
          font-family: var(--font-geist-mono), monospace; font-size: 11.5px; color: var(--ink);
          background: #fff; border: 1px solid var(--line); border-radius: var(--radius-chip); padding: 3px 9px;
        }
        @media (max-width: 960px) {
          .cases-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .cases-section { padding: 48px 0; }
          .cases-wrap { padding: 0 24px; }
          .case-card { padding: 24px 20px 20px; }
          .case-card-ba { grid-template-columns: 1fr; gap: 14px; }
        }
      `}</style>

      <ScrollProgressBar />

      <div className="case-hero-band">
        <section className="case-hero-section">
          <div className="case-hero-grid">
            <div>
              <AnimateIn>
                <h1 className="case-hero-heading">
                  <span className="outline-num">20</span> systems.
                  <br />
                  Real problems.
                  <br />
                  Real outcomes.
                </h1>
                <div className="case-hero-inline-stats">
                  <div className="case-hero-inline-stat">
                    <span className="case-hero-inline-stat-number">12</span>
                    <span className="case-hero-inline-stat-label">INDUSTRIES</span>
                  </div>
                  <div className="case-hero-inline-stat">
                    <span className="case-hero-inline-stat-number">20</span>
                    <span className="case-hero-inline-stat-label">SYSTEMS</span>
                  </div>
                </div>
              </AnimateIn>
            </div>

            <div className="case-stats-cards">
              {STAT_CARDS.map((stat, i) => (
                <AnimateIn as="div" className="case-stat-card" key={stat.label} delay={i * 80}>
                  <div className="case-stat-card-label">{stat.label}</div>
                  <div
                    className="case-stat-card-number"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  >
                    {stat.number}
                  </div>
                  <div className="case-stat-card-divider" />
                  <div className="case-stat-card-desc">{stat.desc}</div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="cases-section">
        <div className="cases-wrap">
          <div className="cases-grid">
            {caseRows.map((row, i) => {
              const [lead, ...rest] = row.details.outcomes;
              const wide = i === caseRows.length - 1 && caseRows.length % 2 === 1;
              return (
                <AnimateIn
                  key={row.id}
                  as="article"
                  delay={(i % 2) * 100}
                  className={`case-card${wide ? " is-wide" : ""}${activeCase === row.id ? " is-target" : ""}`}
                >
                  <span id={row.id} className="case-anchor" aria-hidden="true" />
                  <div className="case-card-top">
                    <span className="case-card-num">{row.num}</span>
                    <span className="case-card-chip">{row.tag}</span>
                  </div>

                  <div className="case-card-hero">
                    <span className="case-card-big">{lead.number}</span>
                    <span className="case-card-biglabel">{lead.label}</span>
                  </div>

                  <h2 className="case-card-title">{row.title}</h2>

                  <div className="case-card-ba">
                    <div>
                      <p className="case-card-label">Before</p>
                      <ul className="case-card-list">
                        {row.details.before.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="case-card-label after">What we built</p>
                      <ul className="case-card-list after">
                        {row.details.after.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {rest.length > 0 && (
                    <div className="case-card-metrics">
                      {rest.map((m) => (
                        <div key={m.label} className="case-card-metric">
                          <b>{m.number}</b>
                          <span>{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="case-card-box">
                    {TAKEAWAYS[row.id] && (
                      <p className="case-card-take">
                        <strong>For a founder:</strong> {TAKEAWAYS[row.id]}
                      </p>
                    )}
                    <span className="case-card-delivered">
                      Delivered in <strong>{row.details.delivered}</strong>
                    </span>
                    <span className="case-card-stack">
                      {row.details.stack.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </span>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function CaseStudies() {
  return (
    <Suspense fallback={null}>
      <CaseStudiesContent />
    </Suspense>
  );
}
