import { useQuery } from "@tanstack/react-query";
import { getStudyID } from ".";

export const useStudyCodeForID = (studyCode: string) =>{
  const query = useQuery({
    queryKey: ["studyCode", studyCode],
    queryFn: async () => {
      return getStudyID(studyCode);
    },
  });;
  return query;
}