"use client";
import { useId, useState, useRef } from "react";
import { CircleX } from 'lucide-react';

export default function FileUpload({
    desc,
    name }:
    {
        desc: string;
        name: string;
    }
) {
    const id = useId();
    const [file, setFile] = useState<File | null>(null);
    const [filename, setFilename] = useState<string>("Upload a File...");

    const fileRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            setFilename(file.name)
        }
        else {
            setFile(null);
            setFilename("");
        }
    }
    const clearFile = () => {
        setFile(null);
        setFilename("Upload a File...");
        if (fileRef.current){
            fileRef.current.value = "";
        }
    }
    return (
        <div className="flex flex-row items-center mb-4">
            <span className="text-md text-stone-300 pr-4">{desc}:</span>
            <label className="text-md text-stone-300 px-4 bg-stone-700 py-2">{filename}</label>
            <label htmlFor={id} className="px-4 py-2 bg-stone-800 text-stone-300">Upload</label>
            <input ref={fileRef} id={id} name={name} type="file" className="hidden" accept=".doc, .txt" onChange={handleChange}></input>
            {file && <button onClick={clearFile}><CircleX className="mx-2 text-stone-300" /> </button>}
        </div>
    )
}
