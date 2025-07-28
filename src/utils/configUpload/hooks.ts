import { useMutation, useQuery } from "@tanstack/react-query";
import { getStudyConfig, uploadConfig } from ".";
import { ConfigSettings } from "@/schemas/studyConfigSchemas";

export const useExportConfig = (studyID: string) =>{
  const query = useQuery({
    queryKey: ["studyID", studyID],
    queryFn: async () => {
      return getStudyConfig(studyID);
    },
    enabled:!!studyID
  });;
  return query;
}

//Call this to send config data
export const useConfigUploadMutation = () => {
  return useMutation({
    mutationFn: async (config:ConfigSettings) => await uploadConfig(config),
  });
};