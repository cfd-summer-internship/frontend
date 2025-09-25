"use client";

import { fetchUserRole } from "@/utils/dash/index";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { tokenAtom } from "@/utils/auth/store";

export default function Dash() {
  const router = useRouter();
  const token = useAtomValue(tokenAtom);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
      return;
    }

    fetchUserRole(token)
      .then((role) => {
        const path = role === "admin" ? "/dash/staff" : `/dash/${role}`;
        router.replace(path);
      })
      .catch(() => {
        router.replace("/login");
      });
  }, [token, router]);

  return null;
}
