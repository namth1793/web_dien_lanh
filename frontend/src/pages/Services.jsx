import { useState } from 'react';
import { Link } from 'react-router-dom';

const SERVICES = [
  {
    id: 'sua-may-lanh',
    icon: '❄️',
    title: 'A. Sửa Chữa Máy Lạnh',
    short: 'Sửa chữa tận nhà – chất lượng – khỏi lo về giá',
    content: (
      <div className="space-y-5 text-sm text-gray-600 leading-relaxed">
        <div className="bg-brand-yellow/10 border-l-4 border-brand-yellow p-4 rounded-r-lg">
          <p className="font-bold text-brand-dark text-base">SỬA CHỮA TẬN NHÀ – CHẤT LƯỢNG – KHỎI LO VỀ GIÁ</p>
          <p className="mt-1">CHỈ CÓ Ở ĐIỆN LẠNH CẦN THƠ – DUY KHÁNH (CÔNG TY SOLAR BASE)</p>
          <p className="font-bold text-brand-yellow mt-1">HOTLINE: 0911.678.101</p>
        </div>

        <div>
          <h4 className="font-bold text-brand-dark mb-2">Tại sao máy lạnh không lạnh?</h4>
          <div className="space-y-3">
            <div>
              <p className="font-semibold">a. Máy lạnh không có nguồn:</p>
              <p>Thông thường bị các nguyên nhân như bị đứt cầu chì hoặc vasiton, lỏng mối nối điện, ngắt mạch hay bị đứt dây điện. Các trường hợp này thông thường cách sửa chữa rất đơn giản như kiểm tra lại điện thế, thay thế cầu chì phù hợp, xiết chặt lại các mối nối điện.</p>
            </div>
            <div>
              <p className="font-semibold">b. Máy lạnh có nguồn nhưng không lạnh hoặc đóng tuyết, chảy nước:</p>
              <p>Nếu máy lạnh chưa được vệ sinh bảo trì từ 6 tháng đến 1 năm thì vấn đề này rất bình thường. Máy lạnh được làm lạnh từ môi chất lạnh và phân phát thông qua dàn lạnh. Trường hợp môi chất lạnh bị thiếu hụt do quá trình sử dụng hoặc dàn lạnh quá bẩn đều khiến máy lạnh chạy không ổn định.</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-brand-dark mb-2">Những dấu hiệu cần sửa máy lạnh</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {['Máy lạnh không hoạt động','Máy lạnh không lạnh, kém lạnh','Máy lạnh rò rỉ nước','Máy lạnh không bắt được nguồn','Máy lạnh không ăn remote','Máy lạnh báo lỗi bo mạch','Máy lạnh chớp đèn','Máy lạnh kêu to, ù khi chạy','Máy lạnh hư quạt cục nóng','Quạt cục lạnh không chạy','Máy lạnh hư Block','Máy lạnh xì giàn','Máy lạnh thiếu gas, mục đồng','Máy chạy liên tục nhưng không lạnh'].map(d => (
              <div key={d} className="flex items-start gap-2">
                <span className="text-red-500 flex-shrink-0">•</span><span>{d}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-brand-dark mb-2">Chuyên sửa các sự cố</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {['Máy nén chạy ồn','Máy quá lạnh','Máy chạy liên tục nhưng không lạnh','Áp suất hút thấp/cao','Máy nén chạy và dừng liên tục do quá tải','Quạt dàn nóng/lạnh không chạy','Máy lạnh chảy nước','Máy hư block, xì gas','Thay ống dẫn gas'].map(d => (
              <div key={d} className="flex items-start gap-2">
                <span className="text-brand-yellow flex-shrink-0 font-bold">✓</span><span>{d}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-brand-dark mb-2">Giá cả & Bảo hành</h4>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2"><span className="text-brand-yellow font-bold flex-shrink-0">✓</span><span>Kỹ thuật viên kiểm tra tình trạng bệnh của máy</span></li>
            <li className="flex items-start gap-2"><span className="text-brand-yellow font-bold flex-shrink-0">✓</span><span>Báo máy xảy ra những lỗi gì và phí sửa chữa</span></li>
            <li className="flex items-start gap-2"><span className="text-brand-yellow font-bold flex-shrink-0">✓</span><span>Bảo hành 1–3 tháng sau sửa chữa</span></li>
            <li className="flex items-start gap-2"><span className="text-brand-yellow font-bold flex-shrink-0">✓</span><span>Nếu khách hàng không đồng ý thì không thu phí</span></li>
          </ul>
        </div>

        <div className="bg-brand-dark text-white rounded-xl p-4 text-center">
          <p className="font-bold text-brand-yellow text-lg">📞 HOTLINE: 0911.678.101</p>
          <p className="text-gray-300 text-xs mt-1">Trung tâm sửa máy lạnh uy tín & nhanh nhất tại TP. Cần Thơ</p>
        </div>
      </div>
    ),
  },
  {
    id: 'sua-may-giat',
    icon: '🫧',
    title: 'B. Sửa Chữa Máy Giặt',
    short: 'Sửa máy giặt tại nhà giá rẻ – uy tín, có mặt nhanh',
    content: (
      <div className="space-y-5 text-sm text-gray-600 leading-relaxed">
        <p>Điện lạnh Cần Thơ – Duy Khánh chuyên sửa chữa tất cả các dòng máy giặt từ cửa trên đến cửa trước, đến từ các thương hiệu phổ biến như <strong>LG, Samsung, Panasonic, Toshiba,...</strong></p>

        <div>
          <h4 className="font-bold text-brand-dark mb-2">Dịch vụ sửa máy giặt tại nhà</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {['Sửa máy giặt không hoạt động','Sửa máy giặt không vắt, không xả','Khắc phục máy giặt bị rò rỉ nước','Sửa lỗi máy giặt không cấp nước','Xử lý máy giặt rung lắc mạnh, kêu to','Thay thế linh kiện chính hãng'].map(d => (
              <div key={d} className="flex items-start gap-2"><span className="text-brand-yellow font-bold flex-shrink-0">✓</span><span>{d}</span></div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-brand-dark mb-2">Các lỗi máy giặt thường gặp</h4>
          <div className="space-y-2">
            {[
              ['Máy giặt không chạy','Nguyên nhân có thể do nguồn điện, hỏng board mạch hoặc cửa chưa đóng kín.'],
              ['Máy giặt không xả nước','Thường do tắc ống xả, bơm xả bị hỏng hoặc dị vật mắc kẹt.'],
              ['Máy giặt không vắt','Có thể do lỗi cảm biến, hỏng mô tơ hoặc quá tải quần áo.'],
              ['Máy giặt rung lắc mạnh','Do kê máy không cân bằng hoặc hỏng bộ giảm xóc.'],
              ['Máy giặt bị rò rỉ nước','Nguyên nhân từ ống dẫn nước, gioăng cao su hoặc van cấp nước bị hỏng.'],
            ].map(([title, desc]) => (
              <div key={title} className="bg-gray-50 rounded-lg p-3">
                <span className="font-semibold text-brand-dark">{title}: </span>{desc}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-brand-dark mb-2">Cam kết dịch vụ</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {['Có mặt nhanh sau 20–60 phút','Báo giá rõ ràng, không phát sinh','Linh kiện thay thế chính hãng','Bảo hành từ 1–3 tháng','Khu vực Ninh Kiều, Cái Răng'].map(d => (
              <div key={d} className="flex items-start gap-2"><span className="text-green-500 flex-shrink-0">✓</span><span>{d}</span></div>
            ))}
          </div>
        </div>

        <div className="bg-brand-dark text-white rounded-xl p-4 text-center">
          <p className="font-bold text-brand-yellow text-lg">📞 HOTLINE: 0911.678.101</p>
        </div>
      </div>
    ),
  },
  {
    id: 'sua-tu-lanh',
    icon: '🧊',
    title: 'C. Sửa Chữa Tủ Lạnh',
    short: 'Sửa tủ lạnh tại nhà uy tín – giá rẻ, có mặt nhanh tại TP Cần Thơ',
    content: (
      <div className="space-y-5 text-sm text-gray-600 leading-relaxed">
        <p>Tủ lạnh là thiết bị hoạt động liên tục nên rất dễ gặp sự cố như không lạnh, rò nước hay kêu to. Dịch vụ sửa tủ lạnh tại nhà giúp bạn khắc phục nhanh chóng, tiết kiệm chi phí và đảm bảo thiết bị hoạt động ổn định trở lại.</p>

        <div>
          <h4 className="font-bold text-brand-dark mb-2">Dịch vụ bao gồm</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {['Sửa tủ lạnh không lạnh, kém lạnh','Sửa tủ lạnh không làm đá','Khắc phục tủ lạnh bị rò rỉ nước','Sửa tủ lạnh không vào điện','Xử lý tủ lạnh kêu to, rung lắc','Thay block, quạt, cảm biến, board mạch','Nạp gas, xử lý xì gas tủ lạnh'].map(d => (
              <div key={d} className="flex items-start gap-2"><span className="text-brand-yellow font-bold flex-shrink-0">✓</span><span>{d}</span></div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-brand-dark mb-2">Dấu hiệu tủ lạnh cần sửa ngay</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {['Tủ lạnh không lạnh hoặc làm lạnh yếu','Không đông đá, không xả tuyết','Tủ chạy liên tục không ngắt','Có mùi hôi khó chịu bên trong','Rò điện, chập điện nguy hiểm','Cửa tủ không kín, ron bị hỏng'].map(d => (
              <div key={d} className="flex items-start gap-2"><span className="text-red-500 flex-shrink-0">⚠</span><span>{d}</span></div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-brand-dark mb-2">Ưu điểm dịch vụ</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {['Có mặt nhanh tại nhà','Sửa chữa triệt để, đúng bệnh','Báo giá rõ ràng, không phát sinh','Linh kiện chính hãng','Bảo hành từ 3–6 tháng','Hỗ trợ 24/7'].map(d => (
              <div key={d} className="flex items-start gap-2"><span className="text-green-500 flex-shrink-0">✓</span><span>{d}</span></div>
            ))}
          </div>
        </div>

        <div className="bg-brand-dark text-white rounded-xl p-4 text-center">
          <p className="font-bold text-brand-yellow text-lg">📞 Hotline: 0911.678.101</p>
        </div>
      </div>
    ),
  },
  {
    id: 'thao-lap-may-lanh',
    icon: '🔧',
    title: 'D. Tháo Lắp Máy Lạnh',
    short: 'Tháo lắp máy lạnh Cần Thơ – nhanh gọn, an toàn, giá tốt',
    content: (
      <div className="space-y-5 text-sm text-gray-600 leading-relaxed">
        <p>Bạn cần tháo lắp máy lạnh tại Cần Thơ để di dời nhà, chuyển văn phòng hoặc lắp mới? Điện lạnh Cần Thơ – Duy Khánh cung cấp dịch vụ chuyên nghiệp, thi công đúng kỹ thuật, đảm bảo an toàn tuyệt đối cho thiết bị.</p>

        <div>
          <h4 className="font-bold text-brand-dark mb-3">Bảng giá tháo lắp máy lạnh (tham khảo)</h4>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-dark text-white">
                  <th className="px-4 py-2.5 text-left font-bold">Dịch vụ</th>
                  <th className="px-4 py-2.5 text-center font-bold">Đơn vị</th>
                  <th className="px-4 py-2.5 text-right font-bold">Giá (VNĐ)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Tháo máy lạnh 1HP','Bộ','200.000'],
                  ['Tháo máy lạnh 1.5HP','Bộ','250.000'],
                  ['Tháo máy lạnh 2HP','Bộ','300.000'],
                  ['Lắp máy lạnh 1HP','Bộ','350.000'],
                  ['Lắp máy lạnh 1.5HP – 2HP','Bộ','350.000'],
                  ['Tháo lắp máy lạnh 1HP','Bộ','500.000'],
                  ['Tháo lắp máy lạnh 1.5HP','Bộ','550.000'],
                  ['Tháo lắp máy lạnh 2HP','Bộ','600.000'],
                ].map(([s,u,p],i) => (
                  <tr key={s} className={i%2===0?'bg-white':'bg-gray-50'}>
                    <td className="px-4 py-2.5 font-medium text-gray-800">{s}</td>
                    <td className="px-4 py-2.5 text-center text-gray-500">{u}</td>
                    <td className="px-4 py-2.5 text-right font-bold text-brand-yellow">{p}đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">⚠️ Giá có thể thay đổi tùy loại máy, vị trí lắp đặt và vật tư sử dụng.</p>
        </div>

        <div>
          <h4 className="font-bold text-brand-dark mb-2">Dịch vụ bao gồm</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {['Tháo máy lạnh cũ, di dời sang vị trí mới','Lắp đặt máy lạnh treo tường, âm trần, tủ đứng','Thay ống đồng, dây điện, vật tư mới','Kiểm tra, nạp gas và chạy test sau lắp','Nhận thi công tất cả các dòng máy lạnh'].map(d => (
              <div key={d} className="flex items-start gap-2"><span className="text-brand-yellow font-bold flex-shrink-0">✓</span><span>{d}</span></div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-brand-dark mb-2">Lưu ý khi di dời máy lạnh không đúng cách</h4>
          <div className="space-y-2">
            {[
              ['Mất chất làm lạnh','Có thể dẫn đến rò rỉ chất làm lạnh trong quá trình di chuyển.'],
              ['Hỏng hóc linh kiện','Các linh kiện như cảm biến, quạt và bộ làm lạnh có thể bị hỏng nếu không cẩn thận.'],
              ['Hỏng hóc ống dẫn lạnh','Ống dẫn lạnh bị hỏng dẫn đến rò rỉ và ảnh hưởng hiệu suất.'],
            ].map(([t,d]) => (
              <div key={t} className="bg-red-50 border border-red-100 rounded-lg p-3">
                <span className="font-semibold text-red-600">⚠ {t}: </span>{d}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-brand-dark text-white rounded-xl p-4 text-center">
          <p className="font-bold text-brand-yellow text-lg">📞 HOTLINE: 0911.678.101</p>
          <p className="text-gray-300 text-xs mt-1">Nhận tháo lắp máy lạnh nhanh – đúng kỹ thuật – giá hợp lý</p>
        </div>
      </div>
    ),
  },
  {
    id: 've-sinh-may-lanh',
    icon: '🧹',
    title: 'H. Vệ Sinh Máy Lạnh',
    short: 'Vệ sinh máy lạnh định kỳ – mát hơn, tiết kiệm điện hơn, tăng tuổi thọ',
    content: (
      <div className="space-y-5 text-sm text-gray-600 leading-relaxed">
        <p>Điện Lạnh Cần Thơ – Duy Khánh nhận vệ sinh máy lạnh tại TP Cần Thơ cho hộ gia đình, phòng trọ, căn hộ và cửa hàng, công ty, trường học sử dụng máy liên tục.</p>

        <div>
          <h4 className="font-bold text-brand-dark mb-2">Khi nào cần vệ sinh máy lạnh?</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {['Máy lạnh vẫn chạy nhưng làm lạnh yếu','Có mùi hôi, mùi ẩm khi bật máy','Nước chảy nhỏ giọt trong nhà','Máy chạy lâu nhưng không đạt nhiệt độ','Quạt thổi gió yếu, không đều'].map(d => (
              <div key={d} className="flex items-start gap-2"><span className="text-red-500 flex-shrink-0">⚠</span><span>{d}</span></div>
            ))}
          </div>
          <div className="bg-blue-50 rounded-lg p-3 mt-3">
            <p className="font-semibold text-blue-700 mb-1">Tần suất vệ sinh khuyến cáo:</p>
            <div className="space-y-1">
              {[['Gia đình','4–5 tháng/lần'],['Văn phòng, công ty','3–4 tháng/lần'],['Quán ăn, nhà hàng','2–3 tháng/lần'],['Nhà xưởng, sản xuất','Hàng tháng']].map(([l,v]) => (
                <div key={l} className="flex justify-between"><span>{l}:</span><span className="font-semibold text-brand-dark">{v}</span></div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-brand-dark mb-2">Bảng giá vệ sinh máy lạnh</h4>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-dark text-white">
                  <th className="px-4 py-2.5 text-left font-bold">Dịch vụ</th>
                  <th className="px-4 py-2.5 text-right font-bold">Đơn giá</th>
                </tr>
              </thead>
              <tbody>
                {[['Vệ sinh máy lạnh 1HP','180.000đ'],['Vệ sinh máy lạnh 1.5HP','200.000đ'],['Vệ sinh máy lạnh âm trần','400.000đ']].map(([s,p],i) => (
                  <tr key={s} className={i%2===0?'bg-white':'bg-gray-50'}>
                    <td className="px-4 py-2.5 font-medium text-gray-800">{s}</td>
                    <td className="px-4 py-2.5 text-right font-bold text-brand-yellow">{p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-brand-dark mb-2">Quy trình vệ sinh</h4>
          <div className="space-y-2">
            {['Tiếp nhận thông tin qua SĐT 0911.678.101 hoặc Zalo','Kiểm tra tình trạng máy, báo giá dịch vụ','Vệ sinh dàn lạnh, dàn nóng đúng kỹ thuật','Kiểm tra vận hành thiết bị trước khi bàn giao'].map((s,i) => (
              <div key={s} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-brand-yellow text-brand-dark font-black text-xs rounded-full flex items-center justify-center flex-shrink-0">{i+1}</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-brand-dark text-white rounded-xl p-4 text-center">
          <p className="font-bold text-brand-yellow text-lg">📞 Hotline: 0911.678.101</p>
          <p className="text-gray-300 text-xs mt-1">Hỗ trợ toàn bộ khu vực Cần Thơ</p>
        </div>
      </div>
    ),
  },
  {
    id: 've-sinh-may-giat',
    icon: '🫧',
    title: 'Q. Vệ Sinh Máy Giặt',
    short: 'Vệ sinh máy giặt tại Cần Thơ, thực hiện tận nơi, sạch bẩn',
    content: (
      <div className="space-y-5 text-sm text-gray-600 leading-relaxed">
        <p>Điện Lạnh Cần Thơ – Duy Khánh nhận vệ sinh máy giặt tại TP Cần Thơ tận nơi cho mọi dòng máy giặt. Sau một thời gian hoạt động, bên trong lồng giặt thường bám rất nhiều cặn bẩn, xơ vải, chất nhờn và mùi hôi khó chịu.</p>

        <div>
          <h4 className="font-bold text-brand-dark mb-2">Dấu hiệu cần vệ sinh máy giặt ngay</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {['Máy giặt có mùi hôi, mùi ẩm mốc','Quần áo sau khi giặt vẫn không sạch','Máy giặt hoạt động chậm và tốn nhiều nước','Bụi bẩn, cặn bám bên trong máy','Máy giặt hoạt động ồn hơn bình thường','Kết thúc chương trình vẫn còn nước trong lồng'].map(d => (
              <div key={d} className="flex items-start gap-2"><span className="text-red-500 flex-shrink-0">⚠</span><span>{d}</span></div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-brand-dark mb-3">Bảng giá vệ sinh máy giặt</h4>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-dark text-white">
                  <th className="px-4 py-2.5 text-left font-bold">Dịch vụ</th>
                  <th className="px-4 py-2.5 text-left font-bold">Cụ thể</th>
                  <th className="px-4 py-2.5 text-right font-bold">Đơn giá</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Lồng đứng','7–8kg','250.000đ'],
                  ['Lồng đứng','>8kg','300.000–350.000đ'],
                  ['Lồng ngang','7–8kg','400.000đ'],
                  ['Lồng ngang','>8kg','450.000đ'],
                  ['Tháo máy giặt','Không bao gồm vận chuyển','100.000đ'],
                  ['Lắp đặt máy giặt','Vị trí có sẵn ống cấp/xả nước','200.000đ'],
                ].map(([s,c,p],i) => (
                  <tr key={s+c} className={i%2===0?'bg-white':'bg-gray-50'}>
                    <td className="px-4 py-2.5 font-medium text-gray-800">{s}</td>
                    <td className="px-4 py-2.5 text-gray-500">{c}</td>
                    <td className="px-4 py-2.5 text-right font-bold text-brand-yellow">{p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-brand-dark mb-2">Ưu điểm dịch vụ tại Duy Khánh</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {['Kỹ thuật vệ sinh đúng quy trình','Tháo lồng inox, làm sạch sâu bên trong','Giá cạnh tranh, không phát sinh','Bảo hành 30 ngày sau vệ sinh','Hỗ trợ 24/7 kể cả cuối tuần, ngày lễ','Ưu đãi 10–20% khi đặt lịch từ 5 máy'].map(d => (
              <div key={d} className="flex items-start gap-2"><span className="text-green-500 flex-shrink-0">✓</span><span>{d}</span></div>
            ))}
          </div>
        </div>

        <div className="bg-brand-dark text-white rounded-xl p-4 text-center">
          <p className="font-bold text-brand-yellow text-lg">📞 Hotline: 0911.678.101</p>
          <p className="text-gray-300 text-xs mt-1">Công ty TNHH TM DV SOLAR BASE – Cần Thơ</p>
        </div>
      </div>
    ),
  },
];

export default function Services() {
  const [active, setActive] = useState(null);

  const toggle = (id) => setActive(prev => prev === id ? null : id);

  return (
    <div>
      {/* Page header */}
      <div className="bg-brand-dark py-14 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">DỊCH VỤ CỦA CHÚNG TÔI</h1>
          <div className="w-14 h-1 bg-brand-yellow rounded mx-auto mb-4"/>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Bán – sửa chữa – bảo trì – lắp đặt máy lạnh, máy giặt, tủ lạnh tận nhà tại Cần Thơ
          </p>
          <nav className="text-xs text-gray-500 mt-4 flex items-center justify-center gap-2">
            <Link to="/" className="hover:text-brand-yellow">Trang chủ</Link>
            <span>›</span>
            <span className="text-gray-300">Dịch vụ</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="section-heading">Danh Mục Dịch Vụ</h2>
          <div className="section-line mx-auto"/>
          <p className="section-sub">Bấm vào từng danh mục để xem chi tiết nội dung dịch vụ</p>
        </div>

        <div className="space-y-3">
          {SERVICES.map(s => (
            <div key={s.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                onClick={() => toggle(s.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors ${active === s.id ? 'bg-brand-dark text-white' : 'hover:bg-gray-50'}`}
              >
                <span className="text-2xl flex-shrink-0">{s.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className={`font-black text-base ${active === s.id ? 'text-brand-yellow' : 'text-brand-dark'}`}>{s.title}</div>
                  <div className={`text-xs mt-0.5 truncate ${active === s.id ? 'text-gray-300' : 'text-gray-500'}`}>{s.short}</div>
                </div>
                <svg
                  className={`w-5 h-5 flex-shrink-0 transition-transform ${active === s.id ? 'rotate-180 text-brand-yellow' : 'text-gray-400'}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              {active === s.id && (
                <div className="px-5 py-5 border-t border-gray-100 bg-gray-50">
                  {s.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-brand-dark rounded-2xl p-8 text-center mt-10">
          <h2 className="text-2xl font-black text-white mb-2">Đặt lịch dịch vụ ngay!</h2>
          <p className="text-gray-400 text-sm mb-6">Có mặt sau 20–60 phút · Báo giá minh bạch · Không phát sinh</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0911678101" className="btn-yellow px-8 py-3.5 text-base">
              📞 0911.678.101
            </a>
            <a href="tel:0366755156" className="btn-outline-white px-8 py-3.5 text-base">
              📞 0366.755.156
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
