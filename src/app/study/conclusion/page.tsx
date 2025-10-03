"use client";
import { useStudyID } from "@/utils/fileRetrieval/hooks";
import { useConclusionPhase } from "@/utils/conclusionPhase/hooks";
import ConclusionPhaseSurveyPage from "@/components/UserView/SurveyForm/SurveyPage";
import ErrorDisplay from "@/components/UserView/Error";
import ConclusionMessage from "@/components/UserView/Conclusion";
import { useEffect, useState } from "react";

export default function ConclusionPhasePage() {
  const studyID = useStudyID();
  const { data, isLoading, isError } = useConclusionPhase(studyID);
  const [subjectID, setSubjectID] = useState<string | null >();

  useEffect(() =>{
    const localSubjectID = localStorage.getItem("subjectID");
    setSubjectID(localSubjectID);
  },[]);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900">
        <span className="loader"></span>
      </div>
    );
  if (isError || !data) return <ErrorDisplay />;

  if (data.has_survey) {
    return <ConclusionPhaseSurveyPage subjectID={subjectID!} />;
  } else {
    return <ConclusionMessage />;
  }
}
