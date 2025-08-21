import { useMutation, useQuery } from "@tanstack/react-query";
import { getResearcherConfig} from ".";
import { deleteImage } from ".";
import { useAtomValue } from "jotai";
import { tokenAtom } from "@/utils/auth/store";
import { ResearcherConfig } from "@/schemas/dashSchemas";
 

export const useGetResearcherConfig = (researcher_id) => {
  const token = useAtomValue(tokenAtom)
  const query = useQuery<ResearcherConfig[], Error>({
    queryKey: ['config'],
    queryFn: () => getResearcherConfig(token, researcher_id),
  });

  return query;
}

export const useDeleteFileMutation = () => {
    return useMutation({
        mutationFn: async ({ token, filename }: { token: string | undefined, filename: string }) => await deleteImage(token, filename)
    });
};
