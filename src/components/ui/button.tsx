import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm md:text-base transition-all focus-visible:outline-offset-2 focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary-300 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-neutral-950 font-body dark:focus-visible:ring-neutral-300 font-semibold active:scale-[.99]",
  {
    variants: {
      variant: {
        default: "bg-primary-300 text-neutral-50 hover:bg-primary-400",
        inverse:
          "text-primary-300 bg-[#f1ecf9] hover:bg-[#f1ecf9]/80 font-light",
        primary:
          "bg-white text-primary-400 hover:bg-neutral-100 hover:text-primary-500",
        secondary:
          "bg-secondary-200 text-secondary-500 hover:bg-secondary-200/80",
        destructive: "bg-red-500 text-neutral-50 hover:bg-red-500/90",
        outline:
          "border border-neutral-300 bg-white hover:bg-neutral-100 text-primary-400",
        "outline-primary":
          "border border-primary-400 hover:bg-primary-100 bg-transparent text-primary-400",
        ghost: "bg-transparent text-primary-400 hover:text-current/5",
        link: "text-primary-300 underline-offset-4 hover:underline dark:text-primary-300/5",
        dark: "bg-neutral-950 text-neutral-50 hover:bg-neutral-900",
        text: "bg-transparent text-secondary-400 hover:bg-neutral-50",
        cmd: "bg-[#f6f8fa] text-black hover:bg-[#f6f8fa]/75",
        special: "bg-primary-100 text-primary-400 hover:bg-primary-100",
      },
      size: {
        default: "px-4 py-2.5",
        sm: "h-9 rounded-md text-sm font-medium px-3",
        lg: "h-[60px] rounded-xl px-6",
        icon: "h-10 w-10",
        cmd: "px-3 py-2 text-sm w-fit",
        special: "px-3 py-1 text-sm font-normal rounded w-fit",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
