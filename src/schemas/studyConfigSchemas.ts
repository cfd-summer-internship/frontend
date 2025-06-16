import { z } from "zod";

export const uploadedFilesSchema = z.object({
    consentForm: z.instanceof(File).refine(file => file.size > 0, {
        message: "File must not be empty",
    }),
});

export const learningSchema = z.object({
    displayDuration: z.number(),
    pauseDuration: z.number(),
    displayMethod: z.string()
});

export const configFormModel = z.object({
    uploadedFiles: uploadedFilesSchema,
    learningPhase: learningSchema
})

//Export Types
export type Uploaded = z.infer<typeof uploadedFilesSchema>;
export type Learning = z.infer<typeof learningSchema>;
export type Configuration = z.infer<typeof configFormModel>