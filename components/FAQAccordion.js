"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How soon can I expect to hear back after filling out the contact form?",
    a: "You can expect to hear back within 48 hours.",
  },
  {
    q: "How does the process work?",
    a: "After calling, emailing, or filling out the contact form, we'll set up a consultation and go over your project. We'll then send a quote, and once approved, we'll schedule and complete the work.",
  },
  {
    q: "Does Childers offer free consultations?",
    a: "Yes! We offer free consultations to discuss your landscaping needs and provide a quote for our services.",
  },
  {
    q: "What areas do you serve?",
    a: "We proudly serve North Carolina. Contact us to confirm service in your specific area.",
  },
  {
    q: "What types of projects do you handle?",
    a: "We handle everything from routine lawn maintenance to full landscape design & installation, hardscapes, outdoor kitchens, irrigation systems, landscape lighting, and more.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="border border-off-white-dark rounded-xl overflow-hidden bg-white"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-off-white transition-colors"
          >
            <span className="font-semibold text-green-text pr-4">{faq.q}</span>
            <span
              className="text-green-primary text-xl font-bold shrink-0 transition-transform duration-300"
              style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
            >
              +
            </span>
          </button>
          <div
            className={`accordion-content ${open === i ? "open" : ""}`}
          >
            <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">
              {faq.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
