"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

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

const mockConversations = [
  {
    id: 1,
    tenant: {
      name: "Nguyễn Văn A",
      room: "101",
      avatar: "👨",
      phone: "0123456789"
    },
    lastMessage: "Chào chủ trọ, em muốn hỏi về việc thanh toán tiền phòng tháng này ạ",
    lastMessageTime: "10:30",
    unreadCount: 2,
    isOnline: true,
    messages: [
      {
        id: 1,
        sender: "tenant",
        content: "Chào chủ trọ ạ!",
        timestamp: "09:15",
        date: "2024-03-15"
      },
      {
        id: 2,
        sender: "owner",
        content: "Chào bạn! Có gì cần hỗ trợ không?",
        timestamp: "09:20",
        date: "2024-03-15"
      },
      {
        id: 3,
        sender: "tenant",
        content: "Em muốn hỏi về việc thanh toán tiền phòng tháng này ạ",
        timestamp: "10:25",
        date: "2024-03-15"
      },
      {
        id: 4,
        sender: "tenant",
        content: "Em có thể chuyển khoản được không ạ?",
        timestamp: "10:30",
        date: "2024-03-15"
      }
    ]
  },
  {
    id: 2,
    tenant: {
      name: "Trần Thị B",
      room: "201",
      avatar: "👩",
      phone: "0987654321"
    },
    lastMessage: "Cảm ơn chủ trọ đã sửa vòi nước nhanh chóng ạ!",
    lastMessageTime: "14:45",
    unreadCount: 0,
    isOnline: false,
    messages: [
      {
        id: 1,
        sender: "tenant",
        content: "Chủ trọ ơi, vòi nước trong phòng em bị rò rỉ ạ",
        timestamp: "08:30",
        date: "2024-03-14"
      },
      {
        id: 2,
        sender: "owner",
        content: "Mình sẽ gọi thợ lên sửa ngay hôm nay nhé!",
        timestamp: "08:45",
        date: "2024-03-14"
      },
      {
        id: 3,
        sender: "owner",
        content: "Thợ sẽ lên vào lúc 2h chiều, bạn có ở nhà không?",
        timestamp: "10:00",
        date: "2024-03-14"
      },
      {
        id: 4,
        sender: "tenant",
        content: "Dạ có ạ, em ở nhà cả ngày",
        timestamp: "10:05",
        date: "2024-03-14"
      },
      {
        id: 5,
        sender: "tenant",
        content: "Cảm ơn chủ trọ đã sửa vòi nước nhanh chóng ạ!",
        timestamp: "14:45",
        date: "2024-03-14"
      }
    ]
  },
  {
    id: 3,
    tenant: {
      name: "Lê Văn C",
      room: "102",
      avatar: "👨‍🎓",
      phone: "0369852147"
    },
    lastMessage: "Chủ trọ cho em hỏi về quy định giờ giấc ạ",
    lastMessageTime: "Hôm qua",
    unreadCount: 1,
    isOnline: false,
    messages: [
      {
        id: 1,
        sender: "tenant",
        content: "Chủ trọ cho em hỏi về quy định giờ giấc ạ",
        timestamp: "20:30",
        date: "2024-03-14"
      }
    ]
  }
];

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Modal states
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showTenantModal, setShowTenantModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);
  const [showReportDetailModal, setShowReportDetailModal] = useState(false);
  const [showReviewResponseModal, setShowReviewResponseModal] = useState(false);

  // Form states
  const [editingRoom, setEditingRoom] = useState<any>(null);
  const [editingTenant, setEditingTenant] = useState<any>(null);
  const [editingBill, setEditingBill] = useState<any>(null);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [responseText, setResponseText] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [newMessage, setNewMessage] = useState("");

  // Form data
  const [roomForm, setRoomForm] = useState({
    number: "",
    price: "",
    area: "",
    status: "available",
    description: "",
    amenities: [] as string[]
  });

  const [tenantForm, setTenantForm] = useState({
    name: "",
    email: "",
    phone: "",
    idCard: "",
    room: "",
    startDate: "",
    deposit: "",
    emergencyContact: "",
    emergencyPhone: ""
  });

  const [billForm, setBillForm] = useState({
    room: "",
    tenant: "",
    type: "monthly",
    amount: "",
    dueDate: "",
    description: "",
    electricUsage: "",
    waterUsage: ""
  });

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

  // Modal handlers
  const openRoomModal = (room?: any) => {
    if (room) {
      setEditingRoom(room);
      setRoomForm({
        number: room.number,
        price: room.price.toString(),
        area: room.area.toString(),
        status: room.status,
        description: room.description || "",
        amenities: room.amenities || []
      });
    } else {
      setEditingRoom(null);
      setRoomForm({
        number: "",
        price: "",
        area: "",
        status: "available",
        description: "",
        amenities: []
      });
    }
    setShowRoomModal(true);
  };

  const openTenantModal = (tenant?: any) => {
    if (tenant) {
      setEditingTenant(tenant);
      setTenantForm({
        name: tenant.name,
        email: tenant.email || "",
        phone: tenant.phone,
        idCard: tenant.idCard || "",
        room: tenant.room,
        startDate: tenant.startDate,
        deposit: tenant.deposit?.toString() || "",
        emergencyContact: tenant.emergencyContact || "",
        emergencyPhone: tenant.emergencyPhone || ""
      });
    } else {
      setEditingTenant(null);
      setTenantForm({
        name: "",
        email: "",
        phone: "",
        idCard: "",
        room: "",
        startDate: "",
        deposit: "",
        emergencyContact: "",
        emergencyPhone: ""
      });
    }
    setShowTenantModal(true);
  };

  const openBillModal = (bill?: any) => {
    if (bill) {
      setEditingBill(bill);
      setBillForm({
        room: bill.room,
        tenant: bill.tenant,
        type: bill.type,
        amount: bill.amount.toString(),
        dueDate: bill.dueDate,
        description: bill.description || "",
        electricUsage: bill.electricUsage?.toString() || "",
        waterUsage: bill.waterUsage?.toString() || ""
      });
    } else {
      setEditingBill(null);
      setBillForm({
        room: "",
        tenant: "",
        type: "monthly",
        amount: "",
        dueDate: "",
        description: "",
        electricUsage: "",
        waterUsage: ""
      });
    }
    setShowBillModal(true);
  };

  const openReportDetail = (report: any) => {
    setSelectedReport(report);
    setShowReportDetailModal(true);
  };

  // Form submit handlers
  const handleRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(editingRoom ? "Updating room:" : "Creating room:", roomForm);
    setShowRoomModal(false);
    alert(editingRoom ? "Cập nhật phòng thành công!" : "Thêm phòng mới thành công!");
  };

  const handleTenantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(editingTenant ? "Updating tenant:" : "Creating tenant:", tenantForm);
    setShowTenantModal(false);
    alert(editingTenant ? "Cập nhật khách thuê thành công!" : "Thêm khách thuê mới thành công!");
  };

  const handleBillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(editingBill ? "Updating bill:" : "Creating bill:", billForm);
    setShowBillModal(false);
    alert(editingBill ? "Cập nhật hóa đơn thành công!" : "Tạo hóa đơn mới thành công!");
  };

  const handleDeleteRoom = (roomId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa phòng này?")) {
      console.log("Deleting room:", roomId);
      alert("Xóa phòng thành công!");
    }
  };

  const handleDeleteTenant = (tenantId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa khách thuê này?")) {
      console.log("Deleting tenant:", tenantId);
      alert("Xóa khách thuê thành công!");
    }
  };

  const handleUpdateReportStatus = (reportId: string, newStatus: string) => {
    console.log("Updating report status:", reportId, newStatus);
    alert(`Cập nhật trạng thái báo cáo thành "${getStatusText(newStatus)}" thành công!`);
    setShowReportDetailModal(false);
  };

  const openReviewResponseModal = (review: any) => {
    setSelectedReview(review);
    setResponseText(review.response || "");
    setShowReviewResponseModal(true);
  };

  const handleReviewResponse = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Responding to review:", selectedReview.id, responseText);
    alert("Phản hồi đánh giá thành công!");
    setShowReviewResponseModal(false);
    setResponseText("");
    setSelectedReview(null);
  };

  // Message handlers
  const selectConversation = (conversation: any) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedConversation) {
      console.log("Sending message:", newMessage, "to:", selectedConversation.tenant.name);
      // In real app, this would send the message via API
      alert("Tin nhắn đã được gửi!");
      setNewMessage("");
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
              { id: "messages", label: "Tin nhắn", icon: "💬" },
              { id: "reviews", label: "Đánh giá", icon: "⭐" },
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
                    { id: "rooms", label: "Quản lý phòng" },
                    { id: "tenants", label: "Khách thuê" },
                    { id: "bills", label: "Hóa đơn" },
                    { id: "reports", label: "Báo cáo sự cố" },
                    { id: "messages", label: "Tin nhắn" },
                    { id: "reviews", label: "Đánh giá phòng" },
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
              <button
                onClick={() => openRoomModal()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <span className="mr-2">+</span>
                Thêm phòng mới
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
                        <button
                          onClick={() => openRoomModal(room)}
                          className="text-blue-600 hover:text-blue-900 mr-3 px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDeleteRoom(room.id.toString())}
                          className="text-red-600 hover:text-red-900 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Xóa
                        </button>
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
              <button
                onClick={() => openBillModal()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <span className="mr-2">+</span>
                Tạo hóa đơn mới
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
                        <button
                          onClick={() => openBillModal(bill)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Xem
                        </button>
                        <button
                          onClick={() => openBillModal(bill)}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => alert("Đã gửi nhắc nhở thanh toán!")}
                          className="text-orange-600 hover:text-orange-900"
                        >
                          Nhắc nhở
                        </button>
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
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Quản lý khách thuê</h2>
              <button
                onClick={() => openTenantModal()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <span className="mr-2">+</span>
                Thêm khách thuê mới
              </button>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Khách thuê
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phòng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Điện thoại
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày bắt đầu
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
                  {[
                    { id: 1, name: "Nguyễn Văn A", room: "101", phone: "0123456789", startDate: "01/01/2024", status: "active" },
                    { id: 2, name: "Trần Thị B", room: "102", phone: "0987654321", startDate: "15/01/2024", status: "active" },
                    { id: 3, name: "Lê Văn C", room: "201", phone: "0369852147", startDate: "01/02/2024", status: "pending" },
                  ].map((tenant) => (
                    <tr key={tenant.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                            {tenant.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{tenant.name}</div>
                            <div className="text-sm text-gray-500">ID: {tenant.id.toString().padStart(3, '0')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {tenant.room}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tenant.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tenant.startDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          tenant.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {tenant.status === 'active' ? 'Đang thuê' : 'Chờ xác nhận'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openTenantModal(tenant)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Xem
                        </button>
                        <button
                          onClick={() => openTenantModal(tenant)}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDeleteTenant(tenant.id.toString())}
                          className="text-red-600 hover:text-red-900"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Báo cáo sự cố</h2>
              <div className="flex space-x-3">
                <select className="border border-gray-300 rounded-lg px-3 py-2">
                  <option>Tất cả trạng thái</option>
                  <option>Chờ xử lý</option>
                  <option>Đang xử lý</option>
                  <option>Hoàn thành</option>
                </select>
                <select className="border border-gray-300 rounded-lg px-3 py-2">
                  <option>Tất cả mức độ</option>
                  <option>Cao</option>
                  <option>Trung bình</option>
                  <option>Thấp</option>
                </select>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sự cố
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phòng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Khách thuê
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mức độ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày báo cáo
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
                  {[
                    {
                      id: 1,
                      issue: "Máy lạnh không hoạt động",
                      room: "101",
                      tenant: "Nguyễn Văn A",
                      priority: "high",
                      date: "2024-02-20",
                      status: "in-progress",
                      description: "Máy lạnh không thổi lạnh từ 2 ngày nay"
                    },
                    {
                      id: 2,
                      issue: "Vòi nước bị rò rỉ",
                      room: "102",
                      tenant: "Trần Thị B",
                      priority: "medium",
                      date: "2024-02-18",
                      status: "completed",
                      description: "Vòi lavabo trong phòng tắm bị rò nước"
                    },
                    {
                      id: 3,
                      issue: "Bóng đèn hỏng",
                      room: "201",
                      tenant: "Lê Văn C",
                      priority: "low",
                      date: "2024-02-25",
                      status: "pending",
                      description: "Bóng đèn phòng ngủ không sáng"
                    }
                  ].map((report) => (
                    <tr key={report.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{report.issue}</div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">{report.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {report.room}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.tenant}
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(report.status)}`}>
                          {getStatusText(report.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openReportDetail(report)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Xem
                        </button>
                        <button
                          onClick={() => openReportDetail(report)}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          Cập nhật
                        </button>
                        {report.status === 'pending' && (
                          <button
                            onClick={() => handleUpdateReportStatus(report.id.toString(), 'in-progress')}
                            className="text-orange-600 hover:text-orange-900"
                          >
                            Xử lý
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Tin nhắn với khách thuê</h2>
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-500">
                  {mockConversations.reduce((sum, conv) => sum + conv.unreadCount, 0)} tin nhắn chưa đọc
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                  <span className="mr-2">+</span>
                  Tin nhắn mới
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
              {/* Conversations List */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Cuộc trò chuyện</h3>
                </div>
                <div className="overflow-y-auto h-full">
                  {mockConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => selectConversation(conversation)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedConversation?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {conversation.tenant.avatar}
                          </div>
                          {conversation.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900 truncate">{conversation.tenant.name}</h4>
                            <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">Phòng {conversation.tenant.room}</p>
                          <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                          {conversation.unreadCount > 0 && (
                            <div className="mt-2">
                              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                {conversation.unreadCount}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col">
                {selectedConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {selectedConversation.tenant.avatar}
                          </div>
                          {selectedConversation.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{selectedConversation.tenant.name}</h3>
                          <p className="text-sm text-gray-500">
                            Phòng {selectedConversation.tenant.room} • {selectedConversation.tenant.phone}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                          📞
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                          ℹ️
                        </button>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                      {selectedConversation.messages.map((message: any) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'owner' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                              message.sender === 'owner'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === 'owner' ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-gray-200">
                      <form onSubmit={handleSendMessage} className="flex space-x-3">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="form-input flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                          placeholder="Nhập tin nhắn..."
                        />
                        <button
                          type="submit"
                          disabled={!newMessage.trim()}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                          Gửi
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">💬</div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Chọn cuộc trò chuyện</h3>
                      <p className="text-gray-600">Chọn một khách thuê để bắt đầu nhắn tin</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Đánh giá từ khách thuê</h2>
              <div className="flex space-x-3">
                <select className="border border-gray-300 rounded-lg px-3 py-2">
                  <option>Tất cả đánh giá</option>
                  <option>5 sao</option>
                  <option>4 sao</option>
                  <option>3 sao</option>
                  <option>2 sao</option>
                  <option>1 sao</option>
                </select>
                <select className="border border-gray-300 rounded-lg px-3 py-2">
                  <option>Tất cả phòng</option>
                  <option>Phòng 101</option>
                  <option>Phòng 102</option>
                  <option>Phòng 201</option>
                  <option>Phòng 202</option>
                </select>
              </div>
            </div>

            {/* Review Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-2xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Đánh giá trung bình</p>
                    <p className="text-3xl font-bold">4.2</p>
                    <div className="flex items-center mt-1">
                      {[1,2,3,4,5].map(star => (
                        <span key={star} className={`text-lg ${star <= 4 ? 'text-yellow-200' : 'text-yellow-400'}`}>⭐</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-4xl">⭐</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-2xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Tổng đánh giá</p>
                    <p className="text-3xl font-bold">24</p>
                    <p className="text-green-100 text-sm">+3 tuần này</p>
                  </div>
                  <div className="text-4xl">📝</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-2xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Đánh giá tích cực</p>
                    <p className="text-3xl font-bold">87%</p>
                    <p className="text-blue-100 text-sm">4-5 sao</p>
                  </div>
                  <div className="text-4xl">👍</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-2xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Phòng được yêu thích</p>
                    <p className="text-3xl font-bold">101</p>
                    <p className="text-purple-100 text-sm">4.8/5 sao</p>
                  </div>
                  <div className="text-4xl">🏆</div>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  tenant: "Nguyễn Văn A",
                  room: "101",
                  rating: 5,
                  date: "2024-03-01",
                  review: "Phòng rất sạch sẽ, tiện nghi đầy đủ. Chủ trọ nhiệt tình, hỗ trợ nhanh chóng khi có vấn đề. Vị trí thuận lợi, gần trường học và chợ. Rất hài lòng!",
                  categories: {
                    cleanliness: 5,
                    facilities: 5,
                    location: 4,
                    value: 5,
                    landlord: 5
                  },
                  anonymous: false,
                  response: "Cảm ơn bạn rất nhiều vì đánh giá tích cực! Chúng tôi luôn cố gắng tạo môi trường sống tốt nhất cho các bạn sinh viên. Chúc bạn học tập tốt!",
                  responseDate: "2024-03-02"
                },
                {
                  id: 2,
                  tenant: "Ẩn danh",
                  room: "102",
                  rating: 4,
                  date: "2024-02-28",
                  review: "Phòng khá tốt, giá cả hợp lý. Máy lạnh hoạt động tốt, internet ổn định. Chỉ có điều âm thanh cách âm chưa tốt lắm, đôi khi nghe thấy tiếng ồn từ phòng bên.",
                  categories: {
                    cleanliness: 4,
                    facilities: 4,
                    location: 4,
                    value: 4,
                    landlord: 4
                  },
                  anonymous: true
                },
                {
                  id: 3,
                  tenant: "Trần Thị B",
                  room: "201",
                  rating: 4,
                  date: "2024-02-25",
                  review: "Phòng thoáng mát, view đẹp. Chủ trọ dễ thương, luôn quan tâm đến khách thuê. Khu vực an ninh tốt, có bảo vệ 24/7.",
                  categories: {
                    cleanliness: 4,
                    facilities: 4,
                    location: 5,
                    value: 4,
                    landlord: 5
                  },
                  anonymous: false
                }
              ].map((review) => (
                <div key={review.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {review.anonymous ? "?" : review.tenant.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.tenant}</h4>
                        <p className="text-sm text-gray-600">Phòng {review.room} • {review.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        {[1,2,3,4,5].map(star => (
                          <span key={star} className={`text-lg ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>⭐</span>
                        ))}
                        <span className="ml-2 font-bold text-gray-900">{review.rating}/5</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {review.rating >= 4.5 ? 'Xuất sắc' :
                         review.rating >= 4 ? 'Rất tốt' :
                         review.rating >= 3 ? 'Tốt' :
                         review.rating >= 2 ? 'Trung bình' : 'Cần cải thiện'}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">{review.review}</p>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    {Object.entries(review.categories).map(([category, rating]) => (
                      <div key={category} className="text-center">
                        <p className="text-xs text-gray-600 mb-1">
                          {category === 'cleanliness' ? 'Vệ sinh' :
                           category === 'facilities' ? 'Tiện nghi' :
                           category === 'location' ? 'Vị trí' :
                           category === 'value' ? 'Giá trị' : 'Chủ trọ'}
                        </p>
                        <div className="flex justify-center">
                          {[1,2,3,4,5].map(star => (
                            <span key={star} className={`text-sm ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>⭐</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Owner Response */}
                  {review.response && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm">
                          CT
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="font-medium text-blue-900">Phản hồi từ chủ trọ</span>
                            <span className="ml-2 text-sm text-blue-600">{review.responseDate}</span>
                          </div>
                          <p className="text-blue-800">{review.response}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => openReviewResponseModal(review)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        {review.response ? 'Chỉnh sửa phản hồi' : 'Phản hồi'}
                      </button>
                      <button className="text-green-600 hover:text-green-800 text-sm font-medium px-3 py-1 rounded-lg hover:bg-green-50 transition-colors">
                        Cảm ơn
                      </button>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-2">Hữu ích?</span>
                      <button className="text-green-600 hover:text-green-800 mr-1">👍</button>
                      <span className="text-xs">12</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "revenue" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Báo cáo doanh thu</h2>
              <div className="flex space-x-3">
                <select className="border border-gray-300 rounded-lg px-3 py-2">
                  <option>Tháng này</option>
                  <option>Tháng trước</option>
                  <option>3 tháng gần đây</option>
                  <option>6 tháng gần đây</option>
                  <option>Năm nay</option>
                </select>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  Xuất báo cáo
                </button>
              </div>
            </div>

            {/* Revenue Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-2xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Tổng doanh thu</p>
                    <p className="text-2xl font-bold">15.2M</p>
                    <p className="text-green-100 text-sm">+12% so với tháng trước</p>
                  </div>
                  <div className="text-3xl">💰</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-2xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Tiền phòng</p>
                    <p className="text-2xl font-bold">12.0M</p>
                    <p className="text-blue-100 text-sm">79% tổng doanh thu</p>
                  </div>
                  <div className="text-3xl">🏠</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-2xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Tiền điện nước</p>
                    <p className="text-2xl font-bold">2.8M</p>
                    <p className="text-purple-100 text-sm">18% tổng doanh thu</p>
                  </div>
                  <div className="text-3xl">⚡</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-2xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Phí dịch vụ</p>
                    <p className="text-2xl font-bold">400K</p>
                    <p className="text-orange-100 text-sm">3% tổng doanh thu</p>
                  </div>
                  <div className="text-3xl">🔧</div>
                </div>
              </div>
            </div>

            {/* Revenue Chart Placeholder */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Biểu đồ doanh thu theo tháng</h3>
              <div className="h-64 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-gray-600">Biểu đồ doanh thu sẽ được hiển thị ở đây</p>
                  <p className="text-sm text-gray-500 mt-2">Tích hợp với thư viện Chart.js hoặc Recharts</p>
                </div>
              </div>
            </div>

            {/* Revenue Details Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Chi tiết doanh thu theo phòng</h3>
              </div>
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
                      Tiền phòng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Điện nước
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dịch vụ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tổng cộng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { room: "101", tenant: "Nguyễn Văn A", rent: 3000000, utilities: 800000, service: 100000, status: "paid" },
                    { room: "102", tenant: "Trần Thị B", rent: 3200000, utilities: 750000, service: 100000, status: "paid" },
                    { room: "201", tenant: "Lê Văn C", rent: 3500000, utilities: 900000, service: 100000, status: "pending" },
                    { room: "202", tenant: "Phạm Thị D", rent: 3500000, utilities: 850000, service: 100000, status: "paid" },
                  ].map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.room}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.tenant}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.rent.toLocaleString()}đ
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.utilities.toLocaleString()}đ
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.service.toLocaleString()}đ
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {(item.rent + item.utilities + item.service).toLocaleString()}đ
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                          {getStatusText(item.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        </main>
      </div>

      {/* Room Modal */}
      {showRoomModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {editingRoom ? "Chỉnh sửa phòng" : "Thêm phòng mới"}
              </h3>
              <p className="text-gray-600 mt-1">
                {editingRoom ? "Cập nhật thông tin phòng" : "Nhập thông tin phòng mới"}
              </p>
            </div>
            <form onSubmit={handleRoomSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số phòng *
                  </label>
                  <input
                    type="text"
                    value={roomForm.number}
                    onChange={(e) => setRoomForm({...roomForm, number: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="VD: 101, 102..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá thuê (VNĐ) *
                  </label>
                  <input
                    type="number"
                    value={roomForm.price}
                    onChange={(e) => setRoomForm({...roomForm, price: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="VD: 3000000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Diện tích (m²) *
                  </label>
                  <input
                    type="number"
                    value={roomForm.area}
                    onChange={(e) => setRoomForm({...roomForm, area: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="VD: 25"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trạng thái
                  </label>
                  <select
                    value={roomForm.status}
                    onChange={(e) => setRoomForm({...roomForm, status: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value="available">Trống</option>
                    <option value="occupied">Đã thuê</option>
                    <option value="maintenance">Bảo trì</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả phòng
                  </label>
                  <textarea
                    value={roomForm.description}
                    onChange={(e) => setRoomForm({...roomForm, description: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    rows={3}
                    placeholder="Mô tả về phòng, vị trí, đặc điểm..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tiện nghi
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {["Máy lạnh", "Tủ lạnh", "Máy nước nóng", "WiFi", "Giường", "Tủ quần áo", "Bàn học", "Ban công"].map((amenity) => (
                      <label key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={roomForm.amenities.includes(amenity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setRoomForm({...roomForm, amenities: [...roomForm.amenities, amenity]});
                            } else {
                              setRoomForm({...roomForm, amenities: roomForm.amenities.filter(a => a !== amenity)});
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowRoomModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingRoom ? "Cập nhật" : "Thêm phòng"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tenant Modal */}
      {showTenantModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {editingTenant ? "Chỉnh sửa khách thuê" : "Thêm khách thuê mới"}
              </h3>
              <p className="text-gray-600 mt-1">
                {editingTenant ? "Cập nhật thông tin khách thuê" : "Nhập thông tin khách thuê mới"}
              </p>
            </div>
            <form onSubmit={handleTenantSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    value={tenantForm.name}
                    onChange={(e) => setTenantForm({...tenantForm, name: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="VD: Nguyễn Văn A"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={tenantForm.email}
                    onChange={(e) => setTenantForm({...tenantForm, email: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="VD: tenant@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    value={tenantForm.phone}
                    onChange={(e) => setTenantForm({...tenantForm, phone: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="VD: 0123456789"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CCCD/CMND
                  </label>
                  <input
                    type="text"
                    value={tenantForm.idCard}
                    onChange={(e) => setTenantForm({...tenantForm, idCard: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="VD: 123456789012"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phòng *
                  </label>
                  <select
                    value={tenantForm.room}
                    onChange={(e) => setTenantForm({...tenantForm, room: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    required
                  >
                    <option value="">Chọn phòng</option>
                    <option value="101">Phòng 101</option>
                    <option value="102">Phòng 102</option>
                    <option value="103">Phòng 103</option>
                    <option value="201">Phòng 201</option>
                    <option value="202">Phòng 202</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày bắt đầu thuê *
                  </label>
                  <input
                    type="date"
                    value={tenantForm.startDate}
                    onChange={(e) => setTenantForm({...tenantForm, startDate: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tiền cọc (VNĐ)
                  </label>
                  <input
                    type="number"
                    value={tenantForm.deposit}
                    onChange={(e) => setTenantForm({...tenantForm, deposit: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="VD: 3000000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Người liên hệ khẩn cấp
                  </label>
                  <input
                    type="text"
                    value={tenantForm.emergencyContact}
                    onChange={(e) => setTenantForm({...tenantForm, emergencyContact: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="VD: Nguyễn Văn B (Anh trai)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SĐT liên hệ khẩn cấp
                  </label>
                  <input
                    type="tel"
                    value={tenantForm.emergencyPhone}
                    onChange={(e) => setTenantForm({...tenantForm, emergencyPhone: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="VD: 0987654321"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowTenantModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingTenant ? "Cập nhật" : "Thêm khách thuê"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bill Modal */}
      {showBillModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {editingBill ? "Chỉnh sửa hóa đơn" : "Tạo hóa đơn mới"}
              </h3>
              <p className="text-gray-600 mt-1">
                {editingBill ? "Cập nhật thông tin hóa đơn" : "Nhập thông tin hóa đơn mới"}
              </p>
            </div>
            <form onSubmit={handleBillSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phòng *
                  </label>
                  <select
                    value={billForm.room}
                    onChange={(e) => setBillForm({...billForm, room: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    required
                  >
                    <option value="">Chọn phòng</option>
                    <option value="101">Phòng 101</option>
                    <option value="102">Phòng 102</option>
                    <option value="103">Phòng 103</option>
                    <option value="201">Phòng 201</option>
                    <option value="202">Phòng 202</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Khách thuê *
                  </label>
                  <select
                    value={billForm.tenant}
                    onChange={(e) => setBillForm({...billForm, tenant: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    required
                  >
                    <option value="">Chọn khách thuê</option>
                    <option value="Nguyễn Văn A">Nguyễn Văn A</option>
                    <option value="Trần Thị B">Trần Thị B</option>
                    <option value="Lê Văn C">Lê Văn C</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại hóa đơn *
                  </label>
                  <select
                    value={billForm.type}
                    onChange={(e) => setBillForm({...billForm, type: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    required
                  >
                    <option value="monthly">Tiền phòng hàng tháng</option>
                    <option value="electric">Tiền điện</option>
                    <option value="water">Tiền nước</option>
                    <option value="service">Phí dịch vụ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hạn thanh toán *
                  </label>
                  <input
                    type="date"
                    value={billForm.dueDate}
                    onChange={(e) => setBillForm({...billForm, dueDate: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện (kWh)
                  </label>
                  <input
                    type="number"
                    value={billForm.electricUsage}
                    onChange={(e) => setBillForm({...billForm, electricUsage: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="VD: 150"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số nước (m³)
                  </label>
                  <input
                    type="number"
                    value={billForm.waterUsage}
                    onChange={(e) => setBillForm({...billForm, waterUsage: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="VD: 15"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tổng tiền (VNĐ) *
                  </label>
                  <input
                    type="number"
                    value={billForm.amount}
                    onChange={(e) => setBillForm({...billForm, amount: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="VD: 3500000"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ghi chú
                  </label>
                  <textarea
                    value={billForm.description}
                    onChange={(e) => setBillForm({...billForm, description: e.target.value})}
                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    rows={3}
                    placeholder="Ghi chú thêm về hóa đơn..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowBillModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingBill ? "Cập nhật" : "Tạo hóa đơn"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Detail Modal */}
      {showReportDetailModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Chi tiết báo cáo sự cố</h3>
              <p className="text-gray-600 mt-1">Xem và cập nhật trạng thái xử lý</p>
            </div>
            <div className="p-6">
              {/* Report Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vấn đề</label>
                    <p className="text-gray-900 font-medium">{selectedReport.issue}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phòng</label>
                    <p className="text-gray-900">{selectedReport.room}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Khách thuê</label>
                    <p className="text-gray-900">{selectedReport.tenant}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ngày báo cáo</label>
                    <p className="text-gray-900">{selectedReport.date}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mức độ ưu tiên</label>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      selectedReport.priority === 'high' ? 'bg-red-100 text-red-800' :
                      selectedReport.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedReport.priority === 'high' ? 'Cao' :
                       selectedReport.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái hiện tại</label>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedReport.status)}`}>
                      {getStatusText(selectedReport.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả chi tiết</label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-900">{selectedReport.description}</p>
                </div>
              </div>

              {/* Status Update */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Cập nhật trạng thái</label>
                <div className="flex space-x-3">
                  {selectedReport.status === 'pending' && (
                    <button
                      onClick={() => handleUpdateReportStatus(selectedReport.id.toString(), 'in-progress')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Bắt đầu xử lý
                    </button>
                  )}
                  {selectedReport.status === 'in-progress' && (
                    <button
                      onClick={() => handleUpdateReportStatus(selectedReport.id.toString(), 'completed')}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Hoàn thành
                    </button>
                  )}
                  {selectedReport.status === 'completed' && (
                    <div className="flex items-center text-green-600">
                      <span className="mr-2">✅</span>
                      <span>Đã hoàn thành xử lý</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Response */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Phản hồi cho khách thuê</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Nhập phản hồi cho khách thuê về tiến độ xử lý..."
                  defaultValue={selectedReport.response || ""}
                />
                <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Gửi phản hồi
                </button>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowReportDetailModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    alert("Đã gửi thông báo cho khách thuê!");
                    setShowReportDetailModal(false);
                  }}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Thông báo khách thuê
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Response Modal */}
      {showReviewResponseModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                Phản hồi đánh giá
              </h3>
              <p className="text-gray-600 mt-1">
                Phản hồi đánh giá từ {selectedReview.tenant} - Phòng {selectedReview.room}
              </p>
            </div>

            <div className="p-6">
              {/* Original Review */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1,2,3,4,5].map(star => (
                      <span key={star} className={`text-lg ${star <= selectedReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}>⭐</span>
                    ))}
                  </div>
                  <span className="ml-2 font-bold text-gray-900">{selectedReview.rating}/5</span>
                  <span className="ml-2 text-sm text-gray-500">{selectedReview.date}</span>
                </div>
                <p className="text-gray-700">{selectedReview.review}</p>
              </div>

              {/* Response Form */}
              <form onSubmit={handleReviewResponse}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phản hồi của bạn
                  </label>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    className="form-input w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    rows={4}
                    placeholder="Cảm ơn bạn đã đánh giá! Hãy chia sẻ phản hồi của bạn..."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Phản hồi này sẽ hiển thị công khai dưới đánh giá của khách thuê
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowReviewResponseModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {selectedReview.response ? 'Cập nhật phản hồi' : 'Gửi phản hồi'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
