"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Acknowledgement({route, children}:{route:string, children: React.ReactNode}) {
    const [acknowledged, setAcknowledged] = useState<boolean>(false);
    const router = useRouter();
    return (
        <div>
            <div className="flex flex-row items-center justify-center">
                <input type="checkbox" checked={acknowledged} onChange={(e) => setAcknowledged(e.target.checked)} className="mr-4"></input>
                <span className="text-stone-300">{children}</span>
            </div>
            <div className="flex flex-row items-center justify-center my-4">
                <button disabled={!acknowledged} className={`text-stone-300 py-2 px-4 mx-3 rounded-lg 
          ${acknowledged ? 'bg-emerald-700' : 'bg-stone-700 cursor-not-allowed'}`}
                    onClick={() => router.push(route)}>Acknowledge</button>
                <button
                    className="bg-stone-700 text-stone-300 py-2 px-4 mx-3 rounded-lg"
                    onClick={() => router.push("/")}>
                    Cancel
                </button>
            </div>
        </div>
    )
}