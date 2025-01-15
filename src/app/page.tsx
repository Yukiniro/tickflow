"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <div className="w-screen h-screen overflow-hidden font-[family-name:var(--font-geist-sans)]">
      <div className="w-screen h-screen flex flex-col items-center justify-center font-mono text-lg text-center">
        <h1 className="text-6xl font-bold">Next Shadcn Starter</h1>
        <Button onClick={() => setCount(count + 1)}>Click Count: {count}</Button>
      </div>
    </div>
  );
}
