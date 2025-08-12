"use client";

import { tokenAtom } from "@/utils/auth/store";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { z } from "zod";
import { Trash2 } from 'lucide-react';

const ImageDataSchema = z.object({
    filename: z.string(),
    last_modified: z.date(),
    size: z.number(),
    next_token: z.string().optional(),
})

const DataSchema = z.array(ImageDataSchema);
type ImageData = z.infer<typeof ImageDataSchema>;

export const getImageData = (async () => {
    const token = useAtomValue(tokenAtom)
    const res = await fetch(`/api/images/get_file_page`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error("Unable to Save Configuration")
    }

    return res.json()
});


export default function StaffImageView() {
    const { data: rows = [], isLoading, isError, error } = useQuery<ImageData[], Error>({
        queryKey: ['images'],
        queryFn: getImageData,
    });
    if (isLoading){
        return(
            <div className="flex text-center justify-center text-red-300">
                Loading
            </div>
        );
    }
    if (isError) {
        return (
            <div className="flex text-center justify-center text-red-300">
                Error
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
                                <td> {row.last_modified.toString()} </td>
                                <td>{row.size}</td>
                                <td>
                                    <button><Trash2 /></button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}