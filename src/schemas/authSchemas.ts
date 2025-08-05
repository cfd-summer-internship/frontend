import z from "zod"

export const loginResponseModel = z.object({
    access_token: z.string().min(1),
    token_type: z.literal("bearer")
})

export type LoginResponse = z.infer<typeof loginResponseModel>