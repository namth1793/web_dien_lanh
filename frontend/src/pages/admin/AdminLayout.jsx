import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/admin', label: 'Tổng quan', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', end: true },
  { to: '/admin/san-pham', label: 'Sản phẩm', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { to: '/admin/tin-tuc', label: 'Tin tức', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
  { to: '/admin/don-hang', label: 'Đơn hàng', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { to: '/admin/lien-he', label: 'Liên hệ', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
];

export default function AdminLayout() {
  const { username, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => { logout(); nav('/admin/login'); };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-56 bg-brand-dark text-white flex flex-col">
        <div className="px-5 py-5 border-b border-white/10">
          <div className="text-xs font-black text-brand-yellow uppercase tracking-widest">ĐIỆN LẠNH</div>
          <div className="text-sm font-bold text-white">Duy Khánh Admin</div>
        </div>
        <nav className="flex-1 py-4 space-y-0.5 px-2">
          {navItems.map(({ to, label, icon, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-brand-yellow text-brand-dark' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`
              }>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-white/10">
          <div className="text-xs text-gray-400 mb-2">Đăng nhập: <span className="text-white">{username}</span></div>
          <button onClick={handleLogout}
            className="w-full text-xs bg-white/10 hover:bg-red-600 text-white py-2 rounded-lg transition-colors">
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
