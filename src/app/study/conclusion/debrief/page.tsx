"use client";

import ConclusionMessage from "@/components/UserView/Conclusion";
import { useRetrieveFile, useStudyID } from "@/utils/fileRetrieval/hooks";

export default function StudyDebriefPage() {
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
        <ConclusionMessage />
      )}
    </div>
  );
}
