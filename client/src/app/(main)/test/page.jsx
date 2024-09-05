'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const TestPage = () => {
  const router = useRouter();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('http://localhost:5000/form/getActive');
        if (!response.ok) {
          throw new Error('Failed to fetch test');
        }
        const data = await response.json();
        setTest(data);
        setTimeLeft(data.duration * 60); // Convert minutes to seconds
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching test:', error);
        toast.error('Failed to load test. Please try again.');
        setIsLoading(false);
      }
    };

    fetchTest();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && test) {
      handleSubmit();
    }
  }, [timeLeft, test]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    try {
      const studentCredentials = JSON.parse(localStorage.getItem('studentCredentials'));
      if (!studentCredentials) {
        toast.error('Student credentials not found. Please log in again.');
        router.push('/studentCredentials');
        return;
      }

      const submission = {
        studentId: studentCredentials._id,
        testId: test._id,
        answers: answers
      };

      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:5000/form/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        throw new Error('Failed to submit test');
      }

      toast.success('Test submitted successfully');
      router.push('/testComplete');
    } catch (error) {
      console.error('Error submitting test:', error);
      toast.error('Failed to submit test. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading test...</div>;
  }

  if (!test) {
    return <div className="text-center mt-8">No active test found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{test.title}</h1>
      <div className="mb-4">Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        {test.questions.map((question, index) => (
          <div key={question._id} className="mb-6 p-4 border rounded">
            <h2 className="text-lg font-semibold mb-2">Question {index + 1}: {question.name}</h2>
            {question.type === 'multiple' ? (
              <div>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="mb-2">
                    <input
                      type="radio"
                      id={`q${question._id}_o${optionIndex}`}
                      name={`question_${question._id}`}
                      value={option}
                      onChange={() => handleAnswerChange(question._id, option)}
                      className="mr-2"
                    />
                    <label htmlFor={`q${question._id}_o${optionIndex}`}>{option}</label>
                  </div>
                ))}
              </div>
            ) : (
              <textarea
                className="w-full p-2 border rounded"
                rows="3"
                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
              ></textarea>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Test
        </button>
      </form>
    </div>
  );
};

export default TestPage;