"use client";

import { ResearcherResults } from "@/schemas/dashSchemas";
import { tokenAtom } from "@/utils/auth/store";
import { useStaffSearchResultsMutation } from "@/utils/dash/staff/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { SyntheticEvent, useState } from "react";
import z from "zod";
import ResearcherResultsView from "../Researcher/ResearcherResultsView";

export default function StaffSearchView() {
  const token = useAtomValue(tokenAtom);
  const queryClient = useQueryClient();
  const searchResults = useStaffSearchResultsMutation();
  const [results, setResults] = useState<ResearcherResults[]>();

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault();

    const emailSchema = z.string().email({ message: "Invalid email address" });

    //Take in Form Data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const parsedEmail = emailSchema.safeParse(formData.get("email"));
    if (!parsedEmail.success) return;
    const results = await searchResults.mutateAsync({token:token, email:parsedEmail.data});

  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col text-center justify-center text-stone-300">
          <span className="font-bold text-2xl pt-8">Researchers</span>
          <span className="text-md pb-2">
            <p className="pb-4">Search</p>
          </span>
        </div>
        <div className="pt-4">
          {/* <select name="category">
          <option value="Email">Email</option>
          <option value="ID"> </option>
        </select> */}
          {/* <span className="text-stone-300 text-xl">Search: </span> */}
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
