"use client";

import LandingPage from "@/components/UserView/LandingPage";

export default function LearningPhaseLanding() {
  return (
    <LandingPage
      title="Learning Phase"
      desc={`You will be shown a series of faces.\nTry to memorize each one to the best of your ability.`}
      nextPage="/study/learningPhase/images"
    />
  );
}
