"use client";

import Radio from "./Radio";

export function GradientScoring(handleChange){
  return(
  <div className="flex flex-row gap-2">
    <Radio 
      name={"experiment.scoringMethod"}
      id={"experiment.displayMethod"}
      value={"0"}
      onChange={handleChange}
      text={"No"}
    />

    <Radio 
      name={"experiment.scoringMethod"}
      id={"experiment.displayMethod"}
      value={"1"}
      onChange={handleChange}
      text={"Not likely"}
    />

    <Radio 
      name={"experiment.scoringMethod"}
      id={"experiment.displayMethod"}
      value={"2"}
      onChange={handleChange}
      text={"Neutral"}
    />

    <Radio 
      name={"experiment.scoringMethod"}
      id={"experiment.displayMethod"}
      value={"3"}
      onChange={handleChange}
      text={"Likely"}
    />

    <Radio 
      name={"experiment.scoringMethod"}
      id={"experiment.displayMethod"}
      value={"4"}
      onChange={handleChange}
      text={"Yes"}
    />

  </div>
  )
}       