"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Trophy, BookOpen, GraduationCap, BarChart2, Info, Activity } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Leaderboard", icon: Trophy },
  { href: "/schools", label: "Schools", icon: GraduationCap },
  { href: "/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/activity", label: "Activity", icon: Activity },
  { href: "/research", label: "Research", icon: BookOpen },
  { href: "/about", label: "About", icon: Info },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <nav className="border-b border-gray-800 bg-[#0a0a0a]/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/logo.jpg" width={28} height={28} alt="DormDAO" className="rounded-md" />
            <span className="font-semibold text-white text-sm hidden sm:block tracking-tight">DormDAO</span>
          </Link>

          {/* Desktop nav — text links with underline indicator */}
          <div className="hidden md:flex items-stretch h-14">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center px-4 text-sm transition-colors border-b-2 -mb-px",
                    isActive
                      ? "text-white font-medium border-primary"
                      : "text-gray-500 hover:text-gray-200 border-transparent font-normal"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Mobile nav — icons only */}
          <div className="flex md:hidden items-center gap-0.5">
            {NAV_LINKS.map(({ href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-md transition-colors",
                    isActive ? "text-primary" : "text-gray-500 hover:text-gray-300"
                  )}
                >
                  <Icon className="w-[18px] h-[18px]" />
                </Link>
              );
            })}
          </div>

          {/* Pill toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className={cn(
              "relative w-11 h-[22px] rounded-full border flex items-center px-[3px] transition-all duration-200 shrink-0",
              theme === "dark"
                ? "bg-white/[0.07] border-white/[0.12] hover:bg-white/[0.12]"
                : "bg-black/[0.07] border-black/[0.12] hover:bg-black/[0.12]"
            )}
          >
            <span
              className={cn(
                "w-4 h-4 rounded-full shadow transition-transform duration-200",
                theme === "dark"
                  ? "translate-x-0 bg-white/50"
                  : "translate-x-[calc(100%+3px)] bg-gray-700"
              )}
            />
          </button>

        </div>
      </div>
    </nav>
  );
}
