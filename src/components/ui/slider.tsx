"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex items-center select-none touch-none w-16 h-5",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="bg-gray-600 relative grow rounded-full h-1">
      <SliderPrimitive.Range className="absolute bg-blue-500 rounded-full h-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block w-3 h-3 bg-white rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
