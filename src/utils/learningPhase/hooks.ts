import { useQuery } from "@tanstack/react-query";

type LearningPhaseData = {
    images: string[];
};

export const useLearningPhaseQuery = (studyID: string) => {
    return useQuery<LearningPhaseData>({
        queryKey: ["learningPhase", studyID],
        queryFn: async () => {
            const res = await fetch(`/api/study/${studyID}/learning-phase`, {
                method: "GET",
            });

            if (!res.ok) {
                throw new Error("Failed to fetch learning phase data");
            }

            return res.json();
        },
        enabled: !!studyID // Waits until studyID is available
    });
};
