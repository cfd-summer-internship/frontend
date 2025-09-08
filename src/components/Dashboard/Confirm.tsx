import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/UI/alert-dialog"
import { string } from "zod/v4";

export function ConfirmAlert({
    open,
    onOpenChange,
    onConfirm }:
    {
        open: boolean;
        onOpenChange: (v: boolean) => void;
        onConfirm: () => void | Promise<void>;
    }) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this file?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-stone-700">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-stone-700 hover:bg-red-500"
                        onClick={() => onConfirm()}
                        >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}