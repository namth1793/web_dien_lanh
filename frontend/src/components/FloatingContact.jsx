export default function FloatingContact() {
  return (
    <div className="fixed right-4 bottom-28 z-40 flex flex-col gap-2.5">
      {/* Phone - pulsing yellow */}
      <a
        href="tel:18000049"
        title="Gọi ngay: 1800 0049"
        className="relative w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg hover:bg-brand-yellow-dark transition-colors group"
      >
        <span className="absolute inset-0 rounded-full bg-brand-yellow animate-ping opacity-50"/>
        <svg className="w-6 h-6 text-brand-dark relative z-10" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
        </svg>
        <span className="absolute right-14 bg-brand-dark text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          1800 0049
        </span>
      </a>

      {/* Zalo */}
      <a
        href="https://zalo.me/0934499499"
        target="_blank"
        rel="noreferrer"
        title="Chat Zalo"
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform group relative"
        style={{ background: 'linear-gradient(135deg, #0084FF 0%, #0068D6 100%)' }}
      >
        <span className="text-white font-black text-lg leading-none">Z</span>
        <span className="absolute right-14 bg-brand-dark text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Zalo
        </span>
      </a>

      {/* Messenger */}
      <a
        href="https://m.me/mkjsc"
        target="_blank"
        rel="noreferrer"
        title="Chat Messenger"
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform group relative"
        style={{ background: 'linear-gradient(135deg, #0084FF 30%, #A033FF 70%, #FF5C5C 100%)' }}
      >
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.932 1.459 5.548 3.742 7.266V22l3.405-1.869c.909.252 1.871.388 2.853.388 5.523 0 10-4.145 10-9.276C22 6.145 17.523 2 12 2zm.99 12.49l-2.54-2.71-4.96 2.71 5.46-5.79 2.6 2.71 4.9-2.71-5.46 5.79z"/>
        </svg>
        <span className="absolute right-14 bg-brand-dark text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Messenger
        </span>
      </a>

      {/* Chat */}
      <a
        href="/lien-he"
        title="Nhắn tin tư vấn"
        className="w-12 h-12 bg-brand-dark-3 rounded-full flex items-center justify-center shadow-lg hover:bg-brand-dark transition-colors group relative border border-brand-yellow/30"
      >
        <svg className="w-6 h-6 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
        <span className="absolute right-14 bg-brand-dark text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Nhắn tin
        </span>
      </a>
    </div>
  );
}
