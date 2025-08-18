import z from "zod";

const ImageDataSchema = z.object({
    filename: z.string(),
    last_modified: z.date(),
    size: z.number(),
    next_token: z.string().optional(),
})

const DataSchema = z.array(ImageDataSchema);
export type ImageData = z.infer<typeof ImageDataSchema>;