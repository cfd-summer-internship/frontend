import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFile } from ".";
import { useEffect, useState } from "react";

//Get Current Cached or Stored Study ID
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

//Helper Function to enforce formatting
function enforceFormatting(str:string){
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2") //Pascal case
    .replace(/\s+/g, "_") //Spaces
    .toLowerCase() 
}

//Retrieve File
export const useRetrieveFile = (studyID: string, fileRequest: string) => {
  const filename = enforceFormatting(fileRequest);
  const query = useQuery({
    queryKey: ["displayFile", filename],
    queryFn: async () => {
      return getFile(studyID, filename);
    },
    enabled: !!studyID
  });;
  return query;
};