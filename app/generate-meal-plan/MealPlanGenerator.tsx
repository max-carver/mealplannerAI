"use client";

import { Card, CardContent } from "@/components/ui/card";
import GeneratePlanForm from "@/components/forms/GeneratePlanForm";
import Image from "next/image";
import logo from "@/public/mealplanlogo.svg";
import { useState } from "react";

export const MealPlanGenerator = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Card className="w-full p-4 pt-8 relative overflow-hidden">
      <CardContent className="grid grid-cols-2 gap-24">
        <div>
          <GeneratePlanForm onSubmittingChange={setIsSubmitting} />
        </div>
        <div className="flex flex-col items-center justify-center bg-primary/10 inset-0 absolute w-1/2 h-full left-1/2">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className={`${isSubmitting ? "animate-loader" : ""}`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
