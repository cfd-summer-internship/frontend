import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteConfig, getAllStudyResults, getResearcherConfig, getResearcherResults, getStudyResults } from ".";
import { deleteImage } from ".";
import { useAtomValue } from "jotai";
import { tokenAtom } from "@/utils/auth/store";
import { ResearcherConfig, ResearcherResults } from "@/schemas/dashSchemas";

export const useGetResearcherConfig = () => {
  const token = useAtomValue(tokenAtom);
  const query = useQuery<ResearcherConfig, Error>({
    queryKey: ["configs"],
    queryFn: () => getResearcherConfig(token),
  });

  return query;
};

export const useGetResearcherResults = () => {
  const token = useAtomValue(tokenAtom);
  const query = useQuery<ResearcherResults[], Error>({
    queryKey: ["results"],
    queryFn: () => getResearcherResults(token),
  });

  return query;
};

export const useExportResult = (resultsID: string) => {
  const token = useAtomValue(tokenAtom);
  const query = useQuery({
    queryKey: ["resultsID", resultsID],
    queryFn: async () => {
      return getStudyResults(token, resultsID);
    },
    enabled: !!resultsID
  });;
  return query;
}

export const useExportAllResults = () => {
  const token = useAtomValue(tokenAtom);
  const query = useQuery({
    queryKey: ["allResults"],
    queryFn: async () => {
      return getAllStudyResults(token,);
    },
    enabled: false
  });;
  return query;
}

export const useDeleteConfigMutation = () => {
  return useMutation({
    mutationFn: async ({
      token,
      studyCode,
    }: {
      token: string | undefined;
      studyCode: string;
    }) => await deleteConfig(token, studyCode),
  });
};
