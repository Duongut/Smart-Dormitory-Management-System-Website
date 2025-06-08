"use client";

import Link from "next/link";
import { useState } from "react";
import { ProtectedRoute } from "@/contexts/AuthContext";
import { 
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon
} from "@heroicons/react/24/outline";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Mock data for charts
const monthlyRevenueData = [
  { month: 'T1', revenue: 45000000, expenses: 12000000, profit: 33000000 },
  { month: 'T2', revenue: 52000000, expenses: 15000000, profit: 37000000 },
  { month: 'T3', revenue: 48000000, expenses: 13000000, profit: 35000000 },
  { month: 'T4', revenue: 61000000, expenses: 18000000, profit: 43000000 },
  { month: 'T5', revenue: 55000000, expenses: 16000000, profit: 39000000 },
  { month: 'T6', revenue: 58000000, expenses: 17000000, profit: 41000000 },
  { month: 'T7', revenue: 62000000, expenses: 19000000, profit: 43000000 },
  { month: 'T8', revenue: 59000000, expenses: 18000000, profit: 41000000 },
  { month: 'T9', revenue: 64000000, expenses: 20000000, profit: 44000000 },
  { month: 'T10', revenue: 67000000, expenses: 21000000, profit: 46000000 },
  { month: 'T11', revenue: 63000000, expenses: 19000000, profit: 44000000 },
  { month: 'T12', revenue: 70000000, expenses: 22000000, profit: 48000000 }
];

const roomTypeRevenueData = [
  { name: 'Phòng đơn', value: 35, revenue: 180000000 },
  { name: 'Phòng đôi', value: 45, revenue: 230000000 },
  { name: 'Phòng VIP', value: 20, revenue: 150000000 }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export default function RevenueReportPage() {
  const [selectedYear, setSelectedYear] = useState('2024');

  const currentMonthRevenue = 67000000;
  const lastMonthRevenue = 64000000;
  const revenueGrowth = ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1);

  const totalYearRevenue = monthlyRevenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalYearExpenses = monthlyRevenueData.reduce((sum, item) => sum + item.expenses, 0);
  const totalYearProfit = totalYearRevenue - totalYearExpenses;

  const averageOccupancy = 85;
  const totalRooms = 50;
  const occupiedRooms = Math.round(totalRooms * averageOccupancy / 100);

  return (
    <ProtectedRoute allowedUserTypes={['owner']}>
      <div className="min-h-screen bg-gray-50">
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
                <span className="text-gray-600">Báo cáo doanh thu</span>
              </div>
              <Link href="/owner-dashboard" className="text-blue-600 hover:text-blue-800">
                ← Quay lại Dashboard
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Báo cáo doanh thu</h1>
                <p className="text-gray-600">Theo dõi và phân tích doanh thu, chi phí và lợi nhuận</p>
              </div>
              <div className="flex items-center space-x-3">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
                <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg flex items-center">
                  <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                  Xuất báo cáo
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Doanh thu tháng này</p>
                  <p className="text-2xl font-bold">{(currentMonthRevenue / 1000000).toFixed(0)}M</p>
                  <div className="flex items-center mt-2">
                    <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">+{revenueGrowth}% so với tháng trước</span>
                  </div>
                </div>
                <CurrencyDollarIcon className="h-12 w-12 text-blue-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Lợi nhuận năm</p>
                  <p className="text-2xl font-bold">{(totalYearProfit / 1000000).toFixed(0)}M</p>
                  <div className="flex items-center mt-2">
                    <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">Tăng 15% so với năm trước</span>
                  </div>
                </div>
                <ChartBarIcon className="h-12 w-12 text-green-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Tỷ lệ lấp đầy</p>
                  <p className="text-2xl font-bold">{averageOccupancy}%</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm">{occupiedRooms}/{totalRooms} phòng</span>
                  </div>
                </div>
                <DocumentTextIcon className="h-12 w-12 text-purple-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Doanh thu trung bình/phòng</p>
                  <p className="text-2xl font-bold">{(currentMonthRevenue / occupiedRooms / 1000).toFixed(0)}K</p>
                  <div className="flex items-center mt-2">
                    <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">+8% so với tháng trước</span>
                  </div>
                </div>
                <CalendarIcon className="h-12 w-12 text-orange-200" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Xu hướng doanh thu theo tháng</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                  <Tooltip formatter={(value: any) => [`${(value / 1000000).toFixed(1)}M`, '']} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.1}
                    name="Doanh thu"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#10B981" 
                    fill="#10B981" 
                    fillOpacity={0.1}
                    name="Lợi nhuận"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Doanh thu theo loại phòng</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={roomTypeRevenueData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {roomTypeRevenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">So sánh doanh thu và chi phí</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                <Tooltip formatter={(value: any) => [`${(value / 1000000).toFixed(1)}M`, '']} />
                <Legend />
                <Bar dataKey="revenue" fill="#3B82F6" name="Doanh thu" />
                <Bar dataKey="expenses" fill="#EF4444" name="Chi phí" />
                <Bar dataKey="profit" fill="#10B981" name="Lợi nhuận" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Tóm tắt tài chính năm {selectedYear}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chỉ số
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giá trị
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      So với năm trước
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Tổng doanh thu
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(totalYearRevenue / 1000000).toFixed(0)} triệu VNĐ
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      +12.5%
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Tổng chi phí
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(totalYearExpenses / 1000000).toFixed(0)} triệu VNĐ
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      +8.2%
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Lợi nhuận ròng
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(totalYearProfit / 1000000).toFixed(0)} triệu VNĐ
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      +15.3%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
