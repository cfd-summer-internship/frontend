"use client";

import { usePhaseSequence } from "@/utils/learningPhase/hooks";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScoringComponent from "./Scoring";

export default function ImageDisplayComponent({config,  nextPhaseName, nextPhaseRoute}: {
    config: {
        display_duration: number;
        pause_duration: number;
        display_method: string;
        response_method: string | null;
        images: string[]
    },
    nextPhaseRoute: string,
    nextPhaseName: string
}) {

    const sequenceData = usePhaseSequence(config?.images, config, nextPhaseRoute);
    const [isLoaded, setIsLoaded] = useState<string | null>(null);
    const [canContinue, setCanContinue] = useState<boolean | null>(false);

    const handleClick = () => {
        sequenceData?.handleNext?.();
        setCanContinue(false);
        console.log(canContinue);
    };

    if (!config?.images || !config) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900 text-white px-4">
            <span className="loader"></span>
        </div>
    );

    return (
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
                        className="w-[70vh] h-[60vh] object-contain"
                    />
            )}
            </AnimatePresence>

            {config?.response_method && <ScoringComponent response_method={config?.response_method} setCanContinue={setCanContinue}/>}

            {sequenceData?.isManual && !sequenceData?.pauseScreen && (
                <button
                    className="bg-emerald-700 text-white hover:bg-emerald-600 hover:cursor-pointer px-20 py-3 rounded-lg transition-colors duration-300"
                    type="button"
                    onClick={handleClick}
                    disabled={!canContinue}
                >{sequenceData?.isLastImage ? `Continue to ${nextPhaseName} phase` : "Next"}</button>
            )}
        </div>
    );
}
