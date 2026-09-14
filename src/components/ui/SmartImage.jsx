"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * next/image wrapper with a branded fallback if a remote photo fails to load,
 * so a broken stock URL never leaves an empty hole in the layout.
 */
export default function SmartImage({ className, alt = "", fill, ...props }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "bg-[radial-gradient(circle_at_30%_20%,#1a8cff_0%,#0b1f5c_55%,#06133b_100%)]",
          fill ? "absolute inset-0" : "h-full w-full",
          className
        )}
      />
    );
  }

  return <Image alt={alt} fill={fill} className={className} onError={() => setFailed(true)} {...props} />;
}
