import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

export default function Promotions() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products?is_sale=1&limit=40').then(r => { setProducts(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <Link to="/" className="hover:text-primary-600">Trang chủ</Link>
        <span>›</span>
        <span className="text-gray-800 font-medium">Khuyến mãi</span>
      </nav>

      {/* Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-8 text-white mb-8 text-center">
        <div className="text-4xl font-black text-yellow-300 mb-1">🎊 SALE HOT</div>
        <h1 className="text-2xl font-bold mb-2">Khuyến mãi đặc biệt - Mừng 15 năm MK JSC</h1>
        <p className="text-red-100">Giảm giá đến -25% nhiều sản phẩm điện lạnh chính hãng. Số lượng có hạn!</p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: '🎁', title: 'Giảm giá đến 25%', desc: 'Trên các sản phẩm chọn lọc' },
          { icon: '🚚', title: 'Miễn phí giao hàng', desc: 'Nội thành TP.HCM' },
          { icon: '🔧', title: 'Tặng lắp đặt', desc: 'Cho máy lạnh treo tường' },
          { icon: '🛡️', title: 'Bảo hành mở rộng', desc: 'Thêm 6 tháng cho SP khuyến mãi' },
        ].map(b => (
          <div key={b.title} className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow">
            <span className="text-3xl">{b.icon}</span>
            <h3 className="font-bold text-gray-800 text-sm mt-2">{b.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Products on sale */}
      <h2 className="section-title mb-4">Sản phẩm đang khuyến mãi ({products.length} sản phẩm)</h2>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <div key={i} className="bg-white rounded-xl h-72 animate-pulse"/>)}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map(p => <ProductCard key={p.id} product={p}/>)}
        </div>
      )}
    </div>
  );
}
