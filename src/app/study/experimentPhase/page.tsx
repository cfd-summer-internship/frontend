"use client";

import LandingPage from "@/components/UserView/LandingPage";

export default function ExperimentPhaseLanding() {
  return (
    <LandingPage
      title="Testing Phase"
      desc={`You will be shown a series of faces.\nTo the best of your ability try to accurately select if it was in the previous set.`}
      nextPage="/study/experimentPhase/images"
    />
  );
}
