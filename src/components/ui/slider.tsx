"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value, defaultValue, ...props }, ref) => {
  const thumbValues = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [props.min ?? 0];

  return (
    <SliderPrimitive.Root
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden rounded-full bg-brand-100">
        <SliderPrimitive.Range className="absolute h-full bg-brand-600" />
      </SliderPrimitive.Track>
      {thumbValues.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className="block h-7 w-7 rounded-xl border-[3px] border-brand-700 bg-white shadow-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;
