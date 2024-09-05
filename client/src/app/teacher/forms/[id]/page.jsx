'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { SiReacthookform } from "react-icons/si";
import { FaArrowRight, FaWpforms } from "react-icons/fa6";

const FormsPage = () => {
  const router = useRouter()
  const [forms, setForms] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/form/getall');
      if (!res.ok) {
        throw new Error('Failed to fetch forms');
      }
      const data = await res.json();
      setForms(data);
    } catch (error) {
      console.error("Error fetching forms:", error);
      setError(error.message);
      toast.error("An error occurred while fetching forms");
    } finally {
      setIsLoading(false);
    }
  };

  const createNewForm = async () => {

    try {
      
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error("You're not logged in. Please log in and try again.");
          router.push('/login');
          return;
        }
    
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/form/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // You can add any initial form data here if needed
        body: JSON.stringify({ title: 'Untitled Form' }),
      });

      if (!res.ok) {
        throw new Error('Failed to create new form');
      }

      const newForm = await res.json();
      // console.log(newForm);
      // return;
      router.push(`/teacher/createForm/${newForm._id}`);
    } catch (error) {
      console.error("Error creating new form:", error);
      toast.error("An error occurred while creating a new form");
    }
  };

  if (isLoading) {
    return <button
      type="button"
      className="py-2 px-4 flex justify-center items-center  mx-auto mt-8 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md"
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

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }



  // Ensure forms is an array before trying to access its length
  const formsArray = Array.isArray(forms) ? forms : [];

  return (
    <div className="container mx-auto p-4 bg-[#52796f] ">


      <div className="flex justify-between mt-4 items-center mb-8">
        <h1 className=" font-bold px-12 text-[#edf6f9]  text-4xl">Your Forms</h1>
        <button onClick={createNewForm}
          className="flex flex-row items-center  text-white justify-center w-full  py-2 mb-4 text-md font-bold bg-[#354f52] leading-6 capitalize duration-100 transform rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-2 md:pl-4 md:pr-3 xl:pl-8 xl:pr-10   hover:shadow-lg hover:-translate-y-1">
          Create New Form
          <span class="ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path fill="currentColor" d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"></path>
            </svg>
          </span>
        </button>
      </div>



      {formsArray.length === 0 ? (
        <p className="text-center text-gray-50">No forms created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {formsArray.map((form) => (

            <div className="relative flex flex-col justify-center overflow-hidden bg-[#52796f] ">
              <div className="group relative cursor-pointer overflow-hidden bg-[#354f52] px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-[#2f3e46] transition-all duration-300 group-hover:scale-[10]" />
                <div className="relative z-10 mx-auto max-w-md">
                  <span className="grid h-20 w-20 place-items-center text-white  rounded-full transition-all duration-300 group-hover:bg-[#52796f]">
                    <FaWpforms className='text-5xl' />
                  </span>
                  <div className=" pt-5 text-base hover:text-white leading-7 text-[#edf6f9] transition-all duration-300 group-hover:text-white/90">
                    <p className="text-xl font-serif  font-bold">
                      {form.title}
                    </p> <p className="hover:text-white"> {form.questions && Array.isArray(form.questions)
                      ? `${form.questions.length} questions`
                      : 'No questions'}</p>
                    <div className="pt-5 text-base font-semibold leading-7">
                    <span className="text-white ">
                        Created: {new Date(form.createdAt).toLocaleDateString()}
                      </span>
                      <Link
                        href={`/viewForm/${form._id}`}
                        className="flex items-center text-white mt-2  bg-[#2f3e46]  group-hover:bg-[#52796f] py-1 px-3 gap-2 rounded inline-flex items-center"
                      >
                        <span>View Form</span>
                        <FaArrowRight />
                      </Link>
                    </div>
                  </div>


                </div>
              </div>
            </div>


          ))}
        </div>
      )}
    </div>
  );
};

export default FormsPage;