"use client";

import DurationInput from "./DurationInput";
import FileInput from "./FileInput";

export default function ExperimentPhaseConfig({ header }: { header: string; }) {

  return (
    <div className="flex flex-col items-start w-full px-10 border-b-2 border-stone-800">
      <h2 className="text-lg font-bold pt-4 text-stone-300">{header}</h2>
      <p className="italic text-stone-400 mb-4 text-sm">Set parameters for the experiment phase</p>

      <DurationInput 
        label="Display Duration:" 
        name="experiment.displayDuration" 
        unit="milliseconds" 
        infinite={true}
        min="0"
        placeholder="0" />

      <DurationInput 
        label="Pause Duration:" 
        name="experiment.pauseDuration" 
        unit="milliseconds" 
        infinite={true}
        min="0"
        placeholder="0" />

      <div className="flex flex-row items-center mb-4">
        <span className="text-md text-stone-300 mr-4 w-64">Display Method: </span>
        <div className="flex gap-6">
          <div className="flex items-center">
            <input type="radio" value="sequential" name="experiment.displayMethod" className="mr-1" />
            <label htmlFor="experiment.displayMethod" className="text-stone-300 text-md">Sequential</label>
          </div>
          <div className="flex items-center">
            <input type="radio" value="random" name="experiment.displayMethod" className="mr-1" />
            <label htmlFor="experiment.displayMethod" className="text-stone-300 text-md">Random</label>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center mb-4">
        <span className="text-md text-stone-300 mr-4 w-64">Scoring Method: </span>
        <div className="flex gap-6">
          <div className="flex items-center">
            <input type="radio" value="binary" name="experiment.scoringMethod" className="mr-1" />
            <label htmlFor="experiment.displayMethod" className="text-stone-300 text-md">Binary</label>
          </div>
          <div className="flex items-center">
            <input type="radio" value="gradient" name="experiment.scoringMethod" className="mr-1" />
            <label htmlFor="experiment.displayMethod" className="text-stone-300 text-md">Gradient</label>
          </div>
        </div>
      </div>
      <FileInput desc="Image List" name="files.experimentList" acceptedFileTypes=".csv"></FileInput>
    </div>
  )
}