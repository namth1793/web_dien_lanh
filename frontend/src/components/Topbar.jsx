export default function Topbar() {
  return (
    <div className="bg-brand-dark text-white text-sm py-2 hidden md:block border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-6 text-gray-300">
          <a href="tel:0911678101" className="flex items-center gap-1.5 hover:text-brand-yellow transition-colors">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
            <strong className="text-brand-yellow">0911.678.101</strong>
          </a>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
            Số 377 KDC Tân Phú, P.Hưng Phú, TP Cần Thơ
          </span>
        </div>
        <div className="flex items-center gap-4 text-gray-300">
          <a href="https://www.facebook.com/dienlanhcantho65" target="_blank" rel="noreferrer" className="hover:text-brand-yellow transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://zalo.me/0911678101" target="_blank" rel="noreferrer" className="hover:text-brand-yellow transition-colors font-black text-sm">
            Z
          </a>
          <a href="https://m.me/dienlanhcantho65" target="_blank" rel="noreferrer" className="hover:text-brand-yellow transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.932 1.459 5.548 3.742 7.266V22l3.405-1.869c.909.252 1.871.388 2.853.388 5.523 0 10-4.145 10-9.276C22 6.145 17.523 2 12 2zm.99 12.49l-2.54-2.71-4.96 2.71 5.46-5.79 2.6 2.71 4.9-2.71-5.46 5.79z"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}
