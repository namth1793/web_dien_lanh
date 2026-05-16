import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const API = import.meta.env.VITE_API_URL || '';

export default function AdminNews() {
  const { token } = useAuth();
  const headers = { Authorization: `Bearer ${token}` };
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const reload = () => axios.get(`${API}/api/admin/news`, { headers }).then(r => setNews(r.data)).finally(() => setLoading(false));

  useEffect(() => { reload(); }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Xóa bài viết "${title}"?`)) return;
    await axios.delete(`${API}/api/admin/news/${id}`, { headers });
    reload();
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Đang tải...</div>;

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-black text-gray-800">Tin tức</h1>
        <Link to="/admin/tin-tuc/them"
          className="bg-blue-600 text-white text-sm font-semibold px-3 py-2 md:px-4 md:py-2.5 rounded-lg hover:bg-blue-700 flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">Thêm bài viết</span>
          <span className="sm:hidden">Thêm</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {news.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-sm">Chưa có bài viết nào</p>
            <Link to="/admin/tin-tuc/them" className="mt-2 inline-block text-blue-600 text-sm hover:underline">+ Thêm bài đầu tiên</Link>
          </div>
        ) : (
          <>
            {/* Mobile: card list */}
            <div className="md:hidden divide-y divide-gray-100">
              {news.map(n => (
                <div key={n.id} className="flex gap-3 p-3">
                  <img src={n.image || 'https://placehold.co/60x48/f3f4f6/9ca3af?text=No'} alt=""
                    className="w-16 h-12 object-cover rounded-lg flex-shrink-0 bg-gray-100" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-800 text-sm line-clamp-2">{n.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{n.category} · {new Date(n.created_at).toLocaleDateString('vi-VN')}</div>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <Link to={`/admin/tin-tuc/sua/${n.id}`}
                      className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white px-2.5 py-1.5 rounded-lg transition-colors font-medium text-center">
                      Sửa
                    </Link>
                    <button onClick={() => handleDelete(n.id, n.title)}
                      className="text-xs bg-red-100 text-red-600 hover:bg-red-600 hover:text-white px-2.5 py-1.5 rounded-lg transition-colors font-medium">
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-gray-500 text-xs uppercase bg-gray-50">
                    <th className="text-left py-3 px-4">Ảnh</th>
                    <th className="text-left py-3 px-4">Tiêu đề</th>
                    <th className="text-left py-3 px-4">Danh mục</th>
                    <th className="text-left py-3 px-4">Ngày tạo</th>
                    <th className="text-center py-3 px-4">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {news.map(n => (
                    <tr key={n.id} className="hover:bg-gray-50">
                      <td className="py-2.5 px-4">
                        <img src={n.image || 'https://placehold.co/60x45/f3f4f6/9ca3af?text=No+Img'} alt=""
                          className="w-14 h-10 object-cover rounded-lg bg-gray-100" />
                      </td>
                      <td className="py-2.5 px-4">
                        <div className="font-medium text-gray-800 line-clamp-2 max-w-xs">{n.title}</div>
                      </td>
                      <td className="py-2.5 px-4 text-gray-500">{n.category}</td>
                      <td className="py-2.5 px-4 text-gray-400 text-xs">{new Date(n.created_at).toLocaleDateString('vi-VN')}</td>
                      <td className="py-2.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link to={`/admin/tin-tuc/sua/${n.id}`}
                            className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white px-2.5 py-1.5 rounded-lg transition-colors font-medium">
                            Sửa
                          </Link>
                          <button onClick={() => handleDelete(n.id, n.title)}
                            className="text-xs bg-red-100 text-red-600 hover:bg-red-600 hover:text-white px-2.5 py-1.5 rounded-lg transition-colors font-medium">
                            Xóa
                          </button>
                        </div>
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
