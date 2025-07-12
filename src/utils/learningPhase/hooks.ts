import { useQuery } from "@tanstack/react-query";

export function useLearningPhaseConfig(studyID: string) {
    return useQuery({
        queryKey: ["learningPhaseConfig", studyID],
        queryFn: async () => {
            const res = await fetch(`/study/learning_phase/${studyID}`);
            if (!res.ok) throw new Error("Failed to fetch learning phase config");
            return res.json(); // { display_duration, pause_duration, display_method }
        },
        enabled: !!studyID,
    });
}

export function useLearningImageList(studyID: string) {
    return useQuery({
        queryKey: ["learningImageList", studyID],
        queryFn: async () => {
            // TODO: Change the fetch endpoint below once the a definite endpoint is defined
            const res = await fetch(`/study/learning_phase_images/${studyID}`); //Assuming the endpoint for now
            if (!res.ok) throw new Error("Failed to fetch image list");
            const text = await res.text(); // text instead of json because we are getting the results as Stream of downloaded CSV
            return text
                .split("\n")
                .map(line => line.trim()) // Remove extra spaces/tabs from each line
                .filter(Boolean);  // Keep only truthy lines (removes "", null, undefined, fasle ...)
        },
        enabled: !!studyID,
    });
}
