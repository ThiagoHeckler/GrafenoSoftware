import type { ReactNode } from "react";

export type IconName =
  | "check"
  | "menu"
  | "x"
  | "whatsapp"
  | "sun"
  | "moon"
  | "globe"
  | "phone"
  | "chart"
  | "plug"
  | "spark"
  | "shield"
  | "trend"
  | "external";

const paths: Record<Exclude<IconName, "whatsapp">, ReactNode> = {
  check: <path d="m5 12 4 4L19 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  x: <path d="m18 6-12 12M6 6l12 12" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  moon: <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" /></>,
  phone: <><rect x="6.5" y="2.5" width="11" height="19" rx="2.5" /><path d="M11 18.5h2" /></>,
  chart: <><path d="M4 20V4M4 20h16" /><path d="m8 15 3.5-4 3 2.5L19 8" /></>,
  plug: <path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4" />,
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M6.3 17.7l2.8-2.8M14.9 9.1l2.8-2.8" />,
  shield: <><path d="M12 21s7.5-3.5 7.5-10V5.5L12 3 4.5 5.5V11c0 6.5 7.5 10 7.5 10Z" /><path d="m9 12 2 2 4-4" /></>,
  trend: <><path d="m3 17 6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
  external: <><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>,
};

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  if (name === "whatsapp") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" width={size} height={size} fill="currentColor">
        <path d="M16.03 3C8.86 3 3.03 8.82 3.03 15.99c0 2.29.6 4.53 1.73 6.51L3 29l6.67-1.75a12.96 12.96 0 0 0 6.36 1.66h.01c7.16 0 13-5.83 13-12.99A12.9 12.9 0 0 0 25.23 6.7 12.9 12.9 0 0 0 16.03 3Zm0 23.7h-.01a10.7 10.7 0 0 1-5.45-1.5l-.39-.23-3.96 1.04 1.06-3.86-.25-.4a10.68 10.68 0 0 1-1.64-5.76C5.39 10.09 10.18 5.3 16.03 5.3c2.84 0 5.51 1.11 7.52 3.12a10.56 10.56 0 0 1 3.11 7.51c0 5.85-4.78 10.77-10.63 10.77Zm5.84-8.06c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.51-.16-.72.16-.21.32-.83 1.05-1.02 1.26-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.62-.52-.54-.72-.55h-.62c-.21 0-.56.08-.86.4-.3.32-1.12 1.1-1.12 2.67 0 1.58 1.15 3.1 1.31 3.31.16.21 2.26 3.45 5.48 4.84.77.33 1.37.53 1.84.68.77.25 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37Z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
