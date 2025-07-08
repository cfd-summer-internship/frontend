"use client";

import Acknowledgement from "@/components/UserView/Acknowledgement";
import DisplayFile from "@/components/UserView/DisplayFile";

export default function ConsentFormPage() {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <DisplayFile fileRequest="consent_form" />
      <Acknowledgement route="/study/studyInstructions">
        I hereby acknowledge that I have read the above consent form and am voluntarily particpating in the study as outlined by the terms above.
      </Acknowledgement>
    </div>
  );
}
