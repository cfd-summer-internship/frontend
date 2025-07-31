import { useQuery } from "@tanstack/react-query";

export function useExperimentPhaseConfig(studyID: string) {
    return useQuery({
        queryKey: ["experimentPhaseConfig", studyID],
        queryFn: async () => {
            const res = await fetch(`/api/study/experiment_phase/${studyID}`);
            if (!res.ok) throw new Error("Failed to fetch experiment phase config");

            const config = await res.json();
            return {
                ...config,
                display_duration: config.display_duration > 0 ? config.display_duration * 1000 : 0,
                pause_duration: config.pause_duration * 1000,
            };
        },
        enabled: !!studyID,
    });
}
