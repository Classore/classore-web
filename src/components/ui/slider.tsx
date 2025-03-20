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
		className={cn("relative flex h-5 w-16 touch-none select-none items-center", className)}
		{...props}>
		<SliderPrimitive.Track className="relative h-1 grow rounded-full bg-gray-600">
			<SliderPrimitive.Range className="absolute h-full rounded-full bg-blue-500" />
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb className="block h-3 w-3 rounded-full bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50" />
	</SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
