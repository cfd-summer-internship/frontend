import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function useLearningPhaseSequence(imageList: string[], config: { display_duration: number; pause_duration: number; display_method: string }) {
    const router = useRouter();
    // routing variable just to make it cleaner
    const goToNextPhase = () => router.push("/study/waitPhase");

    const [currentIndex, setCurrentIndex] = useState(0);
    const [pauseScreen, setPauseScreen] = useState(false);

    const isManual = config?.pause_duration === 0;
    const waitTimeMs = config?.pause_duration || 0;


    // Shuffle image list if display method is random
    // useMemo caches the random list instead of making a random array on each call,
    // recalculates only when imageList changes.
    const orderedImageList = useMemo(() => {
        if (config.display_method === "random") {
            return [...imageList].sort(() => Math.random() - 0.5);
        }
        return imageList;
    }, [imageList, config.display_method]);

    // Calculates if the client is on last image to change the button title from "Next" to "Continue to wait phase"
    const isLastImage = currentIndex === orderedImageList.length - 1;




    const handleNext = () => {
        if (currentIndex < orderedImageList.length - 1) {
            setPauseScreen(true);
            setCurrentIndex(prev => prev + 1);
        } else {
            goToNextPhase();
        }
    };

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
                    goToNextPhase();
                }
            }, config.display_duration);
        }

        return () => clearTimeout(timer);
    }, [currentIndex, pauseScreen, isManual, waitTimeMs, orderedImageList]);

    return {
        currentImage: orderedImageList[currentIndex],
        pauseScreen,
        isManual,
        isLastImage,
        handleNext
    };
}
