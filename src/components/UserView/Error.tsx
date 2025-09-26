"use client";

import { useRouter } from 'next/navigation';

export default function ErrorDisplay() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-y-10 items-center justify-center min-h-screen bg-stone-900 text-red-500 px-4">
      An error has occured please contact the study administrator for assistance.
      <button
        className="py-2 px-12 bg-stone-700 text-stone-300 rounded-sm hover:bg-stone-600 hover:cursor-pointer"
        onClick={() => router.replace("/")}
      >
        Return
      </button>
    </div>
  );
}
