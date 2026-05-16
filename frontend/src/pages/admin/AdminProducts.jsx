import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const API = import.meta.env.VITE_API_URL || '';

export default function AdminProducts() {
  const { token } = useAuth();
  const headers = { Authorization: `Bearer ${token}` };

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    Promise.all([
      axios.get(`${API}/api/admin/categories`, { headers }),
      axios.get(`${API}/api/admin/products`, { headers }),
    ]).then(([c, p]) => {
      setCategories(c.data);
      setProducts(p.data);
      if (c.data.length > 0) setActiveTab(c.data[0].id);
    }).finally(() => setLoading(false));
  }, []);

  const reload = () => axios.get(`${API}/api/admin/products`, { headers }).then(r => setProducts(r.data));

  const handleDelete = async (id, name) => {
    if (!confirm(`Xóa sản phẩm "${name}"?`)) return;
    await axios.delete(`${API}/api/admin/products/${id}`, { headers });
    reload();
  };

  const activeCat = categories.find(c => c.id === activeTab);
  const filtered = products.filter(p => {
    const inCat = p.category_id === activeTab;
    const inSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || (p.brand || '').toLowerCase().includes(search.toLowerCase());
    return inCat && inSearch;
  });

  if (loading) return <div className="p-8 text-center text-gray-500">Đang tải...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-gray-800">Quản lý sản phẩm</h1>
        <Link to="/admin/san-pham/them"
          className="bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Thêm sản phẩm
        </Link>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text" placeholder="Tìm theo tên, thương hiệu..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1 mb-4 border-b border-gray-200 pb-0">
        {categories.map(cat => {
          const count = products.filter(p => p.category_id === cat.id).length;
          return (
            <button key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-3 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-all whitespace-nowrap ${
                activeTab === cat.id
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}>
              {cat.icon} {cat.name}
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${activeTab === cat.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b bg-gray-50 flex items-center justify-between">
          <h2 className="font-bold text-gray-700 text-sm">
            {activeCat?.icon} {activeCat?.name}
            <span className="ml-2 text-gray-400 font-normal">({filtered.length} sản phẩm)</span>
          </h2>
          <Link to={`/admin/san-pham/them?cat=${activeTab}`}
            className="text-xs text-blue-600 hover:underline">+ Thêm vào danh mục này</Link>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p>Chưa có sản phẩm trong danh mục này</p>
            <Link to={`/admin/san-pham/them?cat=${activeTab}`} className="mt-2 inline-block text-blue-600 text-sm hover:underline">
              + Thêm sản phẩm đầu tiên
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-gray-500 text-xs uppercase bg-gray-50">
                  <th className="text-left py-3 px-4">Ảnh</th>
                  <th className="text-left py-3 px-4">Tên sản phẩm</th>
                  <th className="text-left py-3 px-4">Thương hiệu</th>
                  <th className="text-right py-3 px-4">Giá</th>
                  <th className="text-center py-3 px-4">Nổi bật</th>
                  <th className="text-center py-3 px-4">Sale</th>
                  <th className="text-center py-3 px-4">Tồn kho</th>
                  <th className="text-center py-3 px-4">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="py-2.5 px-4">
                      <img src={p.image || 'https://placehold.co/60x45/f3f4f6/9ca3af?text=No+Img'} alt=""
                        className="w-14 h-10 object-cover rounded-lg bg-gray-100" />
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="font-medium text-gray-800 line-clamp-1">{p.name}</div>
                      <div className="text-xs text-gray-400">{p.model}</div>
                    </td>
                    <td className="py-2.5 px-4 text-gray-600">{p.brand}</td>
                    <td className="py-2.5 px-4 text-right">
                      <div className="font-semibold text-gray-800">{p.price?.toLocaleString()}₫</div>
                      {p.original_price && <div className="text-xs text-gray-400 line-through">{p.original_price?.toLocaleString()}₫</div>}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      {p.is_featured ? <span className="text-yellow-500">★</span> : <span className="text-gray-200">★</span>}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      {p.is_sale ? <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">SALE</span> : <span className="text-gray-300">-</span>}
                    </td>
                    <td className="py-2.5 px-4 text-center text-gray-600">{p.stock}</td>
                    <td className="py-2.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link to={`/admin/san-pham/sua/${p.id}`}
                          className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white px-2.5 py-1.5 rounded-lg transition-colors font-medium">
                          Sửa
                        </Link>
                        <button onClick={() => handleDelete(p.id, p.name)}
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
        )}
      </div>
    </div>
  );
}
