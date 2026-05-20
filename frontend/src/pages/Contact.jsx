import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', service: '', message: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) { setError('Vui lòng nhập họ tên và số điện thoại'); return; }
    setLoading(true);
    try {
      const res = await axios.post('/api/contacts', form);
      setSuccess(res.data.message);
      setForm({ name: '', phone: '', email: '', address: '', service: '', message: '' });
      setError('');
    } catch { setError('Có lỗi xảy ra, vui lòng thử lại.'); }
    finally { setLoading(false); }
  };

  return (
    <div>
      {/* Page header */}
      <div className="bg-brand-dark py-14 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">LIÊN HỆ VỚI CHÚNG TÔI</h1>
          <div className="w-14 h-1 bg-brand-yellow rounded mx-auto mb-4"/>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Đội ngũ kỹ thuật Điện lạnh Duy Khánh luôn sẵn sàng hỗ trợ bạn 24/7
          </p>
          <nav className="text-xs text-gray-500 mt-4 flex items-center justify-center gap-2">
            <Link to="/" className="hover:text-brand-yellow">Trang chủ</Link>
            <span>›</span>
            <span className="text-gray-300">Liên hệ</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Info column */}
          <div className="space-y-5">
            {/* Contact info */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-black text-brand-dark mb-4 border-b pb-3">Thông tin liên hệ</h2>
              <div className="space-y-4">
                {[
                  { icon: '🏢', label: 'Công ty', value: 'TNHH THƯƠNG MẠI DỊCH VỤ SOLAR BASE' },
                  { icon: '🆔', label: 'Mã số thuế', value: '1801827040' },
                  { icon: '📍', label: 'Địa chỉ', value: 'Số 377 KDC Tân Phú, Phường Hưng Phú, TP Cần Thơ' },
                  { icon: '📞', label: 'Hotline 1', value: '0911.678.101' },
                  { icon: '📱', label: 'Hotline 2', value: '0366.755.156' },
                ].map(item => (
                  <div key={item.label} className="flex gap-3">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <div className="text-xs text-gray-400">{item.label}</div>
                      <div className="font-medium text-gray-800 text-sm">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-black text-brand-dark mb-3">Mạng xã hội</h2>
              <div className="flex flex-col gap-3">
                <a href="https://www.facebook.com/dienlanhcantho65" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  fb.com/dienlanhcantho65
                </a>
                <a href="https://zalo.me/0911678101" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                  <span className="font-black">Z</span> Zalo: 0911.678.101
                </a>
                <a href="https://www.tiktok.com/@dienlanh_cantho" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>
                  TikTok: @dienlanh_cantho
                </a>
              </div>
            </div>
          </div>

          {/* Form + Map */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-black text-brand-dark text-lg mb-5">Gửi yêu cầu tư vấn</h2>

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-4 flex items-center gap-2">
                  <span className="text-xl">✅</span>
                  <div>
                    <div className="font-semibold">Gửi thành công!</div>
                    <div className="text-sm">{success}</div>
                  </div>
                </div>
              )}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-4 text-sm">{error}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Họ và tên <span className="text-red-500">*</span></label>
                    <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Nguyễn Văn A"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/30"/>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Số điện thoại <span className="text-red-500">*</span></label>
                    <input required value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="0901 234 567"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/30"/>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="email@example.com"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-yellow"/>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Dịch vụ quan tâm</label>
                    <select value={form.service} onChange={e => setForm(f => ({...f, service: e.target.value}))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-yellow bg-white">
                      <option value="">-- Chọn dịch vụ --</option>
                      <option value="sua-may-lanh">Sửa chữa máy lạnh</option>
                      <option value="ve-sinh-may-lanh">Vệ sinh máy lạnh</option>
                      <option value="thao-lap-may-lanh">Tháo lắp máy lạnh</option>
                      <option value="sua-may-giat">Sửa chữa máy giặt</option>
                      <option value="ve-sinh-may-giat">Vệ sinh máy giặt</option>
                      <option value="sua-tu-lanh">Sửa chữa tủ lạnh</option>
                      <option value="mua-san-pham">Mua sản phẩm</option>
                      <option value="khac">Khác</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Địa chỉ</label>
                  <input value={form.address} onChange={e => setForm(f => ({...f, address: e.target.value}))} placeholder="Địa chỉ của bạn (phường/quận tại Cần Thơ)"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-yellow"/>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Nội dung yêu cầu</label>
                  <textarea value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))}
                    placeholder="Mô tả yêu cầu (loại máy, triệu chứng hư hỏng, thời gian tiện liên hệ...)"
                    rows={4} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-yellow resize-none"/>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-brand-yellow text-brand-dark py-3 rounded-lg font-black hover:bg-brand-yellow-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading ? <><span className="animate-spin w-4 h-4 border-2 border-brand-dark border-t-transparent rounded-full inline-block"/>Đang gửi...</> : '📩 Gửi yêu cầu tư vấn'}
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-brand-dark text-white px-4 py-3 font-semibold text-sm flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="text-brand-yellow">📍</span> Bản đồ – Điện Lạnh Duy Khánh
                </span>
                <a href="https://maps.app.goo.gl/6zJCMjVs96MyYqzw7" target="_blank" rel="noreferrer"
                  className="text-brand-yellow text-xs hover:underline">Mở Google Maps →</a>
              </div>
              <div className="h-72">
                <iframe
                  src="https://maps.google.com/maps?q=377+KDC+T%C3%A2n+Ph%C3%BA%2C+Ph%C6%B0%E1%BB%9Dng+H%C6%B0ng+Ph%C3%BA%2C+C%E1%BA%A7n+Th%C6%A1%2C+Vi%E1%BB%87t+Nam&output=embed&z=16"
                  width="100%" height="100%" style={{ border: 0 }}
                  allowFullScreen="" loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Điện Lạnh Duy Khánh – SOLAR BASE"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
