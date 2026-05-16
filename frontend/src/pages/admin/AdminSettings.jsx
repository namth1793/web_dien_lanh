import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API = import.meta.env.VITE_API_URL || '';

function ImageUploadCard({ title, currentUrl, previewShape, onUpload }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const handleChange = e => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setMsg('');
  };

  const handleSave = async () => {
    if (!file) return;
    setSaving(true);
    setMsg('');
    try {
      const url = await onUpload(file);
      setFile(null);
      setPreview(null);
      setMsg('✓ Đã cập nhật thành công!');
      // revoke old object URL
      if (preview) URL.revokeObjectURL(preview);
    } catch (e) {
      setMsg('Lỗi: ' + (e.response?.data?.error || e.message));
    } finally {
      setSaving(false);
    }
  };

  const imgSrc = preview || currentUrl;

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="font-bold text-gray-800 mb-4 text-base">{title}</h2>

      {/* Preview */}
      <div className={`mb-4 border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center
        ${previewShape === 'logo' ? 'h-28 w-28 rounded-full mx-auto' : 'rounded-lg aspect-video w-full'}`}>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt="preview"
            className={`object-cover ${previewShape === 'logo' ? 'w-full h-full rounded-full' : 'w-full h-full'}`}
          />
        ) : (
          <span className="text-gray-400 text-sm">Chưa có ảnh</span>
        )}
      </div>

      {/* File picker + save */}
      <div className="flex flex-col sm:flex-row gap-2">
        <label className="flex-1 cursor-pointer border-2 border-dashed border-gray-300 hover:border-brand-yellow rounded-lg px-4 py-2.5 text-sm text-center text-gray-600 hover:text-brand-dark transition-colors">
          <input type="file" accept="image/*" className="hidden" onChange={handleChange} />
          {file ? `✓ ${file.name}` : '📁 Chọn ảnh mới'}
        </label>
        <button
          onClick={handleSave}
          disabled={!file || saving}
          className="bg-brand-dark text-white px-5 py-2.5 rounded-lg text-sm font-bold disabled:opacity-40 hover:bg-blue-900 transition-colors whitespace-nowrap"
        >
          {saving ? 'Đang lưu...' : 'Cập nhật'}
        </button>
      </div>

      {msg && (
        <p className={`mt-2 text-sm ${msg.startsWith('Lỗi') ? 'text-red-600' : 'text-green-600'}`}>{msg}</p>
      )}
    </div>
  );
}

export default function AdminSettings() {
  const { token } = useAuth();
  const [settings, setSettings] = useState({ banner_url: '', logo_url: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/api/admin/settings`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => setSettings(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  const uploadBanner = async (file) => {
    const form = new FormData();
    form.append('image', file);
    const { data } = await axios.post(`${API}/api/admin/settings/banner`, form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSettings(s => ({ ...s, banner_url: data.url }));
    return data.url;
  };

  const uploadLogo = async (file) => {
    const form = new FormData();
    form.append('image', file);
    const { data } = await axios.post(`${API}/api/admin/settings/logo`, form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSettings(s => ({ ...s, logo_url: data.url }));
    return data.url;
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-400">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-brand-yellow rounded-full animate-spin mx-auto mb-3" />
        Đang tải...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-black text-brand-dark mb-1">Cài đặt giao diện</h1>
      <p className="text-sm text-gray-500 mb-6">Thay đổi hình nền banner và logo hiển thị trên trang web.</p>

      <div className="space-y-5">
        <ImageUploadCard
          title="Hình nền Hero Banner"
          currentUrl={settings.banner_url}
          previewShape="banner"
          onUpload={uploadBanner}
        />
        <ImageUploadCard
          title="Logo thương hiệu (góc trên navbar)"
          currentUrl={settings.logo_url}
          previewShape="logo"
          onUpload={uploadLogo}
        />
      </div>

      <p className="mt-6 text-xs text-gray-400 text-center">
        Ảnh được lưu trên Cloudinary · Thay đổi có hiệu lực ngay sau khi tải lại trang
      </p>
    </div>
  );
}
