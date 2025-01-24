"use client";

import { Github } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme-toggle";
export default function RightHeader() {
  return (
    <div className="flex items-center gap-2">
      <Link href="https://github.com/Yukiniro/tickflow" target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="icon">
          <Github />
        </Button>
      </Link>
      <ThemeToggle />
    </div>
  );
}
