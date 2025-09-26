"use client";

import { useRouter } from "next/navigation";

export default function ConclusionMessage() {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col w-screen min-h-screen items-center">
        <div className="flex-1 flex flex-col items-center justify-center gap-y-10">
          <div className="flex flex text-stone-300 text-xl font-bold text-center whitespace-pre-line">
            Thank you for your submision.
          </div>
          <div className="flex text-stone-300 text-center">
            If you have any questions please reach out to your study
            administrator.
          </div>
                <button
        className="py-2 px-12 bg-stone-700 text-stone-300 rounded-sm hover:bg-emerald-700 hover:cursor-pointer"
        onClick={() => router.replace("/")}
      >
        Home
      </button>
        </div>
      </div>
    </>
  );
}
