import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API = import.meta.env.VITE_API_URL || '';
const NEWS_CATEGORIES = ['tin-tuc', 'khuyen-mai', 'kinh-nghiem', 'san-pham'];

// Toolbar button dùng onMouseDown + preventDefault để không mất focus khỏi editor
function ToolBtn({ onMouseDown, children, title, className = '' }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={e => { e.preventDefault(); onMouseDown(); }}
      className={`px-2 py-1 rounded text-sm font-medium text-gray-700 hover:bg-gray-200 active:bg-gray-300 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-gray-300 mx-0.5 self-center flex-shrink-0" />;
}

export default function AdminNewsForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const { token } = useAuth();
  const nav = useNavigate();
  const headers = { Authorization: `Bearer ${token}` };

  const fileRef = useRef();       // ảnh bìa
  const imgInsertRef = useRef();  // ảnh chèn vào nội dung
  const editorRef = useRef();     // contenteditable
  const savedRangeRef = useRef(null);

  const [form, setForm] = useState({ title: '', summary: '', category: 'tin-tuc' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [tableModal, setTableModal] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  useEffect(() => {
    if (isEdit) {
      axios.get(`${API}/api/admin/news/${id}`, { headers }).then(r => {
        const n = r.data;
        setForm({ title: n.title || '', summary: n.summary || '', category: n.category || 'tin-tuc' });
        setImagePreview(n.image || '');
        if (editorRef.current) {
          editorRef.current.innerHTML = n.content || '';
        }
      });
    }
  }, [id]);

  /* ====== Helpers cho selection ====== */
  const saveRange = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const restoreRange = () => {
    editorRef.current.focus();
    if (savedRangeRef.current) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(savedRangeRef.current);
    } else {
      // Đặt con trỏ cuối nếu chưa có range
      const range = document.createRange();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  const execCmd = (cmd, value = null) => {
    document.execCommand(cmd, false, value);
  };

  /* ====== Ảnh bìa ====== */
  const handleCoverFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setImageFile(f);
    setImagePreview(URL.createObjectURL(f));
  };

  /* ====== Chèn ảnh vào nội dung ====== */
  const handleInlineImageFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = '';
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await axios.post(`${API}/api/admin/news/upload-image`, fd, {
        headers: { ...headers, 'Content-Type': 'multipart/form-data' },
      });
      restoreRange();
      document.execCommand('insertHTML', false,
        `<img src="${res.data.url}" alt="" style="max-width:100%;height:auto;border-radius:8px;margin:8px 0;display:block;" /><br>`
      );
    } catch {
      alert('Lỗi upload ảnh nội dung. Vui lòng thử lại.');
    } finally {
      setUploading(false);
    }
  };

  /* ====== Chèn bảng ====== */
  const doInsertTable = () => {
    let html = `<table style="border-collapse:collapse;width:100%;margin:12px 0;font-size:14px"><tbody>`;
    for (let r = 0; r < tableRows; r++) {
      html += '<tr>';
      for (let c = 0; c < tableCols; c++) {
        if (r === 0) {
          html += `<th style="border:1px solid #d1d5db;padding:8px 12px;background:#f3f4f6;font-weight:600;text-align:left">Tiêu đề ${c + 1}</th>`;
        } else {
          html += `<td style="border:1px solid #d1d5db;padding:8px 12px">&nbsp;</td>`;
        }
      }
      html += '</tr>';
    }
    html += `</tbody></table><p><br></p>`;
    restoreRange();
    document.execCommand('insertHTML', false, html);
    setTableModal(false);
  };

  /* ====== Submit ====== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const content = editorRef.current ? editorRef.current.innerHTML : '';
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append('content', content);
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
    <div className="p-4 md:p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <Link to="/admin/tin-tuc" className="text-gray-400 hover:text-gray-600 p-1 -ml-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-xl md:text-2xl font-black text-gray-800">{isEdit ? 'Sửa bài viết' : 'Thêm bài viết'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* ===== ẢNH BÌA ===== */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-5">
          <h2 className="font-bold text-gray-700 mb-3">Ảnh bìa bài viết</h2>
          <div className="flex gap-5 items-start">
            <div
              onClick={() => fileRef.current.click()}
              className="w-44 h-28 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all flex-shrink-0 overflow-hidden bg-gray-50"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="" className="w-full h-full object-cover" />
              ) : (
                <>
                  <svg className="w-8 h-8 text-gray-300 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs text-gray-400">Click để chọn</span>
                </>
              )}
            </div>
            <div>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleCoverFile} className="hidden" />
              <button type="button" onClick={() => fileRef.current.click()}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                {imagePreview ? 'Đổi ảnh bìa' : 'Chọn ảnh bìa'}
              </button>
              {imageFile && <p className="text-xs text-gray-500 mt-2 truncate max-w-[180px]">📎 {imageFile.name}</p>}
              <p className="text-xs text-gray-400 mt-2">JPG, PNG, WebP – tối đa 5MB</p>
            </div>
          </div>
        </div>

        {/* ===== THÔNG TIN ===== */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 space-y-3">
          <h2 className="font-bold text-gray-700">Thông tin bài viết</h2>
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
        </div>

        {/* ===== RICH TEXT EDITOR ===== */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="px-2 py-2 border-b border-gray-200 bg-gray-50 flex flex-wrap items-center gap-0.5">

            {/* Định dạng văn bản */}
            <ToolBtn onMouseDown={() => execCmd('bold')} title="Đậm (Ctrl+B)"><strong>B</strong></ToolBtn>
            <ToolBtn onMouseDown={() => execCmd('italic')} title="Nghiêng (Ctrl+I)"><em className="font-serif">I</em></ToolBtn>
            <ToolBtn onMouseDown={() => execCmd('underline')} title="Gạch chân (Ctrl+U)"><u>U</u></ToolBtn>
            <ToolBtn onMouseDown={() => execCmd('strikeThrough')} title="Gạch ngang"><s>S</s></ToolBtn>

            <Divider />

            {/* Tiêu đề */}
            <ToolBtn onMouseDown={() => execCmd('formatBlock', 'h2')} title="Tiêu đề lớn">
              <span className="text-xs font-bold">H2</span>
            </ToolBtn>
            <ToolBtn onMouseDown={() => execCmd('formatBlock', 'h3')} title="Tiêu đề nhỏ">
              <span className="text-xs font-bold">H3</span>
            </ToolBtn>
            <ToolBtn onMouseDown={() => execCmd('formatBlock', 'p')} title="Đoạn văn thường">
              <span className="text-xs">¶</span>
            </ToolBtn>

            <Divider />

            {/* Danh sách */}
            <ToolBtn onMouseDown={() => execCmd('insertUnorderedList')} title="Danh sách đầu đạn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 100 2 1 1 0 000-2zM3 9a1 1 0 100 2 1 1 0 000-2zM3 13a1 1 0 100 2 1 1 0 000-2zM7 6a1 1 0 000 2h10a1 1 0 100-2H7zM7 10a1 1 0 000 2h10a1 1 0 100-2H7zM7 14a1 1 0 000 2h10a1 1 0 100-2H7z" clipRule="evenodd"/>
              </svg>
            </ToolBtn>
            <ToolBtn onMouseDown={() => execCmd('insertOrderedList')} title="Danh sách số">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 000 2h.01a1 1 0 000-2H3zM3 8a1 1 0 000 2h.01a1 1 0 000-2H3zM3 12a1 1 0 100 2h.01a1 1 0 100-2H3zM7 5a1 1 0 000 2h10a1 1 0 100-2H7zM7 9a1 1 0 000 2h10a1 1 0 100-2H7zM7 13a1 1 0 000 2h10a1 1 0 100-2H7z" clipRule="evenodd"/>
              </svg>
            </ToolBtn>

            <Divider />

            {/* Căn lề */}
            <ToolBtn onMouseDown={() => execCmd('justifyLeft')} title="Căn trái">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 4a1 1 0 000 2h16a1 1 0 100-2H2zM2 8a1 1 0 000 2h10a1 1 0 100-2H2zM2 12a1 1 0 000 2h16a1 1 0 100-2H2zM2 16a1 1 0 000 2h10a1 1 0 100-2H2z" clipRule="evenodd"/>
              </svg>
            </ToolBtn>
            <ToolBtn onMouseDown={() => execCmd('justifyCenter')} title="Căn giữa">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 4a1 1 0 000 2h16a1 1 0 100-2H2zM5 8a1 1 0 000 2h10a1 1 0 100-2H5zM2 12a1 1 0 000 2h16a1 1 0 100-2H2zM5 16a1 1 0 000 2h10a1 1 0 100-2H5z" clipRule="evenodd"/>
              </svg>
            </ToolBtn>

            <Divider />

            {/* Chèn ảnh nội dung */}
            <button
              type="button"
              title="Chèn ảnh vào nội dung"
              disabled={uploading}
              onMouseDown={(e) => { e.preventDefault(); saveRange(); imgInsertRef.current.click(); }}
              className="flex items-center gap-1 px-2 py-1 rounded text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {uploading ? (
                <span className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
              <span className="hidden sm:inline text-xs">Chèn ảnh</span>
            </button>
            <input ref={imgInsertRef} type="file" accept="image/*" onChange={handleInlineImageFile} className="hidden" />

            {/* Chèn bảng */}
            <button
              type="button"
              title="Chèn bảng"
              onMouseDown={(e) => { e.preventDefault(); saveRange(); setTableModal(true); }}
              className="flex items-center gap-1 px-2 py-1 rounded text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M10 3v18M14 3v18M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6z" />
              </svg>
              <span className="hidden sm:inline text-xs">Chèn bảng</span>
            </button>

            <Divider />

            {/* Xóa định dạng */}
            <ToolBtn onMouseDown={() => execCmd('removeFormat')} title="Xóa định dạng">
              <span className="text-xs">✕f</span>
            </ToolBtn>
          </div>

          {/* Vùng soạn thảo */}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className="news-editor min-h-[400px] p-4 text-sm leading-relaxed focus:outline-none"
            data-placeholder="Nhập nội dung bài viết tại đây..."
          />
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">{error}</div>}

        <div className="flex gap-3 pb-6">
          <button type="submit" disabled={loading}
            className="flex-1 sm:flex-none bg-blue-600 text-white font-bold px-6 md:px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors text-sm">
            {loading ? 'Đang lưu...' : isEdit ? 'Cập nhật' : 'Thêm bài viết'}
          </button>
          <Link to="/admin/tin-tuc"
            className="flex-1 sm:flex-none text-center bg-gray-100 text-gray-700 font-medium px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors text-sm">
            Hủy
          </Link>
        </div>
      </form>

      {/* ===== MODAL CHÈN BẢNG ===== */}
      {tableModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setTableModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-black text-gray-800 text-lg mb-1">Chèn bảng</h3>
            <p className="text-xs text-gray-400 mb-4">Hàng đầu tiên sẽ là tiêu đề cột (header)</p>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-gray-600 w-20 flex-shrink-0">Số hàng</label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden flex-1">
                  <button type="button"
                    onClick={() => setTableRows(r => Math.max(1, r - 1))}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-gray-600">−</button>
                  <input
                    type="number" min="1" max="30" value={tableRows}
                    onChange={e => setTableRows(Math.max(1, Math.min(30, parseInt(e.target.value) || 1)))}
                    className="flex-1 text-center py-2 text-sm font-semibold focus:outline-none"
                  />
                  <button type="button"
                    onClick={() => setTableRows(r => Math.min(30, r + 1))}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-gray-600">+</button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-gray-600 w-20 flex-shrink-0">Số cột</label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden flex-1">
                  <button type="button"
                    onClick={() => setTableCols(c => Math.max(1, c - 1))}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-gray-600">−</button>
                  <input
                    type="number" min="1" max="10" value={tableCols}
                    onChange={e => setTableCols(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                    className="flex-1 text-center py-2 text-sm font-semibold focus:outline-none"
                  />
                  <button type="button"
                    onClick={() => setTableCols(c => Math.min(10, c + 1))}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-gray-600">+</button>
                </div>
              </div>
            </div>

            {/* Preview bảng mini */}
            <div className="overflow-auto max-h-36 rounded-lg border border-gray-200 mb-5 bg-gray-50">
              <table className="text-xs border-collapse w-full">
                <tbody>
                  {Array.from({ length: Math.min(tableRows, 5) }).map((_, r) => (
                    <tr key={r}>
                      {Array.from({ length: Math.min(tableCols, 6) }).map((_, c) => (
                        r === 0
                          ? <th key={c} className="border border-gray-300 px-2 py-1.5 bg-gray-200 font-bold text-center text-gray-700">T{c + 1}</th>
                          : <td key={c} className="border border-gray-300 px-2 py-1.5 text-center text-gray-300">·</td>
                      ))}
                      {tableCols > 6 && (
                        <td className="border border-gray-300 px-1 py-1 text-center text-gray-400 text-[10px] bg-gray-50">+{tableCols - 6}</td>
                      )}
                    </tr>
                  ))}
                  {tableRows > 5 && (
                    <tr>
                      <td colSpan={Math.min(tableCols, 6) + (tableCols > 6 ? 1 : 0)}
                        className="text-center text-gray-400 text-[10px] py-1.5 bg-gray-50">
                        ... +{tableRows - 5} hàng nữa
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={doInsertTable}
                className="flex-1 bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                ✓ Chèn bảng {tableRows}×{tableCols}
              </button>
              <button
                type="button"
                onClick={() => setTableModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
