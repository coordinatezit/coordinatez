import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
      <Image
        src="/logo-mark.svg"
        alt=""
        width={56}
        height={56}
        priority
        className="animate-pulse"
      />
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
        Loading — Plotting Coordinates
      </p>
    </div>
  );
}
