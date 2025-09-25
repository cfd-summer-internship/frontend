"use client";

import LandingPage from "@/components/UserView/LandingPage";
import { useRetrieveFile, useStudyID } from "@/utils/fileRetrieval/hooks";

export default function StudyDebriefPage() {
  const studyID = useStudyID();
  const { data: formURL } = useRetrieveFile(studyID, "study_debrief");

  return (
    <div className="flex flex-col items-center w-screen mt-10 mb-4">
      {formURL?.trim()? (
        <iframe
          src={formURL}
          className="w-1/2 min-h-[600px] border-none"
        ></iframe>
      ) : (
        <LandingPage
          title=""
          desc="Thank you for your submission."
          nextPage="/"
        />
      )}
    </div>
  );
}
