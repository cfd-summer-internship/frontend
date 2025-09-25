"use client";

import Input from "@/components/Auth/Login/Input";
import { getAuthToken } from "@/utils/auth";
import { tokenAtom } from "@/utils/auth/store";
import { useMutation } from "@tanstack/react-query";
import { getDefaultStore } from "jotai";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { z } from "zod";

const loginFormModel = z.object({
  username: z.string().nonempty("Username required").email(),
  password: z.string().nonempty("Password required")
})

type LoginFormT = z.infer<typeof loginFormModel>

export default function Login() {
  const router = useRouter()
  const [formError, setFormError] = useState<z.ZodError<LoginFormT> | undefined>()
  const store = getDefaultStore();

  const loginMutation = useMutation({
    mutationFn: getAuthToken,
    onSuccess: async (res) => {
      store.set(tokenAtom, res.access_token);
      await Promise.resolve()
      // router.replace("/dash/staff")
      router.replace("/dash/")
      // router.replace("/studyConfig")
    }
  });

  function handleLogin(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const { data, error } = loginFormModel.safeParse({
      username: formData.get("email"),
      password: formData.get("password")
    })

    if (error) {
      setFormError(error)
      e.stopPropagation()
      return
    } else {
      setFormError(undefined)
    }

    loginMutation.mutate(data);
  }

  function handleCancel(e) {
    e.preventDefault();
    router.replace("/")
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="flex flex-col items-center">
        <Input inputName="email" placeholder="Email Address" type="text" />
        <span className="font-bold font-sans text-red-500">{formError?.format().username?._errors.join("")}</span>
        <Input inputName="password" placeholder="Password" type="password" />
        <span className="font-bold font-sans text-red-500">{formError?.format().password?._errors.join("")}</span>
        <span className="m-2 italic font-sans text-red-500 text-center">{loginMutation.error?.message}</span>
        <button
          type="submit"
          className="bg-emerald-700 text-white hover:bg-emerald-600 hover:cursor-pointer px-21 py-3 mb-2 rounded-lg transition-colors duration-300"
        > Login </button>
        <button className="bg-stone-700 text-white hover:bg-stone-600 hover:cursor-pointer px-20 py-3 rounded-lg transition-colors"
          onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
}