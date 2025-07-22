"use client";

import { usePhaseSequence } from "@/utils/learningPhase/hooks"
import ReusableButton from "@/components/ReusableButton";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageDisplayComponent({ config }: {
    config: {
        display_duration: number;
        pause_duration: number;
        display_method: string;
        image_urls: string[]
    };
}) {
    const sequenceData = usePhaseSequence(config?.image_urls, config);
    const [isLoaded, setIsLoaded] = useState<string | null>(null);

    if (!config?.image_urls || !config) return (
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
                        className="w-[70vh] h-[60vh] object-contain mb-6"
                    />
            )}
            </AnimatePresence>

            {sequenceData?.isManual && !sequenceData?.pauseScreen && (
                <ReusableButton
                    onClick={sequenceData?.handleNext}
                    title={sequenceData?.isLastImage ? "Continue to wait Phase" : "Next"}
                />
            )}
        </div>
    );
}
