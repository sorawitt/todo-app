import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
  duration?: number;
}

export function Toast({
  message,
  type = "success",
  onClose,
  duration = 2000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const tone =
    type === "success"
      ? {
          icon: "border-emerald-200 bg-emerald-50 text-emerald-600",
          symbol: "✓",
        }
      : {
          icon: "border-amber-200 bg-amber-50 text-amber-600",
          symbol: "!",
        };

  return (
    <div className="fixed bottom-6 left-1/2 flex min-w-60 -translate-x-1/2 items-center gap-2.5 rounded-lg border border-neutral-200 bg-white/95 px-4 py-2.5 text-sm text-neutral-800 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.55)] backdrop-blur-sm">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold ${tone.icon}`}
        aria-hidden
      >
        {tone.symbol}
      </span>
      <span>{message}</span>
    </div>
  );
}
