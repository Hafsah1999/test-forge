'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const FormSubmitted = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const score = searchParams.get('score');
  const allowRetest = searchParams.get('allowRetest') === 'true';
  const displayScore = searchParams.get('displayScore') === 'true';

  return (
    <div className="container mx-auto p-4 bg-[#284b63] min-h-screen flex items-center justify-center">
      <div className="p-4 bg-[#d9d9d9] rounded shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-[#284b63]">Form Submitted Successfully!</h1>
        {displayScore && (
          <h2 className="text-3xl font-semibold mb-4">Your Score: {score} Points</h2>
        )}
        {allowRetest && (
          <button
            onClick={() => router.push('/retest')}
            className="px-4 py-2 bg-[#3c6e71] text-white rounded hover:bg-[#2a4b59]">
            Request Retest
          </button>
        )}
      </div>
    </div>
  );
};

export default FormSubmitted;
