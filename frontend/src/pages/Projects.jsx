import { Link } from 'react-router-dom';

const projects = [
  { title: 'Hệ thống điều hòa Tòa nhà văn phòng Bitexco', location: 'Quận 1, TP.HCM', type: 'Máy lạnh thương mại', brand: 'Daikin VRV', qty: '120 cụm', image: 'https://placehold.co/600x400/0d1b35/f5c518?text=Bitexco+Office' },
  { title: 'Lắp đặt máy lạnh Khách sạn Vinpearl', location: 'Quận 5, TP.HCM', type: 'Âm trần + Treo tường', brand: 'Carrier + Panasonic', qty: '85 phòng', image: 'https://placehold.co/600x400/162040/f5c518?text=Vinpearl+Hotel' },
  { title: 'Hệ thống điều hòa Trường ĐH Bách Khoa', location: 'Quận 10, TP.HCM', type: 'Multi-system', brand: 'Mitsubishi Electric', qty: '200 phòng', image: 'https://placehold.co/600x400/1e2d50/f5c518?text=BachKhoa+University' },
  { title: 'Nhà máy sản xuất Samsung Vietnam', location: 'Bình Dương', type: 'Công nghiệp', brand: 'Daikin + Toshiba', qty: '50 ton', image: 'https://placehold.co/600x400/0d1b35/f5c518?text=Samsung+Factory' },
  { title: 'Hệ thống điều hòa Siêu thị Co.opmart', location: 'Bình Thạnh, TP.HCM', type: 'Thương mại', brand: 'Carrier VRF', qty: '300 m²', image: 'https://placehold.co/600x400/162040/f5c518?text=CoopMart' },
  { title: 'Chung cư cao cấp The Sun Avenue', location: 'Quận 2, TP.HCM', type: 'Dân dụng cao cấp', brand: 'Panasonic + Daikin', qty: '500 căn hộ', image: 'https://placehold.co/600x400/1e2d50/f5c518?text=Sun+Avenue' },
];

export default function Projects() {
  return (
    <div>
      {/* Page header */}
      <div className="bg-brand-dark py-14 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">CÔNG TRÌNH TIÊU BIỂU</h1>
          <div className="w-14 h-1 bg-brand-yellow rounded mx-auto mb-4"/>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Hơn 100.000 công trình lắp đặt thành công tại TP.HCM và các tỉnh lân cận. Phục vụ cả dân dụng, thương mại và công nghiệp.
          </p>
          <nav className="text-xs text-gray-500 mt-4 flex items-center justify-center gap-2">
            <Link to="/" className="hover:text-brand-yellow">Trang chủ</Link>
            <span>›</span>
            <span className="text-gray-300">Công trình tiêu biểu</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {projects.map(p => (
            <div key={p.title} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
              <div className="overflow-hidden">
                <img src={p.image} alt={p.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={e => { e.target.src = 'https://placehold.co/600x400/0d1b35/f5c518?text=Công+Trình'; }}/>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-brand-dark mb-3 line-clamp-2">{p.title}</h3>
                <div className="space-y-1.5 text-sm text-gray-500">
                  <div className="flex items-center gap-2"><span className="text-brand-yellow">📍</span>{p.location}</div>
                  <div className="flex items-center gap-2"><span className="text-brand-yellow">🏷️</span>{p.type}</div>
                  <div className="flex items-center gap-2"><span className="text-brand-yellow">⚙️</span>{p.brand}</div>
                  <div className="flex items-center gap-2"><span className="text-brand-yellow">📊</span>{p.qty}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-brand-dark rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-black text-white mb-2">Dự án của bạn sẽ là công trình tiếp theo!</h2>
          <p className="text-gray-400 text-sm mb-6">Liên hệ với chúng tôi để được tư vấn giải pháp điều hòa phù hợp nhất</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0934499499" className="btn-yellow px-8 py-3.5 text-base">
              📞 Kinh doanh: 0934 499 499
            </a>
            <Link to="/lien-he" className="btn-outline-white px-8 py-3.5 text-base">
              Yêu cầu báo giá
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
