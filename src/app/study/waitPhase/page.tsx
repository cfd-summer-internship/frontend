'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStudyID } from "@/utils/fileRetrieval/hooks";
import { useWaitPhaseConfig } from "@/utils/waitphase/hooks";

export default function WaitPhasePage() {
    const router = useRouter();
    const studyID = useStudyID();
    const { data, isLoading, error } = useWaitPhaseConfig(studyID);

    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    useEffect(() => {
        if (!data?.display_duration) return;

        const initialTime = Math.floor(data.display_duration);
        setTimeLeft(initialTime);

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev === null || prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [data?.display_duration]);

    if (isLoading || timeLeft === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
                <p>Loading wait phase...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-red-500">
                <p>Error: {error.message}</p>
            </div>
        );
    }

    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-neutral-900 text-white px-4">
            <div className="text-6xl font-bold mb-4">{minutes}:{seconds}</div>
            <p className="text-sm mb-8 text-stone-300">
                You may continue when the timer reaches 0:00
            </p>
            <button
                onClick={() => router.push("/study/experimentPhase")}
                disabled={timeLeft !== 0}
                className={`px-6 py-2 rounded text-stone-300 transition 
                    ${timeLeft === 0 ? 'bg-emerald-700 opacity-100 cursor-pointer' : 'bg-stone-700 opacity-30 cursor-not-allowed'}
                `}
            >
                Continue
            </button>
        </div>
    );
}
