"use client";

import Radio from "./Radio";

export function BinaryScoring(handleChange){
  return(
  <div className="flex flex-row gap-2">
    <Radio 
        name={"experiment.scoringMethod"}
        id={"experiment.displayMethod"}
        value={"1"}
        onChange={handleChange}
        text={"Yes"}
        />
    
    <Radio 
        name={"experiment.scoringMethod"}
        id={"experiment.displayMethod"}
        value={"0"}
        onChange={handleChange}
        text={"No"}
      />
    </div>
  )   
}

