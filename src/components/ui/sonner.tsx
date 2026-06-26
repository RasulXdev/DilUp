"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

/** Brand-styled toast host. Mounted once in the root layout. */
export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      position="top-center"
      toastOptions={{
        classNames: {
          toast:
            "rounded-2xl border border-line bg-white text-ink shadow-card font-sans",
          description: "text-muted-foreground",
          actionButton: "bg-brand-600 text-white",
          cancelButton: "bg-surface text-ink-soft",
          error: "border-destructive/30",
          success: "border-success/30",
        },
      }}
      {...props}
    />
  );
}
