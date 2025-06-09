"use client";

import Link from "next/link";
import { useState } from "react";
import { ProtectedRoute } from "@/contexts/AuthContext";
import { mockRooms, mockContract } from "@/data/mockData";
import { 
  HomeIcon,
  StarIcon,
  WifiIcon,
  SnowflakeIcon,
  TvIcon,
  CameraIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserIcon,
  PhoneIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  ShareIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

const mockRoomDetails = {
  ...mockRooms[0], // Room 101
  images: [
    "/images/room-101-1.jpg",
    "/images/room-101-2.jpg", 
    "/images/room-101-3.jpg",
    "/images/room-101-4.jpg"
  ],
  fullDescription: "Phòng trọ hiện đại, thoáng mát với đầy đủ tiện nghi. Vị trí thuận lợi gần trường đại học, siêu thị và các tiện ích công cộng. Phòng được trang bị đầy đủ nội thất cao cấp, internet tốc độ cao và hệ thống an ninh 24/7.",
  amenitiesDetailed: [
    { name: "Máy lạnh", icon: "❄️", description: "Máy lạnh Daikin 1.5HP" },
    { name: "Tủ lạnh", icon: "🧊", description: "Tủ lạnh Electrolux 180L" },
    { name: "WiFi", icon: "📶", description: "Internet FPT 100Mbps" },
    { name: "Giường", icon: "🛏️", description: "Giường đôi 1.6m x 2m" },
    { name: "Tủ quần áo", icon: "👔", description: "Tủ gỗ 3 cánh" },
    { name: "Bàn học", icon: "📚", description: "Bàn học có ngăn kéo" },
    { name: "Máy nước nóng", icon: "🚿", description: "Máy nước nóng Ariston" },
    { name: "Ban công", icon: "🏠", description: "Ban công riêng 4m²" }
  ],
  nearbyPlaces: [
    { name: "Đại học Bách Khoa", distance: "500m", type: "education" },
    { name: "Siêu thị Coopmart", distance: "300m", type: "shopping" },
    { name: "Bệnh viện Đa khoa", distance: "1km", type: "hospital" },
    { name: "Công viên Tao Đàn", distance: "800m", type: "park" },
    { name: "Trạm xe buýt", distance: "100m", type: "transport" }
  ],
  rules: [
    "Không hút thuốc trong phòng",
    "Không nuôi thú cưng",
    "Giữ vệ sinh chung",
    "Không gây ồn sau 22h",
    "Khách đến thăm phải đăng ký"
  ],
  reviews: [
    {
      id: 1,
      tenant: "Nguyễn Văn B",
      rating: 5,
      comment: "Phòng rất sạch sẽ, chủ trọ thân thiện. Vị trí thuận lợi gần trường.",
      date: "2024-01-15",
      avatar: "👨"
    },
    {
      id: 2,
      tenant: "Trần Thị C",
      rating: 4,
      comment: "Phòng đẹp, đầy đủ tiện nghi. Chỉ có điều internet đôi khi chậm.",
      date: "2024-01-10",
      avatar: "👩"
    }
  ],
  landlord: {
    name: "Chủ trọ ABC",
    phone: "0123456789",
    email: "owner@smartdorm.vn",
    responseTime: "Thường phản hồi trong 1 giờ",
    rating: 4.8,
    totalReviews: 25
  }
};

export default function RoomDetailsPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportText, setReportText] = useState("");
  const [showContactModal, setShowContactModal] = useState(false);

  const handleSendReport = () => {
    if (reportText.trim()) {
      // In real app, this would send the report
      console.log("Sending report:", reportText);
      setShowReportModal(false);
      setReportText("");
      alert("Báo cáo đã được gửi thành công!");
    }
  };

  return (
    <ProtectedRoute allowedUserTypes={['tenant']}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <Link href="/tenant-dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
                  <div className="h-8 w-8 bg-green-600 rounded mr-3 flex items-center justify-center">
                    <span className="text-white font-bold">🏠</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">SmartDorm</span>
                </Link>
                <span className="mx-3 text-gray-400">/</span>
                <span className="text-gray-600">Chi tiết phòng {mockRoomDetails.number}</span>
              </div>
              <Link href="/tenant-dashboard" className="text-green-600 hover:text-green-800">
                ← Quay lại Dashboard
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Room Header */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Image Gallery */}
              <div>
                <div className="relative mb-4">
                  <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-xl overflow-hidden">
                    <div className="w-full h-80 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-lg">
                      Hình ảnh phòng {mockRoomDetails.number}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                    >
                      {isFavorite ? (
                        <HeartSolidIcon className="h-5 w-5 text-red-500" />
                      ) : (
                        <HeartIcon className="h-5 w-5 text-gray-600" />
                      )}
                    </button>
                    <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                      <ShareIcon className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((index) => (
                    <div
                      key={index}
                      className={`aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden cursor-pointer ${
                        selectedImageIndex === index - 1 ? 'ring-2 ring-green-500' : ''
                      }`}
                      onClick={() => setSelectedImageIndex(index - 1)}
                    >
                      <div className="w-full h-20 bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white text-sm">
                        {index}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Room Info */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">Phòng {mockRoomDetails.number}</h1>
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Đang thuê
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`h-5 w-5 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">4.0 (12 đánh giá)</span>
                </div>

                <div className="flex items-center text-gray-600 mb-6">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>{mockRoomDetails.address}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {mockRoomDetails.price.toLocaleString()}đ
                    </div>
                    <div className="text-sm text-gray-600">/ tháng</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {mockRoomDetails.area}m²
                    </div>
                    <div className="text-sm text-gray-600">Diện tích</div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {mockRoomDetails.fullDescription}
                </p>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg font-medium"
                  >
                    Liên hệ chủ trọ
                  </button>
                  <button
                    onClick={() => setShowReportModal(true)}
                    className="flex-1 border-2 border-green-600 text-green-600 py-3 rounded-xl hover:bg-green-50 transition-colors font-medium"
                  >
                    Báo cáo sự cố
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tiện nghi phòng</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {mockRoomDetails.amenitiesDetailed.map((amenity, index) => (
                <div key={index} className="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="text-3xl mb-2">{amenity.icon}</div>
                  <div className="font-medium text-gray-900 mb-1">{amenity.name}</div>
                  <div className="text-sm text-gray-600">{amenity.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contract Info */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông tin hợp đồng</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl">
                <CalendarIcon className="h-8 w-8 text-blue-600 mb-3" />
                <div className="text-sm text-blue-600 mb-1">Ngày bắt đầu</div>
                <div className="font-semibold text-gray-900">{mockContract.startDate}</div>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <CalendarIcon className="h-8 w-8 text-green-600 mb-3" />
                <div className="text-sm text-green-600 mb-1">Ngày kết thúc</div>
                <div className="font-semibold text-gray-900">{mockContract.endDate}</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <CurrencyDollarIcon className="h-8 w-8 text-purple-600 mb-3" />
                <div className="text-sm text-purple-600 mb-1">Tiền cọc</div>
                <div className="font-semibold text-gray-900">{mockContract.deposit.toLocaleString()}đ</div>
              </div>
            </div>
          </div>

          {/* Nearby Places */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tiện ích xung quanh</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockRoomDetails.nearbyPlaces.map((place, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl mr-4">
                    {place.type === 'education' ? '🎓' : 
                     place.type === 'shopping' ? '🛒' : 
                     place.type === 'hospital' ? '🏥' : 
                     place.type === 'park' ? '🌳' : '🚌'}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{place.name}</div>
                    <div className="text-sm text-gray-600">{place.distance}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Nội quy phòng trọ</h2>
            <div className="space-y-3">
              {mockRoomDetails.rules.map((rule, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Đánh giá từ khách thuê</h2>
            <div className="space-y-6">
              {mockRoomDetails.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{review.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900">{review.tenant}</div>
                        <div className="text-sm text-gray-500">{review.date}</div>
                      </div>
                      <div className="flex items-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Modal */}
        {showContactModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Thông tin liên hệ</h3>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">👨‍💼</div>
                  <h4 className="text-lg font-semibold text-gray-900">{mockRoomDetails.landlord.name}</h4>
                  <div className="flex items-center justify-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`h-4 w-4 ${star <= Math.floor(mockRoomDetails.landlord.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {mockRoomDetails.landlord.rating} ({mockRoomDetails.landlord.totalReviews} đánh giá)
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-900">{mockRoomDetails.landlord.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-900">{mockRoomDetails.landlord.email}</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-600">{mockRoomDetails.landlord.responseTime}</span>
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Đóng
                  </button>
                  <a
                    href={`tel:${mockRoomDetails.landlord.phone}`}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-center"
                  >
                    Gọi ngay
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Report Modal */}
        {showReportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-lg w-full">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Báo cáo sự cố</h3>
                <p className="text-gray-600 mt-1">Phòng {mockRoomDetails.number}</p>
              </div>
              <div className="p-6">
                <textarea
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder="Mô tả chi tiết sự cố bạn gặp phải..."
                  rows={4}
                  className="form-input w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => {
                      setShowReportModal(false);
                      setReportText("");
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSendReport}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Gửi báo cáo
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
