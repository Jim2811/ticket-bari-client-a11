import React, { useState } from "react";

const faqs = [
  {
    q: "How can I cancel my booking?",
    a: "You can cancel directly from your dashboard before the departure date. Refunds are processed within 3–5 business days.",
  },
  {
    q: "Is online payment secure on TicketBari?",
    a: "Absolutely! All transactions are handled securely via Stripe with end‑to‑end encryption to keep your data safe.",
  },
  {
    q: "How do I become a verified vendor?",
    a: "Apply through your dashboard’s vendor section — our team reviews and verifies new vendors within 24 hours.",
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <section className="py-20 bg-base-200 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map(({ q, a }, i) => (
            <div
              key={i}
              className="bg-base-100 dark:bg-gray-800 border border-base-300 dark:border-gray-700 
                         rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full text-left px-6 py-4 flex justify-between items-center"
              >
                <span className="font-semibold text-base-content tracking-wide">
                  {q}
                </span>
                <span
                  className={`text-primary text-2xl transform transition-transform duration-200 ${
                    open === i ? "rotate-45" : "rotate-0"
                  }`}
                >
                  {open === i ? "–" : "+"}
                </span>
              </button>

              {open === i && (
                <div className="px-6 pb-5 -mt-2 text-base-content/70 text-sm leading-relaxed">
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;