"use client";

import Header from "@/components/Auth//Login/Header";
import Login from "@/components/Auth/Login/Login";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center">
            <Header
                heading="Login to your account"
                paragraph="Don't have an account yet?"
                linkName="Sign Up"
                linkUrl="/registration/"
            />
            <div className="w-80 flex-col items-center justify-center">
                <Login />
            </div>
        </div>
    );
}