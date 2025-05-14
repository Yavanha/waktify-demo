import { type VariantProps } from "class-variance-authority";
import { ElementType } from "react";
import { cn } from "../lib/utils";
import { GetShelVariants } from "../constants";

interface ShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof GetShelVariants> {
  as?: ElementType;
}

function Shell({
  className,
  as: Comp = "section",
  variant,
  ...props
}: ShellProps) {
  return (
    <Comp className={cn(GetShelVariants({ variant }), className)} {...props} />
  );
}

export { Shell };
