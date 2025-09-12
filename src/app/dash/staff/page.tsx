"use client";

import { useEffect, useState } from "react";
import StaffImageView from "@/components/Dashboard/Staff/ImageView";
import { isAuthenticatedAtom } from "@/utils/auth/store";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

export default function StaffDashboard() {
     const router = useRouter();
    const authenticated = useAtomValue(isAuthenticatedAtom);
     const [activeTab, setActiveTab] = useState<"images" | "researchers" | "data">("images");

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
                    <button onClick={() => setActiveTab('images')} className="hover:cursor-pointer text-left">
                        Images
                    </button>
                    <button onClick={() => setActiveTab('researchers')} className="hover:cursor-pointer text-left">
                        Researchers
                    </button>
                    <button onClick={() => setActiveTab('data')} className="hover:cursor-pointer text-left">
                        Data
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-auto">
                {activeTab === "images" && (
                    <StaffImageView />
                )}
                {activeTab === "researchers" && (
                    <div className="flex text-center justify-center">
                        <span className="text-stone-300 font-bold text-2xl pt-8 pb-2">Researchers</span>
                    </div>
                )}
                {activeTab === "data" && (
                    <div className="flex text-center justify-center">
                        <span className="text-stone-300 font-bold text-2xl pt-8 pb-2">Data</span>
                    </div>
                )}
            </div>
        </div>
    );
}