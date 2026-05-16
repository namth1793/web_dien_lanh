import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API = import.meta.env.VITE_API_URL || '';

const STATUSES = [
  { value: '', label: 'Tất cả' },
  { value: 'pending', label: 'Chờ xử lý' },
  { value: 'confirmed', label: 'Đã xác nhận' },
  { value: 'shipping', label: 'Đang giao' },
  { value: 'done', label: 'Hoàn thành' },
  { value: 'cancelled', label: 'Đã hủy' },
];

const STATUS_COLOR = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipping: 'bg-purple-100 text-purple-800',
  done: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function AdminOrders() {
  const { token } = useAuth();
  const headers = { Authorization: `Bearer ${token}` };
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [expanded, setExpanded] = useState(null);

  const reload = () => {
    const params = filterStatus ? { status: filterStatus } : {};
    axios.get(`${API}/api/admin/orders`, { headers, params }).then(r => setOrders(r.data)).finally(() => setLoading(false));
  };

  useEffect(() => { reload(); }, [filterStatus]);

  const handleStatusChange = async (id, status) => {
    await axios.put(`${API}/api/admin/orders/${id}/status`, { status }, { headers });
    reload();
  };

  const handleDelete = async (id) => {
    if (!confirm('Xóa đơn hàng này?')) return;
    await axios.delete(`${API}/api/admin/orders/${id}`, { headers });
    reload();
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Đang tải...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-black text-gray-800 mb-6">Quản lý đơn hàng</h1>

      {/* Filter */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {STATUSES.map(s => (
          <button key={s.value}
            onClick={() => setFilterStatus(s.value)}
            className={`text-sm px-4 py-2 rounded-lg font-medium transition-all ${filterStatus === s.value ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
            {s.label}
          </button>
        ))}
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm text-center py-16 text-gray-400">
          <p>Không có đơn hàng</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map(o => {
            let items = [];
            try { items = JSON.parse(o.items); } catch {}
            return (
              <div key={o.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div
                  className="px-5 py-4 flex flex-wrap items-center gap-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpanded(expanded === o.id ? null : o.id)}>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-800">{o.customer_name}</div>
                    <div className="text-sm text-gray-500">{o.customer_phone} · {o.customer_address}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-800">{o.total?.toLocaleString()}₫</div>
                    <div className="text-xs text-gray-400">{new Date(o.created_at).toLocaleDateString('vi-VN')}</div>
                  </div>
                  <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${STATUS_COLOR[o.status] || 'bg-gray-100 text-gray-600'}`}>
                    {STATUSES.find(s => s.value === o.status)?.label || o.status}
                  </span>
                  <svg className={`w-4 h-4 text-gray-400 transition-transform ${expanded === o.id ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {expanded === o.id && (
                  <div className="border-t px-5 py-4 bg-gray-50">
                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Sản phẩm đặt</h4>
                    <div className="space-y-1.5 mb-4">
                      {items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm text-gray-700">
                          <span>{item.name} × {item.qty}</span>
                          <span className="font-medium">{(item.price * item.qty)?.toLocaleString()}₫</span>
                        </div>
                      ))}
                    </div>
                    {o.note && <p className="text-sm text-gray-500 mb-4 italic">Ghi chú: {o.note}</p>}
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-medium text-gray-600">Cập nhật trạng thái:</span>
                      <select value={o.status}
                        onChange={e => handleStatusChange(o.id, e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {STATUSES.filter(s => s.value).map(s => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                      <button onClick={() => handleDelete(o.id)}
                        className="ml-auto text-xs text-red-500 hover:text-red-700 hover:underline">
                        Xóa đơn
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
