import type { ReactNode } from "react";

/** iPhone 16 viewport (393×852). Fills the screen on phones, centered frame on larger screens. */
export function DeviceFrame({ children }: { children?: ReactNode }) {
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-brand-primary sm:h-device-h sm:w-device-w sm:rounded-screen sm:ring-1 sm:ring-screen-border">
      {children}
    </div>
  );
}
