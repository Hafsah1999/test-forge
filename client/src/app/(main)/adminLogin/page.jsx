'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then(data => {
        console.log('Login successful, received token:', data.token);
        localStorage.setItem('adminToken', data.token);
        toast.success('Login successful');
        router.push('/admin/dashboard');
      })
      .catch(err => {
        console.error('Login error:', err);
        toast.error(err.message || 'An error occurred. Please try again.');
      });
  };

  return (
    <div className="min-h-screen flex flex-col  lg:flex-row items-center justify-center shadow-xl py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="hidden lg:block mb-8 lg:mb-0 lg:mr-8">
        <Image src="https://i.pinImage.com/564x/bd/a3/17/bda3177a3943ffdbcc652b3a678a0d74.jpg" alt="Admin Login" className="rounded-lg w-full lg:w-96" />
      </div>
      <div className="max-w-md w-full space-y-8 bg-[#d9d9d9] p-8 lg:p-12 rounded-lg lg:rounded-r-xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input
            type="text"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#284b96] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
