"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthFormHeading } from "@/components/auth/AuthFormHeading";
import { LabeledInput } from "@/components/ui/LabeledInput";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { SelectInput } from "@/components/ui/SelectInput";
import { CheckboxField } from "@/components/ui/CheckboxField";
import { GradientButton } from "@/components/ui/GradientButton";
import { CalendarIcon } from "@/components/ui/CalendarIcon";
import { OTPSentModal } from "@/components/ui/OTPSentModal";

function maskEmailOrPhone(value: string): string {
  if (!value) return "***";
  if (value.includes("@")) {
    const [local, domain] = value.split("@");
    const masked = local.slice(0, 2) + "***";
    return domain ? `${masked}@${domain}` : masked;
  }
  const digits = value.replace(/\D/g, "");
  if (digits.length >= 4) {
    return `****${digits.slice(-4)}`;
  }
  return "***";
}

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("Male");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(true);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!agreeToTerms) {
      setError("Please agree to the Terms of use and Privacy Policy.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          emailOrPhone,
          dateOfBirth: dateOfBirth || undefined,
          gender: gender || undefined,
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Signup failed. Please try again.");
        return;
      }
      setShowOTPModal(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout rightPanelOverflow>
      <OTPSentModal
        open={showOTPModal}
        onClose={() => {
          setShowOTPModal(false);
          router.push("signup/verify-code");
        }}
        email={maskEmailOrPhone(emailOrPhone)}
        phone={maskEmailOrPhone(emailOrPhone)}
      />
      <AuthFormHeading
        title="Create your account"
        subtitle="Be part of our global team, make learning great by signing up with us today!"
      />

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      <form className="space-y-5" onSubmit={handleCreateAccount}>
        <div className="grid grid-cols-2 gap-4">
          <LabeledInput
            id="firstName"
            type="text"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            required
          />
          <LabeledInput
            id="lastName"
            type="text"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            required
          />
        </div>

        <LabeledInput
          id="emailOrPhone"
          type="text"
          label="Email or Phone Number"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          placeholder="admin@numee.com"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <LabeledInput
            id="dateOfBirth"
            label="Date of Birth"
            placeholder="mm/dd/yyyy"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            rightIcon={<CalendarIcon />}
          />
          <SelectInput
            id="gender"
            label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </SelectInput>
        </div>

        <PasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••"
          required
          minLength={8}
        />

        <CheckboxField
          id="terms"
          alignTop
          checked={agreeToTerms}
          onChange={(e) => setAgreeToTerms(e.target.checked)}
          label={
            <>
              I agree to the{" "}
              <Link href="/terms" className="font-medium text-blue-600 hover:text-blue-700">
                Terms of use
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="font-medium text-blue-600 hover:text-blue-700">
                Privacy Policy
              </Link>
              .
            </>
          }
        />

        <GradientButton type="submit" disabled={loading}>
          {loading ? "Creating…" : "Create Account"}
        </GradientButton>
      </form>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/user/login" className="font-medium text-blue-600 hover:text-blue-700">
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}
