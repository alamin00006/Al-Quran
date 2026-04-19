"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">,
    LinkProps {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

// Renders a Next.js link with automatic active-route styling.
const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName: _pendingClassName, href, ...props }, ref) => {
    const pathname = usePathname();
    const hrefString = typeof href === "string" ? href : href.pathname ?? "";
    const isActive = pathname === hrefString;

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
