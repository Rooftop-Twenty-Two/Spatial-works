import * as React from "react";
import { ArrowUpRight } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { SmartLink } from "@/components/ui/smart-link";
import { cn } from "@/lib/utils";

type ArrowButtonTone = "dark" | "light" | "outline";

const toneStyles: Record<ArrowButtonTone, string> = {
  // Black pill — for light surfaces
  dark: "bg-sw-black text-sw-white hover:bg-sw-black",
  // White pill — for dark surfaces
  light: "bg-sw-white text-sw-black hover:bg-sw-white",
  // Outline — secondary, light surfaces
  outline:
    "border-[1.5px] border-sw-black/20 bg-transparent text-sw-black hover:bg-transparent",
};

interface ArrowButtonProps extends Omit<ButtonProps, "asChild"> {
  /** Render as an anchor when provided. */
  href?: string;
  tone?: ArrowButtonTone;
}

/**
 * Brand CTA: a Geist medium pill with a Grenadier arrow badge that slides
 * across and rotates on hover. Use wherever a button needs a directional arrow.
 */
const ArrowButton = React.forwardRef<HTMLButtonElement, ArrowButtonProps>(
  ({ children, className, href, tone = "dark", ...props }, ref) => {
    const classes = cn(
      "group relative h-12 w-fit overflow-hidden rounded-full p-1 ps-6 pe-14 text-base font-medium tracking-[-0.01em] transition-all duration-500 hover:ps-14 hover:pe-6",
      toneStyles[tone],
      className
    );

    const inner = (
      <>
        <span className="relative z-10 transition-all duration-500">
          {children}
        </span>
        <span className="absolute right-1 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-sw-orange text-sw-white transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
          <ArrowUpRight size={16} strokeWidth={2.5} />
        </span>
      </>
    );

    if (href) {
      return (
        <Button asChild className={classes} {...props}>
          <SmartLink href={href}>{inner}</SmartLink>
        </Button>
      );
    }

    return (
      <Button ref={ref} className={classes} {...props}>
        {inner}
      </Button>
    );
  }
);
ArrowButton.displayName = "ArrowButton";

export { ArrowButton };
export type { ArrowButtonProps };
