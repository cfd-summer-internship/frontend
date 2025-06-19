"use client";
import { useId } from "react";

export default function FileUpload({
    desc,
    name,
    onFileChange }:
    {
        desc: string;
        name: string;
        onFileChange: (name: string, file: File) => void;
    }
) {
    const id = useId();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const file = e.target.files?.[0];
        if (file) onFileChange(file.name,file);
    }
    return (
        <div className="flex flex-row items-center">
            <span className="text-md text-stone-300 pr-4">{desc}:</span>
            <label htmlFor={id} className="px-4 py-2 rounded-lg bg-emerald-700 text-stone-300">Upload</label>
            <input id={id} name={name} type="file" className="hidden" accept=".doc, .txt" onChange={handleChange}></input>
        </div>
    )
}