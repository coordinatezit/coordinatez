import type { UseFormRegisterReturn } from "react-hook-form";

// Invisible to real users and screen readers (aria-hidden); bots that auto-fill every field
// trip it, and the submitting form silently "succeeds" without actually sending — see the
// `website` field handling in ContactForm/CareerForm's onSubmit.
export function HoneypotField(registerReturn: UseFormRegisterReturn) {
  return (
    <input
      type="text"
      tabIndex={-1}
      autoComplete="off"
      className="absolute left-[-9999px] h-0 w-0 opacity-0"
      aria-hidden
      {...registerReturn}
    />
  );
}
