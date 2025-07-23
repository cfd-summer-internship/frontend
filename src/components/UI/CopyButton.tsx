"use client";

import { useState } from "react";
import { Copy, CopyCheck } from 'lucide-react';

export function CopyButton({text}:{text:string}){
    const [copied, setCopied] = useState(false);

    const handleCopy = async() =>{
        await navigator.clipboard.writeText(text);
        setCopied(true);
        //setTimeout(() => setCopied(false), 2000);
    };

    return(
        <button onClick={handleCopy}>{copied ? <CopyCheck className="text-emerald-400" /> : <Copy className="text-stone-400 hover:text-stone-200" />}</button>
    )
}