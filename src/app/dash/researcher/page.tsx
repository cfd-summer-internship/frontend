"use client";

import { useState } from "react";
import ResearcherConfigView from "@/components/Dashboard/Researcher/ResearcherConfigView";
import { isAuthenticatedAtom, tokenAtom } from "@/utils/auth/store";
import { useAtomValue } from "jotai";
import ResearcherResultsView from "@/components/Dashboard/Researcher/ResearcherResultsView";

export default function ResearcherDashboard() {
    const authenticated = useAtomValue(isAuthenticatedAtom)
    const [activeTab, setActiveTab] = useState<"config" | "results">("config");

    return (
        <div className="flex h-screen">
            <div className="min-w-50 w-1/8 sticky top-0 bg-stone-800">
                <div className="flex text-center justify-center text-stone-300 font-bold text-xl pt-8 pb-2 border-b-2 border-stone-600">
                    Researcher Dashboard
                </div>
                <div className="flex flex-col text-stone-300 text-md px-4 py-1">
                    <button onClick={() => setActiveTab('config')} className="hover:cursor-pointer text-left">
                        Configurations
                    </button>
                </div>
                <div className="flex flex-col text-stone-300 text-md px-4 py-1">
                    <button onClick={() => setActiveTab('results')} className="hover:cursor-pointer text-left">
                        Results
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-auto">
                {activeTab === "config" && (
                    <ResearcherConfigView />
                )}
                {activeTab === "results" && (
                    <ResearcherResultsView />
                )}
            </div>
        </div>
    );
}