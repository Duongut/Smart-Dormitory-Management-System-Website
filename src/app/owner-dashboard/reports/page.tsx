"use client";

import Link from "next/link";
import { useState } from "react";
import { ProtectedRoute } from "@/contexts/AuthContext";
import { mockReports, getStatusColor, getStatusText } from "@/data/mockData";
import { 
  WrenchScrewdriverIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  UserIcon,
  HomeIcon,
  PlusIcon
} from "@heroicons/react/24/outline";

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800"
};

const mockReportsExtended = mockReports.map((report, index) => ({
  ...report,
  priority: index % 3 === 0 ? 'high' : index % 3 === 1 ? 'medium' : 'low',
  category: index % 4 === 0 ? 'Điện' : index % 4 === 1 ? 'Nước' : index % 4 === 2 ? 'Điều hòa' : 'Khác',
  assignedTo: index % 2 === 0 ? 'Thợ điện Minh' : 'Thợ sửa chữa Hùng',
  estimatedTime: index % 3 === 0 ? '2-4 giờ' : index % 3 === 1 ? '1-2 ngày' : '30 phút',
  images: [`/images/report-${report.id}.jpg`]
}));

export default function ReportsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseText, setResponseText] = useState("");

  const filteredReports = mockReportsExtended.filter(report => {
    const matchesSearch = report.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.room.includes(searchTerm) ||
                         report.tenant.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || report.status === filterStatus;
    const matchesPriority = filterPriority === "all" || report.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    total: mockReportsExtended.length,
    pending: mockReportsExtended.filter(r => r.status === 'pending').length,
    inProgress: mockReportsExtended.filter(r => r.status === 'in-progress').length,
    completed: mockReportsExtended.filter(r => r.status === 'completed').length,
    highPriority: mockReportsExtended.filter(r => r.priority === 'high').length
  };

  const handleUpdateStatus = (reportId: number, newStatus: string) => {
    // In real app, this would update the database
    console.log(`Updating report ${reportId} to status ${newStatus}`);
  };

  const handleSendResponse = () => {
    if (selectedReport && responseText.trim()) {
      // In real app, this would send the response
      console.log(`Sending response to report ${selectedReport.id}: ${responseText}`);
      setShowResponseModal(false);
      setResponseText("");
      setSelectedReport(null);
    }
  };

  return (
    <ProtectedRoute allowedUserTypes={['owner']}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <Link href="/owner-dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
                  <div className="h-8 w-8 bg-blue-600 rounded mr-3 flex items-center justify-center">
                    <span className="text-white font-bold">🏠</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">SmartDorm</span>
                </Link>
                <span className="mx-3 text-gray-400">/</span>
                <span className="text-gray-600">Báo cáo sự cố</span>
              </div>
              <Link href="/owner-dashboard" className="text-blue-600 hover:text-blue-800">
                ← Quay lại Dashboard
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Báo cáo sự cố</h1>
                <p className="text-gray-600">Quản lý và xử lý các báo cáo sự cố từ khách thuê</p>
              </div>
              <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all shadow-lg hover:shadow-xl flex items-center">
                <PlusIcon className="h-5 w-5 mr-2" />
                Tạo báo cáo
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <WrenchScrewdriverIcon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tổng báo cáo</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                  <ClockIcon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Chờ xử lý</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  <WrenchScrewdriverIcon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Đang xử lý</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <CheckCircleIcon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Hoàn thành</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white">
                  <ExclamationTriangleIcon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ưu tiên cao</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.highPriority}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo vấn đề, phòng, khách thuê..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
              </div>
              <div className="flex gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="form-input px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="pending">Chờ xử lý</option>
                  <option value="in-progress">Đang xử lý</option>
                  <option value="completed">Hoàn thành</option>
                </select>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="form-input px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  <option value="all">Tất cả mức độ</option>
                  <option value="high">Cao</option>
                  <option value="medium">Trung bình</option>
                  <option value="low">Thấp</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <div key={report.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(report.status)}`}>
                        {getStatusText(report.status)}
                      </span>
                      <span className={`px-3 py-1 text-xs rounded-full ${priorityColors[report.priority as keyof typeof priorityColors]}`}>
                        {report.priority === 'high' ? 'Cao' : report.priority === 'medium' ? 'TB' : 'Thấp'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">#{report.id}</span>
                  </div>

                  {/* Issue */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{report.issue}</h3>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <HomeIcon className="h-4 w-4 mr-2" />
                      <span>Phòng {report.room}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <UserIcon className="h-4 w-4 mr-2" />
                      <span>{report.tenant}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <span>{new Date(report.date).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <WrenchScrewdriverIcon className="h-4 w-4 mr-2" />
                      <span>{report.category}</span>
                    </div>
                  </div>

                  {/* Assigned To */}
                  {report.assignedTo && (
                    <div className="bg-blue-50 p-3 rounded-lg mb-4">
                      <div className="text-sm text-blue-800">
                        <strong>Phân công:</strong> {report.assignedTo}
                      </div>
                      <div className="text-xs text-blue-600">
                        Thời gian ước tính: {report.estimatedTime}
                      </div>
                    </div>
                  )}

                  {/* Response */}
                  {report.response && (
                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <div className="text-sm text-gray-700">{report.response}</div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      Chi tiết
                    </button>
                    <div className="flex items-center space-x-2">
                      {report.status === 'pending' && (
                        <button
                          onClick={() => handleUpdateStatus(report.id, 'in-progress')}
                          className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Bắt đầu
                        </button>
                      )}
                      {report.status === 'in-progress' && (
                        <button
                          onClick={() => handleUpdateStatus(report.id, 'completed')}
                          className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Hoàn thành
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedReport(report);
                          setShowResponseModal(true);
                        }}
                        className="text-gray-600 hover:text-gray-800 p-1"
                        title="Phản hồi"
                      >
                        <ChatBubbleLeftRightIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <WrenchScrewdriverIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không có báo cáo nào</h3>
              <p className="text-gray-600">Không tìm thấy báo cáo sự cố nào phù hợp với bộ lọc hiện tại.</p>
            </div>
          )}
        </div>

        {/* Response Modal */}
        {showResponseModal && selectedReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-lg w-full">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Phản hồi báo cáo</h3>
                <p className="text-gray-600 mt-1">Phòng {selectedReport.room} - {selectedReport.issue}</p>
              </div>
              <div className="p-6">
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Nhập phản hồi của bạn..."
                  rows={4}
                  className="form-input w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => {
                      setShowResponseModal(false);
                      setResponseText("");
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSendResponse}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Gửi phản hồi
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
