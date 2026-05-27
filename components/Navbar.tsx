"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Moon, Sun, BarChart2, BookOpen, GraduationCap, Coins, Info, Activity } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Overview", icon: BarChart2 },
  { href: "/schools", label: "Schools", icon: GraduationCap },
  { href: "/tokens", label: "Tokens", icon: Coins },
  { href: "/activity", label: "Activity", icon: Activity },
  { href: "/research", label: "Research", icon: BookOpen },
  { href: "/about", label: "About", icon: Info },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <nav className="border-b border-gray-800 bg-[#0f1117]/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0 mr-1">
            <Image src="/logo.jpg" width={30} height={30} alt="DormDAO" style={{ borderRadius: "6px" }} />
            <span className="font-semibold text-white hidden sm:block text-sm">DormDAO</span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  // Base: icon-only, 44×44 tap target
                  "flex flex-col items-center justify-center w-[44px] h-[44px] rounded-md transition-colors",
                  // 480px+: add tiny label below icon
                  "min-[480px]:w-auto min-[480px]:px-1.5",
                  // md+: row layout with full label
                  "md:flex-row md:gap-1.5 md:px-3 md:h-10",
                  pathname === href
                    ? "bg-primary/20 text-primary"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                <Icon className="w-[18px] h-[18px] shrink-0 md:w-4 md:h-4" />
                {/* Tiny label: visible 480–768px */}
                <span className="hidden min-[480px]:block md:hidden text-[8px] leading-none mt-0.5">
                  {label}
                </span>
                {/* Full label: md+ */}
                <span className="hidden md:inline text-sm font-medium">{label}</span>
              </Link>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="flex items-center justify-center w-[44px] h-[44px] rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors shrink-0"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
