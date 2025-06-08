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
  { id: 1, issue: "Máy lạnh không hoạt động", status: "in-progress", date: "2024-01-15", response: "Đã liên hệ thợ sửa chữa" },
  { id: 2, issue: "Vòi nước bị rò rỉ", status: "completed", date: "2024-01-10", response: "Đã sửa xong" },
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="h-8 w-8 bg-green-600 rounded mr-3 flex items-center justify-center">
                  <span className="text-white font-bold">🏠</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">SmartDorm - Khách thuê</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Xin chào, Nguyễn Văn A</span>
              <Link href="/" className="text-green-600 hover:text-green-800">Đăng xuất</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
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
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === tab.id
                    ? "bg-green-100 text-green-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

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
                      <button className="flex-1 border border-green-600 text-green-600 py-2 rounded hover:bg-green-50">
                        Xem chi tiết
                      </button>
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
                          <button className="text-blue-600 hover:text-blue-900">Xem biên lai</button>
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

        {/* Other tabs */}
        {activeTab === "reports" && (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Báo cáo sự cố</h2>
            <p className="text-gray-600">Tính năng đang được phát triển...</p>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Hồ sơ cá nhân</h2>
            <p className="text-gray-600">Tính năng đang được phát triển...</p>
          </div>
        )}
      </div>
    </div>
  );
}
