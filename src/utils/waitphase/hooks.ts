import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../api";

export function useWaitPhaseConfig(studyID: string) {
    return useQuery({
        queryKey: ["waitPhaseConfig", studyID],
        queryFn: async () => {
            const res = await apiFetch(`/api/study/waiting_phase/${studyID}`);
            if (!res.ok) throw new Error("Failed to fetch wait phase config");
            return res.json(); // Expected response: { wait_duration, show_spinner, ... }
        },
        enabled: !!studyID,
    });
}
