import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Col 1: Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-brand-yellow flex items-center justify-center">
                <svg className="w-6 h-6 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
                </svg>
              </div>
              <div>
                <div className="font-black text-white text-sm leading-tight">ĐIỆN LẠNH DUY KHÁNH</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wide">CÔNG TY TNHH TM DV SOLAR BASE</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Chuyên bán – sửa chữa – bảo trì – lắp đặt máy lạnh, máy giặt tận nhà tại TP Cần Thơ và khu vực miền Tây.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/dienlanhcantho65" target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-brand-dark-3 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://zalo.me/0911678101" target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-brand-dark-3 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors font-black text-sm">
                Z
              </a>
            </div>
          </div>

          {/* Col 2: Dịch vụ */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wide border-b border-brand-dark-3 pb-2">
              Dịch vụ
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                ['Sửa chữa máy lạnh', '/dich-vu'],
                ['Vệ sinh máy lạnh', '/dich-vu'],
                ['Tháo lắp máy lạnh', '/dich-vu'],
                ['Sửa chữa máy giặt', '/dich-vu'],
                ['Vệ sinh máy giặt', '/dich-vu'],
                ['Sửa chữa tủ lạnh', '/dich-vu'],
              ].map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-gray-400 hover:text-brand-yellow transition-colors flex items-center gap-1.5">
                    <span className="text-brand-yellow">›</span>{label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Liên hệ */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wide border-b border-brand-dark-3 pb-2">
              Liên hệ
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-2.5">
                <svg className="w-4 h-4 text-brand-yellow mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <span>Số 377 KDC Tân Phú, P.Hưng Phú, TP Cần Thơ</span>
              </li>
              <li className="flex gap-2.5">
                <svg className="w-4 h-4 text-brand-yellow mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <div>
                  <div><a href="tel:0911678101" className="hover:text-brand-yellow transition-colors font-semibold text-white">0911.678.101</a></div>
                  <div><a href="tel:0366755156" className="hover:text-brand-yellow transition-colors">0366.755.156</a></div>
                </div>
              </li>
              <li className="flex gap-2.5">
                <svg className="w-4 h-4 text-brand-yellow mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                </svg>
                <a href="https://dienlanhcantho.com" target="_blank" rel="noreferrer" className="hover:text-brand-yellow transition-colors">dienlanhcantho.com</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Map */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wide border-b border-brand-dark-3 pb-2">
              Bản đồ
            </h3>
            <div className="rounded-lg overflow-hidden h-44">
              <iframe
                src="https://maps.google.com/maps?q=377+KDC+T%C3%A2n+Ph%C3%BA%2C+Ph%C6%B0%E1%BB%9Dng+H%C6%B0ng+Ph%C3%BA%2C+C%E1%BA%A7n+Th%C6%A1%2C+Vi%E1%BB%87t+Nam&output=embed&z=16"
                width="100%" height="100%" style={{ border: 0 }}
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Điện Lạnh Duy Khánh – SOLAR BASE"
              />
            </div>
            <a href="https://maps.app.goo.gl/6zJCMjVs96MyYqzw7" target="_blank" rel="noreferrer"
              className="inline-block mt-2 bg-brand-yellow text-brand-dark text-xs font-bold px-3 py-1.5 rounded hover:bg-brand-yellow-dark transition-colors">
              Xem trên Google Maps →
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-dark-3">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© 2025 Điện Lạnh Cần Thơ – Duy Khánh | CÔNG TY TNHH TM DV SOLAR BASE | MST: 1801827040</span>
          <div className="flex items-center gap-1">
            <span className="text-brand-yellow">★★★★★</span>
            <span>5,0 (486 đánh giá)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
