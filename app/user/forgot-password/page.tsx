"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthFormHeading } from "@/components/auth/AuthFormHeading";
import { LabeledInput } from "@/components/ui/LabeledInput";
import { GradientButton } from "@/components/ui/GradientButton";
import { CheckEmailModal } from "@/components/ui/CheckEmailModal";

export default function ForgotPasswordPage() {
  const [showCheckEmailModal, setShowCheckEmailModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCheckEmailModal(true);
  };

  return (
    <AuthLayout>
      <CheckEmailModal
        open={showCheckEmailModal}
        onClose={() => setShowCheckEmailModal(false)}
        email="de***@example.com"
      />
      <AuthFormHeading
        title="Forgot Password"
        subtitle="Enter your registered email address and we'll give you reset instruction."
      />

      <form className="space-y-5" onSubmit={handleSubmit}>
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
