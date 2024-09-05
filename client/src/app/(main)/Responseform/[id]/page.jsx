'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useStudentContext from '@/app/Context/studentContext';
import toast from 'react-hot-toast';

const ResponseForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const { currentUser } = useStudentContext();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      router.push(`/student/${id}`);
      return;
    }
    fetchForm();
  }, [id, currentUser]);

  useEffect(() => {
    if (form && form.duration > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleSubmit(new Event('submit'));
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [form]);

  const fetchForm = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/form/getbyid/${id}`);
      if (!res.ok) throw new Error('Failed to fetch form');
      const data = await res.json();
      setForm(data);
      setTimeLeft(data.duration * 60); // Convert minutes to seconds
    } catch (error) {
      console.error("Error fetching form:", error);
      toast.error("An error occurred while fetching the form");
    } finally {
      setLoading(false);
    }
  };

  const handleResponseChange = (questionId, value) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        answers: responses,
        studentId: currentUser._id,
        formId: id
      };
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/response/add`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit form');
      }
  toast.success("Form submitted successfully")
      // Redirect to the score page with the form details
      router.push(`/form-submitted?score=${data.score}&allowRetest=${form.allowRetest}`);
    } catch (error) {
      toast.error(error.message || "An error occurred while submitting the form");
    } finally {
      setSubmitting(false);
    }
  };
  


  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!form) {
    return <div className="text-center p-4">Form not found</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-[#284b63] p-16 ">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4 text-[#ffff]">{form.title}</h1>
        {timeLeft !== null && (
          <div className="mb-4 text-lg font-semibold text-[#ffff]">
            Time Remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} >
        {form.questions.map((question) => (
          <>
            <div key={question._id} className="mb-4 bg-[#d9d9d9] shadow-lg rounded p-8 flex justify-between">
              <div>
                <label className="block  font-medium text-[#284b63] text-xl">
                  {question.name}
                </label>
                {question.type === 'short' && (
                  <input
                    type="text"
                    value={responses[question._id] || ''}
                    onChange={(e) => handleResponseChange(question._id, e.target.value)}
                    className="mt-3 block w-full px-2 py-1 rounded-md border-[#284b63]  shadow-md "
                    required
                  />
                )}
                {question.type === 'paragraph' && (
                  <textarea
                    value={responses[question._id] || ''}
                    onChange={(e) => handleResponseChange(question._id, e.target.value)}
                    className="mt-1 block w-full rounded-md border-[#284b63] shadow-lg focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    rows="3"
                    required
                  />
                )}
                {question.type === 'multiple' && (
                  <div className="mt-2 ">
                    {question.options.map((option, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={`${question._id}-${index}`}
                          name={`question-${question._id}`}
                          value={option}
                          checked={responses[question._id] === option}
                          onChange={(e) => handleResponseChange(question._id, e.target.value)}
                          className="bg-[#d9d9d9]  h-4 w-4  accent-[#284b63]"
                          required
                        />
                        <label htmlFor={`${question._id}-${index}`} className="ml-3 block font-lg text-[#284b63]">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="">
                <p className="text-[#284b63]"> (Points: {question.points || 0})</p>
              </div>
            </div>

          </>
        ))}

        <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="mt-4 px-4 py-2 border border-transparent text-md  font-medium rounded-md text-[#284b63] bg-[#ffffff]  hover:bg-[#d9d9d9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
        </div>
       
      </form>
    </div>
  );
};

export default ResponseForm;
