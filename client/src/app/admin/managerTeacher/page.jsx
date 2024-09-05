'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const ManageTeacher = () => {
  const { id } = useParams();
  useEffect(() => {
    fetchteachers();
  }, [id]);
  const [teachers, setteachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchteachers();
  }, []);

  const fetchteachers = async () => {
    try {
      const response = await fetch('http://localhost:5000/teacher/getall');
      if (response.ok) {
        const data = await response.json();
        setteachers(data);
      } else {
        toast.error('Failed to fetch teachers');
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
      toast.error('An error occurred while fetching teachers');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFunction = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      console.log(id);

      const res = await fetch('http://localhost:5000/teacher/delete/' + id, { method: 'DELETE' })

      if (res.status === 200) {
        fetchteachers();
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/teacher/update/` + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        toast.success('Updated successfully');
        fetchteachers(); // Refresh the list
      } else {
        toast.error('Failed to update teacher status');
      }
    } catch (error) {
      console.error('Error updating teacher status:', error);
      toast.error('An error occurred while updating teacher status');
    }
  };

  if (isLoading) {
    return <button
      type="button"
      className="py-2 px-4 flex justify-center items-center  mx-auto mt-8 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md"
    >
      <svg
        width={20}
        height={20}
        fill="currentColor"
        className="mr-2 animate-spin"
        viewBox="0 0 1792 1792"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
      </svg>
      loading
    </button>
  }



  return (
<>
<>
  {/* component */}
  <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
    <div className="flex flex-col justify-center h-full">
      {/* Table */}
      <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Teachers</h2>
        </header>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Email</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Password</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Action</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
              {teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td className="px-6 py-4 whitespace-nowrap ">
                  {teacher.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {teacher.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {teacher.password}
                </td>
               
                <td className="px-6 py-4 whitespace-nowrap">
                 
                  <button
                    onClick={() => { deleteFunction(teacher._id) }}
                    className="bg-red-500 text-white py-1 px-2 rounded mr-2"
                  >
                    Delete
                  </button>
                
                </td>
              </tr>
            ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</>
<div className="container-fluid ">
      <h1 className="text-3xl bg-black shadow-xl rounded  text-white h-20 font-bold mb-4 flex items-center justify-center ">Manage teachers</h1>
      <div className="flex justify-between">
        <div></div>
        <Link href="/admin/dashboard"
          className="flex flex-row items-center  text-black justify-center shadow-xl py-1 mb-4 text-lg  font-bold bg-white leading-6 capitalize duration-100 transteacher rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10   hover:shadow-lg hover:-translate-y-1">
          Create New teacher
          <span class="">
            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path fill="currentColor" d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"></path>
            </svg>
          </span>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black shadow-2xl my-8   rounded">
          <thead>
            <tr>
              <th className="px-2 py-3 border-b-2 font-serif border-gray-300 text-left text-sm font-semibold text-white uppercase tracking-wider">
                teacher Title
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-white font-serif uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-white font-serif uppercase tracking-wider">
               Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-white font-serif uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
           
          </tbody>
        </table>
      </div>
    </div>
</>

    
  );
};

export default ManageTeacher;