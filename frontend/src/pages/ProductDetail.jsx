import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/products/${slug}`).then(r => { setProduct(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-center">
      <div className="animate-spin w-10 h-10 border-4 border-brand-yellow border-t-transparent rounded-full mx-auto"/>
    </div>
  );
  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-500">Không tìm thấy sản phẩm</div>
  );

  const discount = product.original_price && product.original_price > product.price
    ? Math.round((1 - product.price / product.original_price) * 100) : 0;
  const specs = product.specs ? JSON.parse(product.specs) : {};

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      {/* Mini header */}
      <div className="bg-brand-dark py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs text-gray-400 flex items-center gap-2 flex-wrap">
            <Link to="/" className="hover:text-brand-yellow">Trang chủ</Link>
            <span>›</span>
            <Link to="/san-pham" className="hover:text-brand-yellow">Sản phẩm</Link>
            {product.category_slug && (
              <>
                <span>›</span>
                <Link to={`/san-pham?category=${product.category_slug}`} className="hover:text-brand-yellow">{product.category_name}</Link>
              </>
            )}
            <span>›</span>
            <span className="text-gray-300 line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
          {/* Image */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-sm">
              {discount > 0 && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded z-10">-{discount}%</span>
              )}
              <img src={product.image} alt={product.name}
                className="w-full h-80 object-contain p-4 rounded-xl bg-gray-50"
                onError={e => { e.target.src = 'https://placehold.co/400x300/f5f5f5/999?text=Sản+phẩm'; }}/>
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="text-xs text-brand-yellow font-bold uppercase mb-1">{product.brand}</div>
            <h1 className="text-2xl font-black text-brand-dark mb-3">{product.name}</h1>
            {product.model && <div className="text-sm text-gray-500 mb-3">Model: <span className="font-medium text-gray-700">{product.model}</span></div>}

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-black text-brand-dark">{product.price.toLocaleString('vi-VN')}đ</span>
              {product.original_price && product.original_price > product.price && (
                <span className="text-lg text-gray-400 line-through">{product.original_price.toLocaleString('vi-VN')}đ</span>
              )}
            </div>

            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{product.description}</p>

            {/* Specs */}
            {Object.keys(specs).length > 0 && (
              <div className="mb-5">
                <h3 className="font-bold text-brand-dark mb-2 text-sm">Thông số kỹ thuật:</h3>
                <div className="rounded-lg overflow-hidden border border-gray-100">
                  {Object.entries(specs).map(([k, v], i) => (
                    <div key={k} className={`flex text-sm ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} px-3 py-2`}>
                      <span className="w-1/2 text-gray-500">{k}</span>
                      <span className="w-1/2 font-medium text-gray-800">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 font-bold">-</button>
                <span className="px-4 py-2 font-medium">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 font-bold">+</button>
              </div>
              <button onClick={handleAdd}
                className={`flex-1 py-3 rounded-lg font-black transition-colors ${added ? 'bg-green-500 text-white' : 'bg-brand-yellow text-brand-dark hover:bg-brand-yellow-dark'}`}>
                {added ? '✓ Đã thêm vào giỏ!' : 'Thêm vào giỏ hàng'}
              </button>
            </div>

            <a href="tel:18000049"
              className="flex items-center justify-center gap-2 w-full py-3 border-2 border-brand-dark text-brand-dark rounded-lg font-bold hover:bg-brand-dark hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
              Gọi tư vấn: 1800 0049 (Miễn phí)
            </a>

            <div className="grid grid-cols-3 gap-2 mt-4">
              {[['🛡️', 'Hàng chính hãng'], ['🚚', 'Giao hàng nhanh'], ['🔧', 'Bảo hành uy tín']].map(([icon, label]) => (
                <div key={label} className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-lg p-2 text-center">
                  <span className="text-xl">{icon}</span>
                  <div className="text-xs text-brand-dark font-semibold mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {product.related && product.related.length > 0 && (
          <section>
            <h2 className="section-heading mb-1">Sản phẩm liên quan</h2>
            <div className="section-line mb-6"/>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {product.related.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
