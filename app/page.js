import Link from "next/link";
import GrassScene from "../components/GrassScene";
import ScrollReveal from "../components/ScrollReveal";
import FAQAccordion from "../components/FAQAccordion";
import ServicesSection from "../components/ServicesSection";

/* ── Stats ─────────────────────────────────────────────────── */
const stats = [
  { value: "2018", label: "Est." },
  { value: "4.9★", label: "Google Rating" },
  { value: "9+",   label: "Services Offered" },
  { value: "Free", label: "Consultations" },
];

/* ── Why Us ────────────────────────────────────────────────── */
const whyUs = [
  { icon: "🌿", title: "Full-Service",     desc: "From lawn cuts to full landscape builds — one call does it all." },
  { icon: "⭐", title: "4.9 Stars",        desc: "Nearly perfect ratings from real customers on Google." },
  { icon: "💬", title: "Free Quotes",      desc: "No pressure consultations and quotes, always free." },
  { icon: "🤝", title: "Community-First",  desc: "Serving North Carolina since 2018 and proud of every yard." },
];

/* ─────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden flex flex-col items-center justify-center text-center"
        style={{ minHeight: "100vh", background: "#0b2212" }}
      >
        {/* ── Full-canvas top-down grass (fills entire hero) ── */}
        <GrassScene />

        {/* ── Vignette edges ── */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 35%, rgba(5,16,7,0.65) 100%)",
          }}
        />

        {/* ── Readable scrim over 3-D grass ── */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(4,14,6,0.52) 0%, rgba(4,14,6,0.18) 50%, rgba(4,14,6,0.45) 100%)",
          }}
        />

        {/* ── Hero content ── */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-40">
          {/* Floating badge */}
          <div className="animate-float inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/15 text-white/90 text-xs font-semibold px-4 py-2 rounded-full mb-8">
            <span className="text-yellow">★</span> Rated 4.9 on Google · North Carolina
          </div>

          <h1 className="animate-fade-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.1] mb-6"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}>
            Your Dream{" "}
            <span className="shimmer-text">Outdoor Space</span>
            <br />
            Starts Here
          </h1>

          <p className="animate-fade-up delay-200 text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
             style={{ textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}>
            Childers Lawn &amp; Landscape LLC handles everything from design and
            install to weekly maintenance — delivering stunning outdoor living
            areas since 2018.
          </p>

          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-base">
              Get a Free Quote
            </Link>
            <Link href="/services" className="btn-ghost text-base">
              View Our Services
            </Link>
          </div>

        </div>


        {/* Fade edge into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-20"
          style={{ background: "linear-gradient(to bottom, transparent, #0a2010)" }}
        />
      </section>

      {/* ══════════════════════════════════════════
          STATS BAND
      ══════════════════════════════════════════ */}
      <section className="bg-yellow py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-serif font-bold text-green-dark">{s.value}</div>
                <div className="text-green-dark/70 text-xs font-semibold uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES — expandable cards
      ══════════════════════════════════════════ */}
      <ServicesSection />

      {/* ══════════════════════════════════════════
          ABOUT — light section
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Text */}
            <ScrollReveal>
              <p className="section-label">Our Story</p>
              <h2 className="section-heading">
                Built on Hard Work<br />&amp; Community
              </h2>
              <p className="text-gray-500 leading-relaxed mb-5">
                Hunter Childers founded Childers Lawn &amp; Landscape LLC in 2018.
                What started as a one-man operation has grown into a dedicated team
                committed to top-quality work and exceptional customer service.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Our goal is simple: bring the best possible service with the highest
                quality workmanship to the people of North Carolina. We're excited
                to keep growing and being part of this community for years to come.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/about" className="btn-primary inline-block text-center">
                  Meet the Team
                </Link>
                <a
                  href="tel:9104342533"
                  className="inline-block border-2 border-green-primary text-green-primary hover:bg-green-primary hover:text-white font-bold px-7 py-3 rounded-full transition-all duration-200 text-center"
                >
                  Call Us Today
                </a>
              </div>
            </ScrollReveal>

            {/* Quote card */}
            <ScrollReveal delay={150}>
              <div
                className="rounded-3xl p-8 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #0d3d1a 0%, #1a5c2a 100%)",
                }}
              >
                {/* Big quote mark */}
                <div
                  className="absolute -top-4 -right-2 text-[120px] font-serif leading-none pointer-events-none select-none"
                  style={{ color: "rgba(250,204,21,0.15)" }}
                >
                  "
                </div>

                <p className="text-white/90 text-lg leading-relaxed mb-8 relative z-10">
                  I love being able to build relationships with people in our
                  community. My goal is to design and build you an outdoor space
                  tailored to your needs. From the consultation to completion,
                  we will be there for any questions you may have.
                </p>

                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 bg-yellow rounded-full flex items-center justify-center text-green-dark font-bold text-2xl font-serif shadow-lg">
                    H
                  </div>
                  <div>
                    <p className="text-white font-bold">Hunter Childers</p>
                    <p className="text-yellow text-sm">Owner, Childers Lawn &amp; Landscape LLC</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="mt-6 flex gap-1 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow fill-yellow" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-white/50 text-sm ml-2">4.9 on Google</span>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="section-label">Why Us</p>
            <h2 className="section-heading text-center">The Childers Difference</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <div className="text-center group cursor-default">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-110"
                    style={{ background: "linear-gradient(135deg, #e6f7ea 0%, #f4fff6 100%)", boxShadow: "0 4px 16px rgba(30,126,52,0.12)" }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="font-serif font-bold text-green-text text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-off-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <p className="section-label">Common Questions</p>
            <h2 className="section-heading text-center">FAQs</h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <FAQAccordion />
          </ScrollReveal>
        </div>
      </section>

    </>
  );
}
