"use client";

import { useEffect, useState } from "react";
import ResearcherConfigView from "@/components/Dashboard/Researcher/ResearcherConfigView";
import { isAuthenticatedAtom, tokenAtom } from "@/utils/auth/store";
import { useAtomValue } from "jotai";
import ResearcherResultsView from "@/components/Dashboard/Researcher/ResearcherResultsView";
import { useRouter } from "next/navigation";
import DropDown from "@/components/UI/dropDown";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/utils/auth";
import { apiFetch } from "@/utils/api";

export default function ResearcherDashboard() {
  const router = useRouter();
  const authenticated = useAtomValue(isAuthenticatedAtom);
  const [activeTab, setActiveTab] = useState<"config" | "results">("config");
  const token = useAtomValue(tokenAtom);
  const queryClient = useQueryClient();

  const [loginOpen, setLoginOpen] = useState(false);

  const getCurrentUserEmail = async (token) => {
    const res = await apiFetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.email as string;
  };

  const { data: currentUserEmail = "" } = useQuery({
    queryKey: ["me", token],
    queryFn: () => getCurrentUserEmail(token), // should resolve to a string
    enabled: !!token,
  });

  async function handleLogout() {
    await logout(token);
    router.replace("/login");
  }

  useEffect(() => {
    // Invalidate and refetch when page mounts
    queryClient.invalidateQueries({ queryKey: ["configs"] });
    queryClient.invalidateQueries({ queryKey: ["results"] });
  }, [queryClient]);


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
          Researcher Dashboard
        </div>
        <div className="flex flex-col text-stone-300 text-md px-4 py-1">
          <button
            onClick={() => setActiveTab("config")}
            className="hover:cursor-pointer text-left"
          >
            Configurations
          </button>
        </div>
        <div className="flex flex-col text-stone-300 text-md px-4 py-1">
          <button
            onClick={() => setActiveTab("results")}
            className="hover:cursor-pointer text-left"
          >
            Results
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="flex flex-row ml-auto items-center text-stone-300 mt-2 ml-4 text-sm w-fit p-3">
          <DropDown
            menuText={currentUserEmail}
            onLogout={handleLogout}
            open={loginOpen}
            setOpen={setLoginOpen}
          />
        </div>
        {activeTab === "config" && <ResearcherConfigView />}
        {activeTab === "results" && <ResearcherResultsView />}
      </div>
    </div>
  );
}
