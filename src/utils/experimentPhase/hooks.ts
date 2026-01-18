import { useMutation, useQuery } from "@tanstack/react-query";
import { StudyResponseList } from "@/schemas/studyResponseSchemas";
import { submitAnswers } from ".";
import { apiFetch } from "../api";

export const useSubmitExperimentAnswers = () => {
    return useMutation({
        mutationFn: async ({ studyID, subjectID, answers }: { 
            studyID: string, 
            subjectID: string, 
            answers: StudyResponseList 
        }) => {
            console.log('[mutationFn] firing');
            await submitAnswers(studyID, subjectID, answers)
        },
        retry: 0,  
    });
};

export function useExperimentPhaseConfig(studyID: string) {
    return useQuery({
        queryKey: ["experimentPhaseConfig", studyID],
        queryFn: async () => {
            const res = await apiFetch(`/api/study/experiment_phase/${studyID}`);
            if (!res.ok) throw new Error("Failed to fetch experiment phase config");
            return res.json(); // { display_duration, pause_duration, display_method, scoring_method, image_urls }
        },
        enabled: !!studyID,
    });
}
