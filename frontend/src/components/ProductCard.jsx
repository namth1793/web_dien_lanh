import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const discount = product.original_price && product.original_price > product.price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group border border-gray-100 flex flex-col">
      <Link to={`/san-pham/${product.slug}`} className="relative overflow-hidden rounded-t-lg">
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">-{discount}%</span>
        )}
        {product.is_featured === 1 && (
          <span className="absolute top-2 right-2 bg-brand-dark text-brand-yellow text-xs font-bold px-2 py-1 rounded z-10">Nổi bật</span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain p-4 group-hover:scale-105 transition-transform duration-300 bg-gray-50"
          onError={e => { e.target.src = 'https://placehold.co/400x300/f5f5f5/999?text=Sản+phẩm'; }}
        />
      </Link>
      <div className="p-3 flex-1 flex flex-col">
        {product.brand && <div className="text-xs text-brand-dark font-semibold mb-1 uppercase">{product.brand}</div>}
        <Link to={`/san-pham/${product.slug}`} className="text-sm font-medium text-gray-800 hover:text-brand-dark transition-colors line-clamp-2 flex-1">
          {product.name}
        </Link>
        <div className="mt-2">
          <div className="text-brand-dark font-bold text-base">{product.price.toLocaleString('vi-VN')}đ</div>
          {product.original_price && product.original_price > product.price && (
            <div className="text-gray-400 text-xs line-through">{product.original_price.toLocaleString('vi-VN')}đ</div>
          )}
        </div>
        <button
          onClick={() => addItem(product)}
          className="mt-3 w-full bg-brand-yellow text-brand-dark py-2 rounded text-sm font-bold hover:bg-brand-yellow-dark transition-colors"
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}
