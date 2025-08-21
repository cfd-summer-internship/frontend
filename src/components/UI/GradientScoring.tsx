"use client";

import Radio from "./Radio";

export function GradientScoring(){
  return(
  <div className="flex flex-row gap-2">
    <Radio 
      name={"experiment.scoringMethod"}
      id={"experiment.displayMethod"}
      value={"0"}
      text={"No"}
    />

    <Radio 
      name={"experiment.scoringMethod"}
      id={"experiment.displayMethod"}
      value={"1"}
      text={"Not likely"}
    />

    <Radio 
      name={"experiment.scoringMethod"}
      id={"experiment.displayMethod"}
      value={"2"}
      text={"Neutral"}
    />

    <Radio 
      name={"experiment.scoringMethod"}
      id={"experiment.displayMethod"}
      value={"3"}
      text={"Likely"}
    />

    <Radio 
      name={"experiment.scoringMethod"}
      id={"experiment.displayMethod"}
      value={"4"}
      text={"Yes"}
    />

  </div>
  )
}       