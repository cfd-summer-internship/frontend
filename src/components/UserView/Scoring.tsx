"use client";

import { BinaryScoring } from "@/components/UI/BinaryScoring";
import { GradientScoring } from "@/components/UI/GradientScoring";
import { useState } from "react";
import { boolean } from "zod/v4";


export default function ScoringComponent({response_method, setCanContinue})
{
 
  const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {setCanContinue(true)};

  return (
    <form className="pb-4">
      <div>
        {response_method === "binary" ? <BinaryScoring handleChange={handleChange}/> : <GradientScoring handleChange={handleChange}/>}
      </div>
    </form>  
  );
}
