"use client";
import { useQuery } from "@tanstack/react-query";

export function useConclusionPhaseConfig(studyID: string | undefined) {
    return useQuery({
        queryKey: ["conclusionPhaseConfig", studyID],
        enabled: !!studyID,
        queryFn: async () => {
            const res = await fetch(`/api/study/export/${studyID}`);
            if (!res.ok) throw new Error("Failed to fetch conclusion phase config");
            const config = await res.json();
            return config.conclusion as { show_results: boolean; has_survey: boolean };
        },
    });
}

// returns string[] and lets caller control "enabled"
export function useSurveyQuestions(
    studyID: string | undefined,
    enabled = true
) {
    return useQuery({
        queryKey: ["surveyQuestions", studyID],
        enabled: !!studyID && enabled,
        queryFn: async () => {
            const res = await fetch(`/api/study/survey/${studyID}`);
            if (!res.ok) throw new Error("Failed to fetch survey questions");
            const data = await res.json(); // { questions: string[] }
            return (data?.questions ?? []) as string[];
        },
    });
}

/** One compositional hook to rule them all */
export function useConclusionPhase(studyID: string | undefined) {
    const configQ = useConclusionPhaseConfig(studyID);

    // Only fetch questions if the survey is enabled
    const questionsQ = useSurveyQuestions(
        studyID,
        configQ.data?.has_survey === true
    );

    const isLoading =
        configQ.isLoading ||
        (!!configQ.data?.has_survey && questionsQ.isLoading);

    const isError = configQ.isError || questionsQ.isError;

    return {
        config: configQ.data,
        questions: questionsQ.data ?? [],
        isLoading,
        isError,
        errors: {
            config: configQ.error,
            questions: questionsQ.error,
        },
    };
}
