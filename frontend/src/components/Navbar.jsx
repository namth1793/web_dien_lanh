import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const NAV = [
  { to: '/', label: 'Trang chủ' },
  { to: '/gioi-thieu', label: 'Giới thiệu' },
  { to: '/san-pham', label: 'Sản phẩm' },
  { to: '/dich-vu', label: 'Dịch vụ' },
  { to: '/tin-tuc', label: 'Tin tức' },
  { to: '/lien-he', label: 'Liên hệ' },
];

const DEFAULT_LOGO = '/LOGO/487315668_1072654048216447_3543304931783471982_n.jpg';

export default function Navbar({ onCartClick }) {
  const [open, setOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState(DEFAULT_LOGO);
  const { count } = useCart();
  const { pathname } = useLocation();

  useEffect(() => {
    axios.get('/api/settings').then(r => {
      if (r.data.logo_url) setLogoUrl(r.data.logo_url);
    }).catch(() => {});
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <img src={logoUrl} alt="Điện Lạnh Duy Khánh"
            className="w-11 h-11 rounded-full object-cover shadow"
            onError={e => { e.target.src = DEFAULT_LOGO; }}/>
          <div className="leading-tight">
            <div className="font-black text-brand-dark text-base">ĐIỆN LẠNH DUY KHÁNH</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wide">CÔNG TY SOLAR BASE – Cần Thơ</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map(n => (
            <Link
              key={n.to}
              to={n.to}
              className={`px-3.5 py-2 rounded text-sm font-semibold transition-colors ${
                pathname === n.to
                  ? 'text-brand-yellow bg-brand-dark'
                  : 'text-gray-700 hover:text-brand-dark hover:bg-gray-100'
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Cart */}
          <button onClick={onCartClick} className="relative hidden sm:flex items-center gap-1 text-gray-600 hover:text-brand-dark transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">{count}</span>
            )}
          </button>

          {/* Phone CTA */}
          <a
            href="tel:0911678101"
            className="hidden md:flex items-center gap-2 bg-brand-yellow hover:bg-brand-yellow-dark text-brand-dark font-bold px-4 py-2 rounded text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
            0911.678.101
          </a>

          {/* Mobile menu button */}
          <button onClick={() => setOpen(o => !o)} className="lg:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          {NAV.map(n => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className={`block px-5 py-3 text-sm font-semibold border-b border-gray-100 ${
                pathname === n.to ? 'text-brand-yellow bg-brand-dark' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {n.label}
            </Link>
          ))}
          <div className="p-4">
            <a href="tel:0911678101" className="btn-yellow w-full justify-center">
              📞 Gọi ngay: 0911.678.101
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
