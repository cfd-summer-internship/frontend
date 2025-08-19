import z from "zod";

export const studyResponseSchema = z.object({
    image_id: z.string(), //Current sends list of URLs with no former reference to image id oop!
    answer: z.number(),
    response_time: z.number()
}
);
export const studyReponseListSchema = z.array(studyResponseSchema)

export type StudyResponse = z.infer<typeof studyResponseSchema>;
export type StudyResponseList = z.infer<typeof studyReponseListSchema>;