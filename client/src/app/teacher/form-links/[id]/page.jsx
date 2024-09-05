'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

const TeacherFormLinks = () => {
  const { id } = useParams();
  const router = useRouter();
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/form/getbyteacher/${id}`);
        if (!res.ok) throw new Error('Failed to fetch forms');
        const data = await res.json();
        setForms(data.map(form => ({
          ...form,
          link: `${window.location.origin}/student/${form._id}`
        })));
      } catch (error) {
        console.error('Error fetching forms:', error);
        toast.error('Error fetching forms');
      } finally {
        setIsLoading(false);
      }
    };
    fetchForms();
  }, [id]);

  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleDelete = async (formId) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/form/delete/${formId}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete form');
        setForms(forms.filter(form => form._id !== formId));
        toast.success('Form deleted successfully');
      } catch (error) {
        console.error('Error deleting form:', error);
        toast.error('Error deleting form');
      }
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen bg-white">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#d9d9d9]"></div>
    </div>;
  }

  return (
    <div className="container mx-auto p-4 bg-bg-wht min-h-screen">
      <div className="bg-[#d9d9d9] rounded p-4 sm:p-8 w-full max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-[#284b63]">Your Form Links</h1>
        
        {forms.length === 0 ? (
          <p className="text-center text-gray-600">No forms created yet.</p>
        ) : (
          forms.map((form) => (
            <div key={form._id} className="mb-6 p-4 bg-white rounded shadow">
              <h2 className="text-xl font-semibold mb-2 text-[#284b63]">{form.title || 'Untitled Form'}</h2>
              <div className="flex flex-col sm:flex-row mb-2">
                <input
                  type="text"
                  value={form.link}
                  readOnly
                  className="w-full p-2 border border-[#284b63] rounded-t sm:rounded-l sm:rounded-r-none bg-[#f0f0f0]"
                />
                <button
                  onClick={() => copyToClipboard(form.link)}
                  className="p-2 bg-[#284b63] text-[#d9d9d9] rounded-b sm:rounded-r sm:rounded-l-none hover:bg-[#3a6785] transition-colors"
                >
                  Copy
                </button>
              </div>
              {/* <div className="text-sm text-gray-600">
                Created: {formatDate(form.createdAt)}
              </div>
              <div className="text-sm text-gray-600">
                Status: {form.status || 'Not set'}
              </div>
              {form.duration && (
                <div className="text-sm text-gray-600">
                  Duration: {form.duration} minutes
                </div>
              )} */}
             
            </div>
          ))
        )}
        
        <Link 
          className='bg-[#284b63] text-[#d9d9d9] text-center py-2 px-4 rounded w-full sm:w-auto inline-block mt-4 hover:bg-[#3a6785] transition-colors'
          href={`/teacher/teacher-dashboard/${id}`}
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default TeacherFormLinks;