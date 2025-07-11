"use client";

// import { useStudyID } from "@/utils/fileRetrieval/hooks"; // not needed for mock
// import { useLearningPhaseQuery } from "@/utils/learningPhase/hooks"; // not used now
import { useState } from "react";
import ReusableButton from "@/components/ReusableButton";

// Replace this with real image URLs later
const mockImages = [
    "/learning-phase-mock-images/mock-image-1.png",
    "/learning-phase-mock-images/mock-image-2.png",
    "/learning-phase-mock-images/mock-image-3.jpg"
];



export default function LearningPhasePage() {
    // const studyID = useStudyID();
    // const { data, isLoading, isError } = useLearningPhaseQuery(studyID);
    const [currentIndex, setCurrentIndex] = useState(0);


    // if (isLoading) return <div className="text-white">Loading...</div>;
    // if (isError || !data) return <div className="text-red-500">Error loading images.</div>;

    const handleNext = () => {
        if (currentIndex < mockImages.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            window.location.href = "/study/waitPhase";
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900 text-white px-4">
            <img
                src={mockImages[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="w-[80vh] h-[50vh] object-contain mb-6 rounded mb-20"
            />


                <ReusableButton
                    title={
                        currentIndex < mockImages.length - 1
                            ? "Next"
                            : "Continue to Wait Phase"
                    }
                    onClick={handleNext}
                />

        </div>
    );
}
