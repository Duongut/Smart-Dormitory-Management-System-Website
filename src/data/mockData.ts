// Mock data for SmartDorm application

export interface Room {
  id: number;
  number: string;
  status: 'occupied' | 'available' | 'maintenance';
  tenant: string | null;
  price: number;
  area: number;
  amenities: string[];
  description: string;
  images: string[];
  address: string;
  deposit: number;
}

export interface Bill {
  id: number;
  room: string;
  tenant: string;
  amount: number;
  type: 'monthly' | 'electric' | 'water' | 'service';
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  month: string;
  details?: BillDetail[];
}

export interface BillDetail {
  item: string;
  amount: number;
}

export interface Report {
  id: number;
  room: string;
  issue: string;
  status: 'pending' | 'in-progress' | 'completed';
  date: string;
  tenant: string;
  response?: string;
}

export interface Contract {
  roomNumber: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  deposit: number;
  status: 'active' | 'expired' | 'terminated';
}

export interface Tenant {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  idNumber: string;
  roomNumber: string;
  moveInDate: string;
  contractDuration: number;
}

// Mock Rooms Data
export const mockRooms: Room[] = [
  {
    id: 1,
    number: "101",
    status: "occupied",
    tenant: "Nguyễn Văn A",
    price: 3000000,
    area: 25,
    amenities: ["Máy lạnh", "Tủ lạnh", "WiFi"],
    description: "Phòng thoáng mát, view đẹp, gần trường đại học",
    images: ["room101.jpg"],
    address: "123 Đường ABC, Quận 1, TP.HCM",
    deposit: 6000000
  },
  {
    id: 2,
    number: "102",
    status: "available",
    tenant: null,
    price: 3200000,
    area: 28,
    amenities: ["Máy lạnh", "Tủ lạnh", "WiFi", "Ban công"],
    description: "Phòng rộng rãi với ban công riêng, đầy đủ nội thất",
    images: ["room102.jpg"],
    address: "123 Đường ABC, Quận 1, TP.HCM",
    deposit: 6400000
  },
  {
    id: 3,
    number: "103",
    status: "maintenance",
    tenant: null,
    price: 3000000,
    area: 25,
    amenities: ["Máy lạnh", "Tủ lạnh", "WiFi"],
    description: "Phòng đang được sửa chữa, sẽ sẵn sàng trong tuần tới",
    images: ["room103.jpg"],
    address: "123 Đường ABC, Quận 1, TP.HCM",
    deposit: 6000000
  },
  {
    id: 4,
    number: "201",
    status: "occupied",
    tenant: "Trần Thị B",
    price: 3500000,
    area: 30,
    amenities: ["Máy lạnh", "Tủ lạnh", "WiFi", "Ban công", "Bếp riêng"],
    description: "Phòng cao cấp với bếp riêng và ban công rộng",
    images: ["room201.jpg"],
    address: "123 Đường ABC, Quận 1, TP.HCM",
    deposit: 7000000
  },
  {
    id: 5,
    number: "202",
    status: "available",
    tenant: null,
    price: 3500000,
    area: 30,
    amenities: ["Máy lạnh", "Tủ lạnh", "WiFi", "Ban công", "Bếp riêng"],
    description: "Phòng cao cấp tầng 2, view đẹp, đầy đủ tiện nghi",
    images: ["room202.jpg"],
    address: "123 Đường ABC, Quận 1, TP.HCM",
    deposit: 7000000
  },
  {
    id: 6,
    number: "301",
    status: "available",
    tenant: null,
    price: 4000000,
    area: 35,
    amenities: ["Máy lạnh", "Tủ lạnh", "WiFi", "Ban công", "Bếp riêng", "Máy giặt"],
    description: "Phòng VIP tầng 3, rộng rãi nhất, có máy giặt riêng",
    images: ["room301.jpg"],
    address: "123 Đường ABC, Quận 1, TP.HCM",
    deposit: 8000000
  }
];

// Mock Bills Data
export const mockBills: Bill[] = [
  {
    id: 1,
    room: "101",
    tenant: "Nguyễn Văn A",
    amount: 3500000,
    type: "monthly",
    status: "paid",
    dueDate: "2024-01-25",
    month: "01/2024",
    details: [
      { item: "Tiền phòng", amount: 3000000 },
      { item: "Tiền điện (150 kWh x 3,500đ)", amount: 525000 },
      { item: "Tiền nước (15m³ x 25,000đ)", amount: 375000 },
      { item: "Phí dịch vụ", amount: 100000 },
      { item: "Giảm giá khách hàng thân thiết", amount: -500000 }
    ]
  },
  {
    id: 2,
    room: "201",
    tenant: "Trần Thị B",
    amount: 4000000,
    type: "monthly",
    status: "pending",
    dueDate: "2024-02-25",
    month: "02/2024",
    details: [
      { item: "Tiền phòng", amount: 3500000 },
      { item: "Tiền điện (120 kWh x 3,500đ)", amount: 420000 },
      { item: "Tiền nước (12m³ x 25,000đ)", amount: 300000 },
      { item: "Phí dịch vụ", amount: 150000 },
      { item: "Phí internet", amount: 200000 },
      { item: "Phí vệ sinh", amount: 50000 },
      { item: "Giảm giá", amount: -620000 }
    ]
  },
  {
    id: 3,
    room: "102",
    tenant: "Lê Văn C",
    amount: 500000,
    type: "electric",
    status: "overdue",
    dueDate: "2024-01-20",
    month: "01/2024"
  },
  {
    id: 4,
    room: "101",
    tenant: "Nguyễn Văn A",
    amount: 3700000,
    type: "monthly",
    status: "pending",
    dueDate: "2024-02-25",
    month: "02/2024"
  }
];

// Mock Reports Data
export const mockReports: Report[] = [
  {
    id: 1,
    room: "101",
    issue: "Máy lạnh không hoạt động",
    status: "in-progress",
    date: "2024-01-15",
    tenant: "Nguyễn Văn A",
    response: "Đã liên hệ thợ sửa chữa, dự kiến hoàn thành trong 2 ngày"
  },
  {
    id: 2,
    room: "201",
    issue: "Vòi nước bị rò rỉ",
    status: "completed",
    date: "2024-01-14",
    tenant: "Trần Thị B",
    response: "Đã thay thế vòi nước mới, hoàn thành"
  },
  {
    id: 3,
    room: "103",
    issue: "Đèn phòng bị hỏng",
    status: "completed",
    date: "2024-01-12",
    tenant: "Lê Văn C",
    response: "Đã thay bóng đèn LED mới"
  },
  {
    id: 4,
    room: "202",
    issue: "WiFi không ổn định",
    status: "pending",
    date: "2024-01-16",
    tenant: "Phạm Thị D",
    response: ""
  }
];

// Mock Tenants Data
export const mockTenants: Tenant[] = [
  {
    id: 1,
    fullName: "Nguyễn Văn A",
    phone: "0123456789",
    email: "nguyenvana@email.com",
    idNumber: "123456789012",
    roomNumber: "101",
    moveInDate: "2023-06-01",
    contractDuration: 12
  },
  {
    id: 2,
    fullName: "Trần Thị B",
    phone: "0987654321",
    email: "tranthib@email.com",
    idNumber: "987654321098",
    roomNumber: "201",
    moveInDate: "2023-08-15",
    contractDuration: 12
  },
  {
    id: 3,
    fullName: "Lê Văn C",
    phone: "0456789123",
    email: "levanc@email.com",
    idNumber: "456789123456",
    roomNumber: "102",
    moveInDate: "2023-09-01",
    contractDuration: 6
  }
];

// Mock Contract Data
export const mockContract: Contract = {
  roomNumber: "101",
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  monthlyRent: 3500000,
  deposit: 7000000,
  status: "active"
};

// Statistics Data
export const mockStatistics = {
  totalRooms: mockRooms.length,
  occupiedRooms: mockRooms.filter(room => room.status === 'occupied').length,
  availableRooms: mockRooms.filter(room => room.status === 'available').length,
  maintenanceRooms: mockRooms.filter(room => room.status === 'maintenance').length,
  monthlyRevenue: mockBills
    .filter(bill => bill.status === 'paid' && bill.month === '01/2024')
    .reduce((total, bill) => total + bill.amount, 0),
  pendingBills: mockBills.filter(bill => bill.status === 'pending').length,
  overdueBills: mockBills.filter(bill => bill.status === 'overdue').length,
  pendingReports: mockReports.filter(report => report.status === 'pending').length,
  occupancyRate: Math.round((mockRooms.filter(room => room.status === 'occupied').length / mockRooms.length) * 100)
};

// Payment Methods
export const paymentMethods = [
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

// Utility functions
export const getStatusColor = (status: string): string => {
  switch (status) {
    case "occupied": return "bg-green-100 text-green-800";
    case "available": return "bg-blue-100 text-blue-800";
    case "maintenance": return "bg-yellow-100 text-yellow-800";
    case "paid": return "bg-green-100 text-green-800";
    case "pending": return "bg-yellow-100 text-yellow-800";
    case "overdue": return "bg-red-100 text-red-800";
    case "in-progress": return "bg-blue-100 text-blue-800";
    case "completed": return "bg-green-100 text-green-800";
    case "active": return "bg-green-100 text-green-800";
    case "expired": return "bg-red-100 text-red-800";
    case "terminated": return "bg-gray-100 text-gray-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export const getStatusText = (status: string): string => {
  switch (status) {
    case "occupied": return "Đã thuê";
    case "available": return "Trống";
    case "maintenance": return "Bảo trì";
    case "paid": return "Đã thanh toán";
    case "pending": return "Chờ thanh toán";
    case "overdue": return "Quá hạn";
    case "in-progress": return "Đang xử lý";
    case "completed": return "Hoàn thành";
    case "active": return "Đang hiệu lực";
    case "expired": return "Hết hạn";
    case "terminated": return "Đã hủy";
    default: return status;
  }
};
