"use client";

import { useState, useEffect } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthFormHeading } from "@/components/auth/AuthFormHeading";
import { OTPInput } from "@/components/ui/OTPInput";
import { GradientButton } from "@/components/ui/GradientButton";
import { AccountCreatedModal } from "@/components/ui/AccountCreatedModal";

export default function VerifyCodePage() {
  const [OTP, setOTP] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [identifier, setIdentifier] = useState("Email Or Phone");

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  useEffect(() => {
    const value: string | null = sessionStorage.getItem("signupIdentifier");
    if (value) {
      setIdentifier(value)
    }
  }, []);

  return (
    <AuthLayout>
      <AccountCreatedModal open={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
      <AuthFormHeading
        title="Enter verification code"
        subtitle={`We have just seen a verification code to ${identifier}`}
      />

      <form className="space-y-6" onSubmit={handleVerifyOTP}>
        <OTPInput
          id="emailOrPhone-otp"
          label="Enter OTP"
          length={6}
          value={OTP}
          onChange={setOTP}
          placeholder="0"
        />
        <GradientButton>Verify OTP</GradientButton>
      </form>
    </AuthLayout>
  );
}
