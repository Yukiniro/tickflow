"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun, Github } from "lucide-react";
import Link from "next/link";
import useTheme from "@/hooks/useTheme";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="fixed top-0 right-0 p-4 flex items-center gap-4">
      <Link href="https://github.com/Yukiniro/tickflow" target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="icon">
          <Github />
        </Button>
      </Link>
      <Button variant="ghost" size="icon" onClick={() => toggleTheme()}>
        {theme === "dark" ? <Moon /> : <Sun />}
      </Button>
    </div>
  );
}
