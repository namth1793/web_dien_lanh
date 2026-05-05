import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/news?limit=20').then(r => { setNews(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Page header */}
      <div className="bg-brand-dark py-14 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">TIN TỨC & KINH NGHIỆM</h1>
          <div className="w-14 h-1 bg-brand-yellow rounded mx-auto mb-4"/>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Kiến thức điện lạnh, mẹo tiết kiệm điện, hướng dẫn bảo dưỡng và cập nhật khuyến mãi mới nhất từ MK JSC.
          </p>
          <nav className="text-xs text-gray-500 mt-4 flex items-center justify-center gap-2">
            <Link to="/" className="hover:text-brand-yellow">Trang chủ</Link>
            <span>›</span>
            <span className="text-gray-300">Tin tức</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-72 animate-pulse border border-gray-100"/>
            ))}
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-5xl mb-4">📰</p>
            <p className="font-medium">Chưa có bài viết nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {news.map(n => (
              <Link key={n.id} to={`/tin-tuc/${n.slug}`}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                <div className="overflow-hidden">
                  <img src={n.image} alt={n.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={e => { e.target.src = 'https://placehold.co/600x350/0d1b35/f5c518?text=MK+JSC'; }}/>
                </div>
                <div className="p-4">
                  <div className="text-xs text-brand-yellow font-semibold mb-2">
                    {new Date(n.created_at).toLocaleDateString('vi-VN')}
                  </div>
                  <h2 className="font-bold text-brand-dark line-clamp-2 group-hover:text-brand-yellow transition-colors mb-2">{n.title}</h2>
                  <p className="text-sm text-gray-500 line-clamp-2">{n.summary}</p>
                  <span className="text-brand-yellow text-sm font-semibold mt-3 block">Đọc thêm →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
