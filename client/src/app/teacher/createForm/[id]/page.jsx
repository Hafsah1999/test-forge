'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import useAppContext from '@/app/Context/teacherContext';

const CreateForm = () => {
  const router = useRouter();
  const { id } = useParams();
  const { currentTeacher } = useAppContext();
  const [form, setForm] = useState({
    title: "",
    status: '',
    questions: [],
    duration: 0,
    teacherId: '',
    displayScore: false,
    allowRetest: false,
  });
  const [formStatus, setFormStatus] = useState(id ? 'published' : 'draft');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedTeacherId = localStorage.getItem('teacherId');
    if (storedTeacherId) {
      setForm(prevForm => ({ ...prevForm, teacherId: storedTeacherId }));
    }

    const fetchForm = async () => {
      if (id) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/form/getbyid/${id}`);
          if (!res.ok) {
            throw new Error('Failed to fetch form');
          }
          const data = await res.json();
          setForm(data);
          setFormStatus(data.status || 'draft');
        } catch (error) {
          console.error('Error fetching form:', error);
          toast.error("An error occurred while fetching the form");
        }
      } else {
        setForm({
          title: "Untitled Form",
          questions: [],
          duration: 0,
          teacherId: storedTeacherId || '',
          displayScore: false,
          allowRetest: false,
        });
      }
      setIsLoading(false);
    };

    fetchForm();
  }, [id]);

  const handleSubmit = async (e, action) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Form title is required");
      return;
    }

    const updatedForm = {
      ...form,
      status: action,
      createdBy: currentTeacher?.name || 'Unknown',
      questions: form.questions.map(q => ({
        ...q,
        points: q.points || 0, // Default value if not provided
        correctAnswer: q.correctAnswer || '' // Default value if not provided
      }))
    };

    try {
      const url = id
        ? `${process.env.NEXT_PUBLIC_API_URL}/form/update/${id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/form/add`;

      const method = id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        body: JSON.stringify(updatedForm),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error('Failed to save form');
      }

      toast.success(action === 'draft' ? "Form saved as draft" : "Form published successfully");
      router.push(`/link/${form._id}`);
    } catch (error) {
      console.error("Error saving form:", error);
      toast.error("An error occurred while saving the form");
    }
  };

  const addQuestion = () => {
    setForm(prev => ({
      ...prev,
      questions: [...prev.questions, {
        name: "",
        type: "short",
        options: [],
        correctAnswer: "",
        points: 1,
      }]
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    setForm(prev => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleAddOption = (questionIndex) => {
    setForm(prev => {
      const updatedQuestions = [...prev.questions];
      if (!updatedQuestions[questionIndex].options.includes('New Option')) {
        updatedQuestions[questionIndex].options.push('New Option');
      }
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleDeleteOption = (questionIndex, optionIndex) => {
    setForm(prev => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[questionIndex].options.splice(optionIndex, 1);
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setForm(prev => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[questionIndex].options[optionIndex] = value;
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleKeyDown = (e, questionIndex) => {
    if (e.key === 'ArrowDown') {
      handleAddOption(questionIndex);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <div className="container mx-auto p-4 bg-white min-h-screen">
      <form className='w-3/4 mx-auto' onSubmit={(e) => e.preventDefault()}>
        <div className="mb-8 shadow-lg rounded-lg bg-[#d9d9d9] p-6">
          <h1 className="text-2xl font-bold mb-4 text-[#3c6e71]">{id ? "Edit Form" : "Create a New Form"}</h1>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
            className='w-full py-2 mb-5 text-[#3c6e71] ps-3 border-2 bg-[#d9d9d9] border-[#284b63] placeholder-text-[#284b63] rounded'
            placeholder="Form title"
          />
          <div className="flex items-center justify-end">
            <label className="mr-2 text-[#3c6e71]">Duration (minutes):</label>
            <input
              type="number"
              value={form.duration}
              onChange={(e) => setForm(prev => ({ ...prev, duration: Math.max(0, parseInt(e.target.value)) }))}
              className='w-24 py-2 border-[#284b63] ps-3 border-2 bg-[#d9d9d9] rounded'
              min="0"
            />
            
          </div>
          <div className="mt-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={form.displayScore}
                onChange={(e) => setForm(prev => ({ ...prev, displayScore: e.target.checked }))}
                className="form-checkbox h-5 w-5 text-[#3c6e71]"
              />
              <span className="ml-2 text-[#3c6e71]">Display score to students</span>
            </label>
          </div>
          <div className="mt-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={form.allowRetest}
                onChange={(e) => setForm(prev => ({ ...prev, allowRetest: e.target.checked }))}
                className="form-checkbox h-5 w-5 text-[#3c6e71]"
              />
              <span className="ml-2 text-[#3c6e71]">Allow retest</span>
            </label>
          </div>
        </div>

        {form.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="mb-8 shadow-lg bg-[#d9d9d9] rounded-lg p-6">
            <h3 className='text-lg font-semibold mb-3'>{questionIndex + 1}. {question.name}</h3>
            <input
              type="text"
              value={question.name}
              onChange={(e) => handleQuestionChange(questionIndex, 'name', e.target.value)}
              className='w-full py-2 border-2 border-[#284b63] bg-[#d9d9d9] text-[#284b63] shadow-lg ps-3 mb-3 rounded'
              placeholder="Question text"
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Question Type</label>
              <select
                value={question.type}
                onChange={(e) => handleQuestionChange(questionIndex, 'type', e.target.value)}
                className='mt-1 block py-2 px-3 bg-[#284b63] text-[#d9d9d9] rounded-md shadow-lg focus:outline-none sm:text-sm'
              >
                <option value="short">Short Answer</option>
                <option value="paragraph">Paragraph</option>
                <option value="multiple">Multiple Choice</option>
              </select>
            </div>
            {question.type === 'multiple' && (
              <div>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="option flex items-center mb-2">
                    <input
                      type="text"
                      value={option}
                      className='flex-grow py-2 ps-3 bg-[#d9d9d9] border-2 border-[#284b63] rounded-l'
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, questionIndex)}
                      placeholder={`Option ${optionIndex + 1}`}
                      required
                    />
                    {optionIndex > 0 && (
                      <button type="button" className='bg-[#f07167] text-white py-2.5 px-2 rounded-r' onClick={() => handleDeleteOption(questionIndex, optionIndex)}>
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className='bg-[#3c6e71] text-white py-1 px-4 rounded my-2'
                  onClick={() => handleAddOption(questionIndex)}
                >
                  Add Option
                </button>
              </div>
            )}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Correct Answer</label>
              <input
                type="text"
                value={question.correctAnswer}
                onChange={(e) => handleQuestionChange(questionIndex, 'correctAnswer', e.target.value)}
                className='mt-1 block w-full py-2 px-3 border bg-[#d9d9d9] border-[#284b63] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                placeholder="Correct answer"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-[#284b63]">Points</label>
              <input
                type="number"
                value={question.points}
                onChange={(e) => handleQuestionChange(questionIndex, 'points', parseInt(e.target.value))}
                className='mt-1 block w-full py-2 px-3 border border-[#284b63] bg-[#d9d9d9] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                min="1"
                placeholder="Points for this question"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className='bg-[#3c6e71] shadow-lg text-white py-2 px-4 rounded mb-4'
        >
          Add Question
        </button>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'draft')}
            className="px-4 py-2 bg-[#b5e48c] text-black font-bold rounded-lg shadow-md hover:bg-[#99d98c] transition-colors"
          >
            Save as Draft
          </button>
          <Link
            href={`/Responseform/${form._id}`}
            className="px-4 py-2 bg-[#168aad] text-white font-bold rounded-lg shadow-md hover:bg-[#1a759f] transition-colors"
          >
            Preview
          </Link>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'published')}
            className="px-4 py-2 bg-[#52b69a] text-white font-bold rounded-lg shadow-md hover:bg-[#34a0a4] transition-colors"
          >
            {id ? "Update and Publish" : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
