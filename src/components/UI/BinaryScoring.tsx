"use client";

import { useContext, useState } from "react";
import Radio from "./Radio";
import { RadioContext } from "../UserView/Scoring";

export function BinaryScoring({}){
  const onChange = useContext(RadioContext);
  const [checked] = useState<boolean>(false);

  return(
  <div className="flex flex-row gap-2">
    <Radio 
        name={"experiment.scoringMethod"}
        id={"experiment.displayMethod"}
        value={"1"}
        onChange={onChange}
        checked={checked}
        text={"Yes"}
        />
    
    <Radio 
        name={"experiment.scoringMethod"}
        id={"experiment.displayMethod"}
        value={"0"}
        onChange={onChange}
        checked={checked}
        text={"No"}
      />
    </div>
  )   
}

