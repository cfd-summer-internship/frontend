"use client";

import { useExportConfig } from "@/utils/configUpload/hooks";
import { useStudyCodeForID } from "@/utils/studyRetrieval/hooks";

export default function ExportButton({ studyCode }: { studyCode: string }) {
    const studyID = useStudyCodeForID(studyCode);
    const config = useExportConfig(studyID.data);

    const handleExport = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!config.data || !studyID.data) return;

        const blob = new Blob([JSON.stringify(config.data, undefined, 2)], { type: 'text/plain' })
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `study-${studyCode}.config`
        a.click();

        URL.revokeObjectURL(url);
    }
    return (
        <button
            className="bg-emerald-700 text-stone-400 py-2 w-1/4 rounded-md hover:bg-emerald-500"
            onClick={handleExport}>
            Export Configuration
        </button>);
}
