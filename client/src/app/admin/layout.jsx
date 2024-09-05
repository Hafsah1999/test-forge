'use client'
import Link from 'next/link'
import React from 'react'
import useAdminContext from '@/app/Context/adminContext'; // Adjust the path if needed

const Layout = ({ children }) => {
  const { logout } = useAdminContext(); // Access logout function from context

  return (
    <>
      <>
        {/* component */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <title>Admin Panel</title>

        {/* sidenav */}
        <div className="fixed left-0 top-0 w-64 h-full bg-[#284b63] p-4 z-50 sidebar-menu transition-transform">
          <a href="#" className="flex items-center text-center text-[#d9d9d9] border-[#d9d9d9] pb-4 text-2xl border-b ">
            Form-Builder
          </a>
          <ul className="mt-4">
            <span className="text-[#d9d9d9] font-bold">ADMIN</span>
            <li className="mb-1 group">
              <Link
                href="/admin/dashboard"
                className="flex font-semibold items-center text-white py-2 px-4 my-2 hover:bg-[#d9d9d9] hover:text-[#284b63] rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
              >
                <i className="ri-home-2-line mr-3 text-lg" />
                <span className="text-sm">Dashboard</span>
              </Link>
            </li>
            <li className="mb-1 group">
              <Link
                href="/admin/managerTeacher"
                className="flex font-semibold items-center text-white py-2 px-4 hover:bg-[#d9d9d9] hover:text-[#284b63] rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
              >
                <i className="bx bx-user mr-3 text-lg" />
                <span className="text-sm">Teachers</span>
              </Link>
            </li>
            <li className="mb-1 group">
              <Link
                href="/admin/manageForms"
                className="flex font-semibold items-center py-2 px-4 my-2 hover:bg-[#d9d9d9] hover:text-[#284b63] rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-white text-white group-[.selected]:text-gray-100"
              >
                <i className="bx bx-list-ul mr-3 text-lg" />
                <span className="text-sm">Forms</span>
              </Link>
            </li>
            {/* Logout Button */}
            <li className="mb-1">
              <button
                onClick={logout}
                className="flex font-semibold items-center text-white py-2 px-4 my-2 hover:bg-[#f07167] hover:text-white rounded-md"
              >
                <i className="bx bx-log-out mr-3 text-lg" />
                <span className="text-sm">Logout</span>
              </button>
            </li>
          </ul>
        </div>
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay" />
        {/* end sidenav */}
        <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all main">
          {/* navbar */}
          {/* end navbar */}
          {/* Content */}
          {children}
          {/* End Content */}
        </main>
      </>
    </>
  );
}

export default Layout;
