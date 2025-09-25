"use client";
import { useRouter } from "next/navigation";

export default function LandingPage({
  title,
  desc,
  nextPage,
}: {
  title: string;
  desc: string;
  nextPage: string;
}) {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col w-screen min-h-screen items-center">
        <div className="flex text-stone-300 text-lg text-center mt-2">
          {title}
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-y-10">
          <div className="flex flex text-stone-300 text-xl font-bold text-center whitespace-pre-line">
            {desc}
          </div>
          <div className="flex text-stone-300 text-center">
            Click "Begin" When You Are Ready To Start.
          </div>
          <div className="flex gap-4">
            <button
              className="bg-stone-800 text-stone-300 hover:bg-emerald-700 hover:cursor-pointer px-14 py-2 rounded-sm"
              onClick={() => router.push(nextPage)}
            >
              Begin
            </button>
            <button
              className="bg-stone-800 text-stone-300 hover:bg-stone-600 hover:cursor-pointer px-14 py-2 rounded-sm"
              onClick={() => router.replace("/")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
