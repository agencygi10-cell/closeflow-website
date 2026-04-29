"use client";

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export default function Logo({
  size = 40,
  showText = true,
  className = "",
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className="relative"
        style={{ width: size, height: size }}
        aria-hidden
      >
        <img
          src="/logo.svg"
          alt="CloseFlow System"
          width={size}
          height={size}
          className="object-contain drop-shadow-[0_0_18px_rgba(168,85,247,0.55)]"
        />
      </div>
      {showText && (
        <span className="font-display text-lg sm:text-xl font-semibold tracking-tight">
          <span className="text-white">Close</span>
          <span className="text-gradient">Flow</span>
        </span>
      )}
    </div>
  );
}
