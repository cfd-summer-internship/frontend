"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ReusableButton from "@/components/ReusableButton";

export default function LearningPhaseComponent({ imageList, config }: {
    imageList: string[];
    config: { display_duration: number; pause_duration: number; display_method: string };
}) {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pauseScreen, setPauseScreen] = useState(false);

    const isManual = config?.pause_duration === 0;
    const waitTimeMs = config?.pause_duration || 0;

    // Shuffle image list if display method is random
    // useMemo caches the random list instead of making a random array on each call, recalculates only when imageList changes.
    const orderedImageList = useMemo(() => {
        if (config.display_method === "random") {
            return [...imageList].sort(() => Math.random() - 0.5);
        }
        return imageList;
    }, [imageList, config.display_method]);


    //handles both pause and display duration
    useEffect(() => {
        if (isManual) return;

        let timer: NodeJS.Timeout;

        if (pauseScreen) {
            timer = setTimeout(() => setPauseScreen(false), waitTimeMs);
        } else {
            timer = setTimeout(() => {
                if (currentIndex < orderedImageList.length - 1) {
                    setPauseScreen(true);
                    setCurrentIndex(prev => prev + 1);
                } else {
                    router.push("/study/waitPhase");
                }
            }, config.display_duration);
        }

        return () => clearTimeout(timer);
    }, [currentIndex, pauseScreen, isManual, waitTimeMs, orderedImageList]);

    const handleNext = () => {
        if (currentIndex < orderedImageList.length - 1) {
            setPauseScreen(true);
            setCurrentIndex(prev => prev + 1);
        } else {
            router.push("/study/waitPhase");
        }
    };

    // Main rendering component
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900 text-white px-4">
            {pauseScreen ? (
                <div className="bg-black"></div>
            ) : (
                <img
                    src={orderedImageList[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="w-[70vh] h-[60vh] object-contain mb-6"
                />
            )}

            {isManual && !pauseScreen && (
                <ReusableButton
                    onClick={handleNext}
                    title={currentIndex < orderedImageList.length - 1 ? 'Next' : 'Continue to Wait Phase'}
                />
            )}
        </div>
    );
}
