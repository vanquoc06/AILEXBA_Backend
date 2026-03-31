'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  // 1. Khởi tạo State trực tiếp (Giữ nguyên vì cách này rất tối ưu)
  // Lược bỏ hàm "set" vì bạn chỉ hiển thị, không cập nhật lại tên/role tại trang này
  const [userName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        try {
          return JSON.parse(userJson).fullName || 'Thành viên';
        } catch { return 'Thành viên'; }
      }
    }
    return '';
  });

  const [userRole] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        try {
          return JSON.parse(userJson).role || 'Student';
        } catch { return 'Student'; }
      }
    }
    return '';
  });

  const [isChecking, setIsChecking] = useState(true);

  // 2. useEffect bảo vệ route
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
    } else {
      // FIX LỖI: Sử dụng một hàm callback hoặc bọc trong requestAnimationFrame 
      // để tránh việc setState đồng bộ gây render chồng chéo
      const timeout = setTimeout(() => {
        setIsChecking(false);
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  if (isChecking) {
    return (
      <div className="flex h-screen items-center justify-center bg-white font-bold text-blue-600">
        Đang xác thực quyền truy cập AILEXBA...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
        
        {/* Header Bar */}
        <div className="bg-blue-700 p-6 flex justify-between items-center text-white">
          <div>
            <h1 className="text-2xl font-black tracking-tight italic">AILEXBA HUB</h1>
            <span className="text-[10px] bg-blue-500 px-2 py-1 rounded-full uppercase font-bold">
              {userRole} Access
            </span>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-white text-red-600 px-5 py-2 rounded-xl hover:bg-red-50 transition-all font-bold shadow-lg active:scale-95"
          >
            ĐĂNG XUẤT
          </button>
        </div>

        <div className="p-8 md:p-12">
          {/* Lời chào */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">
              Chào mừng, <span className="text-blue-600">{userName}</span>!
            </h2>
            <p className="text-gray-500 text-lg">
              Hệ thống AI hỗ trợ học tập thông minh đã sẵn sàng đồng hành cùng bạn.
            </p>
          </div>

          {/* Menu chức năng */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-blue-50 rounded-3xl hover:bg-blue-100 transition-all cursor-pointer border-2 border-transparent hover:border-blue-200 group">
              <div className="text-5xl mb-5 group-hover:scale-110 transition-transform">📚</div>
              <h3 className="font-bold text-xl text-blue-900">Môn học</h3>
              <p className="text-sm text-blue-700 mt-2 opacity-70">Khám phá và quản lý môn học chuyên ngành.</p>
            </div>
            
            <div className="p-8 bg-green-50 rounded-3xl hover:bg-green-100 transition-all cursor-pointer border-2 border-transparent hover:border-green-200 group">
              <div className="text-5xl mb-5 group-hover:scale-110 transition-transform">📝</div>
              <h3 className="font-bold text-xl text-green-900">Luyện tập</h3>
              <p className="text-sm text-green-700 mt-2 opacity-70">Làm bài trắc nghiệm thông minh với AI.</p>
            </div>
            
            <div className="p-8 bg-purple-50 rounded-3xl hover:bg-purple-100 transition-all cursor-pointer border-2 border-transparent hover:border-purple-200 group">
              <div className="text-5xl mb-5 group-hover:scale-110 transition-transform">📈</div>
              <h3 className="font-bold text-xl text-purple-900">Tiến độ</h3>
              <p className="text-sm text-purple-700 mt-2 opacity-70">Theo dõi điểm số và lịch sử rèn luyện.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}