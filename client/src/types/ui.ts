import type * as SheetPrimitive from "@radix-ui/react-dialog";
import type { VariantProps } from "class-variance-authority";
import type { LinkProps } from "next/link";
import type React from "react";

import type { buttonVariants } from "@/components/ui/button";
import type { sheetVariants } from "@/components/ui/sheet";

export interface NavLinkCompatProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">,
    LinkProps {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

export type SidebarContextValue = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};
