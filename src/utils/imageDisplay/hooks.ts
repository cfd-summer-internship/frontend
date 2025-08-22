import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

type ImageItem = { id: string; url: string };

export function zipToImageItems(ids: string[], urls: string[]): ImageItem[] {
    const len = Math.min(ids.length, urls.length); // or enforce equal lengths (see below)
    const out: ImageItem[] = [];
    for (let i = 0; i < len; i++) out.push({ id: ids[i], url: urls[i] });
    return out;
}

export function usePhaseSequence(
    imageList: string[],
    imageIDs:string[],
    config?: { display_duration: number; pause_duration: number; display_method: string },
    nextPhaseRoute: string = "/study/waitPhase" // Default fallback
) {

    const router = useRouter();
    const goToNextPhase = useCallback(() => router.push(nextPhaseRoute), [router, nextPhaseRoute]);

    const imageInfo = useMemo(
        () => zipToImageItems(imageIDs ?? [], imageList ?? []),
        [imageIDs, imageList]
    );

    const fadeDuration=50//ms

    const [currentIndex, setCurrentIndex] = useState(0);
    const [pauseScreen, setPauseScreen] = useState(false);
    const [complete, setComplete] = useState(false);

    const isManual = config?.display_duration === 0;

    const displayTimeMs = config?.display_duration || 0;
    const waitTimeMs = config?.pause_duration || 0;

    // Shuffle image list if display method is random
    // useMemo caches the random list instead of making a random array on each call,
    // recalculates only when imageList changes.
    const orderedImageList = useMemo(() => {
        if (config?.display_method === "random") {
            return [...imageInfo].sort(() => Math.random() - 0.5);
        }
        return imageInfo;
    }, [imageInfo, config?.display_method]);

    // Calculates if the client is on last image to change the button title from "Next" to "Continue to wait phase"
    const isLastImage = currentIndex === orderedImageList?.length - 1;
    const handleNext = () => {
        if (currentIndex < orderedImageList.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };


    // Auto advance logic only for non-manual mode
    //handles both pause and display duration
    useEffect(() => {
        if (isManual) return;

        let timer: NodeJS.Timeout;

        if (pauseScreen) {
            timer = setTimeout(() => setPauseScreen(false), waitTimeMs);
        } else {
            timer = setTimeout(() => {
                if (currentIndex < orderedImageList?.length - 1) {
                    setPauseScreen(true);
                    setCurrentIndex(prev => prev + 1);
                } else if (orderedImageList?.length > 1) {
                    setComplete(true);
                }
            }, displayTimeMs + fadeDuration);
        }

        return () => clearTimeout(timer);
    }, [currentIndex, pauseScreen, isManual, displayTimeMs, waitTimeMs, orderedImageList,config?.display_duration,goToNextPhase]);

    return orderedImageList?.length === 0 || !config
        ? null
        : {
            currentImage: orderedImageList[currentIndex],
            pauseScreen,
            isManual,
            isLastImage,
            handleNext,
            complete,
            goToNextPhase
        };
}