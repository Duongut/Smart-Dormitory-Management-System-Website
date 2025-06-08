# SmartDorm - Hệ thống quản lý nhà trọ thông minh

## 🎯 Mục tiêu hệ thống
- Số hóa và tự động hóa quy trình quản lý nhà trọ
- Giảm thời gian, chi phí vận hành cho chủ trọ
- Tăng sự tiện lợi, minh bạch cho khách thuê

## 🌐 Đối tượng sử dụng
- **👤 Chủ trọ**: Quản lý phòng, khách thuê, hóa đơn, doanh thu
- **🧑‍💼 Khách thuê**: Tìm phòng, đặt phòng, thanh toán, phản hồi

## ✨ Tính năng chính

### Dành cho chủ trọ
- 🏠 **Quản lý phòng trọ**: Thêm/sửa/xóa phòng, gắn thông tin diện tích, giá, tiện nghi
- 👥 **Quản lý khách thuê**: Lưu trữ thông tin người thuê, hợp đồng thuê
- 📄 **Quản lý hóa đơn**: Tự động tạo hóa đơn điện, nước hàng tháng
- 📊 **Theo dõi doanh thu**: Biểu đồ thu chi theo tháng/năm
- 💬 **Phản hồi & báo cáo**: Nhận phản hồi, yêu cầu sửa chữa từ người thuê
- 🔔 **Nhắc thanh toán**: Tự động gửi thông báo khi gần tới hạn đóng tiền

### Dành cho khách thuê
- 🔍 **Tìm kiếm phòng**: Xem phòng trống theo giá, tiện nghi, khu vực
- 📱 **Đặt phòng trực tuyến**: Chọn phòng ➜ Đặt cọc online ➜ Nhận thông báo xác nhận
- 💳 **Thanh toán hóa đơn**: Xem và thanh toán tiền điện, nước, tiền phòng online
- 🔧 **Phản ánh sự cố**: Gửi yêu cầu sửa chữa, góp ý với hình ảnh
- 📋 **Quản lý hợp đồng**: Xem hợp đồng điện tử, thời gian hết hạn
- ⭐ **Đánh giá phòng**: Gửi đánh giá, xếp hạng phòng trọ đã thuê

## 🤖 Tự động hóa thông minh
- Tự động gửi thông báo hóa đơn, nhắc nhở thanh toán, hết hạn hợp đồng
- Gợi ý phòng trọ phù hợp với khách dựa trên lịch sử tìm kiếm và nhu cầu
- Gợi ý tăng giá theo mùa hoặc theo xu hướng khu vực

## 🛠️ Công nghệ sử dụng
- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Deployment**: Vercel (recommended)

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js 18+
- npm hoặc yarn

### Cài đặt
```bash
# Clone repository
git clone <repository-url>
cd smart-dormitory-management

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

## 📁 Cấu trúc dự án
```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── page.tsx           # Trang chủ
│   ├── owner-dashboard/   # Dashboard chủ trọ
│   ├── tenant-dashboard/  # Dashboard khách thuê
│   ├── payment/           # Trang thanh toán
│   ├── book-room/         # Trang đặt phòng
│   └── layout.tsx         # Layout chung
├── components/            # Shared components
│   └── Header.tsx         # Component header
└── globals.css           # Global styles
```

## 🎨 Tính năng demo
- ✅ Trang chủ với giới thiệu hệ thống
- ✅ Dashboard chủ trọ với quản lý phòng, hóa đơn
- ✅ Dashboard khách thuê với tìm phòng, thanh toán
- ✅ Trang thanh toán với nhiều phương thức
- ✅ Trang đặt phòng với form chi tiết
- ✅ Responsive design cho mobile và desktop

## 🔮 Tính năng sẽ phát triển
- Tích hợp API backend
- Hệ thống authentication
- Tích hợp payment gateway thực tế
- Hệ thống notification real-time
- Mobile app (React Native)
- Báo cáo và analytics nâng cao

## 📞 Liên hệ
- Email: support@smartdorm.vn
- Phone: 1900 1234
- Address: Hà Nội, Việt Nam

## 📄 License
MIT License - xem file LICENSE để biết thêm chi tiết.
