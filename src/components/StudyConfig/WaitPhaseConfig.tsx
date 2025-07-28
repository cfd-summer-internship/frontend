"use client";

import DurationInput from "./DurationInput";

export default function WaitPhaseConfig({header}:
    {
        header: string;
    }
) {
  return (
    <div className="flex flex-col items-start w-full px-10 border-b-2 border-stone-800">
      <h2 className="text-lg font-bold pt-4 text-stone-300">{header}</h2>
      <p className="italic text-stone-400 mb-4 text-sm">Set parameters for the waiting phase</p>

      <DurationInput 
        label="Pause Duration:" 
        name="wait.duration" 
        unit="seconds" 
        infinite={false}
        min="0"
        placeholder="0" />
    </div>
  );
}
