import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

export default function Cart() {
  const { items, removeItem, updateQty, total, clearCart } = useCart();
  const [form, setForm] = useState({ name: '', phone: '', address: '', note: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) { setError('Vui lòng nhập tên và số điện thoại'); return; }
    if (items.length === 0) { setError('Giỏ hàng trống'); return; }
    try {
      const res = await axios.post('/api/orders', { customer_name: form.name, customer_phone: form.phone, customer_address: form.address, items, total, note: form.note });
      setSuccess(res.data.message);
      clearCart();
      setTimeout(() => navigate('/'), 3000);
    } catch { setError('Có lỗi xảy ra, vui lòng thử lại.'); }
  };

  if (items.length === 0 && !success) return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <p className="text-6xl mb-4">🛒</p>
      <h2 className="text-xl font-black text-brand-dark mb-2">Giỏ hàng của bạn đang trống</h2>
      <p className="text-gray-500 text-sm mb-6">Khám phá sản phẩm điện lạnh chính hãng giá tốt</p>
      <Link to="/san-pham" className="btn-yellow px-8 py-3 inline-block">Mua sắm ngay</Link>
    </div>
  );

  if (success) return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <p className="text-6xl mb-4">🎉</p>
      <h2 className="text-xl font-black text-green-600 mb-2">{success}</h2>
      <p className="text-gray-500 text-sm">Đang chuyển về trang chủ...</p>
    </div>
  );

  return (
    <div>
      <div className="bg-brand-dark py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-black text-white mb-1">Giỏ hàng của bạn</h1>
          <nav className="text-xs text-gray-500 flex items-center gap-2">
            <Link to="/" className="hover:text-brand-yellow">Trang chủ</Link>
            <span>›</span>
            <span className="text-gray-300">Giỏ hàng</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 items-center">
                <img src={item.image} alt={item.name}
                  className="w-20 h-20 object-contain rounded-lg bg-gray-50"
                  onError={e => { e.target.src = 'https://placehold.co/80x80/f5f5f5/999?text=SP'; }}/>
                <div className="flex-1 min-w-0">
                  <Link to={`/san-pham/${item.slug}`} className="font-medium text-brand-dark hover:text-brand-yellow line-clamp-2">{item.name}</Link>
                  <div className="text-brand-dark font-bold mt-1">{item.price.toLocaleString('vi-VN')}đ</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 font-bold">-</button>
                  <span className="w-8 text-center font-medium">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 font-bold">+</button>
                </div>
                <div className="text-right min-w-[100px]">
                  <div className="font-bold text-brand-dark">{(item.price * item.qty).toLocaleString('vi-VN')}đ</div>
                  <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 text-xs mt-1">Xóa</button>
                </div>
              </div>
            ))}
          </div>

          {/* Order form */}
          <div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-24">
              <h2 className="font-black text-brand-dark mb-4 text-lg">Thông tin đặt hàng</h2>
              {error && <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-3 text-sm">{error}</div>}
              <form onSubmit={handleOrder} className="space-y-3">
                <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Họ và tên *"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/30"/>
                <input required value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="Số điện thoại *"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/30"/>
                <input value={form.address} onChange={e => setForm(f => ({...f, address: e.target.value}))} placeholder="Địa chỉ giao hàng"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-yellow"/>
                <textarea value={form.note} onChange={e => setForm(f => ({...f, note: e.target.value}))} placeholder="Ghi chú đơn hàng" rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-yellow resize-none"/>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-gray-700">Tổng cộng:</span>
                    <span className="text-2xl font-black text-brand-dark">{total.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <button type="submit" className="w-full bg-brand-yellow text-brand-dark py-3 rounded-lg font-black hover:bg-brand-yellow-dark transition-colors">
                    Đặt hàng (COD)
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
