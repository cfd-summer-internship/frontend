"use client";

import { usePhaseSequence } from "@/utils/imageDisplay/hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScoringComponent from "./Scoring";
import z from "zod";

type ImageItem = { id: string; url: string };

export default function ImageDisplayComponent({ config, nextPhaseName, nextPhaseRoute }: {
    config: {
        display_duration: number;
        pause_duration: number;
        display_method: string;
        response_method: string | null;
        image_ids: string[]
        images: string[]
    },
    nextPhaseRoute: string,
    nextPhaseName: string
}) {

    const sequenceData = usePhaseSequence(config?.images, config?.image_ids, config, nextPhaseRoute);
    const [isLoaded, setIsLoaded] = useState<string | null>(null);

    //Experiment Answer Properties
    const [resetKey, setResetKey] = useState(0);
    const [canContinue, setCanContinue] = useState<boolean | null>(false);
    const [answers, setAnswers] = useState<StudyResponse[]>([]);
    const [start, setStart] = useState(0);
    const formRef = useRef<HTMLFormElement>(null);


    const studyResponseSchema = z.object({
        image_id: z.string(), //Current sends list of URLs with no former reference to image id oop!
        answer: z.number(),
        response_time: z.number()
    }
    );

    type StudyResponse = z.infer<typeof studyResponseSchema>;
    const studyReponseList = z.array(studyResponseSchema).length(config.images.length)

    const handleLoad = () => {
        setIsLoaded(sequenceData!.currentImage.url);
        const now = performance.now();
        setStart(now);
    }

    const handleClick = () => {
        const form = formRef.current;
        if (!form) return;
        const formData = new FormData(form);

        if (!start) return
        const end = performance.now();
        const responseTime = end - start;

        const data = {
            image_id: sequenceData?.currentImage.id,
            answer: Number(formData.get("experiment.scoringMethod")),
            response_time: responseTime
        }
        const validate = studyResponseSchema.safeParse(data);
        if (!validate.success) return;

        setAnswers(prev => {
            const next = [...prev, validate.data];
            if (sequenceData?.isLastImage) {
                const validate = studyReponseList.safeParse(next);
                if (!validate.success) console.error(validate.error.format())
            }
            return next;
        });

        setCanContinue(false);
        formRef.current?.reset();
        setResetKey(s => s + 1);
        sequenceData?.handleNext?.();
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
                        key={sequenceData!.currentImage.id}
                        src={sequenceData!.currentImage.url}
                        onLoad={handleLoad}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isLoaded === sequenceData!.currentImage.url ? 1 : 0 }}
                        exit={{ opacity: 0 }}
                        decoding="async"
                        loading="eager"
                        transition={{ duration: 0.5 }}
                        className="w-[70vh] h-[60vh] object-contain"
                    />
                )}
            </AnimatePresence>

            {config?.response_method &&
                <ScoringComponent
                    ref={formRef}
                    response_method={config?.response_method}
                    reset={resetKey}
                    setCanContinue={setCanContinue}
                />}

            {sequenceData?.isManual && !sequenceData?.pauseScreen && (
                <button
                    className={`text-white px-20 py-3 rounded-lg transition-colors duration-300
                        ${canContinue ? 'bg-emerald-700 hover:bg-emerald-600 hover:cursor-pointer' : 'bg-stone-700 cursor-not-allowed'}`
                    }
                    type="button"
                    form="scoring-form"
                    onClick={handleClick}
                    disabled={!canContinue}
                >{sequenceData?.isLastImage ? `Continue to ${nextPhaseName} phase` : "Next"}</button>
            )}
        </div>
    );
}
