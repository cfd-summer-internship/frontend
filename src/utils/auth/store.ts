import { atom } from "jotai"

export const tokenAtom = atom<string | undefined>()
export const isAuthenticatedAtom = atom((get) => typeof get(tokenAtom) !== "undefined")