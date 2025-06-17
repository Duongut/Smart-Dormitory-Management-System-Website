"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  SparklesIcon,
  ShieldCheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon,
  UserIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient?: string;
}

function FeatureCard({
  icon,
  title,
  description,
  gradient = "from-blue-500 to-blue-600",
}: FeatureCardProps) {
  return (
    <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200">
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
      ></div>
      <div
        className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${gradient} text-white mb-6 shadow-lg`}
      >
        {icon}
      </div>
      <h5 className="text-xl font-bold text-gray-900 mb-3">{title}</h5>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl mr-3 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">🏠</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                SmartDorm
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="#features"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Tính năng
              </Link>
              <Link
                href="#pricing"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Bảng giá
              </Link>
              <Link
                href="#contact"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Liên hệ
              </Link>
              {user ? (
                <Link
                  href={
                    user.userType === "owner"
                      ? "/owner-dashboard"
                      : "/tenant-dashboard"
                  }
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl font-medium"
                >
                  Dashboard
                </Link>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/auth/login"
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/auth/register"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl font-medium"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
              <SparklesIcon className="h-4 w-4 mr-2" />
              Công nghệ quản lý nhà trọ tiên tiến
            </div>
            <h2 className="text-6xl lg:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                Hệ thống quản lý
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                nhà trọ thông minh
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Số hóa và tự động hóa quy trình quản lý nhà trọ. Giảm{" "}
              <span className="font-semibold text-blue-600">95% thời gian</span>{" "}
              vận hành, tăng{" "}
              <span className="font-semibold text-green-600">80% hiệu quả</span>{" "}
              thu tiền cho chủ trọ.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              {user ? (
                <Link
                  href={
                    user.userType === "owner"
                      ? "/owner-dashboard"
                      : "/tenant-dashboard"
                  }
                  className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
                >
                  <span className="relative z-10">Vào Dashboard</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/register"
                    className="group relative bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-2xl hover:shadow-green-500/25 hover:scale-105"
                  >
                    <span className="relative z-10">Đăng ký khách thuê</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  </Link>
                  <Link
                    href="/auth/login"
                    className="group bg-white/80 backdrop-blur-lg text-gray-900 px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-white transition-all shadow-xl hover:shadow-2xl border border-gray-200 hover:border-gray-300 hover:scale-105"
                  >
                    Đăng nhập
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                  1000+
                </div>
                <div className="text-gray-600">Chủ trọ tin dùng</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">
                  50K+
                </div>
                <div className="text-gray-600">Phòng được quản lý</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">
                  95%
                </div>
                <div className="text-gray-600">Tiết kiệm thời gian</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2">
                  24/7
                </div>
                <div className="text-gray-600">Hỗ trợ khách hàng</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative py-24 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm font-medium mb-6">
              <ShieldCheckIcon className="h-4 w-4 mr-2" />
              Tính năng toàn diện
            </div>
            <h3 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Giải pháp quản lý
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                nhà trọ hiện đại
              </span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Từ quản lý phòng trọ đến theo dõi doanh thu, SmartDorm cung cấp
              mọi công cụ bạn cần
            </p>
          </div>

          {/* Owner Features */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold text-lg shadow-lg">
                <UserGroupIcon className="h-6 w-6 mr-2" />
                Dành cho chủ trọ
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<span className="text-2xl">🏠</span>}
                title="Quản lý phòng trọ"
                description="Thêm/sửa/xóa phòng, gắn thông tin diện tích, giá, tiện nghi. Chỉnh sửa nhanh tình trạng phòng với giao diện trực quan."
                gradient="from-blue-500 to-blue-600"
              />
              <FeatureCard
                icon={<span className="text-2xl">👥</span>}
                title="Quản lý khách thuê"
                description="Lưu trữ thông tin người thuê, hợp đồng thuê. Tự động tạo hợp đồng điện tử khi khách đặt phòng."
                gradient="from-indigo-500 to-indigo-600"
              />
              <FeatureCard
                icon={<span className="text-2xl">📄</span>}
                title="Quản lý hóa đơn"
                description="Tự động tạo hóa đơn điện, nước hàng tháng. Tích hợp thiết bị đo hoặc nhập tay với báo cáo chi tiết."
                gradient="from-purple-500 to-purple-600"
              />
              <FeatureCard
                icon={<span className="text-2xl">📊</span>}
                title="Theo dõi doanh thu"
                description="Biểu đồ thu chi theo tháng/năm. Tổng hợp từ các hóa đơn đã thanh toán với analytics thông minh."
                gradient="from-green-500 to-green-600"
              />
              <FeatureCard
                icon={<span className="text-2xl">💬</span>}
                title="Phản hồi & báo cáo"
                description="Nhận phản hồi, yêu cầu sửa chữa từ người thuê. Phân công kỹ thuật viên xử lý với tracking real-time."
                gradient="from-orange-500 to-orange-600"
              />
              <FeatureCard
                icon={<span className="text-2xl">🔔</span>}
                title="Nhắc thanh toán"
                description="Tự động gửi email/SMS khi gần tới hạn đóng tiền. Nhắc nhở thông minh mỗi ngày 25 hàng tháng."
                gradient="from-red-500 to-red-600"
              />
            </div>
          </div>

          {/* Tenant Features */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-6 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold text-lg shadow-lg">
                <UserIcon className="h-6 w-6 mr-2" />
                Dành cho khách thuê
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<span className="text-2xl">🔍</span>}
                title="Tìm kiếm phòng"
                description="Xem phòng trống theo giá, tiện nghi, khu vực. Giao diện thân thiện với bộ lọc thông minh và sắp xếp tùy chỉnh."
                gradient="from-green-500 to-green-600"
              />
              <FeatureCard
                icon={<span className="text-2xl">📱</span>}
                title="Đặt phòng trực tuyến"
                description="Chọn phòng ➜ Đặt cọc online ➜ Nhận thông báo xác nhận. Thanh toán qua Momo, ZaloPay, Banking."
                gradient="from-emerald-500 to-emerald-600"
              />
              <FeatureCard
                icon={<span className="text-2xl">💳</span>}
                title="Thanh toán hóa đơn"
                description="Xem tiền điện, nước, tiền phòng. Thanh toán online an toàn với biên lai điện tử chi tiết."
                gradient="from-teal-500 to-teal-600"
              />
              <FeatureCard
                icon={<span className="text-2xl">🔧</span>}
                title="Phản ánh sự cố"
                description="Gửi yêu cầu sửa chữa, góp ý với hình ảnh. Nhận mã theo dõi tiến trình xử lý real-time."
                gradient="from-cyan-500 to-cyan-600"
              />
              <FeatureCard
                icon={<span className="text-2xl">📋</span>}
                title="Quản lý hợp đồng"
                description="Xem hợp đồng điện tử, thời gian hết hạn. Tải về PDF và gia hạn online dễ dàng."
                gradient="from-sky-500 to-sky-600"
              />
              <FeatureCard
                icon={<span className="text-2xl">⭐</span>}
                title="Đánh giá phòng"
                description="Gửi đánh giá, xếp hạng phòng trọ đã thuê. Góp phần cải thiện chất lượng dịch vụ."
                gradient="from-indigo-500 to-indigo-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Smart Automation Section */}
      <section className="relative py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8">
            <SparklesIcon className="h-4 w-4 mr-2" />
            Công nghệ AI & Machine Learning
          </div>
          <h3 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              🤖 Tự động hóa thông minh
            </span>
          </h3>
          <p className="text-xl text-blue-100 mb-16 max-w-3xl mx-auto">
            Sử dụng AI để tối ưu hóa quy trình quản lý và mang lại trải nghiệm
            tốt nhất
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-5xl mb-6 group-hover:animate-bounce">🔔</div>
              <h4 className="text-2xl font-bold mb-4">Thông báo tự động</h4>
              <p className="text-blue-100 leading-relaxed">
                AI phân tích hành vi và gửi thông báo hóa đơn, nhắc nhở thanh
                toán, hết hạn hợp đồng vào thời điểm tối ưu nhất.
              </p>
            </div>
            <div className="group bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-5xl mb-6 group-hover:animate-bounce">🎯</div>
              <h4 className="text-2xl font-bold mb-4">Gợi ý thông minh</h4>
              <p className="text-blue-100 leading-relaxed">
                Machine Learning phân tích lịch sử tìm kiếm, sở thích để gợi ý
                phòng trọ phù hợp nhất với từng khách hàng.
              </p>
            </div>
            <div className="group bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-5xl mb-6 group-hover:animate-bounce">📈</div>
              <h4 className="text-2xl font-bold mb-4">Tối ưu giá cả</h4>
              <p className="text-blue-100 leading-relaxed">
                AI phân tích thị trường, mùa vụ, xu hướng khu vực để đưa ra gợi
                ý giá thuê tối ưu, tăng doanh thu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 text-sm font-medium mb-6">
              <ChartBarIcon className="h-4 w-4 mr-2" />
              Thành tích đạt được
            </div>
            <h3 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Tại sao chọn SmartDorm?
              </span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hàng nghìn chủ trọ và khách thuê đã tin tưởng sử dụng SmartDorm
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl text-white text-2xl font-bold mb-4 group-hover:animate-pulse">
                  <ClockIcon className="h-8 w-8" />
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                <p className="text-gray-600 font-medium">
                  Giảm thời gian quản lý
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  So với phương pháp truyền thống
                </p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl text-white text-2xl font-bold mb-4 group-hover:animate-pulse">
                  <CurrencyDollarIcon className="h-8 w-8" />
                </div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  80%
                </div>
                <p className="text-gray-600 font-medium">
                  Tăng hiệu quả thu tiền
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Giảm nợ đọng và quá hạn
                </p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl text-white text-2xl font-bold mb-4 group-hover:animate-pulse">
                  <ShieldCheckIcon className="h-8 w-8" />
                </div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  24/7
                </div>
                <p className="text-gray-600 font-medium">Hỗ trợ khách hàng</p>
                <p className="text-sm text-gray-500 mt-2">
                  Luôn sẵn sàng hỗ trợ bạn
                </p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-white text-2xl font-bold mb-4 group-hover:animate-pulse">
                  <UserGroupIcon className="h-8 w-8" />
                </div>
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  1000+
                </div>
                <p className="text-gray-600 font-medium">Chủ trọ tin dùng</p>
                <p className="text-sm text-gray-500 mt-2">
                  Và con số vẫn tăng mỗi ngày
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8">
            <SparklesIcon className="h-4 w-4 mr-2" />
            Bắt đầu ngay hôm nay
          </div>
          <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Sẵn sàng bắt đầu với
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              SmartDorm?
            </span>
          </h3>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Tham gia cùng hàng nghìn chủ trọ đã tin tưởng sử dụng hệ thống của
            chúng tôi. Dùng thử miễn phí 30 ngày, không cần thẻ tín dụng.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            {user ? (
              <Link
                href={
                  user.userType === "owner"
                    ? "/owner-dashboard"
                    : "/tenant-dashboard"
                }
                className="group bg-white text-blue-600 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-gray-50 transition-all shadow-2xl hover:shadow-white/25 hover:scale-105"
              >
                <span className="relative z-10">Vào Dashboard</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/register"
                  className="group bg-white text-blue-600 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-gray-50 transition-all shadow-2xl hover:shadow-white/25 hover:scale-105"
                >
                  <span className="relative z-10">Đăng ký khách thuê</span>
                </Link>
                <Link
                  href="/auth/login"
                  className="group border-2 border-white text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-white hover:text-blue-600 transition-all hover:scale-105"
                >
                  Đăng nhập
                </Link>
              </>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-100">
            <div className="flex items-center">
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              <span>Miễn phí 30 ngày</span>
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              <span>Không cần thẻ tín dụng</span>
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              <span>Hỗ trợ 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl mr-3 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">🏠</span>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  SmartDorm
                </h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Hệ thống quản lý nhà trọ thông minh hàng đầu Việt Nam. Giải pháp
                toàn diện cho chủ trọ và khách thuê.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  📘
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors"
                >
                  🐦
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors"
                >
                  📷
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  💼
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Sản phẩm</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/auth/login"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    Dashboard Chủ trọ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/register"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    Đăng ký Khách thuê
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    Tính năng
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-orange-600 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    API & Tích hợp
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Hỗ trợ</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    Hướng dẫn sử dụng
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    Liên hệ hỗ trợ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-orange-600 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    Cộng đồng
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Liên hệ</h4>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-400">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3">
                    📧
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="text-white">support@smartdorm.vn</div>
                  </div>
                </li>
                <li className="flex items-center text-gray-400">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3">
                    📞
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Hotline</div>
                    <div className="text-white">1900 1234</div>
                  </div>
                </li>
                <li className="flex items-center text-gray-400">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3">
                    📍
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Địa chỉ</div>
                    <div className="text-white">Hà Nội, Việt Nam</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0">
                &copy; 2024 SmartDorm. Tất cả quyền được bảo lưu.
              </div>
              <div className="flex space-x-6 text-sm">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Điều khoản sử dụng
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Chính sách bảo mật
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(
            circle,
            #e5e7eb 1px,
            transparent 1px
          );
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}
