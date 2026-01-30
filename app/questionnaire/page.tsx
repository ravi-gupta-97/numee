"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { NuMeeLogo } from "@/components/auth/NuMeeLogo";
import { GradientButton } from "@/components/ui/GradientButton";
import { LabeledInput } from "@/components/ui/LabeledInput";
import { CalendarIcon } from "@/components/ui/CalendarIcon";
import { Modal } from "@/components/ui/Modal";
import {
  QUESTION_STEPS,
  TOTAL_QUESTIONS,
  type QuestionStep,
  type QuestionField,
} from "./questionnaire-data";

const inputClassName =
  "w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition";

function FieldInput({
  field,
  value,
  onChange,
  twoColumns,
}: {
  field: QuestionField;
  value: string;
  onChange: (value: string) => void;
  twoColumns?: boolean;
}) {
  const wrapperClass = twoColumns ? "sm:col-span-1" : "";

  if (field.type === "textarea") {
    return (
      <div className={wrapperClass}>
        {field.label ? (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
        ) : null}
        <textarea
          id={field.id}
          rows={4}
          className={`${inputClassName} resize-y min-h-[100px]`}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  const isDate = field.type === "date";
  return (
    <div className={wrapperClass}>
      <LabeledInput
        id={field.id}
        type={isDate ? "date" : "text"}
        label={field.label}
        placeholder={field.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rightIcon={isDate ? <CalendarIcon /> : undefined}
      />
    </div>
  );
}

function QuestionContent({
  step,
  answers,
  onAnswer,
}: {
  step: QuestionStep;
  answers: Record<string, string>;
  onAnswer: (fieldId: string, value: string) => void;
}) {
  const twoColumns = step.twoColumns && step.fields.length >= 6;
  const textareaFields = step.fields.filter((f) => f.type === "textarea");
  const textFields = step.fields.filter((f) => f.type !== "textarea");

  return (
    <div className="space-y-4">
      {step.intro ? (
        <p className="text-base font-medium text-gray-900">{step.intro}</p>
      ) : null}
      {step.title && !step.intro ? (
        <p className="text-base font-semibold text-gray-900">{step.title}</p>
      ) : step.title && step.intro ? (
        <p className="text-base font-medium text-gray-900 mt-2">{step.title}</p>
      ) : null}

      {twoColumns ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {textFields.slice(0, 6).map((field) => (
              <FieldInput
                key={field.id}
                field={field}
                value={answers[field.id] ?? ""}
                onChange={(v) => onAnswer(field.id, v)}
                twoColumns
              />
            ))}
          </div>
          {step.fields.slice(6).map((field) => (
            <FieldInput
              key={field.id}
              field={field}
              value={answers[field.id] ?? ""}
              onChange={(v) => onAnswer(field.id, v)}
            />
          ))}
        </>
      ) : (
        <div className="space-y-4">
          {step.fields.map((field) => (
            <FieldInput
              key={field.id}
              field={field}
              value={answers[field.id] ?? ""}
              onChange={(v) => onAnswer(field.id, v)}
              twoColumns={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function QuestionnairePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isRecording, setIsRecording] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const res = await fetch("/api/questionnaire/progress");
        if (res.ok) {
          const data = await res.json();
          if (typeof data.stepIndex === "number") setCurrentStep(data.stepIndex);
          if (data.answers) setAnswers(data.answers);
        }
      } catch (error) {
        console.error("Failed to load progress:", error);
      }
    };
    loadProgress();
  }, []);

  const step = QUESTION_STEPS[currentStep];
  const progress = ((currentStep + 1) / TOTAL_QUESTIONS) * 100;
  const isFirst = currentStep === 0;
  const isLast = currentStep === TOTAL_QUESTIONS - 1;

  const onAnswer = useCallback((fieldId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [fieldId]: value }));
  }, []);

  const goNext = async () => {
    const nextStep = Math.min(currentStep + 1, TOTAL_QUESTIONS - 1);

    try {
      await fetch("/api/questionnaire/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stepIndex: isLast ? currentStep : nextStep,
          answers
        }),
      });
    } catch (error) {
      console.error("Failed to save progress:", error);
    }

    if (isLast) {
      setShowSuccessModal(true);
      return;
    }
    setCurrentStep(nextStep);
  };

  const goBack = () => {
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-100/90 via-white to-amber-100/80 flex flex-col">
      {/* Header */}
      <header className="pt-8 pb-4 flex flex-col items-center gap-1">
        <NuMeeLogo href="/" gradientId="questionnaire-logo" size="md" />
        <p className="text-gray-600 text-sm font-medium">Shape your future with NuMee</p>
      </header>

      {/* Card */}
      <main className="flex-1 flex items-start justify-center px-4 pb-8 pt-2">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 flex flex-col gap-6">
          {/* Progress */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Progress
              </p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-amber-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <span className="text-sm font-medium text-gray-700 shrink-0">
              Question {currentStep + 1} of {TOTAL_QUESTIONS}
            </span>
          </div>

          {/* Question content */}
          <QuestionContent step={step} answers={answers} onAnswer={onAnswer} />

          {/* OR + Voice */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500 font-medium">OR</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsRecording((r) => !r)}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-gray-300 bg-sky-50/80 text-gray-700 font-medium hover:bg-sky-100/80 transition"
          >
            <svg
              className={`w-5 h-5 text-sky-600 ${isRecording ? "animate-pulse" : ""}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
            </svg>
            Record voice answer
          </button>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4 pt-2">
            {isFirst ? (
              <div />
            ) : (
              <button
                type="button"
                onClick={goBack}
                className="py-2.5 px-5 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
              >
                Back
              </button>
            )}
            <GradientButton
              type="button"
              onClick={goNext}
              className="ml-auto w-auto min-w-[120px] px-6 py-2.5"
            >
              {isLast ? "Submit" : "Next"}
            </GradientButton>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-500">
        Need help?{" "}
        <Link href="#" className="font-medium text-blue-600 hover:text-blue-700">
          Ask NuMee Assistant
        </Link>
      </footer>

      {/* Success modal */}
      <Modal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        className="p-6 sm:p-8"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Details saved successfully</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-2">
            We have saved your LinkedIn profile, resume, and the job descriptions you&apos;re
            interested in along with your questions. Based on this information, our AI Mentor will
            carefully review your details and suggest the most suitable career path for you.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Please give us a little time to complete this review and provide you with the best
            recommendations.
          </p>
          <Link
            href="/"
            className="w-full py-2.5 px-5 rounded-lg border border-gray-300 bg-white text-gray-800 font-medium hover:bg-gray-50 transition text-center"
          >
            Back to home
          </Link>
        </div>
      </Modal>
    </div>
  );
}
