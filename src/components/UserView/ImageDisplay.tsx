"use client";

import { usePhaseSequence } from "@/utils/imageDisplay/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScoringComponent from "./Scoring";
import {
  StudyResponse,
  studyResponseSchema,
} from "@/schemas/studyResponseSchemas";
import { useSubmitExperimentAnswers } from "@/utils/experimentPhase/hooks";
import z from "zod";
import ErrorDisplay from "./Error";

type Phase = "learning" | "experiment";

/**Helper function that appends values to a ref */
function appendStudyResponse({
  ref,
  imageID,
  answer,
  responseTime,
}: {
  ref: React.RefObject<StudyResponse[]>;
  imageID: string;
  answer: number;
  responseTime: number;
}) {
  const data = {
    image_id: imageID,
    answer: answer,
    response_time: responseTime,
  };

  const validate = studyResponseSchema.safeParse(data);
  if (!validate.success) return;

  const next = [...ref.current, validate.data];
  ref.current = next;
}

/**Helper function to grab form data via a ref*/
function getFormData({
  ref,
  formName,
}: {
  ref: React.RefObject<HTMLFormElement | null>;
  formName: string;
}) {
  if (!ref) return;
  const form = ref.current;
  if (!form) return;
  const formData = new FormData(form);
  const formValue = formData.get(formName);
  return formValue;
}

/**Helper function that ends the current timer and returns the time elapsed */
function endTimer(start: number) {
  const end = performance.now();
  return end - start;
}

export default function ImageDisplayComponent({
  config,
  nextPhaseName,
  nextPhaseRoute,
  currentPhase,
}: {
  config: {
    display_duration: number;
    pause_duration: number;
    display_method: string;
    response_method: string | null;
    image_ids: string[];
    images: string[];
  };
  nextPhaseRoute: string;
  nextPhaseName: string;
  currentPhase: Phase;
}) {
  const fadeDuration = 50; //ms

  const sequenceData = usePhaseSequence(
    config?.images,
    config?.image_ids,
    config,
    nextPhaseRoute
  );
  const [isLoaded, setIsLoaded] = useState<string | null>(null);

  //Experiment Answer Properties
  const resetKey = useRef(0);
  const [canContinue, setCanContinue] = useState<boolean | null>(false);

  const answersRef = useRef<StudyResponse[]>([]);

  const [start, setStart] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const timerRef = useRef<number[]>([]);

  const submitAnswers = useSubmitExperimentAnswers();
  const hasSubmited = useRef(false);

  const submittedKey = useRef("");

  const studyReponseList = z
    .array(studyResponseSchema)
    .length(config?.image_ids.length);

  /** Helper Function to append study resonses when in auto mode  */
  const autoAppendResponse = useCallback(() => {
    if (currentPhase === "learning") return;
    const formValue = getFormData({
      ref: formRef,
      formName: "experiment.scoringMethod",
    });
    const submitted = !formValue ? -1 : Number(formValue);
    resetKey.current++;

    const responseTime =
      timerRef.current.length <= 0
        ? 0
        : timerRef.current.reduce((acc, val) => acc + val, 0);
    appendStudyResponse({
      ref: answersRef,
      imageID: sequenceData!.currentImage.id,
      answer: submitted,
      responseTime: responseTime,
    });
    timerRef.current = [];
    console.log(answersRef.current);
  }, [formRef, resetKey, timerRef, answersRef, sequenceData, currentPhase]);

  /** Helper Function to Submit Study Results*/
  const submitResults = useCallback(() => {
    if (currentPhase === "learning") {
      sequenceData?.goToNextPhase();
      return;
    }
    const validateList = studyReponseList.safeParse(answersRef.current);
    if (!validateList.success) console.error(validateList.error.format());

    const studyID = localStorage.getItem("localStudyID");
    const subjectID = localStorage.getItem("subjectID");

    if (!subjectID || !studyID) throw new Error("Missing Required Information");
    console.log(answersRef.current);
    submitAnswers.mutate(
      { studyID: studyID, subjectID: subjectID, answers: answersRef.current },
      {
        onSuccess() {
          sequenceData?.goToNextPhase();
        },
      }
    );
  }, [studyReponseList, submitAnswers, sequenceData, currentPhase]);

  /** Handles Appending Responses when in auto mode */
  useEffect(() => {
    if (!sequenceData?.pauseScreen) return;
    if (submittedKey.current === sequenceData?.currentImage.id) return;
    autoAppendResponse();
    submittedKey.current = sequenceData?.currentImage.id;
  }, [
    sequenceData?.currentImage.id,
    sequenceData?.pauseScreen,
    submittedKey,
    autoAppendResponse,
  ]);

  /** Gets Reaction Time for Multiple Answers */
  useEffect(() => {
    if (sequenceData?.isManual) return;
    if (canContinue == false) return;

    const responseTime = endTimer(start);
    const next = [...timerRef.current, responseTime];
    timerRef.current = next;

    const now = performance.now();
    setStart(now);

    setCanContinue(false);
  }, [sequenceData, sequenceData?.isManual, canContinue, start]);

  /** Handles Result Submission when in auto mode */
  useEffect(() => {
    if (!sequenceData?.complete) return;
    if (submittedKey.current === sequenceData?.currentImage.id) return;
    if (hasSubmited.current) return;

    autoAppendResponse();
    submitResults();

    hasSubmited.current = true;
  }, [
    sequenceData?.complete,
    sequenceData?.currentImage.id,
    submitResults,
    autoAppendResponse,
  ]);

  /** Fires whenever the image is fully loaded */
  const handleLoad = () => {
    setIsLoaded(sequenceData!.currentImage.url);
    const now = performance.now();
    setStart(now);
    submittedKey.current = "";
  };

  /** Handles Study Responses when in manual mode */
  const handleClick = () => {
    const formValue = getFormData({
      ref: formRef,
      formName: "experiment.scoringMethod",
    });
    const submitted = !formValue ? -1 : Number(formValue);
    const responseTime = endTimer(start);
    appendStudyResponse({
      ref: answersRef,
      imageID: sequenceData!.currentImage.id,
      answer: submitted,
      responseTime: responseTime,
    });
    if (!sequenceData?.isLastImage) {
      setCanContinue(false);
      resetKey.current++;
      sequenceData?.handleNext?.();
      return;
    }

    submitResults();
  };

  if (!config?.images || !config)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900 text-white px-4">
        <span className="loader"></span>
      </div>
    );

  if (submitAnswers.isError) return <ErrorDisplay />;

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
            animate={{
              opacity: isLoaded === sequenceData!.currentImage.url ? 1 : 0,
            }}
            exit={{ opacity: 0 }}
            decoding="async"
            loading="eager"
            transition={{ duration: fadeDuration / 2 / 100 }}
            className="w-[70vh] h-[60vh] object-contain"
          />
        )}
      </AnimatePresence>

      {config?.response_method && (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: isLoaded === sequenceData!.currentImage.url ? 1 : 0,
            }}
          >
            <ScoringComponent
              ref={formRef}
              response_method={config?.response_method}
              reset={resetKey.current}
              setCanContinue={setCanContinue}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {sequenceData?.isManual && !sequenceData?.pauseScreen && (
        <button
          className={`text-white px-20 py-3 rounded-lg transition-colors duration-300
                        ${
                          canContinue || currentPhase !== "experiment"
                            ? "bg-emerald-700 hover:bg-emerald-600 hover:cursor-pointer"
                            : "bg-stone-700 cursor-not-allowed"
                        }`}
          type="button"
          form="scoring-form"
          onClick={handleClick}
          disabled={currentPhase === "experiment" ? !canContinue : undefined}
        >
          {sequenceData?.isLastImage
            ? `Continue to ${nextPhaseName} phase`
            : "Next"}
        </button>
      )}
    </div>
  );
}
