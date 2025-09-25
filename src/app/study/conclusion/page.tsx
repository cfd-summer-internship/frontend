"use client";
import { useStudyID } from "@/utils/fileRetrieval/hooks";
import { useConclusionPhase } from "@/utils/conclusionPhase/hooks";
import ConclusionPhaseSurveyPage from "@/components/UserView/SurveyForm/SurveyPage";
// import DebriefSection from "./DebriefSection";
// import ThankYou from ".ThankYou";

export default function ConclusionPhasePage() {
  const studyID = useStudyID();
  const { data, isLoading, isError } = useConclusionPhase(studyID);
  const subjectID = localStorage.getItem("subjectID");

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900">
        <span className="loader"></span>
      </div>
    );
  if (isError || !data)
    return (
      <div className="text-red-500">An error has occured please contact your study administrator for support.</div>
    );

  if (data.has_survey) {
    return <ConclusionPhaseSurveyPage subjectID={subjectID!} />;
  } //else if (data.show_results) {
  //     return <DebriefSection studyID={studyID!} />;
  // } else {
  //     return <ThankYou />;
  // }
}
