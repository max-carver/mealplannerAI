"use server";

import { generatePlanSchema } from "@/lib/formSchemas";
import { db } from "@/prisma/db";
import { z } from "zod";
import { auth } from "@/auth";

const generateMealPlan = async (values: z.infer<typeof generatePlanSchema>) => {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    return { error: true, message: "Unauthorized" };
  }

  const validatedFields = generatePlanSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: true, message: "Invalid fields" };
  }

  const {
    dailyCalorieGoal,
    dietType,
    preferredCuisine,
    allergies,
    dietaryRestrictions,
    budget,
  } = validatedFields.data;

  const mealPlan = await db.mealPlan.create({
    data: {
      dailyCalorieGoal: parseInt(dailyCalorieGoal),
      dietType: dietType ?? "none",
      preferredCuisine: preferredCuisine ?? "none",
      allergies: allergies ?? "none",
      dietaryRestrictions: dietaryRestrictions ?? [],
      budget: budget ? parseInt(budget) : 0,
      userId: session.user.id,
    },
  });

  return {
    success: true,
    message: "Meal plan created successfully",
    data: mealPlan,
  };
};

export default generateMealPlan;
