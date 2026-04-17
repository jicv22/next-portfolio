"use client";

import { memo } from "react";
import type { NavLink as NavLinkType } from "@/types";

interface NavLinksProps {
  links: NavLinkType[];
  onLinkClick?: () => void;
  className?: string;
  itemClassName?: string;
}

const NavLinks = memo(({ links, onLinkClick, className = "", itemClassName = "" }: NavLinksProps) => {
  return (
    <div className={className}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
          className={`transition-colors relative group ${itemClassName}`}
        >
          {link.label}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
        </a>
      ))}
    </div>
  );
});

NavLinks.displayName = "NavLinks";

export default NavLinks;
