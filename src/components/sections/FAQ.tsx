import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "Who can attend WiTCON?",
    answer:
      "WiTCON is open to students and anyone interested in technology, networking, and professional development. While the conference celebrates and supports women in technology, everyone interested in being part of the community is welcome.",
  },
  {
    question: "Do I need experience in technology to attend?",
    answer:
      "Not at all! You do not need prior experience or a specific technology major to participate. WiTCON is designed to provide opportunities for people at different stages of their academic and professional journeys.",
  },
  {
    question: "When and where will WiTCON 2027 take place?",
    answer:
      "Details about the date, location, and schedule for WiTCON 2027 will be announced soon. Stay connected with us for updates.",
  },
  {
    question: "How much does it cost to attend?",
    answer:
      "More information about registration and any associated costs for WiTCON 2027 will be announced soon.",
  },
  {
    question: "What can I expect at WiTCON?",
    answer:
      "WiTCON brings together students, professionals, and members of the technology community through opportunities for learning, networking, mentorship, and career development.",
  },
  {
    question: "Who organizes WiTCON?",
    answer:
      "WiTCON is organized by Women in Computer Science at Florida International University.",
  },
  {
    question: "How can I stay updated about WiTCON?",
    answer:
      "Follow WiCS FIU on social media and check the WiTCON website for announcements, registration information, event details, and other updates.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
      {/* Section heading */}
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-witcon-pink">
          Have questions?
        </p>

        <h2 className="font-display text-4xl font-bold text-witcon-deep-forest sm:text-5xl">
          FAQ
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-witcon-deep-forest/70 sm:text-lg">
          Find answers to some of the most common questions about WiTCON.
        </p>
      </div>

      {/* FAQ list */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.question}
              className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                isOpen
                  ? "border-witcon-pink bg-witcon-pink/10 shadow-sm"
                  : "border-witcon-deep-forest/10 bg-witcon-cream hover:border-witcon-pink/40 hover:bg-witcon-sage/10"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-6"
                aria-expanded={isOpen}
              >
                <span className="font-display text-base font-semibold text-witcon-deep-forest sm:text-lg">
                  {faq.question}
                </span>

                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl font-medium transition-transform duration-300 ${
                    isOpen
                      ? "bg-witcon-pink text-white"
                      : "bg-witcon-sage/30 text-witcon-deep-forest"
                  }`}
                  aria-hidden="true"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-7 text-witcon-deep-forest/75 sm:px-6 sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}