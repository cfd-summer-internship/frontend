"use client";

import Radio from "./Radio";

export function BinaryScoring({ }) {
  return (
    <div className="flex flex-row gap-2">
        <Radio
          name={"experiment.scoringMethod"}
          id={"experiment.displayMethod"}
          value={"1"}
          text={"Yes"}
        />

        <Radio
          name={"experiment.scoringMethod"}
          id={"experiment.displayMethod"}
          value={"0"}
          text={"No"}
        />
    </div>
  )
}

