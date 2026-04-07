import Link from 'next/link';

export default function HomePage() {
  const sampleExams = [
    { id: 1, name: 'Đề Toán THPTQG 2026', subject: 'Toán', time: '90 Phút', level: 'Khó' },
    { id: 2, name: 'Đề Tiếng Anh THPTQG 2026', subject: 'Anh', time: '60 Phút', level: 'Trung bình' },
    { id: 3, name: 'Đề ĐGNL Mẫu', subject: 'Tổng hợp', time: '120 Phút', level: 'Nâng cao' },
  ];

  return (
    <div className="relative space-y-24 py-16">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full -z-10"></div>

      {/* HERO */}
      <section className="text-center space-y-6 max-w-3xl mx-auto fade-up">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Luyện thi thông minh với <br />
          <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            AILEXBA
          </span>
        </h1>

        <p className="text-lg text-slate-400">
          Ứng dụng AI để tối ưu việc học, giúp bạn đạt điểm cao dễ dàng hơn.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/register"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full hover:scale-105 transition shadow-lg"
          >
            Bắt đầu ngay
          </Link>

          <Link
            href="/about"
            className="px-8 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition"
          >
            Tìm hiểu thêm
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto fade-up">

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 text-center hover:scale-105 hover:shadow-2xl transition-all">
          <div className="text-5xl mb-3">🤖</div>
          <h3 className="text-xl font-bold mb-2">AI cá nhân hóa</h3>
          <p className="text-slate-400">Gợi ý lộ trình học phù hợp với bạn.</p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 text-center hover:scale-105 hover:shadow-2xl transition-all">
          <div className="text-5xl mb-3">⚡</div>
          <h3 className="text-xl font-bold mb-2">Luyện tập nhanh</h3>
          <p className="text-slate-400">Thi thử online, chấm điểm ngay.</p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 text-center hover:scale-105 hover:shadow-2xl transition-all">
          <div className="text-5xl mb-3">📊</div>
          <h3 className="text-xl font-bold mb-2">Theo dõi tiến độ</h3>
          <p className="text-slate-400">Phân tích kết quả chi tiết.</p>
        </div>

      </section>

      {/* SAMPLE EXAMS */}
      <section className="max-w-6xl mx-auto space-y-10 fade-up">
        <h2 className="text-3xl font-bold text-center">
          Đề thi mẫu
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {sampleExams.map(exam => (
            <div
              key={exam.id}
              className="relative p-[1px] rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:scale-105 transition"
            >
              <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 h-full">

                <div className="absolute top-4 right-4 text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full">
                  {exam.subject}
                </div>

                <h3 className="text-xl font-bold mb-3 pr-20">
                  {exam.name}
                </h3>

                <div className="flex justify-between text-sm text-slate-400 mb-6">
                  <span>⏱ {exam.time}</span>
                  <span>📊 {exam.level}</span>
                </div>

                <Link href="">
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:opacity-90">
                    Làm thử ngay
                  </button>
                </Link>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-6 fade-up">
        <h2 className="text-3xl font-bold">
          Sẵn sàng chinh phục kỳ thi?
        </h2>

        <p className="text-slate-400">
          Bắt đầu ngay hôm nay để nâng cao điểm số.
        </p>

        <Link
          href="/register"
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold hover:scale-105 transition shadow-lg"
        >
          Đăng ký miễn phí
        </Link>
      </section>

    </div>
  );
}