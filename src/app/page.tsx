"use client";

import Link from "next/link";
import StudyRetrieval from "@/components/StudyRetrieval";
import ResearcherDashboard from "./dash/researcher/page";
import StaffDashboard from "./dash/staff/page";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <div className="flex justify-end p-4">
        <Link className="text-sm text-stone-200" href={`/login/`}>Login</Link>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <StudyRetrieval />
      </div>
    </div>
  );
}
