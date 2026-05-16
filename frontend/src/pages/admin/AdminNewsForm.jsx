import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API = import.meta.env.VITE_API_URL || '';

const NEWS_CATEGORIES = ['tin-tuc', 'khuyen-mai', 'kinh-nghiem', 'san-pham'];

export default function AdminNewsForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const { token } = useAuth();
  const nav = useNavigate();
  const headers = { Authorization: `Bearer ${token}` };
  const fileRef = useRef();

  const [form, setForm] = useState({ title: '', summary: '', content: '', category: 'tin-tuc' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      axios.get(`${API}/api/admin/news/${id}`, { headers }).then(r => {
        const n = r.data;
        setForm({ title: n.title || '', summary: n.summary || '', content: n.content || '', category: n.category || 'tin-tuc' });
        setCurrentImage(n.image || '');
        setImagePreview(n.image || '');
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
      const cfg = { headers: { ...headers, 'Content-Type': 'multipart/form-data' } };
      if (isEdit) await axios.put(`${API}/api/admin/news/${id}`, fd, cfg);
      else await axios.post(`${API}/api/admin/news`, fd, cfg);
      nav('/admin/tin-tuc');
    } catch (err) {
      setError(err.response?.data?.error || 'Lỗi khi lưu bài viết');
    } finally {
      setLoading(false);
    }
  };

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin/tin-tuc" className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-2xl font-black text-gray-800">{isEdit ? 'Sửa bài viết' : 'Thêm bài viết'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Image */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-bold text-gray-700 mb-4">Ảnh bài viết</h2>
          <div className="flex gap-5 items-start">
            <div onClick={() => fileRef.current.click()}
              className="w-40 h-28 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all flex-shrink-0 overflow-hidden bg-gray-50">
              {imagePreview ? (
                <img src={imagePreview} alt="" className="w-full h-full object-cover" />
              ) : (
                <>
                  <svg className="w-8 h-8 text-gray-300 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs text-gray-400">Click để chọn ảnh</span>
                </>
              )}
            </div>
            <div>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
              <button type="button" onClick={() => fileRef.current.click()}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                {imagePreview ? 'Đổi ảnh' : 'Chọn ảnh'}
              </button>
              {imageFile && <p className="text-xs text-gray-500 mt-2">📎 {imageFile.name}</p>}
              <p className="text-xs text-gray-400 mt-2">JPG, PNG, WebP. Tối đa 5MB.</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
          <h2 className="font-bold text-gray-700">Nội dung bài viết</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Tiêu đề <span className="text-red-500">*</span></label>
            <input type="text" required value={form.title} onChange={e => set('title', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Danh mục</label>
            <select value={form.category} onChange={e => set('category', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {NEWS_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Tóm tắt</label>
            <textarea rows={2} value={form.summary} onChange={e => set('summary', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Tóm tắt ngắn gọn về bài viết..." />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Nội dung đầy đủ</label>
            <textarea rows={12} value={form.content} onChange={e => set('content', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              placeholder="Nhập nội dung bài viết..." />
          </div>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">{error}</div>}

        <div className="flex gap-3 pb-6">
          <button type="submit" disabled={loading}
            className="bg-blue-600 text-white font-bold px-8 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors">
            {loading ? 'Đang lưu...' : isEdit ? 'Cập nhật' : 'Thêm bài viết'}
          </button>
          <Link to="/admin/tin-tuc"
            className="bg-gray-100 text-gray-700 font-medium px-6 py-2.5 rounded-lg hover:bg-gray-200 transition-colors">
            Hủy
          </Link>
        </div>
      </form>
    </div>
  );
}
