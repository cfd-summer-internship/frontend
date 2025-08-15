"use client";

import { BinaryScoring } from "@/components/UI/BinaryScoring";
import { GradientScoring } from "@/components/UI/GradientScoring";
import { createContext } from "react";

export const RadioContext = createContext<(e: React.ChangeEvent<HTMLInputElement>) => void>(() => {});

export default function ScoringComponent({response_method, setCanContinue}){
  const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {setCanContinue(true)};

  return (
    <form className="pb-4">
      <div>
        <RadioContext value={handleChange}>
        {response_method === "binary" ? <BinaryScoring/> : <GradientScoring/>}
        </RadioContext>
      </div>
    </form>  
  );
}
