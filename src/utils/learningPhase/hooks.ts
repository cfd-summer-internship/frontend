import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export function usePhaseSequence(imageList: string[], config?: { display_duration: number; pause_duration: number; display_method: string }) {
    const router = useRouter();
    // routing variable just to make it cleaner
    const goToNextPhase = useCallback(() => router.push("/study/waitPhase"), [router]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [pauseScreen, setPauseScreen] = useState(false);

    const isManual = config?.pause_duration === 0;
    const waitTimeMs = config?.pause_duration || 0;

    // Shuffle image list if display method is random
    // useMemo caches the random list instead of making a random array on each call,
    // recalculates only when imageList changes.
    const orderedImageList = useMemo(() => {
        if (config?.display_method === "random") {
            return [...imageList].sort(() => Math.random() - 0.5);
        }
        return imageList;
    }, [imageList, config?.display_method]);

    // Calculates if the client is on last image to change the button title from "Next" to "Continue to wait phase"
    const isLastImage = currentIndex === orderedImageList?.length - 1;
    const handleNext = () => {
        if (currentIndex < orderedImageList.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else if (orderedImageList?.length > 1) {
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
                if (currentIndex < orderedImageList?.length - 1) {
                    setPauseScreen(true);
                    setCurrentIndex(prev => prev + 1);
                } else if (orderedImageList?.length > 1) {
                    goToNextPhase();
                }
            }, config?.display_duration);
        }

        return () => clearTimeout(timer);
    }, [currentIndex, pauseScreen, isManual, waitTimeMs, orderedImageList,config?.display_duration,goToNextPhase]);

    return orderedImageList?.length === 0 || !config
        ? null
        : {
            currentImage: orderedImageList[currentIndex],
            pauseScreen,
            isManual,
            isLastImage,
            handleNext
        };
}

export function useLearningPhaseConfig(studyID: string) {
    return useQuery({
        queryKey: ["learningPhaseConfig", studyID],
        queryFn: async () => {
            const res = await fetch(`/api/study/learning_phase/${studyID}`);
            if (!res.ok) throw new Error("Failed to fetch learning phase config");
            return res.json(); // { display_duration, pause_duration, display_method, image_urls }
        },
        enabled: !!studyID,
    });
}
