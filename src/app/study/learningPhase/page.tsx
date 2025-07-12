'use client';

import { useEffect, useState } from 'react';
import { useLearningImageList, useLearningPhaseConfig } from '@/utils/learningPhase/hooks';
import { useStudyID } from '@/utils/fileRetrieval/hooks';
import { useRouter } from "next/navigation";
import ReusableButton from "@/components/ReusableButton";


export default function LearningPhasePage() {
    //Page Routing
    const router = useRouter()
    const studyID = useStudyID();
    //Reference to custom learning phase hook
    const { data: imageList, isLoading: loadingImages } = useLearningImageList(studyID);
    const { data: config, isLoading: loadingConfig } = useLearningPhaseConfig(studyID);

    const [currentIndex, setCurrentIndex] = useState(0);

    // Check if there is a pause duration
    const isManual = config?.pause_duration === 0;
    const waitTimeMs = config?.pause_duration || 0;

    useEffect(() => {
        if (!isManual && imageList && currentIndex < imageList.length - 1) {
            const timer = setTimeout(() => setCurrentIndex(prev => prev + 1), waitTimeMs);
            return () => clearTimeout(timer);
        }
        if (!isManual && imageList && currentIndex === imageList.length - 1) {
            const timer = setTimeout(() => {
                router.push("/study/waitPhase");
            }, waitTimeMs);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, isManual, waitTimeMs, imageList]);

    if (loadingImages || loadingConfig) return <div className="text-white">Loading...</div>;
    if (!imageList || !config) return <div className="text-red-500">Failed to load data.</div>;

    const handleNext = () => {
        if (currentIndex < imageList.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            router.push("/study/waitPhase");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900 text-white px-4">
            <img
                src={imageList[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="w-[70vh] h-[60vh] object-contain mb-6 rounded"
            />

            {isManual && (
                <ReusableButton
                    onClick={handleNext}
                    title={currentIndex < imageList.length - 1 ? 'Next' : 'Continue to Wait Phase'}
                />
            )}
        </div>
    );
}
