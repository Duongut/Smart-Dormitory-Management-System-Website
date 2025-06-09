"use client";

import { useState } from "react";
import Link from "next/link";
import { StarIcon, ChatBubbleLeftRightIcon, HeartIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

// Mock data for tenant's reviews
const mockTenantReviews = [
  {
    id: 1,
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
    ownerResponse: {
      text: "Cảm ơn bạn rất nhiều vì đánh giá tích cực! Chúng tôi luôn cố gắng tạo môi trường sống tốt nhất cho các bạn sinh viên. Chúc bạn học tập tốt!",
      date: "2024-03-02"
    },
    tenantReply: null,
    helpful: 12,
    isHelpful: false,
    isLiked: false
  },
  {
    id: 2,
    room: "101",
    rating: 4,
    date: "2024-02-15",
    review: "Phòng tốt, giá cả hợp lý. Chỉ có điều internet đôi khi chậm vào giờ cao điểm.",
    categories: {
      cleanliness: 4,
      facilities: 3,
      location: 5,
      value: 4,
      landlord: 4
    },
    ownerResponse: {
      text: "Cảm ơn bạn đã góp ý! Chúng tôi đã nâng cấp hệ thống internet và sẽ theo dõi chất lượng kết nối. Nếu còn vấn đề gì, bạn hãy liên hệ ngay nhé!",
      date: "2024-02-16"
    },
    tenantReply: "Cảm ơn chủ trọ đã nhanh chóng xử lý! Internet giờ đã ổn định hơn rồi ạ.",
    helpful: 8,
    isHelpful: true,
    isLiked: true
  }
];

export default function TenantReviewsPage() {
  const [reviews, setReviews] = useState(mockTenantReviews);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [replyText, setReplyText] = useState("");

  const openReplyModal = (review: any) => {
    setSelectedReview(review);
    setReplyText(review.tenantReply || "");
    setShowReplyModal(true);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.trim()) {
      setReviews(reviews.map(review => 
        review.id === selectedReview.id 
          ? { ...review, tenantReply: replyText }
          : review
      ));
      setShowReplyModal(false);
      setReplyText("");
      alert("Phản hồi của bạn đã được gửi thành công!");
    }
  };

  const toggleHelpful = (reviewId: number) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            isHelpful: !review.isHelpful,
            helpful: review.isHelpful ? review.helpful - 1 : review.helpful + 1
          }
        : review
    ));
  };

  const toggleLike = (reviewId: number) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, isLiked: !review.isLiked }
        : review
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Đánh giá của tôi</h1>
              <p className="text-gray-600">Quản lý và theo dõi các đánh giá bạn đã viết</p>
            </div>
            <Link
              href="/tenant-dashboard"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Quay lại Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📝</div>
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng đánh giá</p>
                <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="text-3xl mr-4">⭐</div>
              <div>
                <p className="text-sm font-medium text-gray-600">Điểm trung bình</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="text-3xl mr-4">💬</div>
              <div>
                <p className="text-sm font-medium text-gray-600">Phản hồi từ chủ trọ</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reviews.filter(r => r.ownerResponse).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="font-semibold text-gray-900">Phòng {review.room}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{review.date}</span>
                  </div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIconSolid
                        key={star}
                        className={`h-5 w-5 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-2 font-bold text-gray-900">{review.rating}/5</span>
                  </div>
                </div>
                <Link
                  href="/rate-room"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Chỉnh sửa
                </Link>
              </div>

              {/* Review Content */}
              <p className="text-gray-700 mb-4 leading-relaxed">{review.review}</p>

              {/* Category Ratings */}
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
              {review.ownerResponse && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm">
                      CT
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-blue-900">Phản hồi từ chủ trọ</span>
                        <span className="text-sm text-blue-600">{review.ownerResponse.date}</span>
                      </div>
                      <p className="text-blue-800 mb-3">{review.ownerResponse.text}</p>
                      
                      {/* Tenant Reply */}
                      {review.tenantReply && (
                        <div className="mt-3 p-3 bg-white rounded-lg border border-blue-200">
                          <div className="flex items-center mb-2">
                            <span className="font-medium text-gray-900">Phản hồi của bạn:</span>
                          </div>
                          <p className="text-gray-700">{review.tenantReply}</p>
                        </div>
                      )}
                      
                      <button
                        onClick={() => openReplyModal(review)}
                        className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        {review.tenantReply ? 'Chỉnh sửa phản hồi' : 'Phản hồi lại'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleHelpful(review.id)}
                    className={`flex items-center space-x-1 text-sm ${
                      review.isHelpful ? 'text-green-600' : 'text-gray-500 hover:text-green-600'
                    }`}
                  >
                    <span>👍</span>
                    <span>{review.helpful}</span>
                  </button>
                  <button
                    onClick={() => toggleLike(review.id)}
                    className={`flex items-center space-x-1 text-sm ${
                      review.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    {review.isLiked ? (
                      <HeartIconSolid className="h-4 w-4" />
                    ) : (
                      <HeartIcon className="h-4 w-4" />
                    )}
                    <span>Thích</span>
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  {review.ownerResponse ? 'Đã có phản hồi' : 'Chờ phản hồi'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {reviews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có đánh giá nào</h3>
            <p className="text-gray-600 mb-6">Hãy viết đánh giá đầu tiên về phòng trọ của bạn!</p>
            <Link
              href="/rate-room"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Viết đánh giá
            </Link>
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                Phản hồi lại chủ trọ
              </h3>
              <p className="text-gray-600 mt-1">
                Phản hồi về đánh giá phòng {selectedReview.room}
              </p>
            </div>
            
            <div className="p-6">
              {/* Owner Response */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="font-medium text-blue-900">Phản hồi từ chủ trọ:</span>
                  <span className="ml-2 text-sm text-blue-600">{selectedReview.ownerResponse?.date}</span>
                </div>
                <p className="text-blue-800">{selectedReview.ownerResponse?.text}</p>
              </div>

              {/* Reply Form */}
              <form onSubmit={handleReplySubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phản hồi của bạn
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="form-input w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    rows={4}
                    placeholder="Cảm ơn chủ trọ đã phản hồi..."
                    required
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowReplyModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {selectedReview.tenantReply ? 'Cập nhật phản hồi' : 'Gửi phản hồi'}
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
