import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SERVICES = [
  { icon: '❄️', title: 'Sửa chữa máy lạnh', desc: 'Sửa mọi sự cố: không lạnh, chảy nước, hỏng block, thiếu gas, lỗi bo mạch. Kỹ thuật viên đến tận nhà.', img: '/SUA%20CHUA%20MAY%20LANH/487396338_1294721982123779_1821340800911696131_n.jpg' },
  { icon: '🧹', title: 'Vệ sinh máy lạnh', desc: 'Vệ sinh dàn lạnh, dàn nóng chuyên sâu – diệt khuẩn, khử mùi – máy mát hơn, tiết kiệm điện.', img: '/VE%20SINH%20MAY%20LANH/487302961_1293768195552491_2989817229053310482_n.jpg' },
  { icon: '🔧', title: 'Tháo lắp máy lạnh', desc: 'Tháo lắp, di dời máy lạnh đúng kỹ thuật. Tặng vật tư + công lắp khu vực Ninh Kiều, Cái Răng.', img: '/LAP%20DAT%20MAY%20LANH/505444647_1353418382920805_6546992740157024720_n.jpg' },
  { icon: '🫧', title: 'Sửa chữa máy giặt', desc: 'Khắc phục: không quay, không vắt, rò nước, lỗi board mạch – tất cả các thương hiệu tại nhà.', img: '/SUA%20CHUA%20MAY%20GIAT/594955796_1511027010493274_5059038851730414396_n.jpg' },
  { icon: '🧊', title: 'Sửa chữa tủ lạnh', desc: 'Sửa tủ lạnh không lạnh, đóng tuyết, rò điện, hỏng block, nạp gas – nhanh chóng, uy tín.', img: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500&h=280&fit=crop' },
  { icon: '🏠', title: 'Vệ sinh máy giặt', desc: 'Tháo lồng giặt vệ sinh sâu, loại bỏ cặn bẩn, mùi hôi – quần áo sạch thơm như mới.', img: '/VE%20SINH%20MAY%20GIAT/571272130_1246645977483919_78131708542412010_n.jpg' },
];

const WHYS = [
  { icon: '🏆', title: 'Uy tín 6+ năm', desc: 'Hơn 6 năm kinh nghiệm, phục vụ hàng nghìn khách hàng tại Cần Thơ và miền Tây.' },
  { icon: '👷', title: 'Thợ lành nghề', desc: 'Kỹ thuật viên cơ điện lạnh được đào tạo bài bản, kỹ năng giao tiếp tốt, nhiệt tình.' },
  { icon: '💰', title: 'Giá cả minh bạch', desc: 'Báo giá trước khi làm, không phát sinh chi phí, không thu thêm sau khi xong.' },
  { icon: '🛡️', title: 'Bảo hành rõ ràng', desc: 'Bảo hành dịch vụ 1–6 tháng. Linh kiện chính hãng, có hoá đơn chứng từ.' },
  { icon: '⚡', title: 'Phản hồi nhanh', desc: 'Tiếp nhận 24/7, kỹ thuật viên có mặt sau 20–60 phút tại khu vực Cần Thơ.' },
];

const STEPS = [
  { n: '01', title: 'Tiếp nhận', desc: 'Khách hàng gọi hotline hoặc Zalo – tiếp nhận ngay lập tức.' },
  { n: '02', title: 'Báo giá', desc: 'KTV liên hệ tư vấn, gửi báo giá minh bạch trước khi thi công.' },
  { n: '03', title: 'Thực hiện', desc: 'KTV đến đúng giờ, mang thiết bị chuyên dụng, thi công chuyên nghiệp.' },
  { n: '04', title: 'Nghiệm thu', desc: 'Kiểm tra kỹ thuật cùng khách hàng, đảm bảo máy hoạt động tốt.' },
  { n: '05', title: 'Bảo hành', desc: 'Cấp phiếu bảo hành, hỗ trợ miễn phí trong thời gian bảo hành.' },
];

const REVIEWS = [
  {
    name: 'Chủ cửa hàng Spa Myhang',
    loc: 'Cần Thơ',
    text: 'Các bạn làm việc rất chuyên nghiệp, nhanh chóng và tận tình, sửa chữa với giá cả hợp lý. Nhờ vậy, máy lạnh và các thiết bị điện lạnh tại spa luôn hoạt động tốt, tiết kiệm được nhiều thời gian và chi phí. Tôi hoàn toàn yên tâm khi giao phó mọi vấn đề điện lạnh cho Duy Khánh và chắc chắn sẽ tiếp tục đồng hành lâu dài!',
    stars: 5,
  },
  {
    name: 'Anh Toàn và chị Trang',
    loc: 'Cần Thơ',
    text: 'Nhân viên đến làm việc sạch sẽ, cẩn thận. Sau khi vệ sinh, máy lạnh mát hơn hẳn và máy giặt cũng hoạt động êm ái, sạch sẽ như mới. Giá cả hợp lý, lại còn được tư vấn cách sử dụng để thiết bị bền lâu. Tôi đánh giá cao sự tận tâm và uy tín của bạn Khánh, chắc chắn sẽ tiếp tục ủng hộ và giới thiệu cho người thân, bạn bè!',
    stars: 5,
  },
  {
    name: 'Chị Huyền',
    loc: 'Cần Thơ',
    text: 'Mình có mua máy lạnh bên này, máy mới chính hãng. Không ngờ giao hàng nhanh vậy, giá khá rẻ, bạn kỹ thuật nhiệt tình, nhiều chế độ ưu đãi. Nói chung khá ưng.',
    stars: 5,
  },
];

const PRICING_PREVIEW = [
  { service: 'Vệ sinh máy lạnh 1HP', price: '180.000đ' },
  { service: 'Vệ sinh máy lạnh 1.5HP', price: '200.000đ' },
  { service: 'Vệ sinh máy lạnh âm trần', price: '400.000đ' },
  { service: 'Tháo lắp máy lạnh 1HP', price: '500.000đ' },
  { service: 'Vệ sinh máy giặt lồng đứng (<8kg)', price: '250.000đ' },
  { service: 'Vệ sinh máy giặt lồng đứng (>8kg)', price: '300.000đ' },
  { service: 'Vệ sinh máy giặt lồng ngang (<8kg)', price: '400.000đ' },
  { service: 'Tháo máy giặt', price: '100.000đ' },
];

const BRANDS = [
  { name: 'Daikin',     img: '/doi_tac/Screenshot 2026-05-13 192915.png',  bg: 'white' },
  { name: 'Panasonic',  img: '/doi_tac/Panasonic_logo_PNG1.png',            bg: 'white' },
  { name: 'LG',         img: '/doi_tac/LG_logo_(2014).svg.png',             bg: 'white' },
  { name: 'Samsung',    img: '/doi_tac/Samsung_Orig_Wordmark_BLUE_RGB.jpg', bg: 'white' },
  { name: 'Toshiba',    img: '/doi_tac/Toshiba_logo_PNG_(2).png',           bg: 'white' },
  { name: 'Electrolux', img: '/doi_tac/Screenshot 2026-05-13 193632.png',   bg: 'white' },
  { name: 'Aqua',       img: '/doi_tac/Screenshot 2026-05-13 193858.png',   bg: 'white' },
  { name: 'Sharp',      img: '/doi_tac/Sharp_logo_PNG1.png',                bg: 'white' },
  { name: 'Midea',      img: '/doi_tac/Midea_Group-Logo.wine.png',          bg: 'white' },
  { name: 'Casper',     img: '/doi_tac/Screenshot 2026-05-13 194304.png',   bg: '#1fa3a8' },
];

export default function Home() {
  const [news, setNews] = useState([]);
  const [reviewIdx, setReviewIdx] = useState(0);

  useEffect(() => {
    axios.get('/api/news?limit=3').then(r => setNews(r.data)).catch(() => {});
  }, []);

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden" style={{ minHeight: 520 }}>
        {/* Banner background */}
        <div className="absolute inset-0"
          style={{ backgroundImage: "url('/banner.png')", backgroundSize: 'cover', backgroundPosition: 'center top' }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-brand-navy/75" />
        <div className="relative max-w-7xl mx-auto px-4 py-10 md:py-16 lg:py-24 flex items-center">
          <div className="w-full lg:w-1/2">
            <span className="inline-flex items-center gap-2 bg-brand-yellow/20 border border-brand-yellow/40 text-brand-yellow text-xs font-bold px-3 py-1.5 rounded-full mb-5">
              <span className="w-2 h-2 bg-brand-yellow rounded-full animate-pulse"/>
              ✅ Dịch vụ điện lạnh uy tín tại Cần Thơ
            </span>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-brand-yellow" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="text-brand-yellow text-sm font-bold">5,0 (486 đánh giá)</span>
            </div>
            <h1 className="font-hero font-extrabold text-white leading-[1.05] mb-4 uppercase tracking-wide text-[2.6rem] sm:text-5xl lg:text-[3.5rem]">
              ĐA DẠNG<br/>
              DỊCH VỤ<br/>
              ĐIỆN LẠNH TẠI{' '}
              <span className="text-brand-yellow">CẦN THƠ</span>
            </h1>
            <ul className="space-y-2 mb-8 text-gray-300 text-sm">
              {[
                '✔ Bán – sửa chữa – bảo trì – lắp đặt máy lạnh, máy giặt tận nhà',
                '✔ Kỹ thuật viên cơ điện lạnh giàu kinh nghiệm, tận tâm',
                '✔ Giá hợp lý – minh bạch – bảo hành rõ ràng',
              ].map(t => <li key={t}>{t}</li>)}
            </ul>
            <div className="flex flex-wrap gap-3">
              <a href="tel:0911678101" className="btn-yellow text-base px-7 py-3.5 shadow-lg shadow-brand-yellow/20">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                GỌI NGAY · 0911.678.101
              </a>
              <Link to="/dich-vu" className="btn-outline-white text-base px-7 py-3.5">
                XEM DỊCH VỤ
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex w-1/2 justify-end pl-10">
            <div className="relative w-full max-w-md">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-brand-yellow/30 shadow-2xl">
                <img
                  src="/banner%20hero/674856834_1625489449047029_1617532125787296419_n.jpg"
                  alt="Điện Lạnh Duy Khánh"
                  className="w-full h-full object-cover"
                  onError={e => { e.target.src = 'https://placehold.co/400x300/1e2d50/f5c518?text=Điện+Lạnh+Duy+Khánh'; }}
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-brand-yellow text-brand-dark font-black px-4 py-2 rounded-xl shadow-xl text-sm">
                🛡️ Bảo hành 1–6 tháng
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '📅', num: '6+', label: 'Năm kinh nghiệm' },
              { icon: '👥', num: '5.000+', label: 'Khách hàng tin tưởng' },
              { icon: '⏱️', num: '20-60 phút', label: 'Thời gian có mặt' },
              { icon: '✅', num: '100%', label: 'Linh kiện chính hãng' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <div className="text-brand-yellow font-black text-xl leading-none">{s.num}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-heading">Dịch Vụ Của Chúng Tôi</h2>
            <div className="section-line mx-auto"/>
            <p className="section-sub">Đội ngũ kỹ thuật viên chuyên nghiệp, phục vụ tận nơi, đúng giờ tại Cần Thơ</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(s => (
              <Link to="/dich-vu" key={s.title}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-gray-100 group overflow-hidden flex flex-col">
                <div className="relative h-44 overflow-hidden flex-shrink-0">
                  <img src={s.img} alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={e => { e.target.src = 'https://placehold.co/500x280/0d1b35/f5c518?text=Dịch+Vụ'; }}/>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent"/>
                  <span className="absolute bottom-2.5 left-3 text-2xl drop-shadow-lg">{s.icon}</span>
                </div>
                <div className="p-5 flex-1">
                  <h3 className="font-bold text-brand-dark mb-1.5 group-hover:text-brand-yellow transition-colors">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/dich-vu" className="btn-yellow">Xem tất cả dịch vụ →</Link>
          </div>
        </div>
      </section>

      {/* ===== PRICING TABLE PREVIEW ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-heading">Bảng Giá Dịch Vụ Cơ Bản</h2>
            <div className="section-line mx-auto"/>
            <p className="section-sub">Giá niêm yết rõ ràng – không phát sinh – bảo hành theo dịch vụ</p>
          </div>
          <div className="max-w-2xl mx-auto overflow-x-auto rounded-xl shadow-sm border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-dark text-white">
                  <th className="px-5 py-3.5 text-left font-bold">Dịch vụ</th>
                  <th className="px-5 py-3.5 text-right font-bold">Đơn giá</th>
                </tr>
              </thead>
              <tbody>
                {PRICING_PREVIEW.map((row, i) => (
                  <tr key={row.service} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-5 py-3 font-medium text-gray-800">{row.service}</td>
                    <td className="px-5 py-3 text-right text-brand-yellow font-bold">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            ⚠️ Giá có thể thay đổi tùy loại máy và vị trí lắp đặt. Liên hệ để nhận báo giá chính xác.
          </p>
          <div className="text-center mt-4">
            <a href="tel:0911678101" className="btn-yellow">📞 Gọi báo giá: 0911.678.101</a>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-16 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wide">Vì Sao Chọn Duy Khánh?</h2>
            <div className="w-14 h-1 bg-brand-yellow rounded-full mt-3 mb-2 mx-auto"/>
            <p className="text-gray-400 text-sm">Cam kết mang lại trải nghiệm dịch vụ tốt nhất cho khách hàng tại Cần Thơ</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {WHYS.map(w => (
              <div key={w.title}
                className="bg-brand-dark-2 border border-brand-dark-3 rounded-xl p-5 text-center hover:border-brand-yellow/50 transition-colors group">
                <div className="w-14 h-14 bg-brand-yellow/10 rounded-full flex items-center justify-center text-3xl mx-auto mb-3 group-hover:bg-brand-yellow/20 transition-colors">
                  {w.icon}
                </div>
                <h3 className="font-bold text-white text-sm mb-2">{w.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-heading">Quy Trình Làm Việc</h2>
            <div className="section-line mx-auto"/>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-brand-yellow/30"/>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {STEPS.map((s) => (
                <div key={s.n} className="relative flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center font-black text-xl mb-4 border-4 z-10 relative bg-brand-yellow border-brand-yellow text-brand-dark shadow-lg shadow-brand-yellow/30">
                    {s.n}
                  </div>
                  <h3 className="font-bold text-brand-dark mb-2 text-sm">{s.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-heading">Khách Hàng Nói Gì Về Chúng Tôi?</h2>
            <div className="section-line mx-auto"/>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-brand-yellow" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="font-bold text-gray-700">5,0 ⭐ (486 đánh giá)</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {REVIEWS.map((r, i) => (
              <div key={r.name}
                className={`rounded-xl p-6 border-2 transition-all duration-300 cursor-pointer ${i === reviewIdx ? 'border-brand-yellow bg-brand-yellow/5 shadow-lg' : 'border-gray-100 bg-gray-50'}`}
                onClick={() => setReviewIdx(i)}>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(r.stars)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-brand-yellow" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic leading-relaxed mb-4">"{r.text}"</p>
                <div>
                  <div className="font-bold text-brand-dark text-sm">{r.name}</div>
                  <div className="text-gray-400 text-xs">{r.loc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2">
            {REVIEWS.map((_, i) => (
              <button key={i} onClick={() => setReviewIdx(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === reviewIdx ? 'bg-brand-yellow' : 'bg-gray-200'}`}/>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BRANDS ===== */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-center font-bold text-gray-500 uppercase text-xs tracking-widest mb-8">
            THƯƠNG HIỆU CHÚNG TÔI PHÂN PHỐI &amp; SỬA CHỮA
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {BRANDS.map(b => (
              <Link key={b.name} to={`/san-pham?brand=${encodeURIComponent(b.name)}`}
                className="group border border-gray-200 hover:border-brand-yellow hover:shadow-md transition-all rounded-xl overflow-hidden"
                style={{ backgroundColor: b.bg }}>
                <div className="w-36 h-20 flex items-center justify-center p-3">
                  <img
                    src={b.img}
                    alt={b.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-200"
                    title={b.name}
                    onError={e => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = `<span class="text-sm font-bold text-gray-600">${b.name}</span>`; }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWS ===== */}
      {news.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="section-heading">Tin Tức &amp; Kinh Nghiệm</h2>
                <div className="section-line mb-0"/>
              </div>
              <Link to="/tin-tuc" className="text-sm text-brand-yellow font-semibold hover:underline">Xem tất cả →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {news.map(n => (
                <Link key={n.id} to={`/tin-tuc/${n.slug}`}
                  className="rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                  <img src={n.image} alt={n.title}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={e => { e.target.src = 'https://placehold.co/600x350/0d1b35/f5c518?text=Tin+Tức'; }}/>
                  <div className="p-4">
                    <div className="text-xs text-gray-400 mb-1.5">{new Date(n.created_at).toLocaleDateString('vi-VN')}</div>
                    <h3 className="font-bold text-brand-dark line-clamp-2 group-hover:text-brand-yellow transition-colors text-sm">{n.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA ===== */}
      <section className="py-16 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #f5c518 0%, transparent 60%)' }}/>
        <div className="relative max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">CẦN HỖ TRỢ NGAY?</h2>
            <h3 className="text-xl font-bold text-brand-yellow mb-3">GỌI CHO ĐIỆN LẠNH DUY KHÁNH</h3>
            <p className="text-gray-400 text-sm max-w-md">
              Đội ngũ kỹ thuật viên trực 24/7 sẵn sàng hỗ trợ. Có mặt sau 20–60 phút tại Cần Thơ.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <a href="tel:0911678101" className="btn-yellow text-base px-8 py-4 shadow-xl shadow-brand-yellow/20 text-lg">
              📞 0911.678.101
            </a>
            <a href="tel:0366755156" className="btn-outline-white text-base px-8 py-4 text-lg">
              📞 0366.755.156
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
