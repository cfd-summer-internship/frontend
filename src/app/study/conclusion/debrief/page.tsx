"use client";

import ConclusionMessage from "@/components/UserView/Conclusion";
import { useRetrieveFile, useStudyID } from "@/utils/fileRetrieval/hooks";
import { useRouter } from "next/navigation";

export default function StudyDebriefPage() {
  const router = useRouter();
  const studyID = useStudyID();
  const { data: formURL } = useRetrieveFile(studyID, "study_debrief");

  return (
    <div className="flex flex-col items-center w-screen min-h-screen mt-10 mb-4 gap-y-10">
      <iframe
        src={formURL}
        className="w-1/2 min-h-[800px] border-none"
      ></iframe>
      <button
        className="py-2 px-12 bg-stone-700 text-stone-300 rounded-sm hover:bg-emerald-700 hover:cursor-pointer"
        onClick={() => router.replace("/")}
      >
        Home
      </button>
    </div>
  );
}
