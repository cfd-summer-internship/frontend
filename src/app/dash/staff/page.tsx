"use client";

import { useEffect, useState } from "react";
import StaffImageView from "@/components/Dashboard/Staff/ImageView";
import { isAuthenticatedAtom } from "@/utils/auth/store";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import ResearcherConfigView from "@/components/Dashboard/Researcher/ResearcherConfigView";
import ResearcherResultsView from "@/components/Dashboard/Researcher/ResearcherResultsView";

export default function StaffDashboard() {
  const router = useRouter();
  const authenticated = useAtomValue(isAuthenticatedAtom);
  const [activeTab, setActiveTab] = useState<"images" | "researchers" | "data">(
    "images"
  );

  const [researcherTab, setResearcherTab] = useState<"config" | "results">(
    "config"
  );

  useEffect(() => {
    if (!authenticated) {
      router.replace("/login");
    }
  }, [authenticated, router]);

  if (!authenticated) {
    return null;
  }

  return (
    <div className="flex h-screen">
      <div className="min-w-50 w-1/8 sticky top-0 bg-stone-800">
        <div className="flex text-center justify-center text-stone-300 font-bold text-xl pt-8 pb-2 border-b-2 border-stone-600">
          Staff Dashboard
        </div>
        <div className="flex flex-col text-stone-300 text-md px-4 py-1">
          <button
            onClick={() => setActiveTab("images")}
            className="hover:cursor-pointer text-left"
          >
            Images
          </button>
          <span>Researchers</span>
          <div className="flex flex-col ml-4">
            <button
              onClick={() => {
                setResearcherTab("config");
                setActiveTab("researchers");
              }}
              className="hover:cursor-pointer text-left"
            >
              Configuration
            </button>
            <button
              onClick={() => {
                setResearcherTab("results");
                setActiveTab("researchers");
              }}
              className="hover:cursor-pointer text-left"
            >
              Results
            </button>
          </div>
          <button
            onClick={() => setActiveTab("data")}
            className="hover:cursor-pointer text-left"
          >
            Data
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {activeTab === "images" && <StaffImageView />}
        {activeTab === "researchers" && (
          <div className="flex text-center justify-center">
            <div className="flex-1 overflow-auto">
              <div className="pt-4">
                <span className="text-stone-300 font-semibold text-xl">Search: </span>
                <input
                  placeholder="Email Address..."
                  className="bg-stone-700 text-stone-200 px-8 py-2 rounded-lg placeholder:text-stone-500 focus:outline-none"
                ></input>
              </div>
              {researcherTab === "config" && <ResearcherConfigView />}
              {researcherTab === "results" && <ResearcherResultsView />}
            </div>
          </div>
        )}

        {activeTab === "data" && (
          <div className="flex text-center justify-center">
            <span className="text-stone-300 font-bold text-2xl pt-8 pb-2">
              Data
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
