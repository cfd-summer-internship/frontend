"use client";

import Link from "next/link";
import StudyRetrieval from "@/components/StudyRetrieval";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <div className="flex justify-end p-4">
        <Link className="text-sm text-stone-200" href={`/studyConfig/`}>Login</Link>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <StudyRetrieval />
      </div>
    </div>
  );
}
