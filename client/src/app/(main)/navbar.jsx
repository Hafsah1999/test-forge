'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import useAppContext from '../Context/teacherContext';
import { TbLogout } from "react-icons/tb";
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [teacherId, setTeacherId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem('teacherId');
    setTeacherId(id);
  }, []);

  const { loggedIn, logout } = useAppContext();

  const showLoggedin = () => {
    if (loggedIn) {
      return (
        <div className="flex items-center space-x-4">
          <Link
            href={teacherId ? `/teacher/teacher-dashboard/${teacherId}` : '#'}
            className='text-md flex rounded px-3 py-1 text-white bg-[#284b63] transition-transform duration-300 hover:scale-105 active:bg-[#1e3a5f]'
          >
            Dashboard
          </Link>
          <button
            onClick={logout}
            className='text-md rounded px-3 py-1 flex items-center text-white bg-red-600 transition-transform duration-300 hover:scale-105 active:bg-red-700'
          >
            Logout <TbLogout className='text-2xl ml-2' />
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-4">
          <Link
            className={`text-md transition-transform duration-300 hover:text-[#284b63] ${router.pathname === '/Teacher-login' ? 'text-[#284b63]' : 'text-gray-700'}`}
            href="/Teacher-login"
          >
            Teacher
          </Link>
          <div className="border-l-2 border-[#284b63] mx-3"></div>
          <Link
            className={`text-md transition-transform duration-300 hover:text-[#284b63] ${router.pathname === '/adminlogin' ? 'text-[#284b63]' : 'text-gray-700'}`}
            href="/adminlogin"
          >
            Admin
          </Link>
        </div>
      );
    }
  }

  return (
    <nav className="bg-[#d9d9d9] shadow-lg border-gray-200 fixed w-full py-2.5 dark:bg-gray-900 transition-transform duration-300 ease-in-out">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
        <Link
          href="/"
          className={`flex items-center text-[#284b63] font-serif text-xl transition-transform duration-300 hover:scale-105 ${router.pathname === '/' ? 'text-[#1e3a5f]' : 'text-[#284b63]'}`}
        >
          Form-Builder
        </Link>
        <div className="flex items-center lg:order-2">
          <div className="hidden sm:block">
            {showLoggedin()}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`w-6 h-6 ${isOpen ? 'hidden' : 'block'} transition-transform duration-300`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              className={`w-6 h-6 ${isOpen ? 'block' : 'hidden'} transition-transform duration-300`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          className={`w-full lg:flex lg:w-auto ${isOpen ? 'block' : 'hidden'} transition-transform duration-300 ease-in-out`}
          id="mobile-menu"
        >
          <ul className="flex flex-col mt-4 lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <Link
                href="/"
                className={`block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 transition-transform duration-300 ${router.pathname === '/' ? 'bg-gray-200 text-[#1e3a5f]' : ''}`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/team"
                className={`block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 transition-transform duration-300 ${router.pathname === '/team' ? 'bg-gray-200 text-[#1e3a5f]' : ''}`}
              >
                Team
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 transition-transform duration-300 ${router.pathname === '/about' ? 'bg-gray-200 text-[#1e3a5f]' : ''}`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 transition-transform duration-300 ${router.pathname === '/contact' ? 'bg-gray-200 text-[#1e3a5f]' : ''}`}
              >
                Contact
              </Link>
            </li>
            <li className="lg:hidden">{showLoggedin()}</li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
