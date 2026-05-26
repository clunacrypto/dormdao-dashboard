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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/logo.jpg" width={36} height={36} alt="DormDAO" style={{ borderRadius: "8px" }} />
            <span className="font-semibold text-white hidden sm:block">DormDAO</span>
          </Link>

          <div className="flex items-center gap-0.5">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-2 py-1 rounded-md transition-colors",
                  "md:flex-row md:gap-1.5 md:px-3 md:py-2",
                  pathname === href
                    ? "bg-primary/20 text-primary"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="text-[8px] mt-0.5 md:hidden leading-none">{label}</span>
                <span className="hidden md:inline text-sm font-medium">{label}</span>
              </Link>
            ))}
          </div>

          <button
            onClick={toggle}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
