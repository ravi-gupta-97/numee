"use client";

import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { OTPInput } from "@/components/ui/OTPInput";
import { GradientButton } from "@/components/ui/GradientButton";

export default function ForgotPasswordVerifyCodePage() {
  const [otp, setOtp] = useState("");

  return (
    <AuthLayout>
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Enter verification code</h2>
        <p className="text-gray-600 mt-1">
          We have just seen a verification code to <span className="font-semibold text-gray-900">demo@example.com</span>
        </p>
      </div>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          // Handle verify OTP for password reset
        }}
      >
        <OTPInput
          id="otp"
          label="Enter OTP"
          length={6}
          value={otp}
          onChange={setOtp}
          placeholder="0"
        />
        <GradientButton>Verify OTP</GradientButton>
      </form>
    </AuthLayout>
  );
}
