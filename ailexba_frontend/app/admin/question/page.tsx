'use client';
import { useState } from 'react';

interface Question {
  id: number;
  content: string;
  options: string[];
  correct: string;
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      content: "2 + 2 = ?",
      options: ["3", "4", "5"],
      correct: "4"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    content: '',
    option1: '',
    option2: '',
    option3: '',
    correct: ''
  });

  const handleAdd = () => {
    const newQ: Question = {
      id: Date.now(),
      content: newQuestion.content,
      options: [newQuestion.option1, newQuestion.option2, newQuestion.option3],
      correct: newQuestion.correct
    };

    setQuestions([...questions, newQ]);
    setShowForm(false);

    setNewQuestion({
      content: '',
      option1: '',
      option2: '',
      option3: '',
      correct: ''
    });
  };

  const handleDelete = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">📚 Quản lý câu hỏi</h1>

        <button
          onClick={() => setShowForm(true)}
          className="px-5 py-2 bg-blue-600 rounded-xl text-white font-bold hover:opacity-90"
        >
          + Thêm câu hỏi
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {questions.map((q, index) => (
          <div key={q.id}
            className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 shadow">

            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">
                {index + 1}. {q.content}
              </p>

              <button
                onClick={() => handleDelete(q.id)}
                className="text-red-400 hover:text-red-600 font-bold"
              >
                Xoá
              </button>
            </div>

            <ul className="mt-3 space-y-1 text-slate-300">
              {q.options.map(opt => (
                <li key={opt}
                  className={`p-2 rounded ${
                    opt === q.correct ? 'bg-green-500/20 text-green-400' : ''
                  }`}>
                  {opt}
                </li>
              ))}
            </ul>

          </div>
        ))}
      </div>

      {/* FORM POPUP */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-8 rounded-2xl w-[90%] max-w-md space-y-4">

            <h2 className="text-xl font-bold">Thêm câu hỏi</h2>

            <input
              placeholder="Nội dung câu hỏi"
              value={newQuestion.content}
              onChange={e => setNewQuestion({ ...newQuestion, content: e.target.value })}
              className="w-full p-3 rounded bg-white/10"
            />

            <input
              placeholder="Đáp án 1"
              value={newQuestion.option1}
              onChange={e => setNewQuestion({ ...newQuestion, option1: e.target.value })}
              className="w-full p-3 rounded bg-white/10"
            />

            <input
              placeholder="Đáp án 2"
              value={newQuestion.option2}
              onChange={e => setNewQuestion({ ...newQuestion, option2: e.target.value })}
              className="w-full p-3 rounded bg-white/10"
            />

            <input
              placeholder="Đáp án 3"
              value={newQuestion.option3}
              onChange={e => setNewQuestion({ ...newQuestion, option3: e.target.value })}
              className="w-full p-3 rounded bg-white/10"
            />

            <input
              placeholder="Đáp án đúng"
              value={newQuestion.correct}
              onChange={e => setNewQuestion({ ...newQuestion, correct: e.target.value })}
              className="w-full p-3 rounded bg-white/10"
            />

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-white/10 rounded-lg">
                Huỷ
              </button>

              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-blue-600 rounded-lg">
                Lưu
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}