"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

// Mock data
const mockAllRooms = [
  {
    id: 1,
    number: "101",
    price: 3500000,
    area: 30,
    amenities: ["Máy lạnh", "Tủ lạnh", "WiFi", "Ban công"],
    images: ["room1.jpg"],
    status: "occupied", // occupied, available, maintenance
    tenant: "Nguyễn Văn A",
    moveInDate: "2024-01-01"
  },
  {
    id: 2,
    number: "102",
    price: 3200000,
    area: 28,
    amenities: ["Máy lạnh", "Tủ lạnh", "WiFi"],
    images: ["room2.jpg"],
    status: "available",
    tenant: null,
    moveInDate: null
  },
  {
    id: 3,
    number: "103",
    price: 3800000,
    area: 32,
    amenities: ["Máy lạnh", "Tủ lạnh", "WiFi", "Bếp riêng"],
    images: ["room3.jpg"],
    status: "maintenance",
    tenant: null,
    moveInDate: null,
    maintenanceReason: "Sửa chữa hệ thống điện"
  },
  {
    id: 4,
    number: "201",
    price: 3600000,
    area: 30,
    amenities: ["Máy lạnh", "Tủ lạnh", "WiFi", "Ban công"],
    images: ["room4.jpg"],
    status: "occupied",
    tenant: "Trần Thị B",
    moveInDate: "2023-12-15"
  },
  {
    id: 5,
    number: "202",
    price: 3500000,
    area: 30,
    amenities: ["Máy lạnh", "Tủ lạnh", "WiFi", "Ban công"],
    images: ["room5.jpg"],
    status: "available",
    tenant: null,
    moveInDate: null
  },
  {
    id: 6,
    number: "203",
    price: 3700000,
    area: 31,
    amenities: ["Máy lạnh", "Tủ lạnh", "WiFi", "Ban công", "Máy giặt"],
    images: ["room6.jpg"],
    status: "available",
    tenant: null,
    moveInDate: null
  },
  {
    id: 7,
    number: "301",
    price: 4000000,
    area: 35,
    amenities: ["Máy lạnh", "Tủ lạnh", "WiFi", "Ban công", "Bếp riêng"],
    images: ["room7.jpg"],
    status: "available",
    tenant: null,
    moveInDate: null
  },
  {
    id: 8,
    number: "302",
    price: 4200000,
    area: 36,
    amenities: ["Máy lạnh", "Tủ lạnh", "WiFi", "Ban công", "Bếp riêng", "Máy giặt"],
    images: ["room8.jpg"],
    status: "occupied",
    tenant: "Lê Văn C",
    moveInDate: "2024-02-01"
  },
  {
    id: 9,
    number: "303",
    price: 3900000,
    area: 34,
    amenities: ["Máy lạnh", "Tủ lạnh", "WiFi", "Ban công"],
    images: ["room9.jpg"],
    status: "maintenance",
    tenant: null,
    moveInDate: null,
    maintenanceReason: "Thay thế máy lạnh"
  }
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
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportForm, setReportForm] = useState({
    issue: "",
    description: "",
    priority: "medium",
    location: ""
  });

  // Profile editing states
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showEditEmergencyModal, setShowEditEmergencyModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // Profile form states
  const [profileForm, setProfileForm] = useState({
    fullName: "Nguyễn Văn A",
    email: "tenant@demo.com",
    phone: "0123456789",
    idNumber: "123456789012",
    birthDate: "1995-05-15",
    gender: "Nam",
    address: "456 Đường XYZ, Quận ABC, TP.HCM"
  });

  const [emergencyForm, setEmergencyForm] = useState({
    name: "Nguyễn Văn B (Anh trai)",
    phone: "0987654321",
    relationship: "Anh trai",
    address: ""
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [avatar, setAvatar] = useState("A");
  const [avatarType, setAvatarType] = useState<"letter" | "image">("letter");
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const [avatarTab, setAvatarTab] = useState<"letter" | "upload">("letter");

  // Room search filters
  const [roomFilters, setRoomFilters] = useState({
    status: "all", // all, available, occupied, maintenance
    minPrice: "",
    maxPrice: "",
    minArea: "",
    searchTerm: ""
  });

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
      case "available": return "Phòng trống";
      case "occupied": return "Đã thuê";
      case "maintenance": return "Bảo trì";
      default: return status;
    }
  };

  const getRoomStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "occupied": return "bg-blue-100 text-blue-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Filter rooms based on criteria
  const filteredRooms = mockAllRooms.filter(room => {
    const matchesStatus = roomFilters.status === "all" || room.status === roomFilters.status;
    const matchesMinPrice = !roomFilters.minPrice || room.price >= parseInt(roomFilters.minPrice);
    const matchesMaxPrice = !roomFilters.maxPrice || room.price <= parseInt(roomFilters.maxPrice);
    const matchesMinArea = !roomFilters.minArea || room.area >= parseInt(roomFilters.minArea);
    const matchesSearch = !roomFilters.searchTerm ||
      room.number.toLowerCase().includes(roomFilters.searchTerm.toLowerCase()) ||
      room.amenities.some(amenity => amenity.toLowerCase().includes(roomFilters.searchTerm.toLowerCase()));

    return matchesStatus && matchesMinPrice && matchesMaxPrice && matchesMinArea && matchesSearch;
  });

  const handleFilterChange = (field: string, value: string) => {
    setRoomFilters(prev => ({
      ...prev,
      [field]: value
    }));
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

  // Profile handling functions
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log("Updating profile:", profileForm);
    setShowEditProfileModal(false);
    alert("Cập nhật thông tin thành công!");
  };

  const handleUpdateEmergency = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log("Updating emergency contact:", emergencyForm);
    setShowEditEmergencyModal(false);
    alert("Cập nhật liên hệ khẩn cấp thành công!");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      alert("Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }

    // Simulate API call
    console.log("Changing password");
    setShowChangePasswordModal(false);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    alert("Đổi mật khẩu thành công!");
  };

  const handleAvatarChange = (newAvatar: string) => {
    setAvatar(newAvatar);
    setAvatarType("letter");
    setAvatarImage(null);
    setShowAvatarModal(false);
    alert("Cập nhật ảnh đại diện thành công!");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("Kích thước ảnh không được vượt quá 5MB!");
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert("Vui lòng chọn file ảnh!");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setAvatarImage(imageUrl);
        setAvatarType("image");
        setShowAvatarModal(false);
        alert("Cập nhật ảnh đại diện thành công!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setAvatarImage(null);
    setAvatarType("letter");
    setAvatar("A");
    alert("Đã xóa ảnh đại diện!");
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
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-left rounded-xl font-medium text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
          >
            <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-200">🚪</span>
            <span>Đăng xuất</span>
          </button>
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">🏠</div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Phòng hiện tại</p>
                      <Link href="/room-details/101" className="text-2xl font-bold text-blue-600 hover:text-blue-800">101</Link>
                    </div>
                  </div>
                  <Link href="/rate-room" className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors">
                    ⭐ Đánh giá
                  </Link>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">💳</div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Hóa đơn chưa thanh toán</p>
                      <p className="text-2xl font-bold text-yellow-600">2</p>
                    </div>
                  </div>
                  <Link href="/payment-history" className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors">
                    Lịch sử
                  </Link>
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
                <button
                  onClick={() => setShowReportModal(true)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  + Báo cáo sự cố mới
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Link href="/messages" className="bg-blue-600 text-white p-4 rounded-lg text-center hover:bg-blue-700 transition-colors">
                  <div className="text-2xl mb-2">💬</div>
                  <div className="font-medium text-sm">Tin nhắn</div>
                </Link>
                <Link href="/notifications" className="bg-purple-600 text-white p-4 rounded-lg text-center hover:bg-purple-700 transition-colors">
                  <div className="text-2xl mb-2">🔔</div>
                  <div className="font-medium text-sm">Thông báo</div>
                </Link>
                <Link href="/payment-history" className="bg-green-600 text-white p-4 rounded-lg text-center hover:bg-green-700 transition-colors">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-medium text-sm">Lịch sử</div>
                </Link>
                <Link href="/rate-room" className="bg-yellow-600 text-white p-4 rounded-lg text-center hover:bg-yellow-700 transition-colors">
                  <div className="text-2xl mb-2">⭐</div>
                  <div className="font-medium text-sm">Viết đánh giá</div>
                </Link>
                <Link href="/tenant-dashboard/reviews" className="bg-orange-600 text-white p-4 rounded-lg text-center hover:bg-orange-700 transition-colors">
                  <div className="text-2xl mb-2">📝</div>
                  <div className="font-medium text-sm">Đánh giá của tôi</div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Search Rooms Tab */}
        {activeTab === "search" && (
          <div className="space-y-6">
            {/* Search Header & Stats */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Danh sách phòng trọ</h2>
                <div className="text-sm text-gray-600">
                  Hiển thị {filteredRooms.length} / {mockAllRooms.length} phòng
                </div>
              </div>

              {/* Room Status Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {mockAllRooms.filter(r => r.status === "available").length}
                  </div>
                  <div className="text-sm text-green-700">Phòng trống</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {mockAllRooms.filter(r => r.status === "occupied").length}
                  </div>
                  <div className="text-sm text-blue-700">Đã thuê</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {mockAllRooms.filter(r => r.status === "maintenance").length}
                  </div>
                  <div className="text-sm text-yellow-700">Bảo trì</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-600">
                    {mockAllRooms.length}
                  </div>
                  <div className="text-sm text-gray-700">Tổng phòng</div>
                </div>
              </div>

              {/* Search Filters */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                  <select
                    value={roomFilters.status}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                    className="form-input w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900"
                  >
                    <option value="all">Tất cả</option>
                    <option value="available">Phòng trống</option>
                    <option value="occupied">Đã thuê</option>
                    <option value="maintenance">Bảo trì</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá từ</label>
                  <input
                    type="number"
                    value={roomFilters.minPrice}
                    onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                    className="form-input w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500"
                    placeholder="2,000,000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá đến</label>
                  <input
                    type="number"
                    value={roomFilters.maxPrice}
                    onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                    className="form-input w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500"
                    placeholder="5,000,000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Diện tích tối thiểu</label>
                  <input
                    type="number"
                    value={roomFilters.minArea}
                    onChange={(e) => handleFilterChange("minArea", e.target.value)}
                    className="form-input w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500"
                    placeholder="25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tìm kiếm</label>
                  <input
                    type="text"
                    value={roomFilters.searchTerm}
                    onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
                    className="form-input w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500"
                    placeholder="Số phòng, tiện nghi..."
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => setRoomFilters({
                      status: "all",
                      minPrice: "",
                      maxPrice: "",
                      minArea: "",
                      searchTerm: ""
                    })}
                    className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              </div>
            </div>

            {/* All Rooms */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room) => (
                <div key={room.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200 flex items-center justify-center relative">
                    <span className="text-gray-500">Hình ảnh phòng {room.number}</span>
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getRoomStatusColor(room.status)}`}>
                        {getStatusText(room.status)}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Phòng {room.number}</h3>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{room.price.toLocaleString()}đ</p>
                        <p className="text-sm text-gray-500">/tháng</p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-3">Diện tích: {room.area}m²</p>

                    {/* Tenant Info for Occupied Rooms */}
                    {room.status === "occupied" && room.tenant && (
                      <div className="mb-3 p-2 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <span className="font-medium">Khách thuê:</span> {room.tenant}
                        </p>
                        <p className="text-xs text-blue-600">
                          Từ: {room.moveInDate}
                        </p>
                      </div>
                    )}

                    {/* Maintenance Info */}
                    {room.status === "maintenance" && room.maintenanceReason && (
                      <div className="mb-3 p-2 bg-yellow-50 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <span className="font-medium">Lý do bảo trì:</span> {room.maintenanceReason}
                        </p>
                      </div>
                    )}

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
                      {room.status === "available" ? (
                        <>
                          <Link href="/book-room" className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 text-center font-medium">
                            Đặt phòng
                          </Link>
                          <Link href={`/room-details/${room.number}`} className="flex-1 border border-green-600 text-green-600 py-2 rounded hover:bg-green-50 text-center font-medium">
                            Xem chi tiết
                          </Link>
                        </>
                      ) : room.status === "occupied" ? (
                        <>
                          <Link href={`/room-details/${room.number}`} className="flex-1 border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50 text-center font-medium">
                            Xem chi tiết
                          </Link>
                          <button disabled className="flex-1 bg-gray-300 text-gray-500 py-2 rounded cursor-not-allowed font-medium">
                            Đã thuê
                          </button>
                        </>
                      ) : (
                        <>
                          <Link href={`/room-details/${room.number}`} className="flex-1 border border-yellow-600 text-yellow-600 py-2 rounded hover:bg-yellow-50 text-center font-medium">
                            Xem chi tiết
                          </Link>
                          <button disabled className="flex-1 bg-gray-300 text-gray-500 py-2 rounded cursor-not-allowed font-medium">
                            Bảo trì
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredRooms.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy phòng nào</h3>
                <p className="text-gray-600 mb-4">Thử điều chỉnh bộ lọc để tìm phòng phù hợp</p>
                <button
                  onClick={() => setRoomFilters({
                    status: "all",
                    minPrice: "",
                    maxPrice: "",
                    minArea: "",
                    searchTerm: ""
                  })}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            )}
          </div>
        )}

        {/* Bills Tab */}
        {activeTab === "bills" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Hóa đơn của tôi</h2>
              <div className="text-sm text-gray-600">
                Quản lý thông tin và hoạt động thuê trọ
              </div>
            </div>
            
            {/* Bills Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100">Chờ thanh toán</p>
                    <p className="text-2xl font-bold">
                      {mockMyBills.filter(bill => bill.status === "pending").length}
                    </p>
                  </div>
                  <div className="text-3xl opacity-80">📋</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Đã thanh toán</p>
                    <p className="text-2xl font-bold">
                      {mockMyBills.filter(bill => bill.status === "paid").length}
                    </p>
                  </div>
                  <div className="text-3xl opacity-80">✅</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Tổng tiền tháng này</p>
                    <p className="text-2xl font-bold">
                      {mockMyBills
                        .filter(bill => bill.month === "02/2024")
                        .reduce((sum, bill) => sum + bill.amount, 0)
                        .toLocaleString()}đ
                    </p>
                  </div>
                  <div className="text-3xl opacity-80">💰</div>
                </div>
              </div>
            </div>

            {/* Bills List */}
            <div className="space-y-4">
              {mockMyBills.map((bill) => (
                <div key={bill.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                          bill.type === "Tiền phòng" ? "bg-blue-100" :
                          bill.type === "Tiền điện" ? "bg-yellow-100" : "bg-cyan-100"
                        }`}>
                          {bill.type === "Tiền phòng" ? "🏠" :
                           bill.type === "Tiền điện" ? "⚡" : "💧"}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{bill.type}</h3>
                          <p className="text-sm text-gray-600">Tháng {bill.month}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {bill.amount.toLocaleString()}đ
                        </div>
                        <div className="text-sm text-gray-600">
                          Hạn: {bill.dueDate}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <span className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(bill.status)}`}>
                        {getStatusText(bill.status)}
                      </span>
                      <div className="flex space-x-3">
                        {bill.status === "pending" ? (
                          <Link 
                            href="/payment" 
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-medium shadow-lg hover:shadow-xl"
                          >
                            💳 Thanh toán ngay
                          </Link>
                        ) : (
                          <Link 
                            href={`/receipt/${bill.id}`} 
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg hover:shadow-xl"
                          >
                            📄 Xem biên lai
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Reminder */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">💡</div>
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">Lời nhắc thanh toán</h4>
                  <p className="text-amber-700 text-sm">
                    Để tránh phí phạt, vui lòng thanh toán các hóa đơn trước ngày hết hạn. 
                    Bạn có thể thanh toán online qua nhiều phương thức: MoMo, ZaloPay, Chuyển khoản ngân hàng.
                  </p>
                </div>
              </div>
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
                    <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold cursor-pointer hover:scale-105 transition-transform overflow-hidden"
                         onClick={() => setShowAvatarModal(true)}>
                      {avatarType === "image" && avatarImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={avatarImage} 
                          alt="Avatar" 
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        avatar
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{profileForm.fullName}</h3>
                    <p className="text-gray-600 mb-4">Khách thuê</p>
                    <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Đang thuê phòng 101
                    </div>
                    <button 
                      onClick={() => setShowAvatarModal(true)}
                      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
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
                    <button 
                      onClick={() => setShowEditProfileModal(true)}
                      className="text-green-600 hover:text-green-700 font-medium">
                      Chỉnh sửa
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                      <input
                        type="text"
                        value={profileForm.fullName}
                        className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-900"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-900"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-900"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CCCD/CMND</label>
                      <input
                        type="text"
                        value={profileForm.idNumber}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ngày sinh</label>
                      <input
                        type="date"
                        value={profileForm.birthDate}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50" disabled>
                        <option>{profileForm.gender}</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ thường trú</label>
                      <input
                        type="text"
                        value={profileForm.address}
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
                <button 
                  onClick={() => setShowEditEmergencyModal(true)}
                  className="text-green-600 hover:text-green-700 font-medium">
                  Chỉnh sửa
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tên người liên hệ</label>
                  <input
                    type="text"
                    value={emergencyForm.name}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-900"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    value={emergencyForm.phone}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-900"
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
                  <button 
                    onClick={() => setShowChangePasswordModal(true)}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
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
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
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
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500"
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
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
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
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500"
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

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Chỉnh sửa thông tin cá nhân</h3>
              <p className="text-gray-600 mt-1">Cập nhật thông tin cá nhân của bạn</p>
            </div>
            <form onSubmit={handleUpdateProfile} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm({...profileForm, fullName: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CCCD/CMND *
                  </label>
                  <input
                    type="text"
                    value={profileForm.idNumber}
                    onChange={(e) => setProfileForm({...profileForm, idNumber: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    value={profileForm.birthDate}
                    onChange={(e) => setProfileForm({...profileForm, birthDate: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giới tính
                  </label>
                  <select
                    value={profileForm.gender}
                    onChange={(e) => setProfileForm({...profileForm, gender: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ thường trú
                  </label>
                  <textarea
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    rows={3}
                    placeholder="Nhập địa chỉ thường trú của bạn"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Emergency Contact Modal */}
      {showEditEmergencyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Chỉnh sửa liên hệ khẩn cấp</h3>
              <p className="text-gray-600 mt-1">Cập nhật thông tin người liên hệ khẩn cấp</p>
            </div>
            <form onSubmit={handleUpdateEmergency} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên người liên hệ *
                  </label>
                  <input
                    type="text"
                    value={emergencyForm.name}
                    onChange={(e) => setEmergencyForm({...emergencyForm, name: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    required
                    placeholder="VD: Nguyễn Văn B"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mối quan hệ
                  </label>
                  <select
                    value={emergencyForm.relationship}
                    onChange={(e) => setEmergencyForm({...emergencyForm, relationship: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                  >
                    <option value="Bố">Bố</option>
                    <option value="Mẹ">Mẹ</option>
                    <option value="Anh trai">Anh trai</option>
                    <option value="Chị gái">Chị gái</option>
                    <option value="Em trai">Em trai</option>
                    <option value="Em gái">Em gái</option>
                    <option value="Bạn bè">Bạn bè</option>
                    <option value="Người thân">Người thân</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    value={emergencyForm.phone}
                    onChange={(e) => setEmergencyForm({...emergencyForm, phone: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    required
                    placeholder="VD: 0987654321"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ (tùy chọn)
                  </label>
                  <textarea
                    value={emergencyForm.address}
                    onChange={(e) => setEmergencyForm({...emergencyForm, address: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    rows={3}
                    placeholder="Địa chỉ của người liên hệ khẩn cấp"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditEmergencyModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Đổi mật khẩu</h3>
              <p className="text-gray-600 mt-1">Cập nhật mật khẩu cho tài khoản của bạn</p>
            </div>
            <form onSubmit={handleChangePassword} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mật khẩu hiện tại *
                  </label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    required
                    placeholder="Nhập mật khẩu hiện tại"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mật khẩu mới *
                  </label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    required
                    placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
                    minLength={6}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Xác nhận mật khẩu mới *
                  </label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    required
                    placeholder="Nhập lại mật khẩu mới"
                  />
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Lưu ý:</strong> Mật khẩu mới phải có ít nhất 6 ký tự và nên bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
                  </p>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowChangePasswordModal(false);
                    setPasswordForm({currentPassword: "", newPassword: "", confirmPassword: ""});
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Đổi mật khẩu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Avatar Selection Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Chỉnh sửa ảnh đại diện</h3>
              <p className="text-gray-600 mt-1">Chọn ký tự hoặc tải ảnh làm ảnh đại diện của bạn</p>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setAvatarTab("letter")}
                className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                  avatarTab === "letter" 
                    ? "text-green-600 border-b-2 border-green-600 bg-green-50" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="mr-2">🔤</span>
                Chọn ký tự
              </button>
              <button
                onClick={() => setAvatarTab("upload")}
                className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                  avatarTab === "upload" 
                    ? "text-green-600 border-b-2 border-green-600 bg-green-50" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="mr-2">📷</span>
                Tải ảnh lên
              </button>
            </div>

            <div className="p-6">
              {/* Letter Selection Tab */}
              {avatarTab === "letter" && (
                <div>
                  <div className="grid grid-cols-5 gap-4 mb-6">
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'].map((letter) => (
                      <button
                        key={letter}
                        onClick={() => handleAvatarChange(letter)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all hover:scale-110 ${
                          avatar === letter && avatarType === "letter"
                            ? 'bg-gradient-to-r from-green-600 to-blue-600 ring-4 ring-green-200' 
                            : 'bg-gradient-to-r from-gray-400 to-gray-600 hover:from-green-400 hover:to-blue-500'
                        }`}
                      >
                        {letter}
                      </button>
                    ))}
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-4">Ảnh đại diện hiện tại:</p>
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold mb-4 overflow-hidden">
                      {avatarType === "image" && avatarImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={avatarImage} 
                          alt="Current Avatar" 
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        avatar
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Upload Tab */}
              {avatarTab === "upload" && (
                <div className="space-y-6">
                  {/* Current Avatar Preview */}
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-4">Ảnh đại diện hiện tại:</p>
                    <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold mb-4 overflow-hidden">
                      {avatarType === "image" && avatarImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={avatarImage} 
                          alt="Current Avatar" 
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        avatar
                      )}
                    </div>
                  </div>

                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors">
                    <div className="text-4xl mb-4">📷</div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Tải ảnh lên</h4>
                    <p className="text-sm text-gray-500 mb-4">Chọn ảnh từ thiết bị của bạn</p>
                    <label className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
                      <span>Chọn ảnh</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-400 mt-2">Hỗ trợ: JPG, PNG, GIF. Tối đa 5MB</p>
                  </div>

                  {/* Remove Image Option */}
                  {avatarType === "image" && avatarImage && (
                    <div className="text-center">
                      <button
                        onClick={handleRemoveImage}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        🗑️ Xóa ảnh hiện tại
                      </button>
                    </div>
                  )}

                  {/* Upload Tips */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium text-blue-900 mb-2">💡 Gợi ý cho ảnh đẹp:</h5>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Sử dụng ảnh chân dung rõ nét</li>
                      <li>• Khuôn mặt chiếm khoảng 60% ảnh</li>
                      <li>• Ánh sáng tự nhiên, tránh ngược sáng</li>
                      <li>• Nền đơn giản, không quá rối</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowAvatarModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
