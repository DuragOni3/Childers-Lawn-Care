"use client";

import { useState } from "react";
import Link from "next/link";
import Tilt3DCard from "./Tilt3DCard";
import ScrollReveal from "./ScrollReveal";

const services = [
  // ── Featured (always visible) ──────────────────────────────
  {
    title: "Lawn Maintenance",
    desc: "Mowing, edging, fertilization, and weed control — we keep your lawn pristine all season long.",
    icon: "🌾",
    slug: "lawn-maintenance",
    featured: true,
  },
  {
    title: "Land Clearing & Grading",
    desc: "Clearing overgrown lots, improving drainage, and getting your property ready to build.",
    icon: "🚜",
    slug: "land-clearing",
    featured: true,
  },
  {
    title: "Irrigation Systems",
    desc: "Smart, efficient irrigation designed and installed to keep your lawn green year-round.",
    icon: "💧",
    slug: "irrigation",
    featured: true,
  },

  // ── Hidden until expanded ───────────────────────────────────
  {
    title: "Landscape Design & Install",
    desc: "Custom landscapes built around your lifestyle, from concept to final installation.",
    icon: "🌿",
    slug: "landscape-design",
    featured: false,
  },
  {
    title: "Hardscapes",
    desc: "Patios, retaining walls, and walkways crafted to be as functional as they are beautiful.",
    icon: "🪨",
    slug: "hardscapes",
    featured: false,
  },
  {
    title: "Outdoor Kitchens & Fireplaces",
    desc: "Extend your living space outside with custom grills, kitchens, and fireplaces.",
    icon: "🔥",
    slug: "outdoor-kitchens",
    featured: false,
  },
  {
    title: "Landscape Lighting",
    desc: "Accent, path, and spot lighting to enhance the beauty and safety of your property.",
    icon: "✨",
    slug: "lighting",
    featured: false,
  },
  {
    title: "Drainage Solutions",
    desc: "Proper drainage to protect your property and prevent damage before it starts.",
    icon: "🌊",
    slug: "drainage",
    featured: false,
  },
  {
    title: "Mulch & Pine Needles",
    desc: "Add curb appeal and protect your beds with professional mulch and pine needle installs.",
    icon: "🍂",
    slug: "mulch",
    featured: false,
  },
];

const featured = services.filter((s) => s.featured);
const hidden   = services.filter((s) => !s.featured);

function ServiceCard({ s, index }) {
  return (
    <ScrollReveal delay={index * 60}>
      <Link href={`/services#${s.slug}`} className="block h-full group">
        <Tilt3DCard className="h-full">
          <div
            className="h-full rounded-2xl p-6 border transition-colors duration-200"
            style={{
              background: "linear-gradient(135deg, #0f2e18 0%, #0d2514 100%)",
              borderColor: "rgba(30,126,52,0.3)",
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
              style={{ background: "rgba(250,204,21,0.12)" }}
            >
              {s.icon}
            </div>
            <h3 className="text-white font-serif font-bold text-lg mb-2 group-hover:text-yellow transition-colors duration-200">{s.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
            <p className="text-yellow/60 text-xs font-semibold mt-4 group-hover:text-yellow transition-colors duration-200">
              Learn more →
            </p>
          </div>
        </Tilt3DCard>
      </Link>
    </ScrollReveal>
  );
}

export default function ServicesSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="py-24" style={{ background: "#0a2010" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <ScrollReveal className="text-center mb-14">
          <p className="text-yellow-dark uppercase tracking-[0.2em] text-xs font-bold mb-2">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 leading-tight">
            Our Services
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            From a quick lawn cut to a complete outdoor transformation — we have
            the expertise to bring your vision to life.
          </p>
        </ScrollReveal>

        {/* Featured 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((s, i) => (
            <ServiceCard key={s.title} s={s} index={i} />
          ))}
        </div>

        {/* Expandable cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-hidden transition-all duration-700 ease-in-out"
          style={{
            maxHeight: expanded ? `${hidden.length * 220}px` : "0px",
            opacity:   expanded ? 1 : 0,
            marginTop: expanded ? "1.25rem" : "0",
          }}
        >
          {hidden.map((s, i) => (
            <ServiceCard key={s.title} s={s} index={i} />
          ))}
        </div>

        {/* Toggle button */}
        <ScrollReveal className="text-center mt-10">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 border-2 border-yellow/50 text-yellow hover:bg-yellow hover:text-green-dark font-bold px-8 py-3 rounded-full transition-all duration-200"
          >
            {expanded ? "Show Less" : "See All Services"}
            <svg
              className="w-4 h-4 transition-transform duration-300"
              style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </ScrollReveal>

      </div>
    </section>
  );
}
