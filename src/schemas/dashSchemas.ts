import z from "zod";

export const ImageDataSchema = z.object({
  filename: z.string(),
  last_modified: z.date(),
  size: z.number()
});

export const ImagePageSchema = z.object({
  images: z.array(ImageDataSchema),
  next_token: z.string().nullable().optional(),
})

export const ResearchConfigSchema = z.object({
  study_codes: z.array(z.string()),
});

export const ResearcherResultSchema = z.object({
  id: z.string(),
  study_id: z.string(),
  config_id: z.string(),
  subject_id: z.string(),
  submitted: z.date()
});

export const DataSchema = z.array(ImageDataSchema);

export type ImageData = z.infer<typeof ImageDataSchema>;
export type ImagePage = z.infer<typeof ImagePageSchema>;

export type ResearcherConfig = z.infer<typeof ResearchConfigSchema>;
export type ResearcherResults = z.infer<typeof ResearcherResultSchema>;
