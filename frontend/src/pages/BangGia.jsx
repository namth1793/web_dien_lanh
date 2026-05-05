import { Link } from 'react-router-dom';

const TABLES = [
  {
    title: 'Vệ sinh – Bảo dưỡng máy lạnh',
    icon: '🧹',
    rows: [
      { service: 'Vệ sinh máy lạnh (không tháo cục nóng)', p1: '150.000', p15: '180.000', p2: '250.000' },
      { service: 'Vệ sinh máy lạnh (có tháo cục nóng)', p1: '300.000', p15: '350.000', p2: '450.000' },
      { service: 'Bảo dưỡng tổng thể (kiểm tra + vệ sinh)', p1: '250.000', p15: '300.000', p2: '400.000' },
      { service: 'Vệ sinh + kiểm tra + bảo dưỡng trọn gói', p1: '350.000', p15: '420.000', p2: '550.000' },
    ],
  },
  {
    title: 'Nạp gas – Sửa chữa máy lạnh',
    icon: '❄️',
    rows: [
      { service: 'Nạp gas R32 (bơm bổ sung)', p1: '200.000', p15: '250.000', p2: '350.000' },
      { service: 'Nạp gas R32 (xả sạch + nạp mới)', p1: '350.000', p15: '450.000', p2: '600.000' },
      { service: 'Nạp gas R410A (xả sạch + nạp mới)', p1: '400.000', p15: '500.000', p2: '680.000' },
      { service: 'Sửa chữa board điện máy lạnh', p1: 'Liên hệ', p15: 'Liên hệ', p2: 'Liên hệ' },
      { service: 'Thay máy nén (compressor)', p1: 'Liên hệ', p15: 'Liên hệ', p2: 'Liên hệ' },
    ],
  },
  {
    title: 'Lắp đặt máy lạnh',
    icon: '🔧',
    rows: [
      { service: 'Lắp đặt máy lạnh treo tường (dây đồng ≤3m)', p1: '300.000', p15: '350.000', p2: '450.000' },
      { service: 'Lắp đặt máy lạnh + đục tường (trọn gói)', p1: '500.000', p15: '600.000', p2: '750.000' },
      { service: 'Tháo dỡ máy lạnh cũ', p1: '200.000', p15: '250.000', p2: '300.000' },
      { service: 'Di dời máy lạnh (tháo + lắp lại)', p1: '500.000', p15: '600.000', p2: '750.000' },
    ],
  },
  {
    title: 'Sửa chữa tủ lạnh – Máy giặt',
    icon: '🛠️',
    cols: ['Dịch vụ', 'Giá từ', 'Ghi chú'],
    rows3: [
      { service: 'Vệ sinh tủ lạnh (trong + ngoài)', price: '200.000đ', note: 'Mọi dung tích' },
      { service: 'Sửa tủ lạnh không lạnh / đóng tuyết', price: '300.000đ+', note: 'Tuỳ linh kiện' },
      { service: 'Nạp gas tủ lạnh R600a/R134a', price: '350.000đ+', note: 'Tuỳ dung tích' },
      { service: 'Vệ sinh máy giặt (lồng ngang)', price: '250.000đ', note: 'Mọi hãng' },
      { service: 'Sửa máy giặt không quay / không vắt', price: '300.000đ+', note: 'Tuỳ lỗi' },
      { service: 'Thay vòng bi / dây curoa máy giặt', price: '200.000đ+', note: 'Chưa linh kiện' },
    ],
  },
];

const NOTES = [
  'Giá trên chưa bao gồm linh kiện thay thế (nếu có).',
  'Phí khảo sát miễn phí trong nội thành TP.HCM. Ngoại thành thỏa thuận.',
  'Bảo hành dịch vụ: Vệ sinh/Bảo dưỡng 3 tháng – Sửa chữa 1–6 tháng – Lắp đặt 12 tháng.',
  'Giá có thể thay đổi theo từng trường hợp cụ thể. Vui lòng gọi để được báo giá chính xác nhất.',
];

export default function BangGia() {
  return (
    <div>
      {/* Page header */}
      <div className="bg-brand-dark py-14 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">BẢNG GIÁ DỊCH VỤ</h1>
          <div className="w-14 h-1 bg-brand-yellow rounded mx-auto mb-4"/>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Giá niêm yết rõ ràng, minh bạch – không phát sinh – bảo hành theo dịch vụ. Gọi ngay để được tư vấn và báo giá chính xác.
          </p>
          <nav className="text-xs text-gray-500 mt-4 flex items-center justify-center gap-2">
            <Link to="/" className="hover:text-brand-yellow">Trang chủ</Link>
            <span>›</span>
            <span className="text-gray-300">Bảng giá</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">

        {/* Tables */}
        {TABLES.map(t => (
          <div key={t.title}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{t.icon}</span>
              <h2 className="text-lg font-black text-brand-dark uppercase">{t.title}</h2>
            </div>

            {t.rows3 ? (
              /* 3-column table for repairs */
              <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brand-dark text-white">
                      <th className="px-5 py-3 text-left font-bold">Dịch vụ</th>
                      <th className="px-4 py-3 text-center font-bold">Giá từ</th>
                      <th className="px-4 py-3 text-center font-bold">Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.rows3.map((row, i) => (
                      <tr key={row.service} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-5 py-3 font-medium text-gray-800">{row.service}</td>
                        <td className="px-4 py-3 text-center font-bold text-brand-yellow">{row.price}</td>
                        <td className="px-4 py-3 text-center text-gray-500 text-xs">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              /* 4-column table by HP */
              <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brand-dark text-white">
                      <th className="px-5 py-3 text-left font-bold">Dịch vụ</th>
                      <th className="px-4 py-3 text-center font-bold">1.0 HP</th>
                      <th className="px-4 py-3 text-center font-bold">1.5 HP</th>
                      <th className="px-4 py-3 text-center font-bold">2.0 HP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.rows.map((row, i) => (
                      <tr key={row.service} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-5 py-3 font-medium text-gray-800">{row.service}</td>
                        {[row.p1, row.p15, row.p2].map((p, j) => (
                          <td key={j} className="px-4 py-3 text-center font-bold text-brand-yellow">
                            {p === 'Liên hệ' ? (
                              <span className="text-gray-400 font-normal italic">Liên hệ</span>
                            ) : `${p}đ`}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}

        {/* Notes */}
        <div className="bg-brand-yellow/10 border border-brand-yellow/30 rounded-xl p-5">
          <h3 className="font-bold text-brand-dark mb-3 flex items-center gap-2">
            <span>📌</span> Lưu ý quan trọng
          </h3>
          <ul className="space-y-1.5">
            {NOTES.map((n, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-brand-yellow mt-0.5 flex-shrink-0">•</span>{n}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-brand-dark rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-black text-white mb-2">Cần báo giá chi tiết hơn?</h2>
          <p className="text-gray-400 text-sm mb-6">Gọi ngay để được tư vấn và báo giá miễn phí, nhanh chóng</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:18000049" className="btn-yellow px-8 py-3.5 text-base">
              📞 Gọi ngay: 1800 0049
            </a>
            <Link to="/lien-he" className="btn-outline-white px-8 py-3.5 text-base">
              Đặt lịch online
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
