"use client";

import { ResearcherResults } from "@/schemas/dashSchemas";
import { tokenAtom } from "@/utils/auth/store";
import { useStaffSearchResultsMutation } from "@/utils/dash/staff/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { SyntheticEvent, useRef, useState } from "react";
import z from "zod";
import ResearcherResultsView from "../Researcher/ResearcherResultsView";
import { ResultsView } from "../ResultsView";

export default function StaffSearchView({ref, handleSubmit}) {
  const queryClient = useQueryClient();
  return (
    <>
      <form ref={ref} onSubmit={handleSubmit}>
        <div className="flex flex-col text-center justify-center text-stone-300">
          <span className="font-bold text-2xl pt-8">Researchers</span>
          <span className="text-md pb-2">
            <p className="pb-4">Search</p>
          </span>
        </div>
        {/* {isSuccess && (
          <ResultsView
            rows={rows}
            isLoading={false}
            isError={false}
            error={undefined}
          />
        )} */}
        <div className="pt-4">
          <input
            name="email"
            placeholder="Email Address..."
            className="bg-stone-700 text-stone-200 px-8 py-2 rounded-lg placeholder:text-stone-500 focus:outline-none"
          ></input>
          <button
            className="bg-emerald-700 text-stone-300 py-2 px-4 mx-3 rounded-lg"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </>
  );
}
