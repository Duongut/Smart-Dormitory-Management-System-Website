"use client";

import Link from "next/link";
import { useState } from "react";

// Mock data
const mockAvailableRooms = [
  { id: 1, number: "102", price: 3200000, area: 28, amenities: ["Máy lạnh", "Tủ lạnh", "WiFi"], images: ["room1.jpg"] },
  { id: 2, number: "202", price: 3500000, area: 30, amenities: ["Máy lạnh", "Tủ lạnh", "WiFi", "Ban công"], images: ["room2.jpg"] },
  { id: 3, number: "301", price: 4000000, area: 35, amenities: ["Máy lạnh", "Tủ lạnh", "WiFi", "Ban công", "Bếp riêng"], images: ["room3.jpg"] },
];

const mockMyBills = [
  { id: 1, type: "Tiền phòng", amount: 3500000, dueDate: "2024-02-25", status: "pending", month: "02/2024" },
  { id: 2, type: "Tiền điện", amount: 450000, dueDate: "2024-02-25", status: "pending", month: "01/2024" },
  { id: 3, type: "Tiền nước", amount: 120000, dueDate: "2024-02-25", status: "paid", month: "01/2024" },
];

const mockMyReports = [
  {
    id: 1,
    issue: "Máy lạnh không hoạt động",
    status: "in-progress",
    date: "2024-02-20",
    response: "Đã liên hệ thợ sửa chữa, dự kiến hoàn thành trong 2 ngày.",
    priority: "high"
  },
  {
    id: 2,
    issue: "Vòi nước bị rò rỉ",
    status: "completed",
    date: "2024-02-15",
    response: "Đã thay thế vòi nước mới. Vấn đề đã được giải quyết.",
    priority: "medium"
  },
  {
    id: 3,
    issue: "Bóng đèn phòng ngủ bị hỏng",
    status: "in-progress",
    date: "2024-02-25",
    response: "Đã ghi nhận, sẽ thay thế trong ngày hôm nay.",
    priority: "low"
  }
];

const mockContract = {
  roomNumber: "101",
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  monthlyRent: 3500000,
  deposit: 7000000,
  status: "active"
};

export default function TenantDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportForm, setReportForm] = useState({
    issue: "",
    description: "",
    priority: "medium",
    location: ""
  });
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "active": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid": return "Đã thanh toán";
      case "pending": return "Chờ thanh toán";
      case "overdue": return "Quá hạn";
      case "in-progress": return "Đang xử lý";
      case "completed": return "Hoàn thành";
      case "active": return "Đang hiệu lực";
      default: return status;
    }
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log("Submitting report:", reportForm);
    setShowReportModal(false);
    setReportForm({
      issue: "",
      description: "",
      priority: "medium",
      location: ""
    });
    // Show success message (you can implement toast notification here)
    alert("Báo cáo sự cố đã được gửi thành công!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-30">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl mr-3 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">🏠</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">SmartDorm</h1>
              <p className="text-sm text-gray-500">Dashboard Khách thuê</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          <div className="space-y-2">
            {[
              { id: "overview", label: "Tổng quan", icon: "📊" },
              { id: "search", label: "Tìm phòng", icon: "🔍" },
              { id: "bills", label: "Hóa đơn", icon: "💳" },
              { id: "reports", label: "Báo cáo sự cố", icon: "🔧" },
              { id: "contract", label: "Hợp đồng", icon: "📋" },
              { id: "profile", label: "Hồ sơ", icon: "👤" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-xl font-medium text-sm transition-all duration-200 group ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg transform scale-105"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:scale-105"
                }`}
              >
                <span className={`mr-3 text-lg transition-transform duration-200 ${
                  activeTab === tab.id ? "scale-110" : "group-hover:scale-110"
                }`}>
                  {tab.icon}
                </span>
                <span className="font-medium">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="mb-3 px-4 py-2 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-900">Nguyễn Văn A</p>
            <p className="text-xs text-gray-500">tenant@demo.com</p>
          </div>
          <Link
            href="/"
            className="w-full flex items-center px-4 py-3 text-left rounded-xl font-medium text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
          >
            <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-200">🚪</span>
            <span>Đăng xuất</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-20">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {[
                    { id: "overview", label: "Tổng quan" },
                    { id: "search", label: "Tìm phòng" },
                    { id: "bills", label: "Hóa đơn" },
                    { id: "reports", label: "Báo cáo sự cố" },
                    { id: "contract", label: "Hợp đồng" },
                    { id: "profile", label: "Hồ sơ" },
                  ].find(tab => tab.id === activeTab)?.label}
                </h2>
                <p className="text-gray-600">Quản lý thông tin cá nhân và hoạt động thuê trọ</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('vi-VN')}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">🏠</div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Phòng hiện tại</p>
                    <Link href="/tenant-dashboard/room-details" className="text-2xl font-bold text-blue-600 hover:text-blue-800">101</Link>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">💳</div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Hóa đơn chưa thanh toán</p>
                    <p className="text-2xl font-bold text-yellow-600">2</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">📅</div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Hợp đồng còn lại</p>
                    <p className="text-2xl font-bold text-blue-600">11 tháng</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">⭐</div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Đánh giá phòng</p>
                    <p className="text-2xl font-bold text-green-600">4.5/5</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hóa đơn cần thanh toán</h3>
                <div className="space-y-3">
                  {mockMyBills.filter(bill => bill.status === "pending").map((bill) => (
                    <div key={bill.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{bill.type} - {bill.month}</p>
                        <p className="text-sm text-gray-600">{bill.amount.toLocaleString()}đ</p>
                      </div>
                      <Link href="/payment" className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 inline-block">
                        Thanh toán
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Báo cáo sự cố gần đây</h3>
                <div className="space-y-3">
                  {mockMyReports.map((report) => (
                    <div key={report.id} className="p-3 bg-gray-50 rounded">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium">{report.issue}</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(report.status)}`}>
                          {getStatusText(report.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{report.response}</p>
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  + Báo cáo sự cố mới
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Rooms Tab */}
        {activeTab === "search" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tìm kiếm phòng trọ</h2>
              
              {/* Search Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá từ</label>
                  <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="2,000,000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá đến</label>
                  <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="5,000,000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Diện tích tối thiểu</label>
                  <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="25" />
                </div>
                <div className="flex items-end">
                  <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </div>

            {/* Available Rooms */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAvailableRooms.map((room) => (
                <div key={room.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Hình ảnh phòng {room.number}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Phòng {room.number}</h3>
                    <p className="text-2xl font-bold text-green-600 mb-2">{room.price.toLocaleString()}đ/tháng</p>
                    <p className="text-gray-600 mb-3">Diện tích: {room.area}m²</p>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">Tiện nghi:</p>
                      <div className="flex flex-wrap gap-1">
                        {room.amenities.map((amenity, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Link href="/book-room" className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 text-center">
                        Đặt phòng
                      </Link>
                      <Link href={`/room-details/${room.number}`} className="flex-1 border border-green-600 text-green-600 py-2 rounded hover:bg-green-50 text-center">
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bills Tab */}
        {activeTab === "bills" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Hóa đơn của tôi</h2>
            
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loại hóa đơn
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tháng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số tiền
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hạn thanh toán
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockMyBills.map((bill) => (
                    <tr key={bill.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {bill.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {bill.month}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {bill.amount.toLocaleString()}đ
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {bill.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(bill.status)}`}>
                          {getStatusText(bill.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {bill.status === "pending" ? (
                          <Link href="/payment" className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 inline-block">
                            Thanh toán
                          </Link>
                        ) : (
                          <Link href={`/receipt/${bill.id}`} className="text-blue-600 hover:text-blue-900">
                            Xem biên lai
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Contract Tab */}
        {activeTab === "contract" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Hợp đồng thuê phòng</h2>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin hợp đồng</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Phòng số:</span>
                      <span className="ml-2 text-sm text-gray-900">{mockContract.roomNumber}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Ngày bắt đầu:</span>
                      <span className="ml-2 text-sm text-gray-900">{mockContract.startDate}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Ngày kết thúc:</span>
                      <span className="ml-2 text-sm text-gray-900">{mockContract.endDate}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Tiền thuê hàng tháng:</span>
                      <span className="ml-2 text-sm text-gray-900">{mockContract.monthlyRent.toLocaleString()}đ</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Tiền cọc:</span>
                      <span className="ml-2 text-sm text-gray-900">{mockContract.deposit.toLocaleString()}đ</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Trạng thái:</span>
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(mockContract.status)}`}>
                        {getStatusText(mockContract.status)}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                      Tải hợp đồng PDF
                    </button>
                    <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                      Yêu cầu gia hạn
                    </button>
                    <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                      Yêu cầu trả phòng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Báo cáo sự cố</h2>
              <button
                onClick={() => setShowReportModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
              >
                <span className="mr-2">+</span>
                Báo cáo sự cố mới
              </button>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vấn đề
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày báo cáo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mức độ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phản hồi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockMyReports.map((report) => (
                    <tr key={report.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {report.issue}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          report.priority === 'high' ? 'bg-red-100 text-red-800' :
                          report.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {report.priority === 'high' ? 'Cao' :
                           report.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(report.status)}`}>
                          {getStatusText(report.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {report.response || "Chưa có phản hồi"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Hồ sơ cá nhân</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                      A
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Nguyễn Văn A</h3>
                    <p className="text-gray-600 mb-4">Khách thuê</p>
                    <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Đang thuê phòng 101
                    </div>
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Chỉnh sửa ảnh đại diện
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Information */}
              <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Thông tin cá nhân</h3>
                    <button className="text-green-600 hover:text-green-700 font-medium">
                      Chỉnh sửa
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                      <input
                        type="text"
                        value="Nguyễn Văn A"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value="tenant@demo.com"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                      <input
                        type="tel"
                        value="0123456789"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CCCD/CMND</label>
                      <input
                        type="text"
                        value="123456789012"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ngày sinh</label>
                      <input
                        type="date"
                        value="1995-05-15"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50" disabled>
                        <option>Nam</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ thường trú</label>
                      <input
                        type="text"
                        value="456 Đường XYZ, Quận ABC, TP.HCM"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rental Information */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Thông tin thuê trọ</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <div className="text-2xl mb-2">🏠</div>
                  <div className="text-sm text-gray-600 mb-1">Phòng hiện tại</div>
                  <div className="font-semibold text-gray-900">Phòng 101</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <div className="text-2xl mb-2">📅</div>
                  <div className="text-sm text-gray-600 mb-1">Ngày bắt đầu thuê</div>
                  <div className="font-semibold text-gray-900">01/01/2024</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl text-center">
                  <div className="text-2xl mb-2">💰</div>
                  <div className="text-sm text-gray-600 mb-1">Tiền thuê/tháng</div>
                  <div className="font-semibold text-gray-900">3,500,000đ</div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Liên hệ khẩn cấp</h3>
                <button className="text-green-600 hover:text-green-700 font-medium">
                  Chỉnh sửa
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tên người liên hệ</label>
                  <input
                    type="text"
                    value="Nguyễn Văn B (Anh trai)"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    value="0987654321"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Cài đặt tài khoản</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-medium text-gray-900">Thông báo email</div>
                    <div className="text-sm text-gray-600">Nhận thông báo về hóa đơn và sự cố</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-medium text-gray-900">Thông báo SMS</div>
                    <div className="text-sm text-gray-600">Nhận tin nhắn về thanh toán</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                    Đổi mật khẩu
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        </main>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Báo cáo sự cố mới</h3>
              <p className="text-gray-600 mt-1">Mô tả chi tiết vấn đề bạn gặp phải</p>
            </div>
            <form onSubmit={handleSubmitReport} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại sự cố *
                  </label>
                  <select
                    value={reportForm.issue}
                    onChange={(e) => setReportForm({...reportForm, issue: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Chọn loại sự cố</option>
                    <option value="Máy lạnh không hoạt động">Máy lạnh không hoạt động</option>
                    <option value="Vòi nước bị rò rỉ">Vòi nước bị rò rỉ</option>
                    <option value="Bóng đèn hỏng">Bóng đèn hỏng</option>
                    <option value="Ổ cắm điện hỏng">Ổ cắm điện hỏng</option>
                    <option value="Cửa sổ/cửa ra vào hỏng">Cửa sổ/cửa ra vào hỏng</option>
                    <option value="Internet không hoạt động">Internet không hoạt động</option>
                    <option value="Vấn đề vệ sinh">Vấn đề vệ sinh</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vị trí
                  </label>
                  <input
                    type="text"
                    value={reportForm.location}
                    onChange={(e) => setReportForm({...reportForm, location: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="VD: Phòng ngủ, Phòng tắm, Ban công..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mức độ ưu tiên
                  </label>
                  <select
                    value={reportForm.priority}
                    onChange={(e) => setReportForm({...reportForm, priority: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="low">Thấp - Không ảnh hưởng nhiều</option>
                    <option value="medium">Trung bình - Cần xử lý sớm</option>
                    <option value="high">Cao - Cần xử lý ngay</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả chi tiết *
                  </label>
                  <textarea
                    value={reportForm.description}
                    onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    rows={4}
                    placeholder="Mô tả chi tiết về vấn đề, thời gian xảy ra, mức độ ảnh hưởng..."
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Gửi báo cáo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
