"use client";

import { useExperimentPhaseSequence } from "@/utils/experimentPhase/hooks";
import ReusableButton from "@/components/ReusableButton";
import { useState } from "react";
import { motion, AnimatePresence} from "framer-motion";
import ReusableRadio from "@/components/ReusableRadio";


export default function ExperimentPhaseComponent({config}: {
  config: {
    display_duration: number;
    pause_duration: number;
    display_method: string;
    scoring_method: string;
    image_urls: string[]
  };
})
{
  const sequenceData = useExperimentPhaseSequence(config?.image_urls, config);
  const [isLoaded, setIsLoaded] = useState<string | null>(null);

  if (!config?.image_urls || !config) return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900 text-white px-4">
          <span className="loader"></span>
      </div>
  );

  //Recording User Response time
  const start = Date.now();


  const radioConfig=config?.scoring_method;
  var radioScoreBinary;

  if (radioConfig == "binary"){
    {sequenceData?.isManual && !sequenceData?.pauseScreen && 
      (<ReusableRadio 
        name={"experiment.scoringMethod"}
        id={"experiment.displayMethod"}
        value={"yes"}
        onChange={sequenceData?.handleNext}
        checked={true}
        text={"Yes"}
        />
      ) && 
      (
        <ReusableButton
          onClick={sequenceData?.handleNext}
          title={sequenceData?.isLastImage ? "Continue to Conclusion Phase" : "Next"}
        />
      )
      radioScoreBinary=1;
    }
      
    {sequenceData?.isManual && !sequenceData?.pauseScreen && 
      (<ReusableRadio 
          name={"experiment.scoringMethod"}
          id={"experiment.displayMethod"}
          value={"no"}
          onChange={sequenceData?.handleNext}
          checked={true}
          text={"No"}
        />
      ) && 
      (<ReusableButton
          onClick={sequenceData?.handleNext}
          title={sequenceData?.isLastImage ? "Continue to Conclusion Phase" : "Next"}
        />
      )
      radioScoreBinary=0;
    }
  }
          
  if (radioConfig == "gradient"){
    for (var i=0; i<6; i++){
      {sequenceData?.isManual && !sequenceData?.pauseScreen &&
        (<ReusableRadio 
          name={"experiment.scoringMethod"}
          id={"experiment.displayMethod"}
          value={i.toString()}
          onChange={sequenceData?.handleNext}
          checked={true}
          text={i.toString()}
        />
        ) && 
        (<ReusableButton
              onClick={sequenceData?.handleNext}
              title={sequenceData?.isLastImage ? "Continue to Conclusion Phase" : "Next"}
          />
        )
        radioScoreBinary=i;
      }
    }    
  }

  //Calculates User Response Time
  const end = Date.now();
  const responseTime = end - start;
            
  return (
    // wrap in form
      <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900 text-white px-4">
          <AnimatePresence mode="wait">
          {sequenceData?.pauseScreen ? (
              <div className="bg-black" />
          ) : (
                  <motion.img
                      key={sequenceData!.currentImage}
                      src={sequenceData!.currentImage}
                      onLoad={() => setIsLoaded(sequenceData!.currentImage)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isLoaded === sequenceData!.currentImage ? 1 : 0  }}
                      exit={{ opacity: 0 }}
                      decoding="async"
                      loading="eager"
                      transition={{ duration: 0.5 }}
                      className="w-[70vh] h-[60vh] object-contain mb-6"
                  />
          )}
          </AnimatePresence>   
      </div>
      // if binary or gradient
  );
}
