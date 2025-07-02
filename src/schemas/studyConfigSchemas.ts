import { z } from "zod";

//Define Config Setting Schemas:

//Uploaded Files
export const uploadedFilesSchema = z.object({
    //Must not be an empty file
    consentForm: z.instanceof(File).refine(file => file.size > 0, {
        message: "File must not be empty",
    }),
    studyInstructions: z.instanceof(File).refine(file => file.size > 0, {
        message: "File must not be empty",
    }),
});

//Learning Phase Settings
export const learningSchema = z.object({
    displayDuration: z.number(),
    pauseDuration: z.number(),
    displayMethod: z.string()
});

//Wait Phase Settings
export const waitSchema = z.object({
    duration: z.number()
});

//Experiment Phase Settings
export const experimentSchema = z.object({
    displayDuration: z.number(),
    pauseDuration: z.number(),
    displayMethod: z.string(),
    scoringMethod: z.string()
});

//Configuration Settings Wrapper
//Will contain a reference for each section
export const configurationSchema = z.object({
    uploadedFiles: uploadedFilesSchema,
    learningPhase: learningSchema,
    waitPhase: waitSchema,
    experimentPhase: experimentSchema
})

//Exported Types
export type Uploaded = z.infer<typeof uploadedFilesSchema>;
export type Learning = z.infer<typeof learningSchema>;
export type Wait = z.infer<typeof waitSchema>;
export type Experiment = z.infer<typeof experimentSchema>;
export type ConfigSettings = z.infer<typeof configurationSchema>