import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API = import.meta.env.VITE_API_URL || '';

export default function AdminContacts() {
  const { token } = useAuth();
  const headers = { Authorization: `Bearer ${token}` };
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const reload = () => axios.get(`${API}/api/admin/contacts`, { headers }).then(r => setContacts(r.data)).finally(() => setLoading(false));

  useEffect(() => { reload(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Xóa liên hệ này?')) return;
    await axios.delete(`${API}/api/admin/contacts/${id}`, { headers });
    reload();
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Đang tải...</div>;

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-black text-gray-800 mb-4 md:mb-6">Liên hệ từ khách hàng</h1>

      {contacts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm text-center py-12 text-gray-400">
          <p>Chưa có liên hệ nào</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map(c => (
            <div key={c.id} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-gray-800">{c.name}</span>
                    <a href={`tel:${c.phone}`} className="text-sm text-blue-600 hover:underline">{c.phone}</a>
                    {c.email && <a href={`mailto:${c.email}`} className="text-sm text-gray-500 hover:underline">{c.email}</a>}
                  </div>
                  {c.service && <div className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block mb-2">Dịch vụ: {c.service}</div>}
                  {c.address && <div className="text-sm text-gray-500 mb-1">📍 {c.address}</div>}
                  {c.message && <div className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 mt-2">{c.message}</div>}
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs text-gray-400 mb-2">{new Date(c.created_at).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                  <button onClick={() => handleDelete(c.id)}
                    className="text-xs text-red-500 hover:text-red-700 hover:underline">Xóa</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
