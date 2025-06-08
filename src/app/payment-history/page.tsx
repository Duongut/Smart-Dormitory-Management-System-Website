"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ArrowLeftIcon,
  DocumentArrowDownIcon,
  PrinterIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  FunnelIcon
} from "@heroicons/react/24/outline";

interface PaymentRecord {
  id: string;
  billNumber: string;
  type: string;
  amount: number;
  paidDate: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod: string;
  month: string;
  late?: boolean;
  lateFee?: number;
}

export default function PaymentHistoryPage() {
  const [payments] = useState<PaymentRecord[]>([
    {
      id: '1',
      billNumber: 'HD001',
      type: 'Tiền phòng',
      amount: 3500000,
      paidDate: '2024-02-25',
      dueDate: '2024-02-25',
      status: 'paid',
      paymentMethod: 'Chuyển khoản',
      month: '02/2024'
    },
    {
      id: '2',
      billNumber: 'HD002',
      type: 'Tiền điện',
      amount: 450000,
      paidDate: '2024-01-28',
      dueDate: '2024-01-25',
      status: 'paid',
      paymentMethod: 'Tiền mặt',
      month: '01/2024',
      late: true,
      lateFee: 50000
    },
    {
      id: '3',
      billNumber: 'HD003',
      type: 'Tiền phòng',
      amount: 3500000,
      paidDate: '2024-01-24',
      dueDate: '2024-01-25',
      status: 'paid',
      paymentMethod: 'Chuyển khoản',
      month: '01/2024'
    },
    {
      id: '4',
      billNumber: 'HD004',
      type: 'Tiền nước',
      amount: 120000,
      paidDate: '2023-12-20',
      dueDate: '2023-12-25',
      status: 'paid',
      paymentMethod: 'Tiền mặt',
      month: '12/2023'
    },
    {
      id: '5',
      billNumber: 'HD005',
      type: 'Tiền phòng',
      amount: 3500000,
      paidDate: '2023-12-23',
      dueDate: '2023-12-25',
      status: 'paid',
      paymentMethod: 'Chuyển khoản',
      month: '12/2023'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'paid' | 'late'>('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const getStatusIcon = (status: string, late?: boolean) => {
    if (late) return <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />;
    if (status === 'paid') return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    if (status === 'pending') return <ClockIcon className="h-5 w-5 text-yellow-500" />;
    return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
  };

  const getStatusText = (status: string, late?: boolean) => {
    if (late) return 'Trễ hạn';
    if (status === 'paid') return 'Đã thanh toán';
    if (status === 'pending') return 'Chờ thanh toán';
    return 'Quá hạn';
  };

  const getStatusColor = (status: string, late?: boolean) => {
    if (late) return 'bg-orange-100 text-orange-800';
    if (status === 'paid') return 'bg-green-100 text-green-800';
    if (status === 'pending') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const filteredPayments = payments.filter(payment => {
    if (filter === 'paid' && payment.status !== 'paid') return false;
    if (filter === 'late' && !payment.late) return false;
    
    if (dateRange.from && new Date(payment.paidDate) < new Date(dateRange.from)) return false;
    if (dateRange.to && new Date(payment.paidDate) > new Date(dateRange.to)) return false;
    
    return true;
  });

  const totalPaid = filteredPayments.reduce((sum, payment) => sum + payment.amount + (payment.lateFee || 0), 0);
  const latePayments = payments.filter(p => p.late).length;

  const exportToCSV = () => {
    const headers = ['Mã HĐ', 'Loại', 'Số tiền', 'Ngày thanh toán', 'Hạn thanh toán', 'Trạng thái', 'Phương thức'];
    const csvContent = [
      headers.join(','),
      ...filteredPayments.map(payment => [
        payment.billNumber,
        payment.type,
        payment.amount,
        payment.paidDate,
        payment.dueDate,
        getStatusText(payment.status, payment.late),
        payment.paymentMethod
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lich-su-thanh-toan.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/tenant-dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                <div className="h-8 w-8 bg-green-600 rounded mr-3 flex items-center justify-center">
                  <span className="text-white font-bold">🏠</span>
                </div>
                <span className="text-xl font-bold text-gray-900">SmartDorm</span>
              </Link>
              <span className="mx-3 text-gray-400">/</span>
              <span className="text-gray-600">Lịch sử thanh toán</span>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={exportToCSV}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                Xuất Excel
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <PrinterIcon className="h-5 w-5 mr-2" />
                In báo cáo
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tổng đã thanh toán</p>
                <p className="text-2xl font-bold text-gray-900">{totalPaid.toLocaleString()}đ</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Số lần thanh toán</p>
                <p className="text-2xl font-bold text-gray-900">{filteredPayments.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <ExclamationTriangleIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Thanh toán trễ</p>
                <p className="text-2xl font-bold text-gray-900">{latePayments}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <CalendarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Trung bình/tháng</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(totalPaid / Math.max(filteredPayments.length, 1)).toLocaleString()}đ
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FunnelIcon className="h-5 w-5 mr-2" />
              Bộ lọc
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">Tất cả</option>
                <option value="paid">Đã thanh toán</option>
                <option value="late">Thanh toán trễ</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Từ ngày</label>
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Đến ngày</label>
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilter('all');
                  setDateRange({ from: '', to: '' });
                }}
                className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>
        </div>

        {/* Payment History Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Lịch sử thanh toán ({filteredPayments.length} giao dịch)
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hóa đơn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số tiền
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày thanh toán
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hạn thanh toán
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phương thức
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{payment.billNumber}</div>
                        <div className="text-sm text-gray-500">{payment.month}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {payment.amount.toLocaleString()}đ
                      </div>
                      {payment.lateFee && (
                        <div className="text-sm text-red-600">
                          +{payment.lateFee.toLocaleString()}đ (phí trễ)
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.paidDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(payment.status, payment.late)}
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(payment.status, payment.late)}`}>
                          {getStatusText(payment.status, payment.late)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/receipt/${payment.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Xem biên lai
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <Link
            href="/tenant-dashboard"
            className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Quay lại Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
