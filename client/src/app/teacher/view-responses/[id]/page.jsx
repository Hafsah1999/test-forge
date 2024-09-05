'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BiSolidSave } from "react-icons/bi";
import toast from 'react-hot-toast';
import { MdEdit, MdOutlineCancel } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';

const ResponseViewPage = () => {
  const { id: formId } = useParams();
  const router = useRouter();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editedAnswers, setEditedAnswers] = useState({});
  const [editedPoints, setEditedPoints] = useState({});
  const [editedScore, setEditedScore] = useState(0);
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (formId) {
      fetchForm();
      fetchResponses();
    }
  }, [formId]);

  const fetchForm = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/form/getbyid/${formId}`);
      if (!res.ok) throw new Error('Failed to fetch form');
      const data = await res.json();
      setForm(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchResponses = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/response/getbyformid/${formId}`);
      if (!res.ok) throw new Error('Failed to fetch responses');
      const data = await res.json();
      setResponses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalScore = (points) => {
    return Object.values(points).reduce((acc, point) => acc + (Number(point) || 0), 0);
  };

  const handleEdit = (response) => {
    setEditing(response._id);
    setEditedAnswers(response.answers || {});
    const initialPoints = response.points || {};
    setEditedPoints(initialPoints);
    setEditedScore(calculateTotalScore(initialPoints));
  };

  const handlePointsChange = (questionId, points) => {
    const updatedPoints = { ...editedPoints, [questionId]: Number(points) };
    setEditedPoints(updatedPoints);
    setEditedScore(calculateTotalScore(updatedPoints));
  };

  const handleSave = async () => {
    if (!editing) return;
    try {
      const responseId = editing;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/response/update/${responseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: editedAnswers, points: editedPoints, score: editedScore }),
      });
      if (!res.ok) throw new Error('Failed to update response');
      toast.success('Response updated successfully');
      setEditing(null);
      fetchResponses();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (responseId) => {
    if (confirm('Are you sure you want to delete this response?')) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/response/delete/${responseId}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete response');
        toast.success('Response deleted successfully');
        fetchResponses();
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  if (!form) return <div className="text-center p-4">Form not found</div>;
  if (responses.length === 0) return <div className="text-center p-4">No responses found</div>;

  return (
    <div className="bg-white h-screen">
      <div className="container mx-auto p-4 bg-white p-16">
        <h1 className="text-3xl font-bold mb-4 text-[#ffff]">Response View</h1>

        {responses.map((response) => (
          <div key={response._id} className="mb-4 bg-[#d9d9d9] shadow-lg rounded p-8">
            <h2 className="text-xl font-semibold mb-2 text-[#284b63]">Student Information</h2>
            <p className="text-[#284b63]"><strong>Student Name:</strong> {response.studentId?.name || 'Unknown'}</p>
            <p className="text-[#284b63] mb-5"><strong>Submitted At:</strong> {new Date(response.submittedAt).toLocaleString()}</p>
            <div className="flex flex-wrap justify-between mb-4">
              <h2 className="text-2xl font-semibold  text-[#284b63]">Answers</h2>
              <div className=" flex justify-end space-x-4">
                {editing === response._id ? (
                  <>
                    <button onClick={handleSave} className="px-2 py-1 bg-[#3c6e71] text-white rounded hover:bg-green-900 text-xl"><BiSolidSave /></button>
                    <button onClick={() => setEditing(null)} className="px-2 py-1 bg-gray-600 text-white text-xl rounded hover:bg-gray-700"><MdOutlineCancel /></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(response)} className="px-2 py-1 bg-[#284b63] text-white rounded hover:bg-blue-900"><MdEdit /></button>
                    <button onClick={() => handleDelete(response._id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"><RiDeleteBin5Fill /></button>
                  </>
                )}
              </div>
            </div>
           
            <table className=" divide-y divide-gray-200">
              <thead className="bg-[#284b63] text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Question</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Answer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Points Awarded</th>
                </tr>
              </thead>
              <tbody className="bg-white  divide-gray-200">
                {form.questions?.length ? (
                  form.questions.map(question => {
                    const answer = editing === response._id ? editedAnswers[question._id] : response.answers?.[question._id] || '';
                    const points = editing === response._id ? editedPoints[question._id] : response.points?.[question._id] || 0;
                    return (
                      <tr key={question._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{question.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {editing === response._id ? (
                            <textarea
                              value={answer}
                              onChange={(e) => setEditedAnswers({ ...editedAnswers, [question._id]: e.target.value })}
                              className="w-full p-2 border rounded"
                              aria-label={`Answer for question ${question.name}`}
                            />
                          ) : (
                            answer
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {editing === response._id ? (
                            <input
                              type="number"
                              value={points}
                              onChange={(e) => handlePointsChange(question._id, e.target.value)}
                              className="w-full p-2 border rounded"
                              aria-label={`Points for question ${question.name}`}
                            />
                          ) : (
                            points
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">No questions available</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* <h2 className="text-xl font-semibold mb-2 text-[#284b63]">Total Score</h2> */}
            {editing === response._id ? (
              <input
                type="number"
                value={editedScore}
                className="w-full p-2  border rounded"
                aria-label="Total Score"
                readOnly
              />
            ) : (
              <p className="text-[#284b63] my-4"><strong>Total Score:</strong> {response.score}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponseViewPage;