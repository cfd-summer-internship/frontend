import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteImage, getImageData, uploadFile } from ".";
import { useAtomValue } from "jotai";
import { tokenAtom } from "@/utils/auth/store";
import { ImageData } from "@/schemas/dashSchemas"


export const useGetImageData = () => {
    const token = useAtomValue(tokenAtom)
    const query = useQuery<ImageData[], Error>({
        queryKey: ['images'],
        queryFn: () => getImageData(token),
    });

    return query;
};

export const useDeleteFileMutation = () => {
    return useMutation({
        mutationFn: async ({ token, filename }: { token: string | undefined, filename: string }) => await deleteImage(token, filename)
    });
};

export const useUploadImagesMutation = () => {
    return useMutation({
        mutationFn: async ({ token, file }: { token: string | undefined, file: File }) => await uploadFile(token, file)
    });
};