"use client";

import { useRetrieveFile, useStudyID } from "@/utils/fileRetrieval/hooks";

export default function DisplayFile({fileRequest} : {fileRequest:string}) {
    const studyID = useStudyID();
    const { data: formURL } = useRetrieveFile(studyID, fileRequest);
    return (
        <div className="flex flex-col items-center w-screen mt-10 mb-4">
            <iframe src={formURL} className="w-1/2 min-h-[600px] border-none"></iframe>
        </div>
    )
}