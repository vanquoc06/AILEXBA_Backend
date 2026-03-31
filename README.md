# 🚀 AILEXBA Backend API

Dự án Backend cung cấp hệ thống API nền tảng cho **AILEXBA** - Hệ thống quản lý học sinh và ngân hàng đề thi thông minh. 

---

## 🛠️ Công nghệ & Kiến trúc

* **Framework:** .NET 8.0 (ASP.NET Core Web API)
* **Kiến trúc:** Lấy Controllers làm trung tâm (Phân chia rõ ràng Controllers, Models, DTOs, Services)
* **Ngôn ngữ:** C# 12 
* **Cơ sở dữ liệu:** SQL Server (LocalDB)
* **ORM:** Entity Framework Core 8 (Code-First với Migrations)
* **Bảo mật:** BCrypt.Net-Next (Mã hóa mật khẩu)

---

## 🎯 Tiến độ dự án

### ✅ Sprint 1 (Đã hoàn thành)
Dựa trên cấu trúc dự án hiện tại, các module sau đã được xây dựng hoàn thiện:

* **Xác thực (Auth):** * API Đăng ký (`RegisterRequest`) và Đăng nhập (`LoginRequest`) với mật khẩu được mã hóa.
  * API Đổi mật khẩu (`ChangePasswordRequest`).
* **Quản lý người dùng (Users):** * API xem và cập nhật thông tin hồ sơ cá nhân (`UpdateProfileRequest`).
* **Môn học (Subjects):** * API quản lý danh sách các môn học.
* **Ngân hàng đề thi (Questions & Answers):** * API quản lý câu hỏi trắc nghiệm kèm theo danh sách đáp án (`Question` và `Answer` models).

### ⏳ Sprint 2 (Sắp tới)
* [ ] Tích hợp JWT Token để phân quyền Admin / Student một cách toàn diện.
* [ ] Xây dựng logic chấm điểm bài thi tự động.
* [ ] Tích hợp Generative AI giải thích chi tiết đáp án sai.

---

## 🚀 Hướng dẫn cài đặt cho Team (Frontend / QA)

### Yêu cầu môi trường
* [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
* Visual Studio 2022 (khuyên dùng) hoặc Visual Studio Code
* SQL Server Express LocalDB 

### Các bước khởi chạy

**1. Clone dự án về máy:**
```bash
git clone [https://github.com/vanquoc06/AILEXBA_Backend.git](https://github.com/vanquoc06/AILEXBA_Backend.git)
