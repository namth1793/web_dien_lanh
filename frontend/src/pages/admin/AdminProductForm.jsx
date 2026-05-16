import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API = import.meta.env.VITE_API_URL || '';

export default function AdminProductForm() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isEdit = !!id;
  const { token } = useAuth();
  const nav = useNavigate();
  const headers = { Authorization: `Bearer ${token}` };

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '', category_id: searchParams.get('cat') || '', brand: '', model: '',
    price: '', original_price: '', description: '', specs: '{}',
    is_featured: false, is_sale: false, stock: '10',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef();

  useEffect(() => {
    axios.get(`${API}/api/admin/categories`, { headers }).then(r => setCategories(r.data));
    if (isEdit) {
      axios.get(`${API}/api/admin/products/${id}`, { headers }).then(r => {
        const p = r.data;
        setForm({
          name: p.name || '', category_id: p.category_id || '',
          brand: p.brand || '', model: p.model || '',
          price: p.price || '', original_price: p.original_price || '',
          description: p.description || '', specs: p.specs || '{}',
          is_featured: !!p.is_featured, is_sale: !!p.is_sale, stock: p.stock || '10',
        });
        setCurrentImage(p.image || '');
        setImagePreview(p.image || '');
      });
    }
  }, [id]);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setImageFile(f);
    setImagePreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) fd.append('image', imageFile);

      if (isEdit) {
        await axios.put(`${API}/api/admin/products/${id}`, fd, { headers: { ...headers, 'Content-Type': 'multipart/form-data' } });
      } else {
        await axios.post(`${API}/api/admin/products`, fd, { headers: { ...headers, 'Content-Type': 'multipart/form-data' } });
      }
      nav('/admin/san-pham');
    } catch (err) {
      setError(err.response?.data?.error || 'Lỗi khi lưu sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin/san-pham" className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-2xl font-black text-gray-800">{isEdit ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Image Upload */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-bold text-gray-700 mb-4">Ảnh sản phẩm</h2>
          <div className="flex gap-5 items-start">
            <div
              onClick={() => fileRef.current.click()}
              className="w-40 h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all flex-shrink-0 overflow-hidden bg-gray-50">
              {imagePreview ? (
                <img src={imagePreview} alt="" className="w-full h-full object-cover" />
              ) : (
                <>
                  <svg className="w-8 h-8 text-gray-300 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs text-gray-400 text-center px-2">Click để chọn ảnh</span>
                </>
              )}
            </div>
            <div className="flex-1">
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
              <button type="button" onClick={() => fileRef.current.click()}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                {imagePreview ? 'Đổi ảnh' : 'Chọn ảnh'}
              </button>
              {imageFile && <p className="text-xs text-gray-500 mt-2">📎 {imageFile.name}</p>}
              <p className="text-xs text-gray-400 mt-2">Hỗ trợ: JPG, PNG, WebP. Tối đa 5MB.<br />Ảnh sẽ được lưu lên Cloudinary.</p>
              {imagePreview && (
                <button type="button" onClick={() => { setImageFile(null); setImagePreview(currentImage); fileRef.current.value = ''; }}
                  className="text-xs text-red-500 hover:underline mt-2 block">
                  Khôi phục ảnh cũ
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
          <h2 className="font-bold text-gray-700">Thông tin cơ bản</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Tên sản phẩm <span className="text-red-500">*</span></label>
            <input type="text" required value={form.name} onChange={e => set('name', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Danh mục <span className="text-red-500">*</span></label>
            <select required value={form.category_id} onChange={e => set('category_id', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">-- Chọn danh mục --</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Thương hiệu</label>
              <input type="text" value={form.brand} onChange={e => set('brand', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Daikin, LG, Samsung..." />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Model</label>
              <input type="text" value={form.model} onChange={e => set('model', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        {/* Price & Stock */}
        <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
          <h2 className="font-bold text-gray-700">Giá & Tồn kho</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Giá bán (₫) <span className="text-red-500">*</span></label>
              <input type="number" required min="0" value={form.price} onChange={e => set('price', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Giá gốc (₫)</label>
              <input type="number" min="0" value={form.original_price} onChange={e => set('original_price', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Tồn kho</label>
              <input type="number" min="0" value={form.stock} onChange={e => set('stock', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_featured} onChange={e => set('is_featured', e.target.checked)}
                className="w-4 h-4 rounded accent-blue-600" />
              <span className="text-sm font-medium text-gray-700">⭐ Sản phẩm nổi bật</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_sale} onChange={e => set('is_sale', e.target.checked)}
                className="w-4 h-4 rounded accent-red-500" />
              <span className="text-sm font-medium text-gray-700">🔥 Đang sale</span>
            </label>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
          <h2 className="font-bold text-gray-700">Nội dung</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Mô tả sản phẩm</label>
            <textarea rows={4} value={form.description} onChange={e => set('description', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Mô tả chi tiết về sản phẩm..." />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Thông số kỹ thuật
              <span className="ml-2 text-xs font-normal text-gray-400">(JSON format: {"{'key':'value',...}"})</span>
            </label>
            <textarea rows={5} value={form.specs} onChange={e => set('specs', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono"
              placeholder={'{\n  "Công suất": "9.000 BTU",\n  "Gas": "R32"\n}'} />
          </div>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">{error}</div>}

        <div className="flex gap-3 pb-6">
          <button type="submit" disabled={loading}
            className="bg-blue-600 text-white font-bold px-8 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors">
            {loading ? 'Đang lưu...' : isEdit ? 'Cập nhật' : 'Thêm sản phẩm'}
          </button>
          <Link to="/admin/san-pham"
            className="bg-gray-100 text-gray-700 font-medium px-6 py-2.5 rounded-lg hover:bg-gray-200 transition-colors">
            Hủy
          </Link>
        </div>
      </form>
    </div>
  );
}
