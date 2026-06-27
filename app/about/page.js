import Link from "next/link";

function TeamCard({ size = "sm" }) {
  const isLarge = size === "lg";
  return (
    <div className="flex flex-col items-center text-center">
      {/* Photo placeholder */}
      <div
        className="w-full rounded-2xl overflow-hidden mb-4 relative"
        style={{
          aspectRatio: "1 / 1",
          background: "linear-gradient(135deg, #0d3d1a 0%, #1a5c2a 100%)",
          border: "1px solid rgba(30,126,52,0.3)",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <svg
            className={`${isLarge ? "w-16 h-16" : "w-11 h-11"} text-white/10`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
          <p className="text-white/10 text-xs mt-1">Photo</p>
        </div>
      </div>

      {/* Name placeholder */}
      <p className="text-white/50 text-sm font-semibold mb-1">Put Name Here</p>

      {/* Title placeholder */}
      <p className="text-yellow/60 text-xs">Put Title Here</p>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex justify-center items-center py-5">
      <div className="flex flex-col items-center gap-1">
        <div className="w-px h-5" style={{ background: "rgba(250,204,21,0.2)" }} />
        <div className="w-2 h-2 rounded-full" style={{ background: "rgba(250,204,21,0.3)" }} />
        <div className="w-px h-5" style={{ background: "rgba(250,204,21,0.2)" }} />
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* ── Hero banner ── */}
      <section
        className="pt-40 pb-20 text-center"
        style={{ background: "linear-gradient(to bottom, #071a0b 0%, #0a2010 100%)" }}
      >
        <p className="text-yellow uppercase tracking-[0.2em] text-xs font-bold mb-3">
          Who We Are
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
          About Us
        </h1>
        <p className="text-white/50 max-w-lg mx-auto text-lg">
          A North Carolina lawn care company built on hard work, honesty, and community.
        </p>
      </section>

      {/* ── Meet the Team ── */}
      <section className="py-20" style={{ background: "#0a2010" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section heading */}
          <div className="flex items-center gap-4 mb-14">
            <div className="flex-1 border-t border-white/10" />
            <div className="text-center shrink-0">
              <p className="text-yellow uppercase tracking-[0.2em] text-xs font-bold mb-1">Our Crew</p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">Meet the Team</h2>
            </div>
            <div className="flex-1 border-t border-white/10" />
          </div>

          {/* ── Level 1 — 1 card centered ── */}
          <div className="flex justify-center mb-0">
            <div className="w-40 sm:w-56 lg:w-72">
              <TeamCard size="lg" />
            </div>
          </div>

          {/* Connector L1 → L2 */}
          <Connector />

          {/* ── Level 2 — 3 cards ── */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-10 max-w-xs sm:max-w-xl lg:max-w-3xl mx-auto mb-0">
            <TeamCard /><TeamCard /><TeamCard />
          </div>

          {/* Connector L2 → L3 */}
          <Connector />

          {/* ── Level 3 — 3 cards ── */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-10 max-w-xs sm:max-w-xl lg:max-w-3xl mx-auto">
            <TeamCard /><TeamCard /><TeamCard />
          </div>

        </div>
      </section>

      {/* ── About card ── */}
      <section className="pt-12 pb-24" style={{ background: "#0a2010" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl overflow-hidden"
            style={{ border: "1px solid rgba(30,126,52,0.35)" }}
          >

            {/* Yellow top bar */}
            <div className="h-2 w-full bg-yellow" />

            {/* Card body */}
            <div
              className="p-8 sm:p-12"
              style={{ background: "linear-gradient(160deg, #0f2e18 0%, #0d2514 100%)" }}
            >

              {/* Business name + badge */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-white font-serif font-bold text-2xl sm:text-3xl leading-tight">
                    Childer&apos;s Lawn Care
                    <span className="text-yellow"> &amp; More LLC</span>
                  </h2>
                  <p className="text-white/40 text-sm mt-1">North Carolina</p>
                </div>
                <div className="flex items-center gap-2 bg-yellow/10 border border-yellow/25 px-4 py-2 rounded-full self-start sm:self-auto">
                  <span className="text-yellow text-sm">★</span>
                  <span className="text-yellow font-bold text-sm">4.9</span>
                  <span className="text-white/40 text-xs">on Google</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 mb-8" />

              {/* Our Story */}
              <div className="mb-8">
                <p className="text-yellow uppercase tracking-widest text-xs font-bold mb-4">
                  Our Story
                </p>
                <p className="text-white/70 leading-relaxed mb-4">
                  Childer&apos;s Lawn Care &amp; More LLC was founded in 2018 with one
                  goal in mind — deliver top-quality lawn care and landscaping to the
                  people of North Carolina with honest pricing and exceptional service.
                  What started as a one-man operation has grown into a dedicated team
                  trusted by homeowners and property owners across the region.
                </p>
                <p className="text-white/70 leading-relaxed">
                  We take pride in building real relationships with our customers. From
                  your first consultation to the finishing touches on your project, we
                  treat every property like it&apos;s our own. Whether it&apos;s a weekly lawn
                  cut or a complete outdoor transformation, you can count on us to show
                  up, do the work right, and stand behind it.
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 mb-8" />

              {/* Owner */}
              <div className="mb-8">
                <p className="text-yellow uppercase tracking-widest text-xs font-bold mb-5">
                  Meet the Owner
                </p>
                <div className="flex items-center gap-5">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-green-dark font-bold text-2xl font-serif shadow-lg shrink-0"
                    style={{ background: "#facc15" }}
                  >
                    J
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Jace Childers</p>
                    <p className="text-yellow text-sm">
                      Owner &amp; Operator — Childer&apos;s Lawn Care &amp; More LLC
                    </p>
                    <p className="text-white/40 text-sm mt-1">
                      Serving North Carolina since 2018
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 mb-8" />

              {/* Quick facts */}
              <div className="mb-8">
                <p className="text-yellow uppercase tracking-widest text-xs font-bold mb-5">
                  Quick Facts
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { value: "2018", label: "Est." },
                    { value: "4.9★", label: "Google Rating" },
                    { value: "9+",   label: "Services" },
                    { value: "Free", label: "Consultations" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl p-4 text-center"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <p className="text-yellow font-serif font-bold text-xl">{stat.value}</p>
                      <p className="text-white/40 text-xs mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="flex-1 text-center bg-yellow hover:bg-yellow-dark text-green-dark font-bold py-3 rounded-full transition-colors"
                >
                  Get a Free Quote
                </Link>
                <Link
                  href="/services"
                  className="flex-1 text-center border-2 border-white/20 text-white hover:border-yellow hover:text-yellow font-semibold py-3 rounded-full transition-colors"
                >
                  View Our Services
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

    </>
  );
}
