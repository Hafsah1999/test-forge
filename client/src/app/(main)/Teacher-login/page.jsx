'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function TeacherLogin() {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const teacherId = localStorage.getItem('teacherId');
    if (token && teacherId) {
      router.push(`/teacher/teacher-dashboard/${teacherId}`);
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    fetch('http://localhost:5000/teacher/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('teacherName', data.name);
          localStorage.setItem('teacherId', data._id);
          router.push(`/teacher/teacher-dashboard/${data._id}`);
        } else {
          setError(data.message);
        }
      })
      .catch(err => {
        console.log(err);
        setError('An error occurred. Please try again.');
      });
  };

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-cover bg-no-repeat shadow-2xl">
        <div className="flex flex-col md:flex-row items-center rounded-l-2xl  bg-opacity-50 px-16 py-10 backdrop-blur-md max-sm:px-8">
          <div className="text-white mb-8 flex flex-col bg-[#d9d9d9] p-12 rounded-l-xl items-center md:mb-0 md:mr-8">
            <div className="mb-8 flex flex-col  items-center">
              <h1 className="mb-2 text-2xl text-[#284b63]">Form Builder</h1>
              <span className="text-[#284b63]">Enter Login Details</span>
            </div>
            {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input
                type="text"
                required
                className="appearance-none rounded-none bg-white relative block px-3 py-2 placeholder-[#284b63] text-[#284b63] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={name}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                required
                className="appearance-none rounded-none relative bg-white block w-full px-3 py-2 placeholder-[#284b63] text-[#284b63] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full bg-white px-3 py-2 border border-gray-300 placeholder-[#284b63] text-[#284b63] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#284b63] font-serif text-xl shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Sign in
              </button>
            </form>
          </div>
          <div className="hidden md:block">
            <Image
              src="https://i.pinImage.com/564x/dd/c9/08/ddc908900cf333486421816d235ae5d4.jpg"
              alt=""
              className="rounded-r-2xl"
            />
          </div>
        </div>
      </div>
    </>
  );
}
