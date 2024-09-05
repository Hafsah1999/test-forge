'use client';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import {  useParams, useRouter } from 'next/navigation';
import useStudentContext from '@/app/Context/studentContext';


const Login = () => {
  const { setCurrentUser, setLoggedIn } = useStudentContext();
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const storedStudent = localStorage.getItem('student');
    if (storedStudent) {
      const student = JSON.parse(storedStudent);
      setCurrentUser(student);
      setLoggedIn(true);
      router.push(`/Responseform/${id}`);
    }
  }, [id, router, setCurrentUser, setLoggedIn]);

  const loginForm = useFormik({
    initialValues: {
      name: '',
      contact: '',
      email: '',
      studentId: '',
      course: '',
      batch: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/add`, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (res.status === 200) {
          resetForm();
          toast.success('Login Successful');
          setLoggedIn(true);
          const data = await res.json();
          setCurrentUser(data);
          localStorage.setItem('student', JSON.stringify(data));
          router.push(`/Responseform/${id}`);
        } else {
          toast.error('Login failed');
        }
      } catch (error) {
        toast.error('An error occurred');
      }
    },
  });

  return (
    <>
      <div className=' bg-[#284b63] p-8'>
      <div className="relative mx-auto w-full bg-[#d9d9d9] max-w-md bg-white px-6 pt-6 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
  <div className="w-full">
    <div className="text-center">
      <h1 className="text-3xl font-semibold text-gray-900">Sign in</h1>
      <p className="mt-2 text-gray-500">Sign in below to access your account</p>
    </div>
    <div className="mt-5">
      <form onSubmit={loginForm.handleSubmit} clas>
        <div className="relative mt-6">
          <input
            name="name"
            type="text"
            required
            values={loginForm.values.name}
            onChange={loginForm.handleChange}
            placeholder="Name"
            className="peer mt-1 w-full border-b-2 border-[#284b63] bg-transparent px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
          />
          <label
            htmlFor="Name"
            className="pointer-events-none absolute top-0 left-0 bg-transparent origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
          >
            Name
          </label>
        </div>
        <div className="relative mt-6">
          <input
              type="number"
              name='contact'
              required
              values={loginForm.values.contact}
              onChange={loginForm.handleChange}
            placeholder="Contact"
            className="peer mt-1 w-full border-b-2 border-[#284b63] bg-transparent px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
            
          />
          <label
            htmlFor="contact"
            className="pointer-events-none absolute top-0 left-0 bg-transparent origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
          >
            Contact
          </label>
        </div>
        <div className="relative mt-6">
          <input
            type="email"
            name="email"
            required
            values={loginForm.values.email}
            onChange={loginForm.handleChange}
            placeholder="Email Address"
            className="peer mt-1 w-full border-b-2 border-[#284b63] bg-transparent px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
        
          />
          <label
            htmlFor="email"
            className="pointer-events-none absolute top-0 bg-transparent left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
          >
            Email Address
          </label>
        </div>
        <div className="relative mt-6">
          <input
             type="text"
             name='studentId'
             required
             values={loginForm.values.studentId}
             onChange={loginForm.handleChange}
            placeholder="Email Address"
            className="peer mt-1 w-full border-b-2 border-[#284b63] bg-transparent px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
            autoComplete="NA"
          />
          <label
            htmlFor="studentId"
            className="pointer-events-none absolute top-0 bg-transparent left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
          >
            Student ID
          </label>
        </div>
        <div className="relative mt-6">
          <input
         type="text"
         name="course"
         required
         values={loginForm.values.course}
         onChange={loginForm.handleChange}
            placeholder="Course"
            className="peer mt-1 w-full border-b-2 border-[#284b63] bg-transparent px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
            autoComplete="NA"
          />
          <label
            htmlFor="course"
            className="pointer-events-none absolute top-0 left-0 bg-transparent origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
          >
            Course
          </label>
        </div>
        <div className="relative mt-6">
          <input
              type="text"
              name="batch"
              required
              values={loginForm.values.batch}
              onChange={loginForm.handleChange}
            placeholder="batch"
            className="peer peer mt-1 w-full border-b-2 border-[#284b63] bg-transparent px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
          />
          <label
            htmlFor="batch"
            className="pointer-events-none absolute top-0 bg-transparent left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
          >
            Batch
          </label>
        </div>
        <div className="my-6">
          <button
            type="submit"
            className="w-full rounded-md bg-[#284b63] px-3 py-2 text-white focus:bg-gray-600 focus:outline-none"
          >
            Submit and start test
          </button>
        </div>
       
      </form>
    </div>
  </div>
</div>


      

      </div>


    </>
  )
}

export default Login