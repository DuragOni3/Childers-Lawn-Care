import Link from "next/link";
import LogoImage from "./LogoImage";

export default function Footer() {
  return (
    <footer style={{ background: "#071a0b" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <LogoImage
                className="h-16 w-auto"
                style={{ filter: "drop-shadow(0 1px 6px rgba(0,0,0,0.5))" }}
              />
              <div className="leading-tight">
                <span className="text-white font-serif font-bold text-base block">Childer&apos;s Lawn Care</span>
                <span className="text-yellow text-xs tracking-wide">&amp; More LLC</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Serving North Carolina since 2018. From design and install to
              maintenance — delivering dream outdoor living areas.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=100089052530467"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-yellow hover:text-green-dark flex items-center justify-center transition-all duration-200"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/childerslawnandlandscapellc/"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-yellow hover:text-green-dark flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="4" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-yellow uppercase tracking-widest text-xs font-bold mb-5">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/services",  label: "Services" },
                { href: "/about",     label: "About Us" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/contact",   label: "Get a Free Quote" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-yellow transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-yellow uppercase tracking-widest text-xs font-bold mb-5">Contact</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li>
                <a href="tel:9104342533" className="hover:text-yellow transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4 text-yellow shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (910) 434-2533
                </a>
              </li>
              <li>
                <a href="mailto:childerslawncare2@yahoo.com" className="hover:text-yellow transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4 text-yellow shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  childerslawncare2@yahoo.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-yellow shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Mon–Fri: 8:00 AM – 5:00 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <p>© 2024 Childers Lawn &amp; Landscape LLC — All Rights Reserved.</p>
          <p>Website by Monolith Design</p>
        </div>
      </div>
    </footer>
  );
}
