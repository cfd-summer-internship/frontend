import { useQuery } from "@tanstack/react-query";

export function useLearningPhaseConfig(studyID: string) {
    return useQuery({
        queryKey: ["learningPhaseConfig", studyID],
        queryFn: async () => {
            const res = await fetch(`/api/study/learning_phase/${studyID}`);
            if (!res.ok) throw new Error("Failed to fetch learning phase config");

            const config = await res.json();
            return {
                ...config,
                display_duration: config.display_duration > 0 ? config.display_duration : 0,
                pause_duration: config.pause_duration,
            };
        },
        enabled: !!studyID,
    });
}

