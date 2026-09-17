interface PoliteMessageProps {
  message: string | string[] | undefined;
}

export default function PoliteMessage({ message }: PoliteMessageProps) {
  return (
    <p
      aria-live="polite"
      className={`text-fluid-lg px-2 border-2 bg-accent-yellow border-accent-orange rounded-lg ${message ? "visible" : "invisible"}`}
    >
      {message}
    </p>
  );
}
