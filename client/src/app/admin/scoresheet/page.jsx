'use client'
import { useState } from 'react';

export default function TeacherDashboard() {
  const [testPaper, setTestPaper] = useState({ title: '', questions: [] });

  const addQuestion = () => {
    setTestPaper({
      ...testPaper,
      questions: [...testPaper.questions, { text: '', options: [], correctAnswer: '' }],
    });
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...testPaper.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setTestPaper({ ...testPaper, questions: updatedQuestions });
  };

  const submitTestPaper = async () => {
    const response = await fetch('/api/teacher/test-papers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPaper),
    });

    if (response.ok) {
      alert('Test paper created successfully');
      setTestPaper({ title: '', questions: [] });
    } else {
      alert('Failed to create test paper');
    }
  };

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <h2>Create Test Paper</h2>
      <input
        type="text"
        value={testPaper.title}
        onChange={(e) => setTestPaper({ ...testPaper, title: e.target.value })}
        placeholder="Test Paper Title"
      />
      {testPaper.questions.map((question, index) => (
        <div key={index}>
          <input
            type="text"
            value={question.text}
            onChange={(e) => updateQuestion(index, 'text', e.target.value)}
            placeholder="Question"
          />
          {/* Add inputs for options and correct answer */}
        </div>
      ))}
      <button onClick={addQuestion}>Add Question</button>
      <button onClick={submitTestPaper}>Create Test Paper</button>
    </div>
  );
}