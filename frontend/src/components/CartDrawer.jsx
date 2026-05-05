import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQty, total } = useCart();

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose}/>}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b bg-primary-600 text-white">
          <h2 className="font-bold text-lg">Giỏ hàng ({items.length})</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 mt-12">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              <p>Giỏ hàng trống</p>
              <button onClick={onClose} className="mt-3 text-primary-600 underline text-sm">Tiếp tục mua sắm</button>
            </div>
          ) : items.map(item => (
            <div key={item.id} className="flex gap-3 bg-gray-50 rounded-lg p-3">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded bg-white" onError={e => { e.target.src = 'https://placehold.co/64x64/f5f5f5/999?text=SP'; }}/>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-800 line-clamp-2">{item.name}</div>
                <div className="text-red-500 font-bold text-sm mt-1">{item.price.toLocaleString('vi-VN')}đ</div>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-gray-600 hover:bg-gray-300">-</button>
                  <span className="text-sm font-medium w-6 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-gray-600 hover:bg-gray-300">+</button>
                </div>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="border-t p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-700">Tổng cộng:</span>
              <span className="text-red-500 font-bold text-xl">{total.toLocaleString('vi-VN')}đ</span>
            </div>
            <Link to="/gio-hang" onClick={onClose} className="block w-full bg-red-500 text-white text-center py-3 rounded-lg font-bold hover:bg-red-600 transition-colors">
              Đặt hàng ngay
            </Link>
            <button onClick={onClose} className="block w-full text-center text-primary-600 py-2 mt-2 text-sm hover:underline">
              Tiếp tục mua sắm
            </button>
          </div>
        )}
      </div>
    </>
  );
}
