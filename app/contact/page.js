import Link from "next/link";
import FacebookFeed from "../../components/FacebookFeed";

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="pt-40 pb-20 text-center"
        style={{ background: "linear-gradient(to bottom, #071a0b 0%, #0a2010 100%)" }}
      >
        <p className="text-yellow uppercase tracking-[0.2em] text-xs font-bold mb-3">
          Reach Out
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
          Contact Us
        </h1>
        <p className="text-white/50 max-w-lg mx-auto text-lg">
          We&apos;d love to hear from you. Reach out and we&apos;ll get back to you as soon as possible.
        </p>
      </section>

      {/* ── Contact card ── */}
      <section className="py-20" style={{ background: "#0a2010" }}>
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl overflow-hidden"
            style={{ border: "1px solid rgba(30,126,52,0.35)" }}
          >
            <div className="h-2 w-full bg-yellow" />

            <div
              className="p-8 sm:p-12"
              style={{ background: "linear-gradient(160deg, #0f2e18 0%, #0d2514 100%)" }}
            >
              {/* Heading */}
              <h2 className="text-white font-serif font-bold text-2xl sm:text-3xl leading-tight mb-1">
                Childer&apos;s Lawn Care
                <span className="text-yellow"> &amp; More LLC</span>
              </h2>
              <p className="text-white/40 text-sm mb-8">North Carolina</p>

              <div className="border-t border-white/10 mb-8" />

              {/* Contact rows */}
              <div className="space-y-4 mb-8">

                {/* Phone */}
                <a
                  href="tel:9104342533"
                  className="flex items-center gap-4 text-white/60 hover:text-yellow transition-colors group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-yellow/20 transition-colors"
                    style={{ background: "rgba(250,204,21,0.1)" }}
                  >
                    <svg className="w-5 h-5 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/30 text-xs uppercase tracking-wider mb-0.5">Phone</p>
                    <p className="text-sm font-medium">(910) 434-2533</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:childerslawncare2@yahoo.com"
                  className="flex items-center gap-4 text-white/60 hover:text-yellow transition-colors group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-yellow/20 transition-colors"
                    style={{ background: "rgba(250,204,21,0.1)" }}
                  >
                    <svg className="w-5 h-5 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/30 text-xs uppercase tracking-wider mb-0.5">Email</p>
                    <p className="text-sm font-medium">childerslawncare2@yahoo.com</p>
                  </div>
                </a>

                {/* Hours */}
                <div className="flex items-center gap-4 text-white/60">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(250,204,21,0.1)" }}
                  >
                    <svg className="w-5 h-5 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/30 text-xs uppercase tracking-wider mb-0.5">Hours</p>
                    <p className="text-sm font-medium">Mon – Fri &nbsp;·&nbsp; 8:00 AM – 5:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 mb-8" />

              {/* Social buttons */}
              <p className="text-yellow uppercase tracking-widest text-xs font-bold mb-4">
                Follow Us
              </p>
              <div className="flex gap-3 mb-8">
                <a
                  href="https://www.facebook.com/profile.php?id=100089052530467"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white/70 hover:text-yellow hover:bg-yellow/10 transition-all border border-white/10 hover:border-yellow/30"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/childerslawncarellc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white/70 hover:text-yellow hover:bg-yellow/10 transition-all border border-white/10 hover:border-yellow/30"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="4" strokeWidth="2"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                  </svg>
                  Instagram
                </a>
              </div>

              {/* CTA */}
              <a
                href="mailto:childerslawncare2@yahoo.com"
                className="block w-full text-center bg-yellow hover:bg-yellow-dark text-green-dark font-bold py-3 rounded-full transition-colors"
              >
                Send Us an Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social feed widgets ── */}
      <section className="pb-24" style={{ background: "#0a2010" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section label */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 border-t border-white/10" />
            <p className="text-yellow uppercase tracking-[0.2em] text-xs font-bold shrink-0">
              Stay Connected
            </p>
            <div className="flex-1 border-t border-white/10" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* ── Facebook Page Plugin ── */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(30,126,52,0.3)", background: "#0d2514" }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(250,204,21,0.12)" }}
                >
                  <svg className="w-4 h-4 text-yellow fill-current" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-none">Facebook</p>
                  <p className="text-white/30 text-xs mt-0.5">Childer&apos;s Lawn Care &amp; More LLC</p>
                </div>
                <a
                  href="https://www.facebook.com/profile.php?id=100089052530467"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-yellow text-xs font-semibold hover:underline"
                >
                  Follow →
                </a>
              </div>

              {/* Facebook Page Plugin — width measured from container so it fills perfectly */}
              <div className="w-full overflow-hidden" style={{ height: "560px" }}>
                <FacebookFeed
                  pageUrl="https://www.facebook.com/profile.php?id=100089052530467"
                  height={560}
                />
              </div>
            </div>

            {/* ── Instagram ── */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(30,126,52,0.3)", background: "#0d2514" }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(250,204,21,0.12)" }}
                >
                  <svg className="w-4 h-4 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="4" strokeWidth="2"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-none">Instagram</p>
                  <p className="text-white/30 text-xs mt-0.5">@childerslawncarellc</p>
                </div>
                <a
                  href="https://www.instagram.com/childerslawncarellc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-yellow text-xs font-semibold hover:underline"
                >
                  Follow →
                </a>
              </div>

              {/* Instagram feed placeholder */}
              <div
                className="flex flex-col items-center justify-center text-center px-8"
                style={{ height: "560px" }}
              >
                {/* IG gradient logo */}
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                  style={{
                    background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                  }}
                >
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="4" strokeWidth="2"/>
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
                  </svg>
                </div>

                <p className="text-white font-serif font-bold text-xl mb-1">
                  @childerslawncarellc
                </p>
                <p className="text-white/40 text-sm mb-6 leading-relaxed">
                  Follow us on Instagram to see our latest projects,
                  lawn transformations, and landscaping work.
                </p>

                {/* Fake photo grid */}
                <div className="grid grid-cols-3 gap-2 w-full mb-6">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, #0d3d1a ${i * 5}%, #1a5c2a 100%)`,
                        opacity: 0.4 + (i % 3) * 0.1,
                      }}
                    />
                  ))}
                </div>

                <a
                  href="https://www.instagram.com/childerslawncarellc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-full text-sm text-green-dark transition-colors"
                  style={{ background: "linear-gradient(45deg, #f09433, #dc2743, #bc1888)" }}
                >
                  View on Instagram
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
