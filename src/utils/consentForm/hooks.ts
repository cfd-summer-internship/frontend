import { useQuery } from "@tanstack/react-query";
import { getConsentForm } from ".";

export const useConsentForm = (study_id:string) => {
  const query = useQuery({
    queryKey: ["consentForm", study_id],
    queryFn: async () => {
      return getConsentForm(study_id);
    },
  });;
  return query;
};