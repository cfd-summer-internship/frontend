"use client";

import { SyntheticEvent, useEffect, useRef, useState } from "react";
import StaffImageView from "@/components/Dashboard/Staff/ImageView";
import { isAuthenticatedAtom, tokenAtom } from "@/utils/auth/store";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import StaffSearchView from "@/components/Dashboard/Staff/StaffSearchView";
import {
  useStaffSearchConfigsMutation,
  useStaffSearchResultsMutation,
} from "@/utils/dash/staff/hooks";
import z from "zod";
import { ResultsView } from "@/components/Dashboard/ResultsView";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import ConfigView from "@/components/Dashboard/ConfigView";
import { ResearcherConfig, ResearcherResults } from "@/schemas/dashSchemas";
import DropDown from "@/components/UI/dropDown";
import { logout } from "@/utils/auth";
import { apiFetch } from "@/utils/api";

export default function StaffDashboard() {
  const router = useRouter();
  const authenticated = useAtomValue(isAuthenticatedAtom);
  const token = useAtomValue(tokenAtom);

  const [defaultResults, setDefaultResults] = useState<ResearcherResults[]>();
  const [defaultConfigs, setDefaultConfigs] = useState<ResearcherConfig[]>();

  const [lastResults, setLastResults] = useState<ResearcherResults[]>();
  const [lastConfigs, setLastConfigs] = useState<ResearcherConfig[]>();

  const [activeTab, setActiveTab] = useState<"images" | "researchers">(
    "researchers"
  );

  const [researcherTab, setResearcherTab] = useState<
    "records" | "config" | "results"
  >("records");

  const [defaultUser, setDefaultUser] = useState("");
  const [activeEmail, setActiveEmail] = useState("");

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

  const formRef = useRef<HTMLFormElement>(null);

  // const { mutateAsync, data, error, status } = useStaffSearchResultsMutation();
  const resultsSearch = useStaffSearchResultsMutation();
  const configSearch = useStaffSearchConfigsMutation();

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault();

    const emailSchema = z.string().email({ message: "Invalid email address" });

    //Take in Form Data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const parsedEmail = emailSchema.safeParse(formData.get("email"));
    if (!parsedEmail.success) return;

    const done = () => {
      formRef.current?.reset();
      setLoginOpen(false);
      setActiveEmail(parsedEmail.data);
      setResearcherTab("results");
    };

    resultsSearch.mutate(
      { token: token, email: parsedEmail.data },
      {
        onSuccess: (data) => {
          setLastResults(data);
          done();
        },
      }
    );
    configSearch.mutate(
      { token: token, email: parsedEmail.data },
      {
        onSuccess: (data) => {
          setLastConfigs(data);
          done();
        },
      }
    );
  }

  //On Page Load
  useEffect(() => {
    if (currentUserEmail && token) {
      resultsSearch.mutate(
        { token: token, email: currentUserEmail },
        {
          onSuccess: (data) => {
            setLastResults(data);
            setDefaultResults(data);
          },
        }
      );
      configSearch.mutate(
        { token: token, email: currentUserEmail },
        {
          onSuccess: (data) => {
            setLastConfigs(data);
            setDefaultConfigs(data);
          },
        }
      );
      setActiveEmail(currentUserEmail);
      setDefaultUser(currentUserEmail);
    }
  }, [
    currentUserEmail,
    token,
    resultsSearch.mutate,
    configSearch.mutate,
    setActiveEmail,
    setDefaultUser,
    setLastResults,
    setDefaultResults,
    setLastConfigs,
    setDefaultConfigs,
  ]);

  async function handleClose() {
    setActiveEmail(defaultUser);
    setLastResults(defaultResults);
    setLastConfigs(defaultConfigs);

    setLoginOpen(false);
    setResearcherTab("records");
  }

  async function handleLogout() {
    await logout(token);
    router.replace("/login");
  }

  useEffect(() => {
    if (!authenticated) {
      router.replace("/login");
    }
  }, [authenticated, router]);

  if (!authenticated) {
    return null;
  }

  return (
    <div className="flex flex-wrap h-screen">
      <div className="min-w-50 w-1/8 px-2 sticky top-0 bg-stone-800">
        <div className="flex text-center justify-center text-stone-300 font-bold text-xl pt-4 pb-2">
          Staff Dashboard
        </div>
        <div className="border-b-2 border-stone-600"></div>
        <div className="flex flex-col text-stone-300 text-md px-4 py-1">
          <button
            onClick={() => setActiveTab("images")}
            className="hover:cursor-pointer hover:text-stone-200 text-left"
          >
            Images
          </button>
          <button
            onClick={() => {
              setResearcherTab("records");
              setActiveTab("researchers");
            }}
            className="hover:cursor-pointer hover:text-stone-200 text-left"
          >
            Records
          </button>
          <div className="flex flex-col ml-4">
            <button
              onClick={() => {
                setResearcherTab("config");
                setActiveTab("researchers");
              }}
              className="hover:cursor-pointer hover:text-stone-200 text-left"
            >
              Configuration
            </button>
            <button
              onClick={() => {
                setResearcherTab("results");
                setActiveTab("researchers");
              }}
              className="hover:cursor-pointer hover:text-stone-200 text-left"
            >
              Results
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="flex flex-row ml-auto items-center text-stone-300 mt-2 ml-4 text-sm w-fit p-3">
          <DropDown
            menuText={activeEmail}
            onLogout={handleLogout}
            open={loginOpen}
            setOpen={setLoginOpen}
          />
          {activeEmail !== defaultUser && (
            <button
              className="flex hover:cursor-pointer hover:text-stone-200"
              onClick={() => handleClose()}
            >
              <X className="mx-2 w-4" />
            </button>
          )}
        </div>
        {activeTab === "images" && <StaffImageView />}
        {activeTab === "researchers" && (
          <div className="flex text-center justify-center">
            <div className="flex-1 overflow-auto">
              {researcherTab === "records" && (
                <>
                  <StaffSearchView ref={formRef} handleSubmit={handleSubmit} />
                  {resultsSearch.isError && (
                    <div className="text-red-500 italic pt-4 text-center">
                      Error: {resultsSearch.error.message}
                    </div>
                  )}
                </>
              )}
              {researcherTab === "config" && (
                <ConfigView
                  rows={lastConfigs}
                  isLoading={false}
                  isError={false}
                  error={undefined}
                  onDelete={() => {
                    // Re-fetch the current active user's results
                    configSearch.mutate(
                      { token: token, email: currentUserEmail },
                      {
                        onSuccess: (data) => {
                          setLastConfigs(data);
                          setDefaultConfigs(data);
                        },
                      }
                    );
                  }}
                />
              )}
              {researcherTab === "results" && (
                <ResultsView
                  rows={lastResults}
                  isLoading={false}
                  isError={false}
                  error={undefined}
                  onDelete={() => {
                    // Re-fetch the current active user's results
                    resultsSearch.mutate(
                      { token: token, email: currentUserEmail },
                      {
                        onSuccess: (data) => {
                          setLastResults(data);
                          setDefaultResults(data);
                        },
                      }
                    );
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
