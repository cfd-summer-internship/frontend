import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getConsentForm } from ".";
import { useEffect, useState } from "react";

export const useStudyID = (): string => {
  const queryClient = useQueryClient();
  const [studyID, setStudyID] = useState<string>("");
  useEffect(() => {
    const cachedID = queryClient.getQueryData<string>(["studyID"]);
    const localID = localStorage.getItem("localStudyID")

    if (cachedID) setStudyID(cachedID);
    else if (localID) setStudyID(localID);

  }, [queryClient]);

  return studyID;
}

export const useConsentForm = (study_id: string) => {
  const query = useQuery({
    queryKey: ["consentForm", study_id],
    queryFn: async () => {
      return getConsentForm(study_id);
    },
    enabled: !!study_id
  });;
  return query;
};