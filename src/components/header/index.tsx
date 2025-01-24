"use client";

import LeftHeader from "./left-header";
import RightHeader from "./right-header";

export default function Header() {
  return (
    <div className="fixed top-0 right-0 p-4 flex items-center justify-between w-full">
      <LeftHeader />
      <RightHeader />
    </div>
  );
}
