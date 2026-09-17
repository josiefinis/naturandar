"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  className: string;
}

export default function SubmitButton({ className }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button className={className} type="submit" disabled={pending}>
      {pending ? "Skickar..." : "Skicka"}
    </button>
  );
}
