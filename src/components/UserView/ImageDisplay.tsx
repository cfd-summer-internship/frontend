"use client";

import { usePhaseSequence } from "@/utils/imageDisplay/hooks";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScoringComponent from "./Scoring";
import { studyReponseListSchema, StudyResponse, studyResponseSchema } from "@/schemas/studyResponseSchemas";
import { useSubmitExperimentAnswers } from "@/utils/experimentPhase/hooks";

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

    const fadeDuration=50;//ms

    const sequenceData = usePhaseSequence(config?.images, config?.image_ids, config, nextPhaseRoute);
    const [isLoaded, setIsLoaded] = useState<string | null>(null);

    //Experiment Answer Properties
    //const [resetKey, setResetKey] = useState(0);
    const resetKey = useRef(0);
    const [canContinue, setCanContinue] = useState<boolean | null>(false);

    const answersRef = useRef<StudyResponse[]>([]);

    const [start, setStart] = useState(0);
    const formRef = useRef<HTMLFormElement>(null);

    const timerRef = useRef<number[]>([]);

    const submitAnswers = useSubmitExperimentAnswers();
    const hasSubmited = useRef(false);

    useEffect(() => {
        if (!sequenceData?.pauseScreen) return
        const form = formRef.current;
        if (!form) return;
        const formData = new FormData(form);

        const formValue = formData.get("experiment.scoringMethod");
        let submitted = -1
        if (formValue) {
            submitted = Number(formData.get("experiment.scoringMethod"));
        }
        resetKey.current++;
        // formRef.current?.reset();
        // setResetKey(s => s + 1);

        let responseTime = 0;

        if (timerRef.current.length <= 0) {
            const end = performance.now();
            responseTime = end - start;
        }
        else {
            responseTime = timerRef.current.reduce((acc, val) => acc + val, 0);
        }

        const data = {
            image_id: sequenceData?.currentImage.id,
            answer: submitted,
            response_time: responseTime
        }

        const validate = studyResponseSchema.safeParse(data);
        if (!validate.success) return;

        const next = [...answersRef.current, validate.data];
        answersRef.current = next;
        timerRef.current = [];

    }), [sequenceData?.currentImage.id]

    useEffect(() => {
        if (sequenceData?.isManual) return
        if (canContinue == false) return

        const end = performance.now();
        const responseTime = end - start;

        const next = [...timerRef.current, responseTime];
        timerRef.current = next;

        const now = performance.now();
        setStart(now);

        console.log(timerRef.current)
        setCanContinue(false);

    }), [canContinue]

    const handleLoad = () => {
        setIsLoaded(sequenceData!.currentImage.url);
        const now = performance.now();
        setStart(now);
    }

    useEffect(() =>{
        if(!sequenceData?.complete) return
        if (hasSubmited.current) return

        const form = formRef.current;
        if (!form) return;
        const formData = new FormData(form);

        const formValue = formData.get("experiment.scoringMethod");
        let submitted = -1
        if (formValue) {
            submitted = Number(formData.get("experiment.scoringMethod"));
        }
        formRef.current?.reset();

        let responseTime = 0;

        if (timerRef.current.length <= 0) {
            const end = performance.now();
            responseTime = end - start;
        }
        else {
            responseTime = timerRef.current.reduce((acc, val) => acc + val, 0);
        }

        const data = {
            image_id: sequenceData?.currentImage.id,
            answer: submitted,
            response_time: responseTime
        }

        const validate = studyResponseSchema.safeParse(data);
        if (!validate.success) return;

        const next = [...answersRef.current, validate.data];
        answersRef.current = next;
        timerRef.current = [];

        const validateList = studyReponseListSchema.safeParse(answersRef.current);

        if (!validateList.success) console.error(validateList.error.format());

        const studyID = localStorage.getItem("localStudyID")
        const subjectID = localStorage.getItem("subjectID");

        console.log(answersRef.current);

        if (!subjectID || !studyID) throw new Error("Missing Required Information");
        submitAnswers.mutate({ studyID: studyID, subjectID: subjectID, answers: answersRef.current },{
            onSuccess(){
                sequenceData.goToNextPhase();
            }
        })
        hasSubmited.current = true;
    }),[sequenceData?.complete]

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

        const next = [...answersRef.current, validate.data];
        answersRef.current = next;

        if (sequenceData?.isLastImage) {
            const validate = studyReponseListSchema.safeParse(next);

            if (!validate.success) console.error(validate.error.format());

            const studyID = localStorage.getItem("localStudyID")
            const subjectID = localStorage.getItem("subjectID");

            if (!subjectID || !studyID) throw new Error("Missing Required Information");
            console.log(next)
            submitAnswers.mutate({ studyID: studyID, subjectID: subjectID, answers: next }, {
                onSuccess() {
                    // sequenceData?.handleNext?.();
                    sequenceData.goToNextPhase();
                }
            })
        }
        else if (!sequenceData?.isLastImage) {
            setCanContinue(false);
            resetKey.current++;
            // formRef.current?.reset();
            // setResetKey(s => s + 1);
            sequenceData?.handleNext?.();
        }
    };

    if (!config?.images || !config) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900 text-white px-4">
            <span className="loader"></span>
        </div>
    );

    if (submitAnswers.isError) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900 text-red-500 px-4">
            Error Submitting Results, please contact the administrator for help.
        </div>
    )

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
                        transition={{ duration: (fadeDuration/2)/100 }}
                        className="w-[70vh] h-[60vh] object-contain"
                    />
                )}
            </AnimatePresence>

            {config?.response_method &&
            <AnimatePresence mode="wait">
                <motion.div 
                initial={{opacity:0}} 
                animate={{ opacity: isLoaded === sequenceData!.currentImage.url ? 1 : 0 }}
                >
                    <ScoringComponent
                        ref={formRef}
                        response_method={config?.response_method}
                        reset={resetKey.current}
                        setCanContinue={setCanContinue}
                    />
                </motion.div>
                </AnimatePresence>}

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
