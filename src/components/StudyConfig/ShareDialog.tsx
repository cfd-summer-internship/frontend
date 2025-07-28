"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/UI/dialog"
import { CopyButton } from "../UI/CopyButton";
import ExportButton from "./ExportButton";

export function DialogButton({ open, setOpen, studyCode }: {
    open: boolean;
    setOpen: (open: boolean) => void;
    studyCode:string;
}) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md text-stone-400">
                <DialogHeader className="text-stone-400">
                    <DialogTitle className="text-stone-400">Study Code</DialogTitle>
                    <DialogDescription className="text-stone-400">
                        Share this code to give access to your study.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center items-center w-full">
                    <label htmlFor="link" className="sr-only">
                        Study Code
                    </label>
                    <div className="flex flex-row items-center gap-2 align-center">
                        <label className="text-stone-400">Code:</label>
                        <input
                            className="text-center w-40 font-semibold text-2xl text-stone-400"
                            id="link"
                            defaultValue={studyCode}
                            readOnly
                        />
                        <CopyButton text={studyCode} />
                    </div>
                </div>
                <DialogFooter className="sm:justify-center">
                    <DialogClose asChild>
                        <div className="flex items-center justify-center w-full gap-2">
                            <button type="button" onClick={() => setOpen(false)} className="text-stone-400 bg-stone-800 py-2 w-1/4 rounded-md hover:bg-stone-700">
                                Close
                            </button>
                            <ExportButton studyCode={studyCode} />
                        </div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}