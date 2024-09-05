'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

const FormLink = () => {
  const { id } = useParams();
  const [link, setLink] = useState('');

  useEffect(() => {
    const generateLink = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/form/link/${id}`);
        if (!res.ok) throw new Error('Failed to generate link');
        const data = await res.json();
        setLink(`${window.location.origin}/student/${id}`);
      } catch (error) {
        toast.error('Error generating link');
      }
    };
    generateLink();
  }, [id]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard');
  };

  return (
    <div className="container mx-auto p-4 flex items-center bg-[#284b63]  " style={{height:"91vh"}}>
<div className="container bg-[#d9d9d9] rounded p-8 w-3/4">
<h1 className="text-2xl font-bold mb-4 text-[#284b63] ">Form Link</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={link}
          readOnly
          className="w-3/4 p-2 border border-[#284b63] bg-[#d9d9d9] rounded-l "
        />
        <button
          onClick={copyToClipboard}
          className="p-2 bg-[#284b63] text-[#d9d9d9] rounded-r"
        >
          Copy
        </button>

      </div>
      <Link className='bg-[#284b63] text-[#d9d9d9] text-center py-1 rounded  w-36 block' href={`/teacher/teacher-dashboard/${id}`}>Dashboard</Link>
  
      </div>

    </div>
  );
};

export default FormLink;