

export default function ExperimentPhaseConfig(){
 

  return(
    <div className="flex flex-col items-start w-full px-10">
      <h2 className="text-lg font-bold py-4 text-stone-300">Experiment Phase Configuration</h2>
      <span className="text-md italic text-stone-300 mb-4">Set parameters for the experiment phase: </span>

      <div className="flex flex-row items-center mb-4">
        <span className="text-md text-stone-300 mr-4">Display Duration (seconds): </span>
        <input className="bg-stone-800 w-12 pl-2 text-stone-300 rounded-sm" type="number" min="1" placeholder="1" name="experiment.displayDuration"></input>
      </div>

      <div className="flex flex-row items-center mb-4">
        <span className="text-md text-stone-300 mr-4">Pause Duration (seconds): </span>
        <input className="bg-stone-800 w-12 pl-2 text-stone-300 rounded-sm" type="number" min="1" placeholder="1" name="experiment.pauseDuration"></input>
      </div>

      <div className="flex flex-row items-center mb-4">
        <span className="text-md text-stone-300 mr-4">Display Method: </span>
        <input type="radio" value="sequential" name="experiment.displayMethod"></input>
        <label htmlFor="experiment.displayMethod" className="text-stone-300 text-md mx-2">Sequential</label>
        <input type="radio" value="random" name="experiment.displayMethod"></input>
        <label htmlFor="experiment.displayMethod" className="text-stone-300 text-md mx-2">Random</label>
      </div>

      <div className="flex flex-row items-center mb-4">
        <span className="text-md text-stone-300 mr-4">Scoring Method: </span>
        <input type="radio" value="binary" name="experiment.scoringMethod"></input>
        <label htmlFor="experiment.displayMethod" className="text-stone-300 text-md mx-2">Binary</label>
        <input type="radio" value="gradient" name="experiment.scoringMethod"></input>
        <label htmlFor="experiment.displayMethod" className="text-stone-300 text-md mx-2">Gradient</label>
      </div>
    </div>
  )
}