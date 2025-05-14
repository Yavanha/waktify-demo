import { cva } from "class-variance-authority";

export const DEFAULT_PAGE_INDEX = 0;
export const DEFAULT_PAGE_SIZE = 10;

export const GetShelVariants = cva(
  "grid items-center gap-8 pt-6 pb-8 md:py-8",
  {
    variants: {
      variant: {
        default: "container",
        sidebar: "",
        centered:
          "container flex h-dvh max-w-2xl flex-col justify-center py-16",
        markdown: "container max-w-3xl py-8 md:py-10 lg:py-10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
