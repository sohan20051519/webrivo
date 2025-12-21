import React, { useState } from 'react';

export default function VibeBadge() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="fixed bottom-4 right-4 z-[9999] animate-in fade-in slide-in-from-bottom-5 duration-700 pointer-events-auto">
      <div className="group flex items-center gap-2 bg-zinc-900/90 backdrop-blur-md border border-white/10 pr-2 pl-3 py-1.5 rounded-full shadow-2xl hover:scale-105 transition-all duration-300">
        <a href="https://vibe-fresh.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-medium text-white/90 hover:text-white transition-colors">
          <img src="https://xnlmfbnwyqxownvhsqoz.supabase.co/storage/v1/object/public/files/ChatGPT%20Image%20Nov%2024,%202025,%2010_13_24%20PM.png" alt="VibeFresh" className="w-5 h-5 rounded-full" />
          <span>Made with VibeFresh</span>
        </a>
        <button onClick={() => setVisible(false)} className="ml-1 p-0.5 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
    </div>
  );
}