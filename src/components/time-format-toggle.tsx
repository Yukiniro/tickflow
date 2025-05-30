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
      size="sm"
      onClick={onToggle}
      className="h-9 px-3 gap-2"
      title={is24Hour ? "切换到12小时制" : "切换到24小时制"}
    >
      <Clock className="h-4 w-4" />
      <span className="text-sm font-medium">{is24Hour ? "24h" : "12h"}</span>
    </Button>
  );
}
