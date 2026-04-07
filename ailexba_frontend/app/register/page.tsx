'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '../../services/auth.service';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await authService.register(formData);
      setSuccess('Đăng ký thành công! Đang chuyển hướng...');
      setTimeout(() => router.push('/login'), 1500);
    } catch (err: unknown) {
      if (typeof err === 'string') setError(err);
      else if (err instanceof Error) setError(err.message);
      else setError('Có lỗi xảy ra!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-[80vh] px-6">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full"></div>

      {/* CARD */}
      <div className="fade-up w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">📝 Đăng ký</h1>
          <p className="text-slate-400">Tạo tài khoản để bắt đầu học</p>
        </div>

        {/* ALERT */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-xl">
            {success}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* FULL NAME */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></span>
            <input
              type="text"
              required
              placeholder="Họ và tên"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full pl-10 p-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition"
            />
          </div>

          {/* EMAIL */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></span>
            <input
              type="email"
              required
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 p-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></span>
            <input
              type="password"
              required
              minLength={6}
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-10 p-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-bold hover:scale-105 transition shadow-lg disabled:opacity-60"
          >
            {loading ? 'Đang xử lý...' : 'Tạo tài khoản'}
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-center text-slate-400 text-sm">
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Đăng nhập
          </Link>
        </p>

      </div>
    </div>
  );
}