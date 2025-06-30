"use client";

export default function WaitPhaseConfig({header}:
    {
        header: string;
    }
) {
  return (
    <div className="flex flex-col items-start w-full px-10">
      <h2 className="text-lg font-bold py-4 text-stone-300">{header}</h2>
      <p className="italic text-stone-400 mb-2 text-sm">Set parameters for the waiting phase</p>

      <div className="flex flex-row items-center mb-4">
        <span className="text-md text-stone-300 mr-4 w-64">Display Duration (seconds): </span>
        <input
          className="bg-stone-800 w-16 pl-2 text-stone-300 rounded-sm"
          type= "number"
          min="1"
          placeholder= "1"
          name="wait.duration"
        />
      </div>
    </div>
  );
}
