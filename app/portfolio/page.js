"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   Project data — swap gradient + icon for real <img> later
───────────────────────────────────────────────────────────── */
const projects = [
  {
    id: 1,
    title: "Residential Lawn Transformation",
    category: "Lawn Maintenance",
    icon: "🌾",
    from: "#0d3d1a",
    to:   "#1e6b30",
    description:
      "A full lawn rescue for a residential property in North Carolina. The yard was patchy, weed-heavy, and hadn't been properly maintained in years. After a deep cleanup, core aeration, overseeding, and a four-treatment fertilization program, the lawn came back thick, lush, and green within a single season — completely unrecognizable from where it started.",
  },
  {
    id: 2,
    title: "Backyard Patio & Retaining Wall",
    category: "Hardscapes",
    icon: "🪨",
    from: "#1c2e08",
    to:   "#2e4a14",
    description:
      "A sloped backyard that was unusable and eroding was transformed into a stunning multi-level outdoor entertaining area. We built a natural stone patio with an integrated retaining wall to flatten the grade, creating a defined seating space with clean sightlines across the yard. Drainage was also rerouted to prevent future erosion.",
  },
  {
    id: 3,
    title: "Front-Yard Landscape Bed Install",
    category: "Landscape Design & Install",
    icon: "🌿",
    from: "#083018",
    to:   "#104a22",
    description:
      "New planting beds were designed and installed along the front of this home to boost curb appeal. We selected a mix of ornamental grasses, flowering perennials, and evergreen shrubs chosen for year-round color and low maintenance. Finished with fresh hardwood mulch and clean metal edging for a sharp, polished look.",
  },
  {
    id: 4,
    title: "6-Zone Smart Irrigation System",
    category: "Irrigation Systems",
    icon: "💧",
    from: "#081828",
    to:   "#0d2a42",
    description:
      "Designed and installed a full-property irrigation system across a residential lot, including six independently controlled zones, smart rain sensors, and custom head placement for even coverage across lawn areas, planting beds, and sloped sections. The homeowner no longer has dry spots or the need for hand watering anywhere on the property.",
  },
  {
    id: 5,
    title: "3-Acre Land Clearing & Site Prep",
    category: "Land Clearing & Grading",
    icon: "🚜",
    from: "#1e1608",
    to:   "#2e2214",
    description:
      "Three acres of dense overgrown brush, saplings, and debris were cleared to prepare a residential lot for new construction. Following the clearing, we regraded the entire site to establish proper drainage flow away from the future structure. The lot went from completely impenetrable overgrowth to a clean, level, build-ready canvas.",
  },
];

/* ─────────────────────────────────────────────────────────────
   18 gallery placeholder slots — cycle through green gradients
───────────────────────────────────────────────────────────── */
const palette = [
  { from: "#0d3d1a", to: "#1a5c2a" },
  { from: "#0a2e14", to: "#145a24" },
  { from: "#062010", to: "#0d3d1a" },
  { from: "#112a0a", to: "#1e4a10" },
  { from: "#1c2e08", to: "#2e4a14" },
  { from: "#083018", to: "#104a22" },
  { from: "#0a1a0a", to: "#183a18" },
  { from: "#0e3020", to: "#1a4a2a" },
  { from: "#081a14", to: "#0f3024" },
];
const gallerySlots = Array.from({ length: 18 }, (_, i) => palette[i % palette.length]);

/* ─────────────────────────────────────────────────────────────
   Gallery lightbox — navigates through the 18 smaller photos
───────────────────────────────────────────────────────────── */
function GalleryLightbox({ index, onClose, onNavigate }) {
  if (index === null) return null;
  const g       = gallerySlots[index];
  const hasPrev = index > 0;
  const hasNext = index < gallerySlots.length - 1;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape")                      onClose();
      if (e.key === "ArrowLeft"  && hasPrev)       onNavigate(index - 1);
      if (e.key === "ArrowRight" && hasNext)       onNavigate(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, hasPrev, hasNext, onClose, onNavigate]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo area */}
        <div
          className="relative h-64 sm:h-80 md:h-[400px] flex flex-col items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${g.from} 0%, ${g.to} 100%)` }}
        >
          {/* Camera icon */}
          <svg
            className="w-16 h-16 text-white/10 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-white/20 text-sm font-medium">Photo Coming Soon</p>

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center text-white/60 hover:text-white transition-all"
          >
            ✕
          </button>

          {/* Counter badge */}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white/50 text-xs px-3 py-1 rounded-full">
            {index + 1} / {gallerySlots.length}
          </div>

          {/* Prev */}
          {hasPrev && (
            <button
              onClick={() => onNavigate(index - 1)}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white text-2xl transition-all"
            >
              ‹
            </button>
          )}

          {/* Next */}
          {hasNext && (
            <button
              onClick={() => onNavigate(index + 1)}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white text-2xl transition-all"
            >
              ›
            </button>
          )}

          {/* Dot strip — compact for 18 photos */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 flex-wrap justify-center max-w-[220px]">
            {gallerySlots.map((_, i) => (
              <button
                key={i}
                onClick={() => onNavigate(i)}
                aria-label={`Photo ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === index ? "w-4 bg-yellow" : "w-1.5 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{ background: "#0d2514" }}
        >
          <p className="text-white/40 text-sm">Gallery · Photo {index + 1}</p>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Photo card
───────────────────────────────────────────────────────────── */
function PhotoCard({ project, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:ring-2 hover:ring-yellow/50 hover:scale-[1.01] ${className}`}
      style={{
        background: `linear-gradient(135deg, ${project.from} 0%, ${project.to} 100%)`,
        border: "1px solid rgba(30,126,52,0.3)",
      }}
    >
      {/* Giant icon behind */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[110px] sm:text-[140px] opacity-[0.12]">{project.icon}</span>
      </div>

      {/* Dark hover scrim */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

      {/* Category pill */}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white/70 text-xs px-3 py-1 rounded-full">
        {project.category}
      </div>

      {/* Bottom gradient + title */}
      <div
        className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-10"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}
      >
        <p className="text-white font-serif font-bold text-lg sm:text-xl leading-snug text-left">
          {project.title}
        </p>
        <p className="text-white/0 group-hover:text-white/60 text-xs mt-1 transition-all duration-300 text-left">
          Click to view details →
        </p>
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   Lightbox modal
───────────────────────────────────────────────────────────── */
function Lightbox({ project, onClose, onNavigate }) {
  const idx     = projects.findIndex((p) => p.id === project.id);
  const hasPrev = idx > 0;
  const hasNext = idx < projects.length - 1;

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft"  && hasPrev) onNavigate(projects[idx - 1]);
      if (e.key === "ArrowRight" && hasNext) onNavigate(projects[idx + 1]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, hasPrev, hasNext, onClose, onNavigate]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Card */}
      <div
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Photo area ── */}
        <div
          className="relative h-60 sm:h-80 md:h-[440px] flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${project.from} 0%, ${project.to} 100%)`,
          }}
        >
          <span className="text-[130px] md:text-[180px] opacity-10 select-none">
            {project.icon}
          </span>

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center text-white/60 hover:text-white transition-all"
          >
            ✕
          </button>

          {/* Category pill */}
          <div className="absolute top-4 right-4 bg-yellow text-green-dark text-xs font-bold px-3 py-1.5 rounded-full">
            {project.category}
          </div>

          {/* Prev */}
          {hasPrev && (
            <button
              onClick={() => onNavigate(projects[idx - 1])}
              aria-label="Previous project"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white text-2xl transition-all"
            >
              ‹
            </button>
          )}

          {/* Next */}
          {hasNext && (
            <button
              onClick={() => onNavigate(projects[idx + 1])}
              aria-label="Next project"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white text-2xl transition-all"
            >
              ›
            </button>
          )}

          {/* Dot nav */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => onNavigate(p)}
                aria-label={`Go to project ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  p.id === project.id ? "w-6 bg-yellow" : "w-1.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 right-4 text-white/30 text-xs">
            {idx + 1} / {projects.length}
          </div>
        </div>

        {/* ── Info area ── */}
        <div className="p-6 sm:p-8" style={{ background: "#0d2514" }}>
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-white font-serif font-bold text-xl sm:text-2xl leading-snug">
              {project.title}
            </h3>
            <span className="text-3xl shrink-0 mt-0.5">{project.icon}</span>
          </div>

          <p className="text-white/60 leading-relaxed text-sm sm:text-base">
            {project.description}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              onClick={onClose}
              className="flex-1 text-center bg-yellow hover:bg-yellow-dark text-green-dark font-bold py-3 rounded-full transition-colors text-sm"
            >
              Request a Similar Project
            </Link>
            <button
              onClick={onClose}
              className="flex-1 text-center border border-white/15 text-white/50 hover:text-white hover:border-white/30 font-semibold py-3 rounded-full transition-colors text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────── */
export default function PortfolioPage() {
  const [active,        setActive]        = useState(null);
  const [activeGallery, setActiveGallery] = useState(null);

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="pt-40 pb-20 text-center"
        style={{ background: "linear-gradient(to bottom, #071a0b 0%, #0a2010 100%)" }}
      >
        <p className="text-yellow uppercase tracking-[0.2em] text-xs font-bold mb-3">
          Our Work
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
          Portfolio
        </h1>
        <p className="text-white/50 max-w-xl mx-auto text-lg leading-relaxed">
          Real projects, real results.
          <br className="hidden sm:block" />
          Click any photo to learn more about the work.
        </p>
      </section>

      {/* ── Grid ── */}
      <section className="py-16" style={{ background: "#0a2010" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top row — 2 featured, larger */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
            <PhotoCard
              project={projects[0]}
              onClick={() => setActive(projects[0])}
              className="lg:col-span-2 h-72 sm:h-80 lg:h-[420px]"
            />
            <PhotoCard
              project={projects[1]}
              onClick={() => setActive(projects[1])}
              className="h-72 sm:h-80 lg:h-[420px]"
            />
          </div>

          {/* Bottom row — 3 equal */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <PhotoCard
              project={projects[2]}
              onClick={() => setActive(projects[2])}
              className="h-60 sm:h-64"
            />
            <PhotoCard
              project={projects[3]}
              onClick={() => setActive(projects[3])}
              className="h-60 sm:h-64"
            />
            <PhotoCard
              project={projects[4]}
              onClick={() => setActive(projects[4])}
              className="h-60 sm:h-64"
            />
          </div>

          <p className="text-center text-white/20 text-xs mt-10">
            Real project photos coming soon — placeholders shown above
          </p>
        </div>
      </section>

      {/* ── Gallery grid ── */}
      <section className="pb-20" style={{ background: "#0a2010" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section divider + label */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 border-t border-white/10" />
            <p className="text-yellow uppercase tracking-[0.2em] text-xs font-bold shrink-0">
              Gallery
            </p>
            <div className="flex-1 border-t border-white/10" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {gallerySlots.map((g, i) => (
              <button
                key={i}
                onClick={() => setActiveGallery(i)}
                className="relative rounded-xl overflow-hidden group cursor-pointer hover:ring-2 hover:ring-yellow/40 hover:scale-[1.03] transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg, ${g.from} 0%, ${g.to} 100%)`,
                  border: "1px solid rgba(30,126,52,0.2)",
                  aspectRatio: "1 / 1",
                }}
              >
                {/* Camera icon */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <svg
                    className="w-7 h-7 text-white/15 group-hover:text-white/30 mb-1 transition-colors duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-white/10 group-hover:text-white/25 text-[10px] font-medium transition-colors duration-200">
                    Coming Soon
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-yellow/0 group-hover:bg-yellow/5 transition-all duration-200" />
              </button>
            ))}
          </div>

          <p className="text-center text-white/15 text-xs mt-6">
            18 photos coming soon
          </p>
        </div>
      </section>

      {/* ── Featured lightbox ── */}
      {active && (
        <Lightbox
          project={active}
          onClose={() => setActive(null)}
          onNavigate={setActive}
        />
      )}

      {/* ── Gallery lightbox ── */}
      {activeGallery !== null && (
        <GalleryLightbox
          index={activeGallery}
          onClose={() => setActiveGallery(null)}
          onNavigate={setActiveGallery}
        />
      )}
    </>
  );
}
