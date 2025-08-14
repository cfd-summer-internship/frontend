"use client";

import { z } from "zod";
import { Trash2 } from 'lucide-react';
import { useDeleteFileMutation, useGetImageData } from "@/utils/dash/staff/hooks";
import { ImageData } from "@/schemas/dashSchemas"
import { useAtomValue } from "jotai";
import { tokenAtom } from "@/utils/auth/store";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";


export default function StaffImageView() {
    const { data: rows = [], isLoading, isError, error } = useGetImageData();
    const deleteFile = useDeleteFileMutation();
    const queryClient = useQueryClient();
    const token = useAtomValue(tokenAtom);

    const handleDelete = (async (filename: string) => {
        deleteFile.mutate({ token: token, filename: filename }, {
            onSuccess() {
                queryClient.invalidateQueries({ queryKey: ['images'] })
            }
        });

    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
    }

    const handleFolderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
    }

    if (isLoading) {
        return (
            <div className="flex h-screen justify-center items-center">
                <span className="loader"></span>
            </div>
        );
    }
    if (isError) {
        return (
            <div className="flex text-center justify-center text-red-300">
                {error.toString()}
            </div>
        );
    }
    return (
        <>
            <div className="flex flex-col text-center justify-center text-stone-300">
                <span className="font-bold text-2xl pt-8">Image Repository</span>
                <span className="text-md pb-2">
                    <p className="pb-4">Manage the Chicago Faces Database Image Repository used for the study configurations.</p>
                    <p className="text-sm italic">Please Note: Changes made here do not affect the main CFD repository which is managed and hosted elsewhere.
                        <br />If images are updated or removed it may have a negative effect
                        on existing configurations.</p>
                </span>
            </div>
            <div className="text-stone-300 pt-4">
                <table className="min-w-full">
                    <thead className="bg-stone-800">
                        <tr>
                            <th>Image Name</th>
                            <th>Date Modified</th>
                            <th>Size</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {rows.map(row => (
                            <tr key={row.filename}>
                                <td>{row.filename}</td>
                                <td> {new Date(row.last_modified).toLocaleString()} </td>
                                <td>{(row.size / 1024 / 1024).toFixed(2)} mb</td>
                                <td>
                                    <button className="hover:text-red-500 hover:cursor-pointer" onClick={() => handleDelete(row.filename)}><Trash2 className="w-4" /></button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                <div className="flex flex-row gap-2 pt-3 justify-end">
                    <label
                        className="px-4 py-2 bg-emerald-700 rounded-lg hover:cursor-pointer hover:bg-emerald-600">
                        Upload File
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            className="hidden"
                            accept=".jpg,.jpeg,.png" />
                    </label>
                    <label
                        className="px-4 py-2 bg-emerald-700 rounded-lg  hover:cursor-pointer hover:bg-emerald-600">
                        Upload Folder
                        <input
                            type="file"
                            onChange={handleFolderUpload}
                            className="hidden"
                            accept=".zip" />
                    </label>
                </div>
            </div>
        </>
    );
}