import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteImage, getImageData, uploadFile } from ".";
import { useAtomValue } from "jotai";
import { tokenAtom } from "@/utils/auth/store";
import { ImageData } from "@/schemas/dashSchemas"
import { AwsS3Part } from "@uppy/aws-s3";


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

//S3-Multipart

export const useCreateMPU = async (token: string | undefined, file: { name: string, type: string, size: number }) => {
    const res = await fetch(`/api/s3-multipart/create`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: file.name, type: file.type, size: file.size })
    });
    if (!res.ok) throw new Error("createMPU failed")
    const { uploadId, key } = await res.json();
    return { uploadId, key }
}

export const useSignPart = async ({ token, uploadId, key, partNumber }: {
    token: string | undefined;
    uploadId: string;
    key: string;
    partNumber: number;
}) => {
    const res = await fetch(`/api/s3-multipart/sign-part`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ uploadId, key, partNumber })
    });
    if (!res.ok) throw new Error('signPart failed')
    const { url, headers } = await res.json()
    return { url, headers }
}

export const useCompleteMPU = async (file: { size: number }, { token, uploadId, key, parts }: {
    token: string | undefined;
    uploadId: string;
    key: string;
    parts: AwsS3Part[];
}) => {
    const res = await fetch(`/api/s3-multipart/complete`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ uploadId, key, parts, expectedSize: file.size })
    });
    if (!res.ok) throw new Error('completeMultipartUpload failed')
    const { location } = await res.json()
    return { location }
}

export const useAbortMPU = async ({ token, uploadId, key }: {
    token: string | undefined;
    uploadId: string | undefined;
    key: string;
}) => {
    const res = await fetch(`/api/s3-multipart/sign-part`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ uploadId, key })
    });
    if (!res.ok) throw new Error('abortMultipartUpload failed')
}