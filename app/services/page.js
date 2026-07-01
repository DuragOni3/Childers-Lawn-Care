"use client";

import { useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   Service data
───────────────────────────────────────────────────────────── */
const services = [
  {
    id: "lawn-maintenance",
    title: "Lawn Maintenance",
    icon: "🌾",
    photoPrefix: "lawn",
    tagline: "Pristine lawns, all season long.",
    description:
      "We handle the full lawn care spectrum — regular mowing on your schedule, precision edging, seasonal fertilization programs to keep grass thick and green, and targeted weed control. Every plan is customized to your property's size and conditions.",
    rates: [
      "Weekly Mow & Edge",
      "Bi-Weekly Mow & Edge",
      "Fertilization Program (seasonal)",
      "Weed Control Treatment",
      "Full Maintenance Package",
    ],
  },
  {
    id: "landscape-design",
    title: "Landscape Design & Install",
    icon: "🌿",
    photoPrefix: "landscape",
    tagline: "Your outdoor vision, professionally built.",
    description:
      "From concept to completion, we design and install landscapes that complement your home and lifestyle. Plant selection, bed layouts, focal features, and seasonal color — all tailored to you and your property.",
    rates: [
      "Design Consultation",
      "Bed Installation (per sq ft)",
      "Plant Installation",
      "Full Landscape Design & Build",
    ],
  },
  {
    id: "hardscapes",
    title: "Hardscapes",
    icon: "🪨",
    photoPrefix: "hardscape",
    tagline: "Patios, walls, and walkways built to last.",
    description:
      "Retaining walls that hold, patios that impress, and walkways that guide — all built with quality materials and expert craftsmanship designed to stand up to North Carolina's weather for decades.",
    rates: [
      "Patio Design & Installation",
      "Retaining Wall (per linear ft)",
      "Walkway Installation",
      "Full Hardscape Design & Build",
    ],
  },
  {
    id: "outdoor-kitchens",
    title: "Outdoor Kitchens & Fireplaces",
    icon: "🔥",
    photoPrefix: "kitchen",
    tagline: "Extend your living space outdoors.",
    description:
      "Custom outdoor kitchens with built-in grills, counters, and prep stations, plus stone and brick fireplaces that become the backyard centerpiece. Perfect for entertaining or relaxing year-round.",
    rates: [
      "Outdoor Kitchen Build",
      "Fireplace / Fire Pit Installation",
      "Combined Outdoor Living Space",
    ],
  },
  {
    id: "irrigation",
    title: "Irrigation Systems",
    icon: "💧",
    photoPrefix: "irrigation",
    tagline: "Smart watering that saves time and water.",
    description:
      "We design, install, and maintain smart irrigation systems tailored to your property's zones and plant types. Proper coverage means less wasted water and a consistently healthy lawn and landscape.",
    rates: [
      "System Design & Install",
      "Zone Add-On",
      "Sprinkler Head Repair / Replace",
      "Seasonal Startup / Winterization",
    ],
  },
  {
    id: "lighting",
    title: "Landscape Lighting",
    icon: "✨",
    photoPrefix: "lighting",
    tagline: "Beautiful and functional after dark.",
    description:
      "Professionally designed low-voltage LED landscape lighting to accent trees, pathways, and architecture. Great for curb appeal, safety, and extending your outdoor enjoyment into the evening.",
    rates: [
      "Pathway Lighting",
      "Accent / Uplighting",
      "Full System Design & Install",
    ],
  },
  {
    id: "drainage",
    title: "Drainage Solutions",
    icon: "🌊",
    photoPrefix: "drainage",
    tagline: "Protect your property before damage starts.",
    description:
      "Standing water, soggy lawns, and erosion are signs of drainage problems. We assess your property and install French drains, channel drains, or grading solutions to redirect water away from your home.",
    rates: [
      "Drainage Assessment",
      "French Drain Installation (per linear ft)",
      "Channel Drain / Catch Basin",
      "Grading & Regrading",
    ],
  },
  {
    id: "land-clearing",
    title: "Land Clearing & Grading",
    icon: "🚜",
    photoPrefix: "clearing",
    tagline: "Make your property ready to build.",
    description:
      "Whether you're clearing overgrown brush, preparing a lot for construction, or regrading for better drainage, our equipment and team handle jobs of all sizes — from residential lots to larger acreage.",
    rates: [
      "Brush & Debris Clearing",
      "Lot Grading",
      "Stump Removal",
      "Full Land Prep Package",
    ],
  },
  {
    id: "mulch",
    title: "Mulch & Pine Needles",
    icon: "🍂",
    photoPrefix: "mulch",
    tagline: "Curb appeal with lasting protection.",
    description:
      "Fresh mulch and pine needles insulate roots, retain moisture, and suppress weeds. We install bulk materials quickly and cleanly with precise edging for a polished, finished look.",
    rates: [
      "Mulch Installation (per yard)",
      "Pine Needle Installation (per bale)",
      "Bed Prep & Edge",
      "Full Bed Refresh Package",
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   5 gradient palettes cycling through slides / image boxes
───────────────────────────────────────────────────────────── */
const slideColors = [
  { from: "#0d3d1a", to: "#1a5c2a" },
  { from: "#0a2e14", to: "#145a24" },
  { from: "#062010", to: "#0d3d1a" },
  { from: "#112a0a", to: "#1e4a10" },
  { from: "#081a08", to: "#124a12" },
];

const PHOTO_COUNT = 5;

/* ─────────────────────────────────────────────────────────────
   Photo Modal — 5 placeholder slides, Portfolio button
───────────────────────────────────────────────────────────── */
function PhotoModal({ service, onClose }) {
  const [slide, setSlide] = useState(0);
  if (!service) return null;

  const prev = () => setSlide((s) => (s - 1 + PHOTO_COUNT) % PHOTO_COUNT);
  const next = () => setSlide((s) => (s + 1) % PHOTO_COUNT);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Slides ── */}
        <div className="relative h-72 sm:h-96 md:h-[480px]">
          {Array.from({ length: PHOTO_COUNT }).map((_, i) => {
            const { from, to } = slideColors[i];
            return (
              <div
                key={i}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${
                  i === slide ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                style={{
                  background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
                }}
              >
                <div className="text-8xl mb-4 opacity-25">{service.icon}</div>
                <p className="text-white/30 text-sm font-medium">{service.title}</p>
                <p className="text-yellow/40 font-mono text-xs mt-2">
                  {service.photoPrefix}-{i + 1}.jpg
                </p>
              </div>
            );
          })}

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center text-white/70 hover:text-white transition-all"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Portfolio button */}
          <Link
            href="/portfolio"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-yellow hover:bg-yellow-dark text-green-dark font-bold text-xs px-4 py-2 rounded-full transition-colors"
          >
            Portfolio →
          </Link>

          {/* Prev / Next */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white text-2xl transition-all"
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white text-2xl transition-all"
            aria-label="Next photo"
          >
            ›
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {Array.from({ length: PHOTO_COUNT }).map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Photo ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === slide
                    ? "w-6 bg-yellow"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="absolute bottom-5 right-4 z-20 text-white/30 text-xs">
            {slide + 1} / {PHOTO_COUNT}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{ background: "#0d2514" }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{service.icon}</span>
            <span className="text-white font-serif font-semibold">
              {service.title}
            </span>
          </div>
          <span className="text-white/25 text-xs hidden sm:block">
            Real photos coming soon
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Rate Modal — placeholder pricing + CTA
───────────────────────────────────────────────────────────── */
function RateModal({ service, onClose }) {
  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-md rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{
          background: "#0d2514",
          border: "1px solid rgba(250,204,21,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors text-lg"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-7">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
            style={{ background: "rgba(250,204,21,0.12)" }}
          >
            {service.icon}
          </div>
          <div>
            <h3 className="text-white font-serif font-bold text-xl leading-tight">
              {service.title}
            </h3>
            <p className="text-yellow text-xs mt-0.5">{service.tagline}</p>
          </div>
        </div>

        {/* Rate lines */}
        <div className="mb-6">
          {service.rates.map((label, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-white/10 last:border-0"
            >
              <span className="text-white/70 text-sm">{label}</span>
              <span className="text-yellow font-semibold text-sm shrink-0 ml-4">
                Contact for Quote
              </span>
            </div>
          ))}
        </div>

        <p className="text-white/30 text-xs text-center mb-5 leading-relaxed">
          Pricing varies by property size and project scope.
          <br />
          Contact us for a free, personalized estimate.
        </p>

        <Link
          href="/contact"
          onClick={onClose}
          className="block w-full text-center bg-yellow hover:bg-yellow-dark text-green-dark font-bold py-3 rounded-full transition-colors"
        >
          Get a Free Quote
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Service Row — alternates info-left / info-right each row
───────────────────────────────────────────────────────────── */
function ServiceRow({ service, index, onRates, onPhotos }) {
  const flip = index % 2 !== 0;
  const { from, to } = slideColors[index % slideColors.length];

  /* Info box */
  const infoBox = (
    <button
      className="w-full h-full text-left rounded-2xl p-8 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-yellow/40 group"
      style={{
        background: "linear-gradient(135deg, #0f2e18 0%, #0d2514 100%)",
        border: "1px solid rgba(30,126,52,0.3)",
        minHeight: "300px",
      }}
      onClick={() => onRates(service)}
    >
      <div>
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-5"
          style={{ background: "rgba(250,204,21,0.12)" }}
        >
          {service.icon}
        </div>
        <h2 className="text-white font-serif font-bold text-2xl mb-1">
          {service.title}
        </h2>
        <p className="text-yellow text-xs mb-4">{service.tagline}</p>
        <p className="text-white/50 text-sm leading-relaxed">
          {service.description}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-2 text-yellow text-sm font-semibold group-hover:gap-3 transition-all duration-200">
        View Rates
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </button>
  );

  /* Image / photo box */
  const imageBox = (
    <button
      className="w-full h-full rounded-2xl overflow-hidden cursor-pointer group relative transition-all duration-200 hover:ring-2 hover:ring-yellow/40"
      style={{
        border: "1px solid rgba(30,126,52,0.3)",
        minHeight: "300px",
        background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      }}
      onClick={() => onPhotos(service)}
    >
      {/* Placeholder art */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-6xl sm:text-9xl opacity-15 mb-3">{service.icon}</div>
      </div>

      {/* Hover overlay + icon */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 group-hover:bg-black/25 transition-all duration-200">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-white text-sm font-semibold tracking-wide">
            View Photos
          </span>
        </div>
      </div>

      {/* Badge */}
      <div className="absolute top-4 right-4 bg-black/40 text-white/60 text-xs px-3 py-1 rounded-full backdrop-blur-sm">
        5 photos
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 px-5 py-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}>
        <p className="text-white/50 text-xs">{service.title} — click to view gallery</p>
        <p className="text-yellow/40 font-mono text-xs mt-0.5">
          {service.photoPrefix}-1.jpg … {service.photoPrefix}-5.jpg
        </p>
      </div>
    </button>
  );

  return (
    <div id={service.id} className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch scroll-mt-28">
      {!flip ? (
        <>
          <div className="lg:col-span-2">{infoBox}</div>
          <div className="lg:col-span-3">{imageBox}</div>
        </>
      ) : (
        <>
          <div className="lg:col-span-3">{imageBox}</div>
          <div className="lg:col-span-2">{infoBox}</div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────── */
export default function ServicesPage() {
  const [rateService,  setRateService]  = useState(null);
  const [photoService, setPhotoService] = useState(null);

  return (
    <>
      {/* ── Hero banner ── */}
      <section
        className="pt-40 pb-20 text-center"
        style={{
          background: "linear-gradient(to bottom, #071a0b 0%, #0a2010 100%)",
        }}
      >
        <p className="text-yellow uppercase tracking-[0.2em] text-xs font-bold mb-3">
          What We Offer
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
          Our Services
        </h1>
        <p className="text-white/50 max-w-xl mx-auto text-lg leading-relaxed">
          From weekly maintenance to full outdoor transformations —
          <br className="hidden sm:block" />
          one team, endless capabilities.
        </p>
      </section>

      {/* ── Service rows ── */}
      <section className="py-16" style={{ background: "#0a2010" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {services.map((s, i) => (
            <ServiceRow
              key={s.id}
              service={s}
              index={i}
              onRates={setRateService}
              onPhotos={setPhotoService}
            />
          ))}
        </div>
      </section>

      {/* ── Modals ── */}
      <RateModal   service={rateService}  onClose={() => setRateService(null)} />
      <PhotoModal  service={photoService} onClose={() => setPhotoService(null)} />
    </>
  );
}
