"use client";

import { Button } from "@/components//ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const SubmitButton = ({
  variant = "default",
  size = "default",
  children,
  className,
  isLoading,
  onClick,
}: {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      className={cn(
        className,
        "active:scale-[0.97] duration-200  transition active:duration-100 w-full"
      )}
      disabled={isLoading}
      onClick={onClick}
    >
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
