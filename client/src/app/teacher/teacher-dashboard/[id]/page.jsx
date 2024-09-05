'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { motion } from 'framer-motion';

const TeacherDashboard = () => {
  const [forms, setForms] = useState([]);
  const [teacherName, setTeacherName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const teacherId = localStorage.getItem('teacherId');
    if (!teacherId) {
      toast.error('You need to log in first');
      router.push('/Teacher-login');
      return;
    }
    fetchTeacherInfo();
    fetchForms();
  }, []);

  const fetchTeacherInfo = () => {
    const name = localStorage.getItem('teacherName');
    if (name) {
      setTeacherName(name);
    } else {
      console.log('Teacher name not found in localStorage');
    }
  };

  const fetchForms = async () => {
    setIsLoading(true);
    try {
      const teacherId = localStorage.getItem('teacherId');
      const url = `${process.env.NEXT_PUBLIC_API_URL}/form/getbyteacher/${teacherId}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setForms(data);
      } else {
        const errorText = await res.text();
        toast.error(`Failed to fetch forms: ${res.status} ${res.statusText}`);
      }
    } catch (error) {
      toast.error(`An error occurred while fetching forms: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const createNewForm = async () => {
    try {
      const teacherId = localStorage.getItem('teacherId');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/form/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: 'Untitled Form', teacherId }),
      });

      if (!res.ok) {
        throw new Error('Failed to create new form');
      }

      const newForm = await res.json();
      router.push(`/teacher/createForm/${newForm._id}`);
    } catch (error) {
      toast.error("An error occurred while creating a new form");
    }
  };

  const handleDelete = async (formId) => {
    if (confirm('Are you sure you want to delete this form?')) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/form/delete/${formId}`, {
          method: 'DELETE',
        });

        if (!res.ok) {
          throw new Error('Failed to delete form');
        }

        toast.success('Form deleted successfully');
        setForms(forms.filter(form => form._id !== formId));
      } catch (error) {
        toast.error(`An error occurred while deleting the form: ${error.message}`);
      }
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex justify-center items-center h-screen"
      >
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#284b63]"></div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-100 min-h-screen p-4 sm:p-6"
    >
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-6"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-[#284b63] mb-4 sm:mb-0">Welcome, {teacherName}</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={createNewForm}
            className="bg-[#d9d9d9] text-[#284b63] shadow-md py-2 px-4 rounded-md hover:bg-[#c0c0c0] transition-colors duration-300"
          >
            Create New Form
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {forms.map((form, index) => (
            <motion.div
              key={form._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#d9d9d9] p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-[#284b63] truncate">{form.title}</h2>
                <div className="flex space-x-2">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link
                      href={`/teacher/createForm/${form._id}`}
                      className="text-[#3c6e71] hover:text-[#284b63] transition-colors duration-300 p-2 rounded-full"
                    >
                      <MdEdit className="text-xl" />
                    </Link>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(form._id)}
                    className="text-red-600 hover:text-red-800 transition-colors duration-300 p-2 rounded-full"
                  >
                    <RiDeleteBin5Fill className="text-xl" />
                  </motion.button>
                </div>
              </div>
              <p className="text-gray-700 mb-2">
                {form.questions && Array.isArray(form.questions) ? `${form.questions.length} questions` : 'No questions'}
              </p>
              <span className="text-gray-500 text-sm">
                Created: {new Date(form.createdAt).toLocaleDateString()}
              </span>
              <div className="mt-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/teacher/view-responses/${form._id}`}
                    className="block text-center bg-[#284b63] text-white py-2 px-4 rounded-md hover:bg-[#1e3a5f] transition-colors duration-300"
                  >
                    View Responses
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeacherDashboard;