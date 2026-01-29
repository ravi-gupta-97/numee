"use client";

import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthFormHeading } from "@/components/auth/AuthFormHeading";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { GradientButton } from "@/components/ui/GradientButton";
import { PasswordChangedModal } from "@/components/ui/PasswordChangedModal";

export default function ResetPasswordPage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <AuthLayout>
      <PasswordChangedModal open={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
      <AuthFormHeading
        title="Reset Password"
        subtitle="Enter a new password to reset the password on your account. We'll ask for this password whenever you log in."
      />

      <form className="space-y-5" onSubmit={handleSubmit}>
        <PasswordInput
          id="new-password"
          label="New Password"
          placeholder="••••••••••"
        />
        <PasswordInput
          id="confirm-password"
          label="Confirm New Password"
          placeholder="••••••••••"
        />
        <GradientButton>Reset Password</GradientButton>
      </form>
    </AuthLayout>
  );
}
