"use client";

import Link from "next/link";
import { useState } from "react";

// Mock data
const mockRooms = [
  { id: 1, number: "101", status: "occupied", tenant: "Nguyễn Văn A", price: 3000000, area: 25 },
  { id: 2, number: "102", status: "available", tenant: null, price: 3200000, area: 28 },
  { id: 3, number: "103", status: "maintenance", tenant: null, price: 3000000, area: 25 },
  { id: 4, number: "201", status: "occupied", tenant: "Trần Thị B", price: 3500000, area: 30 },
  { id: 5, number: "202", status: "available", tenant: null, price: 3500000, area: 30 },
];

const mockBills = [
  { id: 1, room: "101", tenant: "Nguyễn Văn A", amount: 3500000, type: "monthly", status: "paid", dueDate: "2024-01-25" },
  { id: 2, room: "201", tenant: "Trần Thị B", amount: 4000000, type: "monthly", status: "pending", dueDate: "2024-01-25" },
  { id: 3, room: "102", tenant: "Lê Văn C", amount: 500000, type: "electric", status: "overdue", dueDate: "2024-01-20" },
];

const mockReports = [
  { id: 1, room: "101", issue: "Máy lạnh không hoạt động", status: "pending", date: "2024-01-15", tenant: "Nguyễn Văn A" },
  { id: 2, room: "201", issue: "Vòi nước bị rò rỉ", status: "in-progress", date: "2024-01-14", tenant: "Trần Thị B" },
  { id: 3, room: "103", issue: "Đèn phòng bị hỏng", status: "completed", date: "2024-01-12", tenant: "Lê Văn C" },
];

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "occupied": return "bg-green-100 text-green-800";
      case "available": return "bg-blue-100 text-blue-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "occupied": return "Đã thuê";
      case "available": return "Trống";
      case "maintenance": return "Bảo trì";
      case "paid": return "Đã thanh toán";
      case "pending": return "Chờ thanh toán";
      case "overdue": return "Quá hạn";
      case "in-progress": return "Đang xử lý";
      case "completed": return "Hoàn thành";
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-30">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl mr-3 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">🏠</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">SmartDorm</h1>
              <p className="text-sm text-gray-500">Dashboard Chủ trọ</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          <div className="space-y-2">
            {[
              { id: "overview", label: "Tổng quan", icon: "📊" },
              { id: "rooms", label: "Quản lý phòng", icon: "🏠" },
              { id: "tenants", label: "Khách thuê", icon: "👥" },
              { id: "bills", label: "Hóa đơn", icon: "💳" },
              { id: "reports", label: "Báo cáo sự cố", icon: "🔧" },
              { id: "revenue", label: "Doanh thu", icon: "📈" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-xl font-medium text-sm transition-all duration-200 group ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105"
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
            <p className="text-sm font-medium text-gray-900">Chủ trọ ABC</p>
            <p className="text-xs text-gray-500">owner@demo.com</p>
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
                    { id: "rooms", label: "Quản lý phòng" },
                    { id: "tenants", label: "Khách thuê" },
                    { id: "bills", label: "Hóa đơn" },
                    { id: "reports", label: "Báo cáo sự cố" },
                    { id: "revenue", label: "Doanh thu" },
                  ].find(tab => tab.id === activeTab)?.label}
                </h2>
                <p className="text-gray-600">Quản lý và theo dõi hoạt động của hệ thống</p>
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
                    <p className="text-sm font-medium text-gray-600">Tổng phòng</p>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">✅</div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Đã thuê</p>
                    <p className="text-2xl font-bold text-green-600">2</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">🔓</div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Phòng trống</p>
                    <p className="text-2xl font-bold text-blue-600">2</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">💰</div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Doanh thu tháng</p>
                    <p className="text-2xl font-bold text-green-600">7.5M</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hóa đơn cần xử lý</h3>
                <div className="space-y-3">
                  {mockBills.filter(bill => bill.status !== "paid").map((bill) => (
                    <div key={bill.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">Phòng {bill.room} - {bill.tenant}</p>
                        <p className="text-sm text-gray-600">{bill.amount.toLocaleString()}đ</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(bill.status)}`}>
                        {getStatusText(bill.status)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Báo cáo sự cố mới</h3>
                <div className="space-y-3">
                  {mockReports.filter(report => report.status !== "completed").map((report) => (
                    <div key={report.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">Phòng {report.room}</p>
                        <p className="text-sm text-gray-600">{report.issue}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(report.status)}`}>
                        {getStatusText(report.status)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rooms Tab */}
        {activeTab === "rooms" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Quản lý phòng trọ</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                + Thêm phòng mới
              </button>
            </div>
            
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phòng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Khách thuê
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giá thuê
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Diện tích
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockRooms.map((room) => (
                    <tr key={room.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {room.number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(room.status)}`}>
                          {getStatusText(room.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {room.tenant || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {room.price.toLocaleString()}đ
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {room.area}m²
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Sửa</button>
                        <button className="text-red-600 hover:text-red-900">Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bills Tab */}
        {activeTab === "bills" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Quản lý hóa đơn</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                + Tạo hóa đơn mới
              </button>
            </div>
            
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phòng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Khách thuê
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loại hóa đơn
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
                  {mockBills.map((bill) => (
                    <tr key={bill.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {bill.room}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {bill.tenant}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {bill.type === "monthly" ? "Tiền phòng" : "Tiền điện"}
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
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Xem</button>
                        <button className="text-green-600 hover:text-green-900">Nhắc nhở</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Other tabs would be implemented similarly */}
        {activeTab === "tenants" && (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quản lý khách thuê</h2>
            <p className="text-gray-600 mb-6">Xem và quản lý thông tin tất cả khách thuê</p>
            <Link href="/owner-dashboard/tenants" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block">
              Xem chi tiết
            </Link>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Báo cáo sự cố</h2>
            <p className="text-gray-600 mb-6">Quản lý và xử lý các báo cáo sự cố từ khách thuê</p>
            <Link href="/owner-dashboard/reports" className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors inline-block">
              Xem chi tiết
            </Link>
          </div>
        )}

        {activeTab === "revenue" && (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Báo cáo doanh thu</h2>
            <p className="text-gray-600 mb-6">Theo dõi và phân tích doanh thu, chi phí và lợi nhuận</p>
            <Link href="/owner-dashboard/revenue" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-block">
              Xem chi tiết
            </Link>
          </div>
        )}
        </main>
      </div>
    </div>
  );
}
