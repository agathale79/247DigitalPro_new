"use client";

import { useRef } from "react";

export function OtpInput({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  const digits = value.split("").concat(Array(6).fill("")).slice(0, 6);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  function handleKey(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
  }

  function handleChange(idx: number, e: React.ChangeEvent<HTMLInputElement>) {
    const ch = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[idx] = ch;
    onChange(next.join("").replace(/\s/g, "").slice(0, 6));
    if (ch && idx < 5) refs.current[idx + 1]?.focus();
  }

  function handlePaste(e: React.ClipboardEvent) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted) onChange(pasted);
  }

  return (
    <div
      className="flex gap-2 justify-center"
      onPaste={handlePaste}
      aria-label="One-time password"
    >
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          disabled={disabled}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKey(i, e)}
          className="w-11 h-12 text-center text-xl font-bold rounded-lg border-2 border-border bg-white outline-none focus:border-primary disabled:opacity-50"
          aria-label={`OTP digit ${i + 1}`}
        />
      ))}
    </div>
  );
}
