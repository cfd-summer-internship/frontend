"use client";

import { useState } from "react";

export default function StaffDashboard() {
    const [activeTab, setActiveTab] = useState<"images" | "researchers" | "data">("images");

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
                <div className="flex text-center justify-center">
                    <span className="text-stone-300 font-bold text-2xl pt-8 pb-2">Images</span>
                </div>
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