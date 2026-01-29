"use client";

import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthFormHeading } from "@/components/auth/AuthFormHeading";
import { OTPInput } from "@/components/ui/OTPInput";
import { GradientButton } from "@/components/ui/GradientButton";
import { AccountCreatedModal } from "@/components/ui/AccountCreatedModal";

export default function VerifyCodePage() {
  const [emailOTP, setEmailOTP] = useState("");
  const [phoneOTP, setPhoneOTP] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <AuthLayout>
      <AccountCreatedModal open={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
      <AuthFormHeading
        title="Enter verification code"
        subtitle="We have just seen a verification code to demo@example.com and +91-7428****54"
      />

      <form className="space-y-6" onSubmit={handleVerifyOTP}>
        <OTPInput
          id="email-otp"
          label="Enter Email OTP"
          length={6}
          value={emailOTP}
          onChange={setEmailOTP}
          placeholder="0"
        />
        <OTPInput
          id="phone-otp"
          label="Enter Phone OTP"
          length={6}
          value={phoneOTP}
          onChange={setPhoneOTP}
          placeholder="0"
        />
        <GradientButton>Verify OTP</GradientButton>
      </form>
    </AuthLayout>
  );
}
