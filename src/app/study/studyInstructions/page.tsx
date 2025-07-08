"use client";

import Acknowledgement from "@/components/UserView/Acknowledgement";
import DisplayFile from "@/components/UserView/DisplayFile";

export default function StudyInstructionPage() {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <DisplayFile fileRequest="study_instructions" />
      <Acknowledgement route="/study/learningPhase">
        I hereby acknowledge the study instructions listed above and will follow them to the best of my ability.
      </Acknowledgement>
    </div>
  );
}
