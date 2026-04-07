'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ExamPage() {
  const router = useRouter();

  // 🧠 20 câu hỗn hợp
  const questions = [
    { id: "q1", question: "2 + 2 = ?", options: ["3", "4", "5"], correct: "4" },
    { id: "q2", question: "5 x 3 = ?", options: ["10", "15", "20"], correct: "15" },
    { id: "q3", question: "10 - 4 = ?", options: ["5", "6", "7"], correct: "6" },
    { id: "q4", question: "3 x 4 = ?", options: ["7", "12", "9"], correct: "12" },
    { id: "q5", question: "9 / 3 = ?", options: ["2", "3", "4"], correct: "3" },

    { id: "q6", question: "Which is a fruit?", options: ["Carrot", "Apple", "Potato"], correct: "Apple" },
    { id: "q7", question: "Sun rises in the?", options: ["West", "East", "North"], correct: "East" },
    { id: "q8", question: "Which is bigger?", options: ["Elephant", "Cat", "Dog"], correct: "Elephant" },
    { id: "q9", question: "7 + 8 = ?", options: ["14", "15", "16"], correct: "15" },
    { id: "q10", question: "12 - 5 = ?", options: ["6", "7", "8"], correct: "7" },

    { id: "q11", question: "Opposite of 'hot'?", options: ["Cold", "Warm", "Cool"], correct: "Cold" },
    { id: "q12", question: "5² = ?", options: ["10", "20", "25"], correct: "25" },
    { id: "q13", question: "Which is a color?", options: ["Dog", "Blue", "Table"], correct: "Blue" },
    { id: "q14", question: "3 + 6 = ?", options: ["8", "9", "10"], correct: "9" },
    { id: "q15", question: "10 x 2 = ?", options: ["20", "15", "25"], correct: "20" },

    { id: "q16", question: "Which is a shape?", options: ["Circle", "Run", "Eat"], correct: "Circle" },
    { id: "q17", question: "8 + 1 = ?", options: ["9", "10", "11"], correct: "9" },
    { id: "q18", question: "Water is?", options: ["Solid", "Liquid", "Gas"], correct: "Liquid" },
    { id: "q19", question: "4 x 4 = ?", options: ["8", "12", "16"], correct: "16" },
    { id: "q20", question: "Which is correct?", options: ["Bird can fly", "Fish can fly", "Dog can fly"], correct: "Bird can fly" },
  ];

  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  // ⏱ TIMER (10 phút)
  const [time, setTime] = useState(600);

  useEffect(() => {
    if (time > 0 && !submitted) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    }

    // 🔥 hết giờ auto submit
    if (time === 0 && !submitted) {
      handleSubmit();
    }
  }, [time, submitted]);

  const formatTime = (t: number) => {
    const min = Math.floor(t / 60);
    const sec = t % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleChange = (qId: string, value: string) => {
    if (submitted) return;
    setAnswers({ ...answers, [qId]: value });
  };

  const handleSubmit = () => {
    if (submitted) return;

    let total = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) total++;
    });

    setScore(total);
    setSubmitted(true);
    setShowResult(true);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl md:text-5xl font-bold">📝 Bài thi</h1>

        <div className={`text-4xl md:text-5xl font-extrabold tracking-widest px-8 py-4 rounded-2xl shadow-lg
          ${time < 60 ? 'bg-red-600 text-white animate-pulse' : 'bg-red-500/20 text-red-400'}
        `}>
          ⏱ {formatTime(time)}
        </div>
      </div>

      {/* TRẠNG THÁI */}
      <div className="flex gap-2 flex-wrap justify-center">
        {questions.map((q, index) => {
          const userAnswer = answers[q.id];
          const isCorrect = userAnswer === q.correct;

          return (
            <div key={q.id}
              className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold
                ${
                  submitted
                    ? isCorrect
                      ? 'bg-green-500/30 text-green-400'
                      : userAnswer
                      ? 'bg-red-500/30 text-red-400'
                      : 'bg-gray-500/20 text-gray-400'
                    : userAnswer
                    ? 'bg-blue-500/30'
                    : 'bg-white/10'
                }`}>
              {index + 1}
            </div>
          );
        })}
      </div>

      {/* QUESTIONS */}
      {questions.map((q, index) => {
        const userAnswer = answers[q.id];

        return (
          <div key={q.id}
            className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg">

            <p className="font-semibold mb-4 text-xl md:text-2xl">
              Câu {index + 1}: {q.question}
            </p>

            {q.options.map((opt) => {
              const isSelected = userAnswer === opt;
              const isCorrect = opt === q.correct;
              const isWrong = isSelected && opt !== q.correct;

              return (
                <label key={opt}
                  className={`flex items-center gap-3 p-4 text-lg md:text-xl rounded-xl cursor-pointer transition-all
                    ${
                      submitted
                        ? isCorrect
                          ? 'bg-green-500/20 text-green-400'
                          : isWrong
                          ? 'bg-red-500/20 text-red-400'
                          : 'opacity-60'
                        : isSelected
                        ? 'bg-blue-500/20'
                        : 'hover:bg-white/10'
                    }`}>

                  <input
                    type="radio"
                    className="scale-125"
                    disabled={submitted}
                    checked={isSelected}
                    onChange={() => handleChange(q.id, opt)}
                  />

                  <span>{opt}</span>
                </label>
              );
            })}
          </div>
        );
      })}

      {/* SUBMIT */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          className="w-full py-4 text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:opacity-90">
          Nộp bài
        </button>
      )}

      {/* POPUP */}
      {showResult && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-white/10 p-8 rounded-2xl text-center space-y-4">

            <h2 className="text-2xl font-bold">🎉 Hoàn thành!</h2>

            <p className="text-lg">
              Bạn được <span className="text-blue-400 font-bold">{score}/{questions.length}</span> điểm
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowResult(false)}
                className="px-4 py-2 bg-white/10 rounded-lg">
                Xem lại bài
              </button>

              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 bg-blue-600 rounded-lg">
                Trang chủ
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}