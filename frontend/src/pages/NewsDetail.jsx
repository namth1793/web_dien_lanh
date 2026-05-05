import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function NewsDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/news/${slug}`).then(r => { setArticle(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <div className="animate-spin w-10 h-10 border-4 border-brand-yellow border-t-transparent rounded-full mx-auto"/>
    </div>
  );
  if (!article) return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-500">Không tìm thấy bài viết</div>
  );

  return (
    <div>
      {/* Mini header */}
      <div className="bg-brand-dark py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs text-gray-400 flex items-center gap-2">
            <Link to="/" className="hover:text-brand-yellow">Trang chủ</Link>
            <span>›</span>
            <Link to="/tin-tuc" className="hover:text-brand-yellow">Tin tức</Link>
            <span>›</span>
            <span className="text-gray-300 line-clamp-1">{article.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h1 className="text-2xl font-black text-brand-dark mb-3">{article.title}</h1>
              <div className="text-sm text-brand-yellow font-semibold mb-4">
                {new Date(article.created_at).toLocaleDateString('vi-VN')}
              </div>
              <img src={article.image} alt={article.title}
                className="w-full rounded-xl mb-5 max-h-80 object-cover"
                onError={e => { e.target.src = 'https://placehold.co/800x400/0d1b35/f5c518?text=MK+JSC'; }}/>
              <p className="text-gray-600 text-sm italic mb-5 bg-brand-yellow/5 border-l-4 border-brand-yellow pl-4 py-2 rounded-r-lg">
                {article.summary}
              </p>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">{article.content}</div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-5">
            {(article.related || []).length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <h3 className="font-black text-brand-dark mb-3 border-b pb-2 text-sm uppercase">Bài viết liên quan</h3>
                {(article.related || []).map(r => (
                  <Link key={r.id} to={`/tin-tuc/${r.slug}`} className="flex gap-3 mb-3 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                    <img src={r.image} alt={r.title} className="w-16 h-12 object-cover rounded flex-shrink-0"
                      onError={e => { e.target.src = 'https://placehold.co/64x48/0d1b35/f5c518?text=TT'; }}/>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-gray-800 line-clamp-2 hover:text-brand-yellow">{r.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{new Date(r.created_at).toLocaleDateString('vi-VN')}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="bg-brand-dark rounded-xl p-5">
              <h3 className="font-black text-white mb-2">Cần tư vấn?</h3>
              <p className="text-gray-400 text-sm mb-4">Liên hệ chuyên gia MK JSC ngay hôm nay</p>
              <a href="tel:18000049"
                className="block bg-brand-yellow text-brand-dark font-black text-center py-2.5 rounded-lg hover:bg-brand-yellow-dark transition-colors">
                📞 1800 0049 (Miễn phí)
              </a>
              <Link to="/lien-he"
                className="block mt-3 border border-white/20 text-white font-semibold text-center py-2.5 rounded-lg hover:bg-white/10 transition-colors text-sm">
                Đặt lịch online
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
