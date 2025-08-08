"use client";

import Acknowledgement from "@/components/UserView/Acknowledgement";
import DisplayFile from "@/components/UserView/DisplayFile";

export default function StudyDebriefPage() {
  return (
    // I'm not sure if the Acknowledgment is correct
    <div className="flex flex-col min-h-screen w-screen">
      <DisplayFile fileRequest="study_debrief" />
      <Acknowledgement route="/study/studyDebrief">
        I hereby acknowledge that I have read the above.
      </Acknowledgement>
    </div>
  );
}
