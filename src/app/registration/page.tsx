"use client";

import Header from "@/components/Auth/Login/Header";
import Register from "@/components/Auth/Registration/Registration";

export default function RegistrationPage() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header
        heading="Create a new account"
        paragraph="Already have an account?"
        linkName="Login"
        linkUrl="/login/"
      />
      <div className="w-80 flex-col items-center justify-center">
        <Register />
      </div>
    </div>
  );
}
