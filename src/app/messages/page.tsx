"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { 
  ArrowLeftIcon,
  PaperAirplaneIcon,
  PhotoIcon,
  PaperClipIcon,
  FaceSmileIcon,
  PhoneIcon,
  VideoCameraIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";

interface Message {
  id: string;
  sender: 'tenant' | 'owner';
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  read: boolean;
  fileUrl?: string;
  fileName?: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'owner',
      content: 'Chào bạn! Tôi là chủ trọ. Có vấn đề gì cần hỗ trợ không?',
      timestamp: '2024-03-01 09:00',
      type: 'text',
      read: true
    },
    {
      id: '2',
      sender: 'tenant',
      content: 'Chào chủ trọ! Tôi muốn hỏi về việc sửa chữa máy lạnh ạ.',
      timestamp: '2024-03-01 09:15',
      type: 'text',
      read: true
    },
    {
      id: '3',
      sender: 'owner',
      content: 'Máy lạnh có vấn đề gì vậy bạn? Bạn có thể mô tả chi tiết không?',
      timestamp: '2024-03-01 09:20',
      type: 'text',
      read: true
    },
    {
      id: '4',
      sender: 'tenant',
      content: 'Máy lạnh không thổi lạnh từ 2 ngày nay ạ. Tôi đã thử điều chỉnh nhiệt độ nhưng vẫn không được.',
      timestamp: '2024-03-01 09:25',
      type: 'text',
      read: true
    },
    {
      id: '5',
      sender: 'owner',
      content: 'Tôi sẽ liên hệ thợ sửa chữa và sẽ có mặt vào chiều mai. Bạn có ở nhà không?',
      timestamp: '2024-03-01 10:00',
      type: 'text',
      read: true
    },
    {
      id: '6',
      sender: 'tenant',
      content: 'Vâng, tôi sẽ ở nhà. Cảm ơn chủ trọ đã hỗ trợ nhanh chóng!',
      timestamp: '2024-03-01 10:05',
      type: 'text',
      read: true
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'tenant',
        content: newMessage,
        timestamp: new Date().toLocaleString('vi-VN'),
        type: 'text',
        read: false
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate owner typing and response
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const ownerResponse: Message = {
            id: (Date.now() + 1).toString(),
            sender: 'owner',
            content: 'Tôi đã nhận được tin nhắn của bạn. Sẽ phản hồi sớm nhất có thể!',
            timestamp: new Date().toLocaleString('vi-VN'),
            type: 'text',
            read: false
          };
          setMessages(prev => [...prev, ownerResponse]);
        }, 2000);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'tenant',
        content: `Đã gửi file: ${file.name}`,
        timestamp: new Date().toLocaleString('vi-VN'),
        type: 'file',
        read: false,
        fileName: file.name,
        fileUrl: URL.createObjectURL(file)
      };
      setMessages(prev => [...prev, message]);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">CT</span>
                </div>
                <div>
                  <span className="text-gray-900 font-medium">Chủ trọ ABC</span>
                  <div className="flex items-center text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Đang hoạt động
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <PhoneIcon className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <VideoCameraIcon className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <InformationCircleIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4" style={{ maxHeight: 'calc(100vh - 300px)' }}>
            {/* Date Separator */}
            <div className="flex justify-center">
              <span className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full">
                Hôm nay
              </span>
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'tenant' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md ${message.sender === 'tenant' ? 'order-2' : 'order-1'}`}>
                  {message.sender === 'owner' && (
                    <div className="flex items-center mb-1">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white font-bold text-xs">CT</span>
                      </div>
                      <span className="text-sm text-gray-600">Chủ trọ ABC</span>
                    </div>
                  )}
                  
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      message.sender === 'tenant'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.type === 'file' ? (
                      <div className="flex items-center">
                        <PaperClipIcon className="h-4 w-4 mr-2" />
                        <span className="text-sm">{message.fileName}</span>
                      </div>
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )}
                  </div>
                  
                  <div className={`text-xs text-gray-500 mt-1 ${message.sender === 'tenant' ? 'text-right' : 'text-left'}`}>
                    {formatTime(message.timestamp)}
                    {message.sender === 'tenant' && (
                      <span className="ml-1">
                        {message.read ? '✓✓' : '✓'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-xs lg:max-w-md">
                  <div className="flex items-center mb-1">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white font-bold text-xs">CT</span>
                    </div>
                    <span className="text-sm text-gray-600">Chủ trọ ABC</span>
                  </div>
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-end space-x-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <PaperClipIcon className="h-5 w-5" />
              </button>
              
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <PhotoIcon className="h-5 w-5" />
              </button>
              
              <div className="flex-1 relative">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tin nhắn..."
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 pr-12 focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                  rows={1}
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-600 hover:text-blue-600 transition-colors">
                  <FaceSmileIcon className="h-5 w-5" />
                </button>
              </div>
              
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="p-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
              <span>Nhấn Enter để gửi, Shift + Enter để xuống dòng</span>
              <span>{newMessage.length}/1000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
