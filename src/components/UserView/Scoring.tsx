"use client";

import { BinaryScoring } from "@/components/UI/BinaryScoring";
import { GradientScoring } from "@/components/UI/GradientScoring";
import { createContext } from "react";

export const RadioContext = createContext<(e: React.ChangeEvent<HTMLInputElement>) => void>(() => { });

export default function ScoringComponent({ ref, response_method, reset, setCanContinue }) {
  const handleChange = () => { setCanContinue(true) };

  return (
    <form ref={ref} key={reset} id="scoring-form" className="pb-4">
        <RadioContext value={handleChange}>
            {response_method === "binary" ? <BinaryScoring /> : <GradientScoring />}
        </RadioContext>
    </form>
  );
}
