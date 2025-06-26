"use client";

interface LearningPhaseProps {header: string}

export default function LearningPhaseConfig({ header }: LearningPhaseProps) {
  return (
    <div className="flex flex-col items-start w-full px-10">
      <h2 className="text-lg font-bold py-4 text-stone-300">{header}</h2>
      <p className="italic text-stone-400 mb-2 text-sm">Set parameters for the learning phase</p>

      <div className="flex flex-row items-center mb-4">
        <span className="text-md text-stone-300 mr-4 w-64">Display Duration (seconds): </span>
        <input
          className="bg-stone-800 w-16 pl-2 text-stone-300 rounded-sm"
          type= "number"
          min="1"
          placeholder="1"
          name="learning.displayDuration"
        />
      </div>

      <div className="flex flex-row items-center mb-4">
        <span className="text-md text-stone-300 mr-4 w-64">Pause Duration (seconds): </span>
        <input
          className="bg-stone-800 w-16 pl-2 text-stone-300 rounded-sm"
          type="number"
          min="1"
          placeholder="1"
          name="learning.pauseDuration"
        />
      </div>

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
    </div>
  );
}
