'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from './navbar';
import { SiGoogleforms } from "react-icons/si";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { FaBars } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const MainLayout = ({ children }) => {
    const [teacherId, setTeacherId] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter()

    useEffect(() => {
        const id = localStorage.getItem('teacherId');
        setTeacherId(id);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const createNewForm = async () => {
        try {
            const teacherId = localStorage.getItem('teacherId');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/form/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: 'Untitled Form', teacherId: teacherId }), // Include teacherId here
            });

            if (!res.ok) {
                throw new Error('Failed to create new form');
            }

            const newForm = await res.json();
            router.push(`/teacher/createForm/${newForm._id}`);
        } catch (error) {
            console.error("Error creating new form:", error);
            toast.error("An error occurred while creating a new form");
        }
    };

    return (
        <>
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
            <div className={`fixed left-0 top-0 w-64 h-full bg-[#284b63] p-4 z-50 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="flex items-center justify-between text-[#d9d9d9] border-b border-[#d9d9d9] pb-4">
                    <a href="#" className="text-2xl">Form-Builder</a>
                    <button className="text-2xl md:hidden" onClick={toggleSidebar}><MdClose /></button>
                </div>
                <ul className="mt-4">
                    <span className="text-[#d9d9d9] font-bold">TEACHER</span>
                    <li className="mb-1 group">
                        <Link
                            href={teacherId ? `/teacher/teacher-dashboard/${teacherId}` : '#'}
                            className="flex font-semibold items-center text-white py-2 px-4 my-2 hover:bg-[#d9d9d9] hover:text-[#284b63] rounded-md"
                        >
                            <LuLayoutDashboard />
                            <span className="text-sm ms-2">Dashboard</span>
                        </Link>
                    </li>
                    <li className="mb-1 group">
                        <button onClick={createNewForm} className="flex font-semibold items-center py-2 w-full px-3 my-2 hover:bg-[#d9d9d9] hover:text-[#284b63] rounded-md text-white">
                            <FaPlus />
                            <span className="text-sm ms-2">Create</span>
                        </button>

                    </li>
                    <li className="mb-1 group">
                        <Link
                            href={teacherId ? `/teacher/form-links/${teacherId}` : '#'}
                            className="flex font-semibold items-center text-white py-2 px-4 hover:bg-[#d9d9d9] hover:text-[#284b63] rounded-md"
                        >
                            <SiGoogleforms className='me-2' />
                            <span className="text-sm">Form Links</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={`fixed top-0 left-0 w-full h-full bg-black/50 z-40 ${sidebarOpen ? 'block' : 'hidden'} md:hidden`} onClick={toggleSidebar} />
            {/* end sidenav */}
            <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all main">
                {/* navbar */}
                <Navbar />
                {/* end navbar */}
                <button className="text-2xl p-2 m-2 md:hidden" onClick={toggleSidebar}><FaBars /></button>
                {/* Content */}
                {children}
                {/* End Content */}
            </main>
        </>
    );
};

export default MainLayout;
