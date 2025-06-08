"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  CalendarIcon, 
  UserIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  CheckCircleIcon,
  CreditCardIcon
} from "@heroicons/react/24/outline";

const mockRoom = {
  id: 2,
  number: "202",
  price: 3500000,
  area: 30,
  amenities: ["Máy lạnh", "Tủ lạnh", "WiFi", "Ban công"],
  images: ["room2.jpg"],
  description: "Phòng rộng rãi, thoáng mát với ban công riêng. Đầy đủ tiện nghi hiện đại.",
  deposit: 7000000, // 2 months rent
  address: "123 Đường ABC, Quận 1, TP.HCM"
};

interface BookingForm {
  fullName: string;
  phone: string;
  email: string;
  idNumber: string;
  moveInDate: string;
  contractDuration: string;
  notes: string;
}

export default function BookRoomPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BookingForm>({
    fullName: "",
    phone: "",
    email: "",
    idNumber: "",
    moveInDate: "",
    contractDuration: "12",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 2000);
  };

  const isFormValid = () => {
    return formData.fullName && formData.phone && formData.email && 
           formData.idNumber && formData.moveInDate;
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Đặt phòng thành công!</h2>
          <p className="text-gray-600 mb-6">
            Yêu cầu đặt phòng {mockRoom.number} của bạn đã được gửi thành công. 
            Chủ trọ sẽ liên hệ với bạn trong vòng 24h.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">Mã đặt phòng</p>
            <p className="font-mono text-lg font-semibold">BOOK{Date.now()}</p>
          </div>
          <div className="space-y-3">
            <Link href="/tenant-dashboard" className="block w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
              Quay về Dashboard
            </Link>
            <Link href="/" className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/tenant-dashboard" className="flex items-center">
                <div className="h-8 w-8 bg-green-600 rounded mr-3 flex items-center justify-center">
                  <span className="text-white font-bold">🏠</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">Đặt phòng trọ</h1>
              </Link>
            </div>
            <Link href="/tenant-dashboard" className="text-green-600 hover:text-green-800">
              ← Quay lại
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600"
              }`}>
                1
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? "bg-green-600" : "bg-gray-300"}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600"
              }`}>
                2
              </div>
              <div className={`w-16 h-1 ${step >= 3 ? "bg-green-600" : "bg-gray-300"}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 3 ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600"
              }`}>
                3
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <div className="flex space-x-12 text-sm text-gray-600">
              <span>Thông tin phòng</span>
              <span>Thông tin cá nhân</span>
              <span>Hoàn thành</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Room Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin phòng</h2>
            
            <div className="h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-500">Hình ảnh phòng {mockRoom.number}</span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Số phòng:</span>
                <span className="font-semibold">{mockRoom.number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Diện tích:</span>
                <span className="font-semibold">{mockRoom.area}m²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Giá thuê:</span>
                <span className="font-semibold text-green-600">{mockRoom.price.toLocaleString()}đ/tháng</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tiền cọc:</span>
                <span className="font-semibold text-orange-600">{mockRoom.deposit.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Địa chỉ:</span>
                <span className="font-semibold text-right">{mockRoom.address}</span>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Tiện nghi</h3>
              <div className="flex flex-wrap gap-2">
                {mockRoom.amenities.map((amenity, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Mô tả</h3>
              <p className="text-gray-600 text-sm">{mockRoom.description}</p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin đặt phòng</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên *
                </label>
                <div className="relative">
                  <UserIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Nhập họ và tên"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại *
                </label>
                <div className="relative">
                  <PhoneIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0123456789"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <div className="relative">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số CMND/CCCD *
                </label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="123456789012"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày dự kiến chuyển vào *
                </label>
                <div className="relative">
                  <CalendarIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="date"
                    name="moveInDate"
                    value={formData.moveInDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thời hạn hợp đồng
                </label>
                <select
                  name="contractDuration"
                  value={formData.contractDuration}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="6">6 tháng</option>
                  <option value="12">12 tháng</option>
                  <option value="24">24 tháng</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ghi chú
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Thông tin bổ sung (nếu có)"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Lưu ý quan trọng:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Cần đặt cọc {mockRoom.deposit.toLocaleString()}đ để giữ phòng</li>
                  <li>• Chủ trọ sẽ liên hệ xác nhận trong vòng 24h</li>
                  <li>• Mang theo CMND/CCCD gốc khi ký hợp đồng</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  !isFormValid() || isSubmitting
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Đang gửi yêu cầu...
                  </div>
                ) : (
                  "Gửi yêu cầu đặt phòng"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
