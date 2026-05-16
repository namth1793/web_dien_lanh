import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || '';

const STATUS_LABEL = { pending: 'Chờ xử lý', confirmed: 'Đã xác nhận', shipping: 'Đang giao', done: 'Hoàn thành', cancelled: 'Đã hủy' };
const STATUS_COLOR = { pending: 'bg-yellow-100 text-yellow-800', confirmed: 'bg-blue-100 text-blue-800', shipping: 'bg-purple-100 text-purple-800', done: 'bg-green-100 text-green-800', cancelled: 'bg-red-100 text-red-800' };

export default function AdminDashboard() {
  const { token } = useAuth();
  const headers = { Authorization: `Bearer ${token}` };
  const [stats, setStats] = useState({ products: 0, orders: 0, contacts: 0, news: 0 });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const h = { headers };
    Promise.all([
      axios.get(`${API}/api/admin/products`, h),
      axios.get(`${API}/api/admin/orders`, h),
      axios.get(`${API}/api/admin/contacts`, h),
      axios.get(`${API}/api/admin/news`, h),
    ]).then(([p, o, c, n]) => {
      setStats({ products: p.data.length, orders: o.data.length, contacts: c.data.length, news: n.data.length });
      setRecentOrders(o.data.slice(0, 5));
    }).catch(() => {});
  }, []);

  const cards = [
    { label: 'Sản phẩm', value: stats.products, to: '/admin/san-pham', color: 'bg-blue-600', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { label: 'Đơn hàng', value: stats.orders, to: '/admin/don-hang', color: 'bg-orange-500', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { label: 'Liên hệ', value: stats.contacts, to: '/admin/lien-he', color: 'bg-green-600', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { label: 'Tin tức', value: stats.news, to: '/admin/tin-tuc', color: 'bg-purple-600', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
  ];

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-black text-gray-800 mb-4 md:mb-6">Tổng quan</h1>

      {/* Stats cards - 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        {cards.map(c => (
          <Link key={c.label} to={c.to}
            className="bg-white rounded-xl shadow-sm p-4 md:p-5 flex items-center gap-3 md:gap-4 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 md:w-12 md:h-12 ${c.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={c.icon} />
              </svg>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-black text-gray-800">{c.value}</div>
              <div className="text-xs text-gray-500">{c.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-800">Đơn hàng gần đây</h2>
          <Link to="/admin/don-hang" className="text-sm text-blue-600 hover:underline">Xem tất cả →</Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">Chưa có đơn hàng</p>
        ) : (
          <>
            {/* Mobile: card list */}
            <div className="md:hidden space-y-3">
              {recentOrders.map(o => (
                <div key={o.id} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-semibold text-gray-800 text-sm">{o.customer_name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${STATUS_COLOR[o.status] || 'bg-gray-100 text-gray-600'}`}>
                      {STATUS_LABEL[o.status] || o.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">{o.customer_phone}</div>
                  <div className="text-sm font-bold text-blue-600 mt-1">{o.total?.toLocaleString()}₫</div>
                </div>
              ))}
            </div>

            {/* Desktop: table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-gray-500 text-xs uppercase">
                    <th className="text-left py-2 pr-4">Khách hàng</th>
                    <th className="text-left py-2 pr-4">SĐT</th>
                    <th className="text-right py-2 pr-4">Tổng</th>
                    <th className="text-center py-2">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentOrders.map(o => (
                    <tr key={o.id} className="hover:bg-gray-50">
                      <td className="py-2.5 pr-4 font-medium text-gray-800">{o.customer_name}</td>
                      <td className="py-2.5 pr-4 text-gray-600">{o.customer_phone}</td>
                      <td className="py-2.5 pr-4 text-right font-semibold">{o.total?.toLocaleString()}₫</td>
                      <td className="py-2.5 text-center">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLOR[o.status] || 'bg-gray-100 text-gray-600'}`}>
                          {STATUS_LABEL[o.status] || o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
