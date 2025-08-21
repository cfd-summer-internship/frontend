"use client";

import { Trash2, Pencil, Download } from 'lucide-react';
import { useDeleteFileMutation, useGetResearcherConfig } from "@/utils/dash/researcher/hooks";
import { useAtomValue } from "jotai";
import { tokenAtom } from "@/utils/auth/store";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import ExportButton from '@/components/StudyConfig/ExportButton';


export default function ResearcherResultsView() {
    const [uploading, setUploading] = useState(false);
    const researcher_id = ""; //Needs updating
    const { data: rows= [], isLoading, isError, error} = useGetResearcherConfig(researcher_id);
    // const deleteFile = useDeleteFileMutation();
    const queryClient = useQueryClient();
    const token = useAtomValue(tokenAtom);
    const [studyCode, setStudyCode] = useState<string>("");

    // const handleDelete = (async (filename: string) => {
    //     deleteFile.mutate({ token: token, filename: filename }, {
    //         onSuccess() {
    //             queryClient.invalidateQueries({ queryKey: ['images'] })
    //         }
    //     });

    // });

    // if (isLoading) {
    //     return (
    //         <div className="flex h-screen justify-center items-center">
    //             <span className="loader"></span>
    //         </div>
    //     );
    // }
    // if (isError) {
    //     return (
    //         <div className="flex text-center justify-center text-red-300">
    //             {error.toString()}
    //         </div>
    //     );
    // }
    
    return (
        <>
            <div className="flex flex-col text-center justify-center text-stone-300">
                <span className="font-bold text-2xl pt-8">Results</span>
                <span className="text-md pb-2">
                    <p className="pb-4">Results of your studies.</p>
                    <p className="text-sm italic">Please Note: To add another study, please visit your configuration page.
                        <br /></p>
                </span>
            </div>
            <div className="text-stone-300 pt-4">
                <table className="min-w-full">
                    <thead className="bg-stone-800">
                        <tr>
                            <th>Study Code</th>
                            <th>Subject Id</th>
                            <th>Download</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        <td>Results 1</td>
                        <td>Results 2</td>
                        <td><ExportButton studyCode={studyCode} /></td>
                        <td><button className="hover:text-red-500 hover:cursor-pointer"><Pencil className="w-5"/></button></td>
                        <td><button className="hover:text-red-500 hover:cursor-pointer"><Trash2 className="w-5" /></button></td>
                    </tbody>
                </table>
            </div>
            <div className='flex justify-center'>
                <button type="button" className='bg-stone-800 hover:outline-1 outline-stone-700 rounded-sm text-stone-300 px-8 py-2 mt-21 ml-21'>Export All</button>
            </div>
        </>
    );
}