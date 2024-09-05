'use client'
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const EditForm = () => {
  const [form, setForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    fetchForm();
  }, [id]);

  const fetchForm = async () => {
    try {
      const res = await fetch(`http://localhost:5000/form/getbyid/${id}`);
      if (res.ok) {
        const data = await res.json();
        setForm(data);
      } else {
        toast.error("Failed to fetch form");
      }
    } catch (error) {
      console.error("Error fetching form:", error);
      toast.error("An error occurred while fetching the form");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasChanges) {
      toast.info("No changes to save");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/form/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Form updated successfully");
        setHasChanges(false);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to update form");
      }
    } catch (error) {
      console.error("Error updating form:", error);
      toast.error("An error occurred while updating the form");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/form/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form, status: 'published' }),
      });

      if (res.ok) {
        toast.success("Form published successfully");
        router.push('/forms');
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to publish form");
      }
    } catch (error) {
      console.error("Error publishing form:", error);
      toast.error("An error occurred while publishing the form");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (updater) => {
    setForm((prev) => {
      const updated = updater(prev);
      setHasChanges(true);
      return updated;
    });
  };

  const handleTitleChange = (e) => {
    handleChange(prev => ({ ...prev, title: e.target.value }));
  };

  const handleQuestionChange = (index, field, value) => {
    handleChange(prev => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    handleChange(prev => {
      const updatedQuestions = [...prev.questions];
      const updatedOptions = [...updatedQuestions[questionIndex].options];
      updatedOptions[optionIndex] = value;
      updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], options: updatedOptions };
      return { ...prev, questions: updatedQuestions };
    });
  };

  const addQuestion = () => {
    handleChange(prev => ({
      ...prev,
      questions: [...prev.questions, { name: '', type: 'short', options: [] }]
    }));
  };

  const removeQuestion = (index) => {
    handleChange(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const addOption = (questionIndex) => {
    handleChange(prev => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[questionIndex].options.push('');
      return { ...prev, questions: updatedQuestions };
    });
  };

  const removeOption = (questionIndex, optionIndex) => {
    handleChange(prev => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.filter((_, i) => i !== optionIndex);
      return { ...prev, questions: updatedQuestions };
    });
  };

  if (!isClient) {
    return null; // Return null on server-side render
  }

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (!form) {
    return <div className="text-center mt-8">Form not found</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-[#52796f]">
      <form onSubmit={handleSubmit} className='w-3/4 mx-auto'>
        <input
          type="text"
          value={form.title}
          onChange={handleTitleChange}
          className="text-2xl text-center mt-5 font-bold mb-4 bg-[#354f52] text-white w-full p-2 shadow-lg rounded"
        />
        
        {form.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="mb-6 bg-[#354f52] text-white shadow-lg rounded-lg p-6">
            <input
              type="text"
              value={question.name}
              onChange={(e) => handleQuestionChange(questionIndex, 'name', e.target.value)}
              className="text-xl font-semibold bg-[#84a98c] mb-3 w-full p-2 rounded"
            />
            
            <select
              value={question.type}
              onChange={(e) => handleQuestionChange(questionIndex, 'type', e.target.value)}
              className="mb-3 p-2 bg-[#84a98c] rounded"
            >
              <option value="short">Short Answer</option>
              <option value="paragraph">Paragraph</option>
              <option value="multiple">Multiple Choice</option>
            </select>
            <div className="mt-2">
              {question.type === 'multiple' && (
                <div>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={option}
                        placeholder='option'
                        onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                        className="mr-2 p-2 bg-[#84a98c] placeholder-gray-200 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(questionIndex, optionIndex)}
                        className="bg-[#f28482] text-white py-1 px-2 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addOption(questionIndex)}
                    className="bg-[#84a98c] shadow-lg mb-2 text-white py-1 px-2 rounded mt-2"
                  >
                    Add Option
                  </button>
                </div>
              )}
              <button
                type="button"
                onClick={() => removeQuestion(questionIndex)}
                className="bg-[#f28482] text-white px-2 py-1 shadow-lg rounded"
              >
                Remove Question
              </button>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addQuestion}
          className="bg-[#84a98c] shadow-lg text-white py-2 px-4 rounded mb-4"
        >
          Add Question
        </button>
        
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={!hasChanges || isLoading}
            className={`bg-[#cad2c5] text-[#354f52] py-2 px-4 rounded shadow-lg transition-colors ${hasChanges && !isLoading ? 'hover:bg-[#84a98c] hover:text-white' : 'opacity-50 cursor-not-allowed'}`}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="submit"
          className={`credentials/${form._id}`}>
          </button>
          <button
            type="button"
            onClick={handlePublish}
            disabled={isLoading}
            className={`bg-[#354f52] text-white py-2 px-4 shadow-lg mx-3  rounded transition-colors ${!isLoading ? 'hover:bg-[#84a98c]' : 'opacity-50 cursor-not-allowed'}`}
          >
            {isLoading ? 'Publishing...' : 'Publish Form'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;