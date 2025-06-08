"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { 
  HomeIcon,
  StarIcon,
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
  ShareIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

// Mock data cho phòng chi tiết
const mockRoomDetails = {
  "102": {
    id: "102",
    number: "102",
    price: 3200000,
    area: 28,
    status: "available",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    images: [
      "/images/room-102-1.jpg",
      "/images/room-102-2.jpg", 
      "/images/room-102-3.jpg",
      "/images/room-102-4.jpg"
    ],
    description: "Phòng trọ hiện đại, thoáng mát với đầy đủ tiện nghi. Vị trí thuận lợi gần trường đại học, siêu thị và các tiện ích công cộng.",
    amenities: [
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
  },
  "202": {
    id: "202",
    number: "202", 
    price: 3500000,
    area: 30,
    status: "available",
    address: "456 Đường XYZ, Quận 3, TP.HCM",
    images: ["/images/room-202-1.jpg"],
    description: "Phòng rộng rãi, view đẹp, đầy đủ nội thất cao cấp.",
    amenities: [
      { name: "Máy lạnh", icon: "❄️", description: "Máy lạnh Panasonic 2HP" },
      { name: "Tủ lạnh", icon: "🧊", description: "Tủ lạnh Samsung 200L" },
      { name: "WiFi", icon: "📶", description: "Internet Viettel 150Mbps" },
      { name: "TV", icon: "📺", description: "Smart TV 43 inch" }
    ],
    nearbyPlaces: [
      { name: "Đại học Kinh tế", distance: "300m", type: "education" },
      { name: "Chợ Bến Thành", distance: "1.5km", type: "shopping" }
    ],
    rules: [
      "Không hút thuốc trong phòng",
      "Không nuôi thú cưng",
      "Giữ vệ sinh chung"
    ],
    reviews: [],
    landlord: {
      name: "Chủ trọ XYZ",
      phone: "0987654321", 
      email: "owner2@smartdorm.vn",
      responseTime: "Thường phản hồi trong 2 giờ",
      rating: 4.5,
      totalReviews: 18
    }
  },
  "301": {
    id: "301",
    number: "301",
    price: 4000000,
    area: 35,
    status: "available", 
    address: "789 Đường DEF, Quận 7, TP.HCM",
    images: ["/images/room-301-1.jpg"],
    description: "Phòng VIP với view sông, nội thất sang trọng.",
    amenities: [
      { name: "Máy lạnh", icon: "❄️", description: "Máy lạnh Daikin Inverter 2HP" },
      { name: "Tủ lạnh", icon: "🧊", description: "Tủ lạnh LG 250L" },
      { name: "WiFi", icon: "📶", description: "Internet FPT 200Mbps" },
      { name: "Bếp", icon: "🍳", description: "Bếp từ đôi" }
    ],
    nearbyPlaces: [
      { name: "Đại học RMIT", distance: "800m", type: "education" },
      { name: "Lotte Mart", distance: "500m", type: "shopping" }
    ],
    rules: [
      "Không hút thuốc trong phòng",
      "Không nuôi thú cưng",
      "Giữ vệ sinh chung",
      "Không gây ồn sau 22h"
    ],
    reviews: [],
    landlord: {
      name: "Chủ trọ DEF",
      phone: "0123987456",
      email: "owner3@smartdorm.vn", 
      responseTime: "Thường phản hồi trong 30 phút",
      rating: 4.9,
      totalReviews: 32
    }
  }
};

export default function RoomDetailsPage() {
  const params = useParams();
  const roomId = params.id as string;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const room = mockRoomDetails[roomId as keyof typeof mockRoomDetails];

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy phòng</h1>
          <Link href="/tenant-dashboard" className="text-green-600 hover:text-green-800">
            ← Quay lại Dashboard
          </Link>
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
              <Link href="/tenant-dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                <div className="h-8 w-8 bg-green-600 rounded mr-3 flex items-center justify-center">
                  <span className="text-white font-bold">🏠</span>
                </div>
                <span className="text-xl font-bold text-gray-900">SmartDorm</span>
              </Link>
              <span className="mx-3 text-gray-400">/</span>
              <span className="text-gray-600">Chi tiết phòng {room.number}</span>
            </div>
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
                    Hình ảnh phòng {room.number}
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
                <h1 className="text-3xl font-bold text-gray-900">Phòng {room.number}</h1>
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Còn trống
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
                <span className="ml-2 text-gray-600">4.0 ({room.reviews.length} đánh giá)</span>
              </div>

              <div className="flex items-center text-gray-600 mb-6">
                <MapPinIcon className="h-5 w-5 mr-2" />
                <span>{room.address}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {room.price.toLocaleString()}đ
                  </div>
                  <div className="text-sm text-gray-600">/ tháng</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {room.area}m²
                  </div>
                  <div className="text-sm text-gray-600">Diện tích</div>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {room.description}
              </p>

              <div className="flex space-x-3">
                <Link
                  href="/book-room"
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg font-medium text-center"
                >
                  Đặt phòng ngay
                </Link>
                <button
                  onClick={() => setShowContactModal(true)}
                  className="flex-1 border-2 border-green-600 text-green-600 py-3 rounded-xl hover:bg-green-50 transition-colors font-medium"
                >
                  Liên hệ chủ trọ
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tiện nghi phòng</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {room.amenities.map((amenity, index) => (
              <div key={index} className="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="text-3xl mb-2">{amenity.icon}</div>
                <div className="font-medium text-gray-900 mb-1">{amenity.name}</div>
                <div className="text-sm text-gray-600">{amenity.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Places */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tiện ích xung quanh</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {room.nearbyPlaces.map((place, index) => (
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
            {room.rules.map((rule, index) => (
              <div key={index} className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        {room.reviews.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Đánh giá từ khách thuê</h2>
            <div className="space-y-6">
              {room.reviews.map((review) => (
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
        )}
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
                <h4 className="text-lg font-semibold text-gray-900">{room.landlord.name}</h4>
                <div className="flex items-center justify-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`h-4 w-4 ${star <= Math.floor(room.landlord.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {room.landlord.rating} ({room.landlord.totalReviews} đánh giá)
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{room.landlord.phone}</span>
                </div>
                <div className="flex items-center">
                  <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{room.landlord.email}</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">{room.landlord.responseTime}</span>
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
                  href={`tel:${room.landlord.phone}`}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-center"
                >
                  Gọi ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
