import { useQuery } from "@tanstack/react-query";

export function useExperimentPhaseConfig(studyID: string) {
    return useQuery({
        queryKey: ["experimentPhaseConfig", studyID],
        queryFn: async () => {
            const res = await fetch(`/api/study/experiment_phase/${studyID}`);
            if (!res.ok) throw new Error("Failed to fetch experiment phase config");
            return res.json(); // { display_duration, pause_duration, display_method, image_urls }
        },
        enabled: !!studyID,
    });
}
