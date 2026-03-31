'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '../../services/auth.service';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsLoading(true);
    setError('');

    try {
      const result = await authService.login(email, password);
      
      // KIỂM TRA DỮ LIỆU: Vì Backend của bạn trả về userId thay vì token
      if (result.userId) {
        // Lưu userId vào 'token' để làm dấu hiệu đã đăng nhập cho trang Dashboard
        localStorage.setItem('token', result.userId.toString());
        // Lưu toàn bộ object (bao gồm fullName, role) để dùng sau này
        localStorage.setItem('user', JSON.stringify(result));

        alert('Đăng nhập thành công! Chào mừng ' + result.fullName);
        router.push('/'); 
      } else {
        setError('Dữ liệu phản hồi từ Server không hợp lệ!');
      }
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Đã có lỗi xảy ra');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">AILEXBA LOGIN</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input 
              type="password" 
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-bold transition
              ${isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isLoading ? 'Đang xác thực...' : 'ĐĂNG NHẬP'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="text-blue-600 hover:underline font-bold">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}