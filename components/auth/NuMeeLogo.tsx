import Link from "next/link";

const logoTextClassName =
  "font-bold bg-gradient-to-r from-blue-500 to-amber-500 bg-clip-text text-transparent";

export function NuMeeLogo({
  gradientId = "auth-logo",
  size = "md",
  href = "/",
  showIcon = true,
}: {
  gradientId?: string;
  size?: "sm" | "md";
  href?: string;
  showIcon?: boolean;
}) {
  const textClass = size === "sm" ? "text-xl" : "text-2xl";
  const content = (
    <>
      <span className={`${textClass} ${logoTextClassName}`}>NuMee</span>
      {showIcon && (
        <svg className={size === "sm" ? "w-6 h-6" : "w-8 h-8"} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={gradientId} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3b82f6" />
              <stop offset="1" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <path d="M16 4L20 12L28 14L22 20L23 28L16 24L9 28L10 20L4 14L12 12L16 4Z" fill={`url(#${gradientId})`} />
        </svg>
      )}
    </>
  );
  return (
    <Link href={href} className="inline-flex items-center gap-2">
      {content}
    </Link>
  );
}
