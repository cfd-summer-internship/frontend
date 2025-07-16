"use client";

import { useLearningPhaseSequence } from "@/utils/learningPhase/useLearningPhaseSequence";
import ReusableButton from "@/components/ReusableButton";

export default function LearningPhaseComponent({ imageList, config }: {
    imageList: string[];
    config: { display_duration: number; pause_duration: number; display_method: string };
}) {
    const {
        currentImage,
        pauseScreen,
        isManual,
        isLastImage,
        handleNext
    } = useLearningPhaseSequence(imageList, config);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900 text-white px-4">
            {pauseScreen ? (
                <div className="bg-black" />
            ) : (
                <img
                    src={currentImage}
                    alt="Slide"
                    className="w-[70vh] h-[60vh] object-contain mb-6"
                />
            )}

            {isManual && !pauseScreen && (
                <ReusableButton
                    onClick={handleNext}
                    title={isLastImage ? "Continue to wait Phase" : "Next"}
                />
            )}
        </div>
    );
}
