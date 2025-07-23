"use client";

import DurationInput from "./DurationInput";
import FileInput from "./FileInput";

export default function LearningPhaseConfig({header}:
    {
        header: string;
    }
) {
  return (
    <div className="flex flex-col items-start w-full px-10 border-b-2 border-stone-800">
      <h2 className="text-lg font-bold pt-4 text-stone-300">{header}</h2>
      <p className="italic text-stone-400 mb-4 text-sm">Set parameters for the learning phase</p>

      <DurationInput 
        label="Display Duration:" 
        name="learning.displayDuration" 
        unit="milliseconds" 
        infinite={true}
        min="0"
        placeholder="0" />

      <DurationInput 
        label="Pause Duration:" 
        name="laerning.pauseDuration" 
        unit="milliseconds" 
        infinite={true}
        min="0"
        placeholder="0" />

      <div className="flex flex-row items-center mb-4">
        <span className="text-md text-stone-300 mr-4 w-64">Display Method: </span>
        <div className="flex gap-6">
          <div className="flex items-center">
            <input type="radio" value= "sequential" name="learning.displayMethod" className="mr-1" />
            <label htmlFor="learning.displayMethod" className="text-stone-300 text-md">Sequential</label>
          </div>
          <div className="flex items-center">
            <input type="radio" value="random" name= "learning.displayMethod" className="mr-1" />
            <label htmlFor="learning.displayMethod" className="text-stone-300 text-md">Random</label>
          </div>
        </div>
      </div>
      <FileInput desc="Image List" name="files.learningList" acceptedFileTypes=".csv"></FileInput>
    </div>
  );
}
