"use client";

import Link from "next/link";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface HeaderProps {
  userType?: "owner" | "tenant";
  userName?: string;
}

export default function Header({ userType, userName }: HeaderProps) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const getHeaderColor = () => {
    switch (userType) {
      case "owner": return "bg-blue-600";
      case "tenant": return "bg-green-600";
      default: return "bg-blue-600";
    }
  };

  const getHoverColor = () => {
    switch (userType) {
      case "owner": return "hover:text-blue-600";
      case "tenant": return "hover:text-green-600";
      default: return "hover:text-blue-600";
    }
  };

  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className={`h-8 w-8 ${getHeaderColor()} rounded mr-3 flex items-center justify-center`}>
                <BuildingOfficeIcon className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                SmartDorm
                {userType && (
                  <span className="text-lg font-normal text-gray-600 ml-2">
                    - {userType === "owner" ? "Chủ trọ" : "Khách thuê"}
                  </span>
                )}
              </h1>
            </Link>
          </div>
          
          {!userType ? (
            // Public header navigation
            <nav className="hidden md:flex space-x-8">
              <Link href="#features" className={`text-gray-700 ${getHoverColor()} transition-colors`}>
                Tính năng
              </Link>
              <Link href="#pricing" className={`text-gray-700 ${getHoverColor()} transition-colors`}>
                Bảng giá
              </Link>
              <Link href="#contact" className={`text-gray-700 ${getHoverColor()} transition-colors`}>
                Liên hệ
              </Link>
              <Link href="/owner-dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Chủ trọ
              </Link>
              <Link href="/tenant-dashboard" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Khách thuê
              </Link>
            </nav>
          ) : (
            // Dashboard header
            <div className="flex items-center space-x-4">
              {userName && (
                <span className="text-gray-700">Xin chào, {userName}</span>
              )}
              <button
                onClick={handleLogout}
                className={`${userType === "owner" ? "text-blue-600 hover:text-blue-800" : "text-green-600 hover:text-green-800"} transition-colors cursor-pointer`}
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
