"use client";
import { useQuery } from "@tanstack/react-query";

export function useConclusionPhaseConfig(studyID: string) {
    return useQuery({
        queryKey: ["conclusionPhaseConfig", studyID],
        queryFn: async () => {
            const res = await fetch(`/api/study/export/${studyID}`);
            if (!res.ok) throw new Error("Failed to fetch conclusion phase config");
            const config = await res.json();
            return config.conclusion; // { show_results, has_survey }
        },
        enabled: !!studyID,
    });
}

export function useSurveyQuestions(studyID: string) {
    return useQuery({
        queryKey: ["surveyQuestions", studyID],
        queryFn: async () => {
            const res = await fetch(`/api/study/survey/${studyID}`);
            if (!res.ok) throw new Error("Failed to fetch survey questions");
            return res.json();
            /* Example response:
            {
                "questions": [
                    { "id": 1, "text": "How was your experience?" },
                    { "id": 2, "text": "Would you recommend this study?" }
                ]
            }
            */
        },
        enabled: !!studyID,
    });
}
