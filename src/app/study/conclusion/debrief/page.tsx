"use client";

import LandingPage from "@/components/UserView/LandingPage";
import { useRetrieveFile, useStudyID } from "@/utils/fileRetrieval/hooks";
import { useRouter } from "next/navigation";

export default function StudyDebriefPage() {
  const router = useRouter();
  const studyID = useStudyID();
  const { data: formURL } = useRetrieveFile(studyID, "study_debrief");

  return (
    <div className="flex flex-col items-center w-screen min-h-screen mt-10 mb-4 gap-y-10">
      {formURL?.trim() ? (
        <>
          <iframe
            src={formURL}
            className="w-1/2 min-h-[800px] border-none"
          ></iframe>
        </>
      ) : (
        <div className="flex flex-col w-screen min-h-screen items-center">
          <div className="flex-1 flex flex-col items-center justify-center gap-y-10">
            <div className="flex flex text-stone-300 text-xl font-bold text-center whitespace-pre-line">
              Thank you for your submision.
            </div>
            <div className="flex text-stone-300 text-center">
              If you have any questions please reach out to your study
              administrator.
            </div>
          </div>
        </div>
      )}
      <button
        className="py-2 px-12 bg-stone-700 text-stone-300 rounded-sm hover:bg-emerald-700 hover:cursor-pointer"
        onClick={() => router.replace("/")}
      >
        Home
      </button>
    </div>
  );
}
