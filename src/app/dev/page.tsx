"use client";

import ErrorDisplay from "@/components/UserView/Error";
import { apiFetch } from "@/utils/api";
import { useState } from "react";

export default function TestPage() {
  const [sent, setSent] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleClick = async () => {
    setSent(true);
    const body = { post: "ok" };
    const res = await apiFetch(`/api`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      setSuccess(false);
      throw new Error("Unable to POST");
    }
    setSuccess(true);
    return await res.json();
  };

  return (
    <>
      <div className="flex flex-col min-h-screen w-screen">
        <div className="flex flex-1 items-center justify-center">
          <button
            onClick={handleClick}
            className={`px-5 py-2 rounded-lg 
                ${
                  sent
                    ? `${success ? `bg-emerald-700` : `bg-red-700`}`
                    : `bg-stone-500`
                }`}
          >
            POST
          </button>
        </div>
      </div>
      <ErrorDisplay />
    </>
  );
}
