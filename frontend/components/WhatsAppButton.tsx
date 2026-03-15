import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/628976767762"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 bg-cakep-maroon hover:bg-cakep-maroon-dark text-white p-4 rounded-full shadow-2xl transition-all duration-300 z-50 flex items-center justify-center group"
    >
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap px-0 group-hover:px-2">
        Butuh Bantuan Mendesak?
      </span>
      <MessageCircle size={28} />
    </a>
  );
}
