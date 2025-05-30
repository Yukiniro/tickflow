"use client";

import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimeFormatToggleProps {
  is24Hour: boolean;
  onToggle: () => void;
}

export function TimeFormatToggle({ is24Hour, onToggle }: TimeFormatToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className="h-9 w-9"
      title={is24Hour ? "切换到12小时制" : "切换到24小时制"}
    >
      <Clock className="h-4 w-4" />
      <span className="sr-only">{is24Hour ? "切换到12小时制" : "切换到24小时制"}</span>
    </Button>
  );
}
