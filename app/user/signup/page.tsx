"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthFormHeading } from "@/components/auth/AuthFormHeading";
import { LabeledInput } from "@/components/ui/LabeledInput";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { SelectInput } from "@/components/ui/SelectInput";
import { CheckboxField } from "@/components/ui/CheckboxField";
import { GradientButton } from "@/components/ui/GradientButton";
import { CalendarIcon } from "@/components/ui/CalendarIcon";

export default function SignupPage() {
  const [agreeToTerms, setAgreeToTerms] = useState(true);

  return (
    <AuthLayout rightPanelOverflow>
      <AuthFormHeading
        title="Create your account"
        subtitle="Be part of our global team, make learning great by signing up with us today!"
      />

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <LabeledInput
            id="firstName"
            type="text"
            label="First Name"
            defaultValue="John"
            placeholder="John"
          />
          <LabeledInput
            id="lastName"
            type="text"
            label="Last Name"
            defaultValue="Doe"
            placeholder="Doe"
          />
        </div>

        <LabeledInput
          id="emailOrPhone"
          type="text"
          label="Email or Phone Number"
          defaultValue="admin@numee.com"
          placeholder="admin@numee.com"
        />

        <div className="grid grid-cols-2 gap-4">
          <LabeledInput
            id="dateOfBirth"
            label="Date of Birth"
            placeholder="mm/dd/yyyy"
            rightIcon={<CalendarIcon />}
          />
          <SelectInput id="gender" label="Gender" defaultValue="Male">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </SelectInput>
        </div>

        <PasswordInput
          id="password"
          label="Password"
          defaultValue="**********"
          placeholder="••••••••••"
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

        <GradientButton>Create Account</GradientButton>
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
