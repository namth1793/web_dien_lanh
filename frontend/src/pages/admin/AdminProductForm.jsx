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

  // Multi-image state
  const [existingImages, setExistingImages] = useState([]); // URLs đã lưu trên Cloudinary
  const [newFiles, setNewFiles] = useState([]);             // File objects mới chọn
  const [newPreviews, setNewPreviews] = useState([]);       // Object URLs để preview
  const multiFileRef = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
        // Load danh sách ảnh hiện tại
        let imgs = [];
        try { imgs = JSON.parse(p.images || '[]'); } catch {}
        if (!imgs.length && p.image) imgs = [p.image];
        setExistingImages(imgs);
      });
    }
  }, [id]);

  const handleMultiFiles = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const total = existingImages.length + newFiles.length + files.length;
    if (total > 20) {
      alert(`Tối đa 20 ảnh! Hiện có ${existingImages.length + newFiles.length} ảnh, chỉ còn thêm được ${20 - existingImages.length - newFiles.length}.`);
      e.target.value = '';
      return;
    }
    setNewFiles(prev => [...prev, ...files]);
    setNewPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
    e.target.value = '';
  };

  const removeExisting = (idx) => {
    setExistingImages(prev => prev.filter((_, i) => i !== idx));
  };

  const removeNew = (idx) => {
    URL.revokeObjectURL(newPreviews[idx]);
    setNewFiles(prev => prev.filter((_, i) => i !== idx));
    setNewPreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append('keepImages', JSON.stringify(existingImages));
      newFiles.forEach(f => fd.append('images', f));
      const cfg = { headers: { ...headers, 'Content-Type': 'multipart/form-data' } };
      if (isEdit) await axios.put(`${API}/api/admin/products/${id}`, fd, cfg);
      else await axios.post(`${API}/api/admin/products`, fd, cfg);
      nav('/admin/san-pham');
    } catch (err) {
      setError(err.response?.data?.error || 'Lỗi khi lưu sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const totalImages = existingImages.length + newFiles.length;
  const canAddMore = totalImages < 20;

  return (
    <div className="p-4 md:p-6 max-w-3xl">
      <div className="flex items-center gap-3 mb-5">
        <Link to="/admin/san-pham" className="text-gray-400 hover:text-gray-600 p-1 -ml-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-xl md:text-2xl font-black text-gray-800">{isEdit ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* ===== MULTI IMAGE UPLOAD ===== */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-700">Ảnh sản phẩm</h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              totalImages >= 20 ? 'bg-red-100 text-red-600' :
              totalImages > 0  ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
            }`}>
              {totalImages}/20 ảnh
            </span>
          </div>

          {/* Grid ảnh */}
          {totalImages > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mb-3">
              {existingImages.map((url, i) => (
                <div key={`ex-${i}`} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  {i === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-blue-600/85 text-white text-[9px] font-bold text-center py-0.5 leading-tight">
                      ẢNH CHÍNH
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeExisting(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full hidden group-hover:flex items-center justify-center text-[10px] font-bold shadow transition-all"
                  >✕</button>
                </div>
              ))}
              {newPreviews.map((url, i) => (
                <div key={`new-${i}`} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-green-300 shadow-sm">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-green-500/85 text-white text-[9px] font-bold text-center py-0.5 leading-tight">
                    MỚI
                  </div>
                  <button
                    type="button"
                    onClick={() => removeNew(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full hidden group-hover:flex items-center justify-center text-[10px] font-bold shadow transition-all"
                  >✕</button>
                </div>
              ))}
              {/* Ô thêm ảnh nhanh trong grid */}
              {canAddMore && (
                <button
                  type="button"
                  onClick={() => multiFileRef.current.click()}
                  className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-all text-gray-400 hover:text-blue-500"
                >
                  <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-[10px] font-medium">Thêm</span>
                </button>
              )}
            </div>
          )}

          {/* Nút chọn ảnh (khi chưa có ảnh nào) */}
          {totalImages === 0 && (
            <button
              type="button"
              onClick={() => multiFileRef.current.click()}
              className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-gray-300 rounded-xl py-8 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Chọn ảnh sản phẩm (có thể chọn nhiều)
            </button>
          )}

          <input
            ref={multiFileRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleMultiFiles}
            className="hidden"
          />
          <p className="text-xs text-gray-400 mt-2">
            JPG, PNG, WebP – tối đa 5MB/ảnh – tối đa 20 ảnh – ảnh đầu tiên là ảnh bìa.
            {totalImages > 0 && ' Hover vào ảnh để xoá.'}
          </p>
        </div>

        {/* ===== THÔNG TIN CƠ BẢN ===== */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 space-y-3">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Thương hiệu</label>
              <input type="text" value={form.brand} onChange={e => set('brand', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Daikin, LG..." />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Model</label>
              <input type="text" value={form.model} onChange={e => set('model', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        {/* ===== GIÁ & TỒN KHO ===== */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 space-y-3">
          <h2 className="font-bold text-gray-700">Giá & Tồn kho</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
          <div className="flex flex-wrap gap-4 md:gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_featured} onChange={e => set('is_featured', e.target.checked)}
                className="w-4 h-4 rounded accent-blue-600" />
              <span className="text-sm font-medium text-gray-700">⭐ Nổi bật</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_sale} onChange={e => set('is_sale', e.target.checked)}
                className="w-4 h-4 rounded accent-red-500" />
              <span className="text-sm font-medium text-gray-700">🔥 Đang sale</span>
            </label>
          </div>
        </div>

        {/* ===== NỘI DUNG ===== */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 space-y-3">
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
              <span className="ml-1 text-xs font-normal text-gray-400">(JSON)</span>
            </label>
            <textarea rows={5} value={form.specs} onChange={e => set('specs', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono"
              placeholder={'{\n  "Công suất": "9.000 BTU"\n}'} />
          </div>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">{error}</div>}

        <div className="flex gap-3 pb-6">
          <button type="submit" disabled={loading}
            className="flex-1 sm:flex-none bg-blue-600 text-white font-bold px-6 md:px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors text-sm">
            {loading ? 'Đang lưu...' : isEdit ? 'Cập nhật' : 'Thêm sản phẩm'}
          </button>
          <Link to="/admin/san-pham"
            className="flex-1 sm:flex-none text-center bg-gray-100 text-gray-700 font-medium px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors text-sm">
            Hủy
          </Link>
        </div>
      </form>
    </div>
  );
}
