"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  CreditCardIcon, 
  DevicePhoneMobileIcon, 
  BanknotesIcon,
  CheckCircleIcon 
} from "@heroicons/react/24/outline";

const mockBill = {
  id: 1,
  roomNumber: "101",
  tenant: "Nguyễn Văn A",
  type: "Tiền phòng tháng 02/2024",
  amount: 3500000,
  dueDate: "2024-02-25",
  details: [
    { item: "Tiền phòng", amount: 3000000 },
    { item: "Tiền điện (150 kWh x 3,500đ)", amount: 525000 },
    { item: "Tiền nước (15m³ x 25,000đ)", amount: 375000 },
    { item: "Phí dịch vụ", amount: 100000 },
    { item: "Giảm giá khách hàng thân thiết", amount: -500000 },
  ]
};

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const paymentMethods = [
    {
      id: "momo",
      name: "Ví MoMo",
      icon: "📱",
      description: "Thanh toán qua ví điện tử MoMo"
    },
    {
      id: "zalopay",
      name: "ZaloPay",
      icon: "💳",
      description: "Thanh toán qua ví điện tử ZaloPay"
    },
    {
      id: "banking",
      name: "Chuyển khoản ngân hàng",
      icon: "🏦",
      description: "Chuyển khoản qua Internet Banking"
    },
    {
      id: "card",
      name: "Thẻ tín dụng/ghi nợ",
      icon: "💳",
      description: "Thanh toán bằng thẻ Visa, Mastercard"
    }
  ];

  const handlePayment = async () => {
    if (!selectedMethod) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
    }, 3000);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán thành công!</h2>
          <p className="text-gray-600 mb-6">
            Hóa đơn {mockBill.type} đã được thanh toán thành công.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">Mã giao dịch</p>
            <p className="font-mono text-lg font-semibold">TXN{Date.now()}</p>
          </div>
          <div className="space-y-3">
            <Link href="/tenant-dashboard" className="block w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
              Quay về Dashboard
            </Link>
            <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              Tải biên lai
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/tenant-dashboard" className="flex items-center">
                <div className="h-8 w-8 bg-green-600 rounded mr-3 flex items-center justify-center">
                  <span className="text-white font-bold">🏠</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">Thanh toán hóa đơn</h1>
              </Link>
            </div>
            <Link href="/tenant-dashboard" className="text-green-600 hover:text-green-800">
              ← Quay lại
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bill Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Chi tiết hóa đơn</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Phòng:</span>
                <span className="font-semibold">{mockBill.roomNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Khách thuê:</span>
                <span className="font-semibold">{mockBill.tenant}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Loại hóa đơn:</span>
                <span className="font-semibold">{mockBill.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hạn thanh toán:</span>
                <span className="font-semibold text-red-600">{mockBill.dueDate}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-900 mb-3">Chi tiết các khoản</h3>
              <div className="space-y-2">
                {mockBill.details.map((detail, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{detail.item}</span>
                    <span className={detail.amount < 0 ? "text-green-600" : "text-gray-900"}>
                      {detail.amount < 0 ? "-" : ""}{Math.abs(detail.amount).toLocaleString()}đ
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-green-600">{mockBill.amount.toLocaleString()}đ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Chọn phương thức thanh toán</h2>
            
            <div className="space-y-3 mb-6">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedMethod === method.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">{method.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{method.name}</h3>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedMethod === method.id
                        ? "border-green-500 bg-green-500"
                        : "border-gray-300"
                    }`}>
                      {selectedMethod === method.id && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Form */}
            {selectedMethod && (
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Thông tin thanh toán</h3>
                
                {selectedMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Số thẻ
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          MM/YY
                        </label>
                        <input
                          type="text"
                          placeholder="12/25"
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedMethod === "banking" && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Thông tin chuyển khoản</h4>
                    <div className="text-sm text-blue-800 space-y-1">
                      <p><strong>Ngân hàng:</strong> Vietcombank</p>
                      <p><strong>Số tài khoản:</strong> 1234567890</p>
                      <p><strong>Chủ tài khoản:</strong> SMARTDORM COMPANY</p>
                      <p><strong>Nội dung:</strong> THANHTOAN {mockBill.roomNumber} {mockBill.tenant}</p>
                    </div>
                  </div>
                )}

                {(selectedMethod === "momo" || selectedMethod === "zalopay") && (
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gray-200 mx-auto mb-4 flex items-center justify-center rounded-lg">
                      <span className="text-gray-500">QR Code</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Quét mã QR bằng ứng dụng {selectedMethod === "momo" ? "MoMo" : "ZaloPay"}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={!selectedMethod || isProcessing}
              className={`w-full mt-6 py-3 rounded-lg font-semibold transition-colors ${
                !selectedMethod || isProcessing
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Đang xử lý...
                </div>
              ) : (
                `Thanh toán ${mockBill.amount.toLocaleString()}đ`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
