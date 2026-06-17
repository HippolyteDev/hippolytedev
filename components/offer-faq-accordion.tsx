"use client";

import { useEffect, useRef, useState } from "react";

type OfferFaq = {
  question: string;
  answer: string;
};

export function OfferFaqAccordion({ items }: { items: OfferFaq[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="offer-faq-list">
      {items.map((item, index) => (
        <OfferFaqItem
          item={item}
          isOpen={openIndex === index}
          key={item.question}
          onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))}
        />
      ))}
    </div>
  );
}

function OfferFaqItem({
  item,
  isOpen,
  onToggle,
}: {
  item: OfferFaq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const answerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!answerRef.current) {
      return;
    }

    setHeight(isOpen ? answerRef.current.scrollHeight : 0);
  }, [isOpen, item.answer]);

  return (
    <div className="offer-faq-item" data-open={isOpen ? "true" : "false"}>
      <button
        className="offer-faq-question"
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span>{item.question}</span>
        <span className="offer-faq-toggle" aria-hidden="true" />
      </button>
      <div className="offer-faq-answer" style={{ height }}>
        <div ref={answerRef}>
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
}
