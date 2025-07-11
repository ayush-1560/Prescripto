import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const faqsData = [
  {
    question: "How do I book an appointment?",
    answer:
      "To book an appointment, simply log in, select your preferred doctor, choose an available slot, and confirm your booking.",
  },
  {
    question: "Can I cancel or reschedule an appointment?",
    answer:
      "Yes, you can cancel or reschedule your appointment from the 'My Appointments' section before the scheduled time.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Absolutely. All payments are processed through Razorpay, ensuring top-tier encryption and protection for your data.",
  },
  {
    question: "Do I need to sign up to use the platform?",
    answer:
      "Yes, signing up is required to manage your appointments and access personalized features.",
  },
];

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="bg-gray-50 py-14 px-4 sm:px-10 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Everything you need to know about using Prescripto efficiently.
        </p>

        <div className="space-y-4">
          {faqsData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex justify-between items-center text-left"
              >
                <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`px-6 text-gray-600 text-sm transition-all duration-300 ease-in-out ${
                  activeIndex === index
                    ? "max-h-96 animate-fadeIn opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <div className="pb-5">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
