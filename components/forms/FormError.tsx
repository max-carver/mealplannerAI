"use client";

import { CircleXIcon } from "lucide-react";

const FormError = ({ text }: { text: string }) => {
  if (!text) return null;

  return (
    <div className="flex items-center bg-destructive/20 text-destructive rounded-md p-1.5 gap-2">
      <CircleXIcon className="size-5" />
      <p>{text}</p>
    </div>
  );
};

export default FormError;
