"use client";

import { CheckSquare } from "lucide-react";

const FormSuccess = ({ text }: { text: string }) => {
  if (!text) return null;

  return (
    <div className="flex items-center bg-success/20 text-success rounded-lg p-1.5 gap-2">
      <CheckSquare className="size-5" />
      <p>{text}</p>
    </div>
  );
};

export default FormSuccess;
