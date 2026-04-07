'use client';
import './globals.css';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authService, UserData } from '../services/auth.service';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    router.push('/login');
  };

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className={`relative px-3 py-2 transition-all duration-300 
        ${pathname === href ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-blue-600'}
      `}
    >
      {label}
      {pathname === href && (
        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600 rounded"></span>
      )}
    </Link>
  );

 return (
  <html lang="vi">
    <body className={`${inter.className} bg-slate-900 text-white min-h-screen flex flex-col`}>

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="w-full px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-black bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent hover:scale-105 transition"
          >
            AILEXBA.
          </Link>

          {/* Menu */}
          <nav className="flex gap-6 items-center font-medium">

            {navLink("/", "Trang chủ")}
            {navLink("/about", "Giới thiệu")}

            {user ? (
              <div className="flex items-center gap-4 ml-6 pl-6 border-l border-white/10">

                <span className="text-sm font-semibold text-white bg-white/10 px-3 py-1 rounded-lg backdrop-blur">
                  👋 {user.fullName}
                </span>

                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 transition-all shadow-md hover:scale-105"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="flex gap-3 ml-6">

                <Link
                  href="/login"
                  className="px-5 py-2 text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all hover:scale-105"
                >
                  Đăng nhập
                </Link>

                <Link
                  href="/register"
                  className="px-5 py-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 rounded-xl transition-all shadow-md hover:scale-105"
                >
                  Đăng ký
                </Link>

              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Nội dung */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/10 py-6 text-center text-slate-400 text-sm">
        <p className="hover:text-white transition">
          © 2026 AILEXBA Project - Nhóm Duy Tân University.
        </p>
      </footer>

    </body>
  </html>
);
}