"use client";

import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthFormHeading } from "@/components/auth/AuthFormHeading";
import { LabeledInput } from "@/components/ui/LabeledInput";
import { GradientButton } from "@/components/ui/GradientButton";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <AuthFormHeading
        title="Forgot Password"
        subtitle="Enter your registered email address and we'll give you reset instruction."
      />

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <LabeledInput
          id="email"
          type="email"
          label="Work Email"
          placeholder="admin@numee.com"
        />
        <GradientButton>Send Reset Link</GradientButton>
      </form>

      <p className="text-right text-sm text-gray-600">
        Back to{" "}
        <Link href="/user/login" className="font-medium text-blue-600 hover:text-blue-700 underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
