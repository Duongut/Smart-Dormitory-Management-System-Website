"use client";

import Link from "next/link";
import { useState } from "react";
import { ProtectedRoute } from "@/contexts/AuthContext";
import { mockTenants, mockRooms, getStatusColor, getStatusText } from "@/data/mockData";
import { 
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  IdentificationIcon,
  CalendarIcon,
  HomeIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline";

export default function TenantsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTenant, setSelectedTenant] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredTenants = mockTenants.filter(tenant => {
    const matchesSearch = tenant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.roomNumber.includes(searchTerm);
    
    if (filterStatus === "all") return matchesSearch;
    // Add more filters as needed
    return matchesSearch;
  });

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
                <span className="text-gray-600">Quản lý khách thuê</span>
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý khách thuê</h1>
                <p className="text-gray-600">Quản lý thông tin và hợp đồng của tất cả khách thuê</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Thêm khách thuê
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <UserIcon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tổng khách thuê</p>
                  <p className="text-2xl font-bold text-gray-900">{mockTenants.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <HomeIcon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Phòng đã thuê</p>
                  <p className="text-2xl font-bold text-gray-900">{mockRooms.filter(r => r.status === 'occupied').length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                  <DocumentTextIcon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Hợp đồng sắp hết hạn</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <CalendarIcon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Khách mới tháng này</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
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
                  placeholder="Tìm kiếm theo tên, email, số phòng..."
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
                  <option value="active">Đang thuê</option>
                  <option value="expired">Hết hạn</option>
                  <option value="pending">Chờ xử lý</option>
                </select>
                <button className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center">
                  <FunnelIcon className="h-5 w-5 mr-2" />
                  Lọc
                </button>
              </div>
            </div>
          </div>

          {/* Tenants Table */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Khách thuê
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Liên hệ
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phòng
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày vào
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hợp đồng
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTenants.map((tenant) => (
                    <tr key={tenant.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {tenant.fullName.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{tenant.fullName}</div>
                            <div className="text-sm text-gray-500">ID: {tenant.idNumber}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{tenant.phone}</div>
                        <div className="text-sm text-gray-500">{tenant.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <HomeIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">Phòng {tenant.roomNumber}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(tenant.moveInDate).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tenant.contractDuration} tháng
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Đang thuê
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedTenant(tenant)}
                            className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Xem chi tiết"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-lg transition-colors" title="Chỉnh sửa">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">{filteredTenants.length}</span> trong tổng số <span className="font-medium">{mockTenants.length}</span> khách thuê
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Trước
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                1
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Sau
              </button>
            </div>
          </div>
        </div>

        {/* Tenant Detail Modal */}
        {selectedTenant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">Chi tiết khách thuê</h3>
                  <button
                    onClick={() => setSelectedTenant(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Thông tin cá nhân</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <UserIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{selectedTenant.fullName}</span>
                      </div>
                      <div className="flex items-center">
                        <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{selectedTenant.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{selectedTenant.email}</span>
                      </div>
                      <div className="flex items-center">
                        <IdentificationIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{selectedTenant.idNumber}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Thông tin thuê</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <HomeIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">Phòng {selectedTenant.roomNumber}</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">Vào: {new Date(selectedTenant.moveInDate).toLocaleDateString('vi-VN')}</span>
                      </div>
                      <div className="flex items-center">
                        <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">Hợp đồng: {selectedTenant.contractDuration} tháng</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    Chỉnh sửa
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Xem hợp đồng
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
