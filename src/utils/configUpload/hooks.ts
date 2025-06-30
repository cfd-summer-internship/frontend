import { useMutation } from "@tanstack/react-query";
import { uploadConfig } from ".";
import { ConfigSettings } from "@/schemas/studyConfigSchemas";

//Call this to send config data
export const useConfigUploadMutation = () => {
  return useMutation({
    mutationFn: async (config:ConfigSettings) => await uploadConfig(config),
  });
};