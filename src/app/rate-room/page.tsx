"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ArrowLeftIcon,
  StarIcon,
  PhotoIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

export default function RateRoomPage() {
  const [rating, setRating] = useState({
    overall: 0,
    cleanliness: 0,
    facilities: 0,
    location: 0,
    value: 0,
    landlord: 0
  });
  
  const [review, setReview] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const ratingCategories = [
    { key: "overall", label: "Đánh giá tổng thể", icon: "⭐" },
    { key: "cleanliness", label: "Vệ sinh sạch sẽ", icon: "🧹" },
    { key: "facilities", label: "Tiện nghi phòng", icon: "🏠" },
    { key: "location", label: "Vị trí thuận lợi", icon: "📍" },
    { key: "value", label: "Giá trị đồng tiền", icon: "💰" },
    { key: "landlord", label: "Thái độ chủ trọ", icon: "👤" }
  ];

  const handleStarClick = (category: string, stars: number) => {
    setRating(prev => ({ ...prev, [category]: stars }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      setPhotos(prev => [...prev, ...newPhotos].slice(0, 5)); // Max 5 photos
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting review:", { rating, review, photos, isAnonymous });
    setSubmitted(true);
  };

  const averageRating = Object.values(rating).reduce((sum, val) => sum + val, 0) / Object.values(rating).length;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cảm ơn bạn!</h2>
          <p className="text-gray-600 mb-6">
            Đánh giá của bạn đã được gửi thành công. Điều này sẽ giúp cải thiện chất lượng dịch vụ.
          </p>
          <div className="space-y-3">
            <Link
              href="/tenant-dashboard"
              className="block w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Quay lại Dashboard
            </Link>
            <button
              onClick={() => setSubmitted(false)}
              className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Đánh giá thêm
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <span className="text-gray-600">Đánh giá phòng</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8">
            <h1 className="text-3xl font-bold mb-2">Đánh giá phòng của bạn</h1>
            <p className="text-green-100">Chia sẻ trải nghiệm của bạn để giúp cải thiện chất lượng dịch vụ</p>
            <div className="mt-4 bg-white/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Phòng hiện tại</p>
                  <p className="text-xl font-bold">Phòng 101</p>
                </div>
                <div>
                  <p className="text-green-100 text-sm">Thời gian thuê</p>
                  <p className="text-xl font-bold">6 tháng</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Rating Categories */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Đánh giá chi tiết</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ratingCategories.map((category) => (
                  <div key={category.key} className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">{category.icon}</span>
                      <span className="font-medium text-gray-900">{category.label}</span>
                    </div>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleStarClick(category.key, star)}
                          className="focus:outline-none"
                        >
                          {star <= rating[category.key as keyof typeof rating] ? (
                            <StarSolidIcon className="h-6 w-6 text-yellow-400" />
                          ) : (
                            <StarIcon className="h-6 w-6 text-gray-300 hover:text-yellow-400 transition-colors" />
                          )}
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {rating[category.key as keyof typeof rating] > 0 && `${rating[category.key as keyof typeof rating]}/5`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Rating Display */}
            {averageRating > 0 && (
              <div className="mb-8 bg-blue-50 p-6 rounded-xl">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-blue-600 mb-2">Đánh giá tổng thể</p>
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-3xl font-bold text-blue-600 mr-2">
                        {averageRating.toFixed(1)}
                      </span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarSolidIcon
                            key={star}
                            className={`h-6 w-6 ${
                              star <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-blue-600">
                      {averageRating >= 4.5 ? 'Xuất sắc' :
                       averageRating >= 4 ? 'Rất tốt' :
                       averageRating >= 3 ? 'Tốt' :
                       averageRating >= 2 ? 'Trung bình' : 'Cần cải thiện'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Written Review */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Chia sẻ trải nghiệm của bạn
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                rows={6}
                placeholder="Hãy chia sẻ những điều bạn thích và không thích về phòng, dịch vụ, chủ trọ... Đánh giá chi tiết sẽ giúp ích cho những người thuê sau này."
              />
              <p className="text-sm text-gray-500 mt-2">
                Tối thiểu 50 ký tự ({review.length}/50)
              </p>
            </div>

            {/* Photo Upload */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Thêm hình ảnh (tùy chọn)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                <PhotoIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Thêm hình ảnh về phòng để đánh giá thêm sinh động</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer inline-block"
                >
                  Chọn hình ảnh
                </label>
                <p className="text-sm text-gray-500 mt-2">Tối đa 5 hình ảnh, mỗi hình dưới 5MB</p>
              </div>
              
              {photos.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Privacy Options */}
            <div className="mb-8">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="mr-3 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Đánh giá ẩn danh (không hiển thị tên của bạn)</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <Link
                href="/tenant-dashboard"
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                Hủy
              </Link>
              <button
                type="submit"
                disabled={averageRating === 0 || review.length < 50}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Gửi đánh giá
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
