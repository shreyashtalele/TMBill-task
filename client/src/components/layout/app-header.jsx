"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { APP_CONTENT } from "@/constants/app-content";
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";

const getNavigationClassName = (isActive) => {
  const baseClassName =
    "rounded-md px-3 py-2 text-sm font-medium transition-colors";

  const activeClassName = "bg-slate-900 text-white";

  const inactiveClassName =
    "text-slate-600 hover:bg-slate-100 hover:text-slate-900";

  return `${baseClassName} ${isActive ? activeClassName : inactiveClassName}`;
};

export default function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={ROUTES.HOME} className="flex items-center gap-2">
          <span className="text-lg font-semibold text-slate-900">
            {APP_CONTENT.APP_NAME}
          </span>

          <span className="hidden text-sm text-slate-500 sm:inline">
            {APP_CONTENT.APP_DESCRIPTION}
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-1"
        >
          {NAVIGATION_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={getNavigationClassName(isActive)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
