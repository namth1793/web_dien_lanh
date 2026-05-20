import { useState } from 'react';
import { Link } from 'react-router-dom';

const STATS = [
  { num: '6+', label: 'Năm kinh nghiệm', sub: '2019 – nay' },
  { num: '5.000+', label: 'Khách hàng', sub: 'Cần Thơ & miền Tây' },
  { num: '486', label: 'Đánh giá 5 sao', sub: 'Google Reviews' },
  { num: '24/7', label: 'Hỗ trợ', sub: 'Phục vụ mọi lúc' },
];

const VALUES = [
  { icon: '🎯', title: 'Trung thực', desc: 'Minh bạch trong từng báo giá, không phát sinh chi phí ngoài thỏa thuận.' },
  { icon: '⚙️', title: 'Chuyên nghiệp', desc: 'Kỹ thuật viên được đào tạo bài bản, giàu kinh nghiệm thực tế.' },
  { icon: '🤝', title: 'Tận tâm', desc: 'Phục vụ hết lòng, hỗ trợ kỹ thuật miễn phí trong thời gian bảo hành.' },
  { icon: '🛡️', title: 'Uy tín', desc: 'Bảo hành đúng hạn, xử lý sự cố nhanh chóng sau 20–60 phút.' },
];

const SERVICES_LIST = [
  'Sửa chữa máy lạnh tại Cần Thơ',
  'Bảo trì, vệ sinh máy lạnh định kỳ',
  'Sửa chữa máy giặt, tủ lạnh, thiết bị điện máy',
  'Lắp đặt hệ thống điều hòa không khí',
  'Tháo lắp máy lạnh tại Cần Thơ',
];

const PROJECT_AREAS = [
  { icon: '🏠', label: 'Hộ gia đình', desc: 'Từ phòng trọ, căn hộ đến biệt thự – lắp đặt, sửa chữa, bảo trì máy lạnh tại nhà.', img: '/Feature%20Project/489377280_1303814041214573_9064913014035289146_n.jpg' },
  { icon: '🏢', label: 'Văn phòng & Công ty', desc: 'Lắp đặt, bảo trì hệ thống điện lạnh cho văn phòng, tòa nhà thương mại.', img: '/Feature%20Project/490515566_1307240420871935_3059378839953594592_n.jpg' },
  { icon: '🏪', label: 'Cửa hàng & Spa', desc: 'Đảm bảo thiết bị điện lạnh hoạt động liên tục, phục vụ khách hàng tốt nhất.', img: '/Feature%20Project/495111886_1325245502404760_6805216453220242613_n.jpg' },
  { icon: '🏫', label: 'Trường học', desc: 'Bảo trì định kỳ, sửa chữa hệ thống điều hòa cho trường mầm non đến đại học.', img: '/Feature%20Project/dai-hoc-can-tho-1740299150370911412765.jpg' },
  { icon: '🏗️', label: 'Nhà xưởng', desc: 'Hệ thống làm mát công nghiệp, điều hòa trung tâm cho nhà máy, xưởng sản xuất.', img: '/Feature%20Project/519877997_1387994512796525_5922194540796158334_n.jpg' },
  { icon: '🛏️', label: 'Nhà trọ & Sinh viên', desc: 'Giá ưu đãi, hỗ trợ nhanh cho phòng trọ, ký túc xá tại Cần Thơ.', img: '/Feature%20Project/532355892_1411404527122190_5994366527117553497_n.jpg' },
];

export default function About() {
  const [modal, setModal] = useState(null);

  return (
    <div>
      {/* Page header */}
      <div className="bg-brand-dark py-14 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">GIỚI THIỆU</h1>
          <div className="w-14 h-1 bg-brand-yellow rounded mx-auto mb-4"/>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Điện lạnh Cần Thơ – Duy Khánh | CÔNG TY TNHH TM DV SOLAR BASE
          </p>
          <nav className="text-xs text-gray-500 mt-4 flex items-center justify-center gap-2">
            <Link to="/" className="hover:text-brand-yellow">Trang chủ</Link>
            <span>›</span>
            <span className="text-gray-300">Giới thiệu</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-14">

        {/* About main */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="section-heading">Về Điện Lạnh Duy Khánh</h2>
            <div className="section-line mb-6"/>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                <strong className="text-brand-dark">Điện lạnh Cần Thơ – Duy Khánh</strong> là tiền thân của <strong className="text-brand-dark">CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ SOLAR BASE</strong>, đơn vị chuyên cung cấp thiết bị điện lạnh, điện máy và dịch vụ sửa chữa – lắp đặt – bảo trì điện lạnh uy tín tại Cần Thơ và khu vực miền Tây.
              </p>
              <p>
                Với hơn <strong className="text-brand-dark">6 năm kinh nghiệm</strong> trong ngành điện lạnh, chúng tôi đã phục vụ hàng ngàn khách hàng từ hộ gia đình đến doanh nghiệp. Duy Khánh luôn đặt mục tiêu hàng đầu là chất lượng dịch vụ và sự hài lòng của khách hàng, không ngừng cải thiện để mang đến trải nghiệm tốt nhất.
              </p>
              <p>
                Sở hữu đội ngũ kỹ thuật viên cơ điện lạnh giàu kinh nghiệm, được đào tạo bài bản và kỹ năng giao tiếp ứng xử với khách hàng. Điện Lạnh Cần Thơ – Duy Khánh tự hào sở hữu đội ngũ nhân viên chuyên nghiệp, nhiệt tình và luôn sẵn sàng hỗ trợ khách hàng một cách tốt nhất.
              </p>
              <p>
                Chúng tôi hiểu rằng máy lạnh và các thiết bị điện lạnh, điện máy đóng vai trò quan trọng trong sinh hoạt và công việc hằng ngày. Vì vậy, Điện lạnh Duy Khánh luôn ưu tiên xử lý sự cố nhanh chóng, đảm bảo kỹ thuật chính xác – an toàn, sử dụng thiết bị và công nghệ hiện đại và làm việc với tinh thần trách nhiệm – chuyên nghiệp – tận tâm.
              </p>
              <p>
                Chúng tôi cam kết cung cấp các thiết bị điện lạnh, điện máy chính hãng và các giải pháp sửa chữa – bảo trì – lắp đặt điện lạnh tối ưu cho mọi nhu cầu:
              </p>
              <ul className="space-y-1 pl-2">
                {SERVICES_LIST.map(s => (
                  <li key={s} className="flex items-start gap-2">
                    <span className="text-brand-yellow font-bold flex-shrink-0">✓</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-5">
            {/* Mission */}
            <div className="bg-brand-yellow/10 border border-brand-yellow/30 rounded-xl p-5">
              <h3 className="font-bold text-brand-dark mb-2 flex items-center gap-2">
                <span className="text-2xl">🎯</span> Sứ mệnh
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Điện lạnh Cần Thơ – Duy Khánh luôn đề cao việc xây dựng mối quan hệ gắn bó với khách hàng và quý đối tác, luôn nỗ lực cải thiện chất lượng dịch vụ, trải nghiệm khách hàng mỗi ngày để mang đến sự hài lòng cho quý khách hàng.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <h3 className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                <span className="text-2xl">🔭</span> Cam kết
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Duy Khánh cam kết cung cấp dịch vụ tư vấn và hỗ trợ khách hàng tận tâm, tận tình, chu đáo, sẵn sàng đồng hành cùng quý khách hàng trong suốt quá trình lựa chọn thiết bị và sử dụng dịch vụ.
              </p>
            </div>
            {/* Company info */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
              <h3 className="font-bold text-brand-dark mb-3 border-b pb-2">Thông tin công ty</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex gap-2"><span className="font-semibold text-brand-dark w-24 flex-shrink-0">Công ty:</span><span>TNHH TM DV SOLAR BASE</span></div>
                <div className="flex gap-2"><span className="font-semibold text-brand-dark w-24 flex-shrink-0">MST:</span><span>1801827040</span></div>
                <div className="flex gap-2"><span className="font-semibold text-brand-dark w-24 flex-shrink-0">Địa chỉ:</span><span>Số 377 KDC Tân Phú, P.Hưng Phú, TP Cần Thơ</span></div>
                <div className="flex gap-2"><span className="font-semibold text-brand-dark w-24 flex-shrink-0">Hotline:</span>
                  <span>
                    <a href="tel:0911678101" className="text-brand-yellow font-bold hover:underline">0911.678.101</a>
                    {' – '}
                    <a href="tel:0366755156" className="text-brand-yellow font-bold hover:underline">0366.755.156</a>
                  </span>
                </div>
                <div className="flex gap-2"><span className="font-semibold text-brand-dark w-24 flex-shrink-0">Fanpage:</span>
                  <a href="https://www.facebook.com/dienlanhcantho65" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">fb.com/dienlanhcantho65</a>
                </div>
                <div className="flex gap-2"><span className="font-semibold text-brand-dark w-24 flex-shrink-0">TikTok:</span>
                  <a href="https://www.tiktok.com/@dienlanh_cantho" target="_blank" rel="noreferrer" className="text-gray-800 hover:underline flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>
                    @dienlanh_cantho
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-brand-dark rounded-2xl p-8">
          <h2 className="text-xl font-black text-white text-center mb-8">Điện Lạnh Duy Khánh – Con Số Ấn Tượng</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {STATS.map(s => (
              <div key={s.label} className="bg-white/10 rounded-xl p-5">
                <div className="text-3xl font-black text-brand-yellow">{s.num}</div>
                <div className="text-white font-semibold mt-1 text-sm">{s.label}</div>
                <div className="text-gray-400 text-xs mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Core values */}
        <div>
          <h2 className="section-heading text-center">Giá Trị Cốt Lõi</h2>
          <div className="section-line mx-auto mb-8"/>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {VALUES.map(v => (
              <div key={v.title} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-brand-dark rounded-full flex items-center justify-center text-2xl mx-auto mb-3">{v.icon}</div>
                <h3 className="font-black text-brand-dark mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Projects highlight */}
        <div>
          <h2 className="section-heading text-center">Dự Án Nổi Bật – Khách Hàng Của Chúng Tôi</h2>
          <div className="section-line mx-auto mb-4"/>
          <p className="text-center text-gray-500 text-sm mb-8 max-w-3xl mx-auto">
            Khách hàng của Điện lạnh Cần Thơ – Duy Khánh là quý công ty, cơ quan, văn phòng, cửa hàng, nhà trọ, trường học, hộ gia đình và sinh viên trên địa bàn TP. Cần Thơ và các tỉnh miền Tây: <strong>An Giang, Vĩnh Long, Sóc Trăng, Hậu Giang,...</strong>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {PROJECT_AREAS.map(a => (
              <button key={a.label} onClick={() => setModal(a)}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:border-brand-yellow hover:shadow-md transition-all text-left group cursor-pointer">
                <div className="relative h-28 overflow-hidden">
                  <img src={a.img} alt={a.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={e => { e.target.src = `https://placehold.co/300x180/0d1b35/f5c518?text=${encodeURIComponent(a.label)}`; }}/>
                  <div className="absolute inset-0 bg-brand-dark/40 group-hover:bg-brand-dark/20 transition-colors"/>
                  <span className="absolute top-2 left-2 text-2xl drop-shadow">{a.icon}</span>
                </div>
                <div className="p-3 text-center">
                  <div className="font-bold text-brand-dark text-xs mb-0.5 group-hover:text-brand-yellow transition-colors">{a.label}</div>
                  <div className="text-gray-400 text-[10px] leading-tight hidden sm:block">{a.desc.split('–')[0]}</div>
                </div>
              </button>
            ))}
          </div>

          {modal && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" onClick={() => setModal(null)}>
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"/>
              <div className="relative bg-white rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
                <img src={modal.img} alt={modal.label} className="w-full h-56 object-cover"
                  onError={e => { e.target.src = `https://placehold.co/700x450/0d1b35/f5c518?text=${encodeURIComponent(modal.label)}`; }}/>
                <div className="absolute top-3 right-3">
                  <button onClick={() => setModal(null)} className="bg-white/90 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-gray-700 shadow">✕</button>
                </div>
                <div className="p-6">
                  <div className="text-3xl mb-2">{modal.icon}</div>
                  <h3 className="font-black text-brand-dark text-xl mb-2">{modal.label}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{modal.desc}</p>
                  <a href="tel:0911678101" className="mt-4 inline-flex items-center gap-2 bg-brand-yellow text-brand-dark font-bold px-5 py-2.5 rounded-lg hover:bg-brand-yellow-dark transition-colors text-sm">
                    📞 Liên hệ ngay
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-brand-dark rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-black text-white mb-2">Hãy Để Điện Lạnh Duy Khánh Phục Vụ Bạn!</h2>
          <p className="text-gray-400 text-sm mb-6">
            Mang đến không gian mát mẻ – thoải mái – tiện nghi, cùng dịch vụ điện lạnh uy tín, chuyên nghiệp hàng đầu tại Cần Thơ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0911678101" className="btn-yellow px-8 py-3.5 text-base">
              📞 Gọi ngay: 0911.678.101
            </a>
            <Link to="/lien-he" className="btn-outline-white px-8 py-3.5 text-base">
              Gửi yêu cầu tư vấn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
