"use client";

import Input from "@/components/Auth/Login/Input";
import { registerUser } from "@/utils/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { z } from "zod";

const registrationFormModel = z.object({
    email: z.string().nonempty("Email required").email(),
    password: z.string().nonempty("Password required"),
    confirmPassword: z.string().nonempty("Confirm your password").min(6, "Password must be at least 6 characters"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegistrationFormT = z.infer<typeof registrationFormModel>;

export default function Registration() {
  const router = useRouter();
  const [formError, setFormError] = useState<z.ZodError<RegistrationFormT> | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const registrationMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: async () => {
      setSuccessMessage("Registration completed, redirecting to login...");
      setTimeout(() => router.replace("/login"), 3000); // Redirect after 3 seconds
    },
  });

function handleRegister(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  const { data, error } = registrationFormModel.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (error) {
    setFormError(error);
    e.stopPropagation();
    return;
  } else {
    setFormError(undefined);
  }

  registrationMutation.mutate(data);
}


  function handleCancel(e: SyntheticEvent) {
    e.preventDefault();
    router.replace("/")
  }

  return (
    <form onSubmit={handleRegister}>
      <div className="flex flex-col items-center">
        <Input inputName="email" placeholder="Email Address" type="text" />
        <span className="font-bold font-sans text-red-500">{formError?.format().email?._errors.join("")}</span>

        <Input inputName="password" placeholder="Password" type="password" />
        <span className="font-bold font-sans text-red-500">{formError?.format().password?._errors.join("")}</span>

        <Input inputName="confirmPassword" placeholder="Confirm Password" type="password" />
        <span className="font-bold font-sans text-red-500">{formError?.format().confirmPassword?._errors.join("")}</span>
        <span className="m-2 italic font-sans text-red-500 text-center">{registrationMutation.error?.message}</span>

        <button
          type="submit"
          className="bg-emerald-700 text-white hover:bg-emerald-600 hover:cursor-pointer px-19 py-3 mb-2 rounded-lg transition-colors duration-300"
        > Register </button>

        <button
          className="bg-stone-700 text-white hover:bg-stone-600 hover:cursor-pointer px-20 py-3 rounded-lg transition-colors"
          onClick={handleCancel}>Cancel</button>

        {successMessage && ( <span className="mt-4 font-bold text-green-600 text-center">{successMessage}</span>)}
      </div>
    </form>
  );
}
