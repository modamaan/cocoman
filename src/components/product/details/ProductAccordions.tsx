"use client";

import { useState } from "react";
import type { ProductDetails } from "@/lib/shopify";

type AccordionItemProps = {
  title: string;
  content: string | null;
  isOpen: boolean;
  onToggle: () => void;
};

function AccordionItem({ title, content, isOpen, onToggle }: AccordionItemProps) {
  if (!content) return null;

  return (
    <div className="border-b border-jet-black/10 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full py-5 text-left transition-colors group"
      >
        <span className="text-xs font-sans font-bold uppercase tracking-widest text-jet-black group-hover:text-jet-black/70 transition-colors flex items-center gap-3">
          {title}
        </span>
        <svg
          className={`w-4 h-4 text-jet-black transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div 
            className="prose prose-sm prose-p:text-jet-black/70 prose-a:text-jet-black text-sm font-sans leading-relaxed max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
}

export function ProductAccordions({ product }: { product: ProductDetails }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const sections = [
    // Fallback to the main description if the metafield isn't set yet
    { title: "Product Info", content: product.productInfo || product.descriptionHtml },
    { title: "Design Story", content: product.designStory },
    { title: "Wash Care", content: product.washCare },
    { title: "Return Policy", content: product.returnPolicy },
  ];

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col w-full border-t border-b border-jet-black/10 mt-8">
      {sections.map((section, index) => (
        <AccordionItem
          key={section.title}
          title={section.title}
          content={section.content}
          isOpen={openIndex === index}
          onToggle={() => toggleSection(index)}
        />
      ))}
    </div>
  );
}
