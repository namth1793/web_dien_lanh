import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const fmt = (n) => n.toLocaleString('vi-VN') + 'đ';

const MAY_LANH = [
  { id: 'ml1', brand: 'Midea', name: 'Midea Inverter 1HP MAFA-09CDN8', hp: '1HP', gas: 'R32', price: 5100000, origPrice: 6500000, badge: 'SALE', img: 'https://placehold.co/300x220/1e3a5f/f5c518?text=Midea+1HP' },
  { id: 'ml2', brand: 'Nagakawa', name: 'Nagakawa Inverter 1HP NIS-C09R2T62', hp: '1HP', gas: 'R32', price: 5280000, origPrice: 6800000, badge: 'SALE', img: 'https://placehold.co/300x220/1e3a5f/f5c518?text=Nagakawa+1HP' },
  { id: 'ml3', brand: 'Casper', name: 'Casper Inverter 1HP GC-09IB36', hp: '1HP', gas: 'R32', price: 6000000, origPrice: 7500000, badge: 'SALE', img: 'https://placehold.co/300x220/1e3a5f/f5c518?text=Casper+1HP' },
  { id: 'ml4', brand: 'Comfee', name: 'Comfee Inverter 1HP CFS-10VDM', hp: '1HP', gas: 'R32', price: 6490000, origPrice: 8000000, badge: 'SALE', img: 'https://placehold.co/300x220/1e3a5f/f5c518?text=Comfee+1HP' },
  { id: 'ml5', brand: 'Samsung', name: 'Samsung Inverter 1HP AR40H09D0ATNSV', hp: '1HP', gas: 'R32', price: 6490000, origPrice: 8200000, badge: 'SALE', img: 'https://placehold.co/300x220/1e3a5f/f5c518?text=Samsung+1HP' },
  { id: 'ml6', brand: 'LG', name: 'LG Inverter 1HP IFC09M1', hp: '1HP', gas: 'R32', price: 7790000, origPrice: 9500000, badge: 'SALE', img: 'https://placehold.co/300x220/1e3a5f/f5c518?text=LG+1HP' },
  { id: 'ml7', brand: 'Daikin', name: 'Daikin Inverter 1HP ATKB25YVMV', hp: '1HP', gas: 'R32', price: 9790000, origPrice: 11500000, badge: 'SALE', img: 'https://placehold.co/300x220/1e3a5f/f5c518?text=Daikin+1HP' },
  { id: 'ml8', brand: 'LG', name: 'LG Inverter 1.5HP IEC12M1', hp: '1.5HP', gas: 'R32', price: 10290000, origPrice: 12500000, badge: 'SALE', img: 'https://placehold.co/300x220/1e3a5f/f5c518?text=LG+1.5HP' },
  { id: 'ml9', brand: 'Toshiba', name: 'Toshiba Inverter 1.5HP RAS-H13Z2KCVG-V', hp: '1.5HP', gas: 'R32', price: 11590000, origPrice: 13500000, badge: 'SALE', img: 'https://placehold.co/300x220/1e3a5f/f5c518?text=Toshiba+1.5HP' },
  { id: 'ml10', brand: 'Daikin', name: 'Daikin Inverter 1.5HP ATKB35YVMV', hp: '1.5HP', gas: 'R32', price: 11790000, origPrice: 14000000, badge: 'SALE', img: 'https://placehold.co/300x220/1e3a5f/f5c518?text=Daikin+1.5HP' },
];

const MAY_GIAT = [
  { id: 'mg1', brand: 'Aqua', name: 'Máy giặt Aqua 8kg AWM8-316K(B)', kg: '8kg', type: 'Lồng đứng', price: 4190000, origPrice: 5500000, badge: 'SALE', img: 'https://placehold.co/300x220/1e3a5f/f5c518?text=Aqua+8kg' },
  { id: 'mg2', brand: 'Samsung', name: 'Máy giặt Samsung 9.5kg WA95CG4545BDSV', kg: '9.5kg', type: 'Lồng đứng', price: 5190000, origPrice: 6800000, badge: 'SALE', img: 'https://placehold.co/300x220/1e3a5f/f5c518?text=Samsung+9.5kg' },
  { id: 'mg3', brand: 'Toshiba', name: 'Toshiba Inverter 10kg TW-T21BU110UWV', kg: '10kg', type: 'Lồng đứng', price: 7690000, origPrice: 9500000, badge: 'SALE', img: 'https://placehold.co/300x220/1e3a5f/f5c518?text=Toshiba+10kg' },
  { id: 'mg4', brand: 'Electrolux', name: 'Electrolux UltimateCare 300 Inverter 10kg EWF1024D3WC', kg: '10kg', type: 'Lồng ngang', price: 8790000, origPrice: 10500000, badge: 'SALE', img: 'https://placehold.co/300x220/1e3a5f/f5c518?text=Electrolux+10kg' },
  { id: 'mg5', brand: 'Samsung', name: 'Samsung AI EcoBubble Inverter 10kg WW10DG6U34LBSV', kg: '10kg', type: 'Lồng ngang', price: 9190000, origPrice: 11000000, badge: 'SALE', img: 'https://placehold.co/300x220/1e3a5f/f5c518?text=Samsung+10kg' },
  { id: 'mg6', brand: 'Panasonic', name: 'Panasonic Inverter 10.5kg NA-FD105X3BV', kg: '10.5kg', type: 'Lồng ngang', price: 9590000, origPrice: 11500000, badge: 'SALE', img: 'https://placehold.co/300x220/1e3a5f/f5c518?text=Panasonic+10.5kg' },
  { id: 'mg7', brand: 'LG', name: 'LG AI DD Inverter 11kg FX1411N5W', kg: '11kg', type: 'Lồng ngang', price: 10990000, origPrice: 13000000, badge: 'SALE', img: 'https://placehold.co/300x220/1e3a5f/f5c518?text=LG+11kg' },
];

const HANG_THANH_LY = [
  {
    id: 'tl1',
    name: 'Máy giặt lồng đứng LG Inverter 10.5kg',
    price: 2500000,
    img: '/4%20-C%20-%20SP1%20-%20MAY%20GIAT%20THANH%20LY%2010.5KG/659191523_1961185234786362_5503233279237780445_n.jpg',
    specs: [
      'Máy hoạt động êm, ngoại hình mới 90%',
      'Siêu tiết kiệm điện',
      'Còn bảo hành 3 tháng',
      'Tặng công lắp + vận chuyển KV Ninh Kiều, Cái Răng',
    ],
  },
  {
    id: 'tl2',
    name: 'Tủ lạnh LG Inverter 187 lít – Model GN-L205S',
    price: 2800000,
    img: '/4%20-%20C-%20TU%20LANH%20THANH%20LY/668882488_1969493250622227_4110462357598820091_n.jpg',
    specs: [
      'Công nghệ biến tần Inverter – tiết kiệm điện, êm, bền',
      'Hệ thống khí lạnh đa chiều – thực phẩm tươi ngon',
      'Hệ thống cân bằng độ ẩm',
      'Sản xuất tại Indonesia',
      'Bảo hành 3 tháng',
      'Miễn phí vận chuyển KV Ninh Kiều, Cái Răng',
    ],
  },
  {
    id: 'tl3',
    name: 'Máy lạnh Toshiba nội địa Nhật 1.5HP',
    price: 7200000,
    img: '/4%20-%20C%20-%20MAY%20LANH%20TOSHIBA%201.5%20HP/581009691_1851058609132359_8425348375473776134_n.jpg',
    specs: [
      'Siêu tiết kiệm điện, chạy im, bao bền',
      'Máy hoạt động tốt',
      'Bảo hành 6 tháng',
      'Tặng 2m ống đồng, vật tư, công lắp KV Ninh Kiều, Cái Răng',
    ],
  },
];

const TABS = [
  { id: 'may-lanh', label: 'A. Máy Lạnh Chính Hãng', count: MAY_LANH.length },
  { id: 'may-giat', label: 'B. Máy Giặt Chính Hãng', count: MAY_GIAT.length },
  { id: 'thanh-ly', label: 'C. Hàng Thanh Lý', count: HANG_THANH_LY.length },
];

function ProductCard({ item, onAdd }) {
  const discount = Math.round((1 - item.price / item.origPrice) * 100);
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden group relative">
      {/* Sale badge */}
      {item.badge && (
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-red-500 text-white text-xs font-black px-2 py-1 rounded animate-pulse">
            {item.badge} -{discount}%
          </span>
        </div>
      )}
      <div className="relative overflow-hidden">
        <img src={item.img} alt={item.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={e => { e.target.src = 'https://placehold.co/300x220/1e3a5f/f5c518?text=Sản+Phẩm'; }}/>
      </div>
      <div className="p-4">
        {item.brand && <div className="text-xs text-brand-yellow font-bold mb-1 uppercase">{item.brand}</div>}
        <h3 className="font-bold text-brand-dark text-sm leading-snug mb-2 line-clamp-2 group-hover:text-brand-yellow transition-colors">{item.name}</h3>
        {(item.hp || item.kg || item.type) && (
          <div className="flex flex-wrap gap-1 mb-2">
            {item.hp && <span className="bg-blue-50 text-blue-700 text-[11px] font-semibold px-2 py-0.5 rounded">{item.hp}</span>}
            {item.kg && <span className="bg-blue-50 text-blue-700 text-[11px] font-semibold px-2 py-0.5 rounded">{item.kg}</span>}
            {item.type && <span className="bg-gray-100 text-gray-600 text-[11px] font-semibold px-2 py-0.5 rounded">{item.type}</span>}
            {item.gas && <span className="bg-green-50 text-green-700 text-[11px] font-semibold px-2 py-0.5 rounded">Gas {item.gas}</span>}
          </div>
        )}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-brand-yellow font-black text-lg">{fmt(item.price)}</span>
          {item.origPrice && <span className="text-gray-400 text-xs line-through">{fmt(item.origPrice)}</span>}
        </div>
        <div className="flex gap-2">
          <a href="tel:0911678101"
            className="flex-1 bg-brand-yellow text-brand-dark text-xs font-black py-2 rounded-lg text-center hover:bg-brand-yellow-dark transition-colors">
            📞 Đặt hàng
          </a>
          <button onClick={() => onAdd(item)}
            className="flex-1 border border-brand-yellow text-brand-yellow text-xs font-bold py-2 rounded-lg hover:bg-brand-yellow/10 transition-colors">
            Thêm giỏ
          </button>
        </div>
      </div>
    </div>
  );
}

function ThanhLyCard({ item }) {
  return (
    <div className="bg-white rounded-xl border border-green-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden group relative">
      <div className="absolute top-2 left-2 z-10">
        <span className="bg-green-600 text-white text-xs font-black px-2 py-1 rounded animate-pulse">THANH LÝ</span>
      </div>
      <div className="relative overflow-hidden">
        <img src={item.img} alt={item.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={e => { e.target.src = 'https://placehold.co/300x220/2d4a1e/86efac?text=Thanh+Lý'; }}/>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-brand-dark text-sm leading-snug mb-2 group-hover:text-green-700 transition-colors">{item.name}</h3>
        <div className="text-green-700 font-black text-lg mb-2">{fmt(item.price)}</div>
        <ul className="space-y-1 mb-3">
          {item.specs.map(s => (
            <li key={s} className="flex items-start gap-1.5 text-xs text-gray-600">
              <span className="text-green-500 flex-shrink-0 font-bold">✓</span>{s}
            </li>
          ))}
        </ul>
        <a href="tel:0911678101"
          className="block w-full bg-green-600 text-white text-xs font-black py-2 rounded-lg text-center hover:bg-green-700 transition-colors">
          📞 Liên hệ ngay: 0911.678.101
        </a>
      </div>
    </div>
  );
}

export default function Products() {
  const [tab, setTab] = useState('may-lanh');
  const { addItem } = useCart();

  const handleAdd = (item) => {
    addItem({ id: item.id, name: item.name, price: item.price, image: item.img });
  };

  return (
    <div>
      {/* Page header */}
      <div className="relative bg-brand-dark py-10 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/BAN%20MAY%20LANH/583330855_1497007995228509_8875763659547529535_n.jpg" alt=""
            className="w-full h-full object-cover opacity-20"
            onError={e => { e.target.style.display = 'none'; }}/>
        </div>
        <div className="relative max-w-7xl mx-auto">
          <h1 className="text-2xl font-black text-white mb-1">Sản Phẩm Điện Lạnh</h1>
          <p className="text-gray-400 text-sm mb-2">Máy lạnh, máy giặt chính hãng – hàng mới + hàng thanh lý giá tốt</p>
          <nav className="text-xs text-gray-500 flex items-center gap-2">
            <Link to="/" className="hover:text-brand-yellow">Trang chủ</Link>
            <span>›</span>
            <span className="text-gray-300">Sản phẩm</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                tab === t.id
                  ? 'bg-brand-dark text-brand-yellow shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t.label}
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${tab === t.id ? 'bg-brand-yellow text-brand-dark' : 'bg-gray-200 text-gray-500'}`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab: Máy lạnh */}
        {tab === 'may-lanh' && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="section-heading">Máy Lạnh Chính Hãng</h2>
              <span className="bg-red-500 text-white text-xs font-black px-2 py-1 rounded animate-pulse">ĐANG SALE</span>
            </div>
            <p className="text-gray-500 text-sm mb-6">Kinh doanh các dòng điện máy phổ biến hiện nay: máy lạnh/điều hòa, tủ lạnh, máy giặt, camera, máy nước nóng,... Hàng mới, thanh lý hoặc hàng trưng bày, giá rẻ, chất lượng.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {MAY_LANH.map(p => <ProductCard key={p.id} item={p} onAdd={handleAdd} />)}
            </div>
          </div>
        )}

        {/* Tab: Máy giặt */}
        {tab === 'may-giat' && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="section-heading">Máy Giặt Chính Hãng</h2>
              <span className="bg-red-500 text-white text-xs font-black px-2 py-1 rounded animate-pulse">ĐANG SALE</span>
            </div>
            <p className="text-gray-500 text-sm mb-6">Máy giặt lồng đứng và lồng ngang các thương hiệu hàng đầu: Aqua, Samsung, Toshiba, Electrolux, Panasonic, LG. Hàng chính hãng, bảo hành đầy đủ.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {MAY_GIAT.map(p => <ProductCard key={p.id} item={p} onAdd={handleAdd} />)}
            </div>
          </div>
        )}

        {/* Tab: Hàng thanh lý */}
        {tab === 'thanh-ly' && (
          <div>
            <h2 className="section-heading mb-2">Hàng Thanh Lý</h2>
            <p className="text-gray-500 text-sm mb-6">Máy lạnh, tủ lạnh, máy giặt cũ còn hoạt động tốt – giá cực rẻ. Liên hệ ngay để được tư vấn và xem hàng trực tiếp.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {HANG_THANH_LY.map(p => <ThanhLyCard key={p.id} item={p} />)}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-brand-dark rounded-2xl p-8 text-center">
          <h2 className="text-xl font-black text-white mb-2">Cần tư vấn sản phẩm?</h2>
          <p className="text-gray-400 text-sm mb-5">Gọi ngay để được báo giá tốt nhất, giao hàng nhanh tại Cần Thơ</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:0911678101" className="btn-yellow px-7 py-3">📞 0911.678.101</a>
            <a href="tel:0366755156" className="btn-outline-white px-7 py-3">📞 0366.755.156</a>
          </div>
        </div>
      </div>
    </div>
  );
}
