"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../api";

type ConclusionPhaseConfig = {
    has_survey: boolean;
};

export function useConclusionPhase(studyID: string | undefined) {
    return useQuery<ConclusionPhaseConfig>({
        queryKey: ["conclusionPhase", studyID],
        enabled: !!studyID,
        queryFn: async () => {
            const res = await apiFetch(`/api/study/export/${studyID}`);
            if (!res.ok) {
                throw new Error("Failed to fetch conclusion phase config");
            }

            const data = await res.json();
            return data.conclusion as ConclusionPhaseConfig;
        },
    });
}
