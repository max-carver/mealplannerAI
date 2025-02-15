"use client";

import { Button } from "@/components//ui/button";
import { Loader2 } from "lucide-react";

const SubmitButton = ({
  variant = "default",
  size = "default",
  children,
  className,
  isLoading,
}: {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}) => {
  return (
    <Button type="submit" variant={variant} size={size} className={className}>
      {isLoading ? (
        <>
          <Loader2 className="size-6 animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
