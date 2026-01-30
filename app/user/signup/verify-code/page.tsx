"use client";

import { useState, useEffect } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthFormHeading } from "@/components/auth/AuthFormHeading";
import { OTPInput } from "@/components/ui/OTPInput";
import { GradientButton } from "@/components/ui/GradientButton";
import { AccountCreatedModal } from "@/components/ui/AccountCreatedModal";
import { useRouter } from "next/navigation";

export default function VerifyCodePage() {
  const router = useRouter();
  const [OTP, setOTP] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [identifier, setIdentifier] = useState("Email Or Phone");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone: identifier, otp: OTP }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Verification failed");
        setIsLoading(false);
        return;
      }

      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const value: string | null = sessionStorage.getItem("signupIdentifier");
    if (value) {
      setIdentifier(value)
    }
  }, []);

  return (
    <AuthLayout>
      <AccountCreatedModal open={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          router.push("social");
        }} />
      <AuthFormHeading
        title="Enter verification code"
        subtitle={`We have just sent a verification code to ${identifier}`}
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
        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
        <GradientButton disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify OTP"}
        </GradientButton>
      </form>
    </AuthLayout>
  );
}
