import * as z from "zod";

export const generatePlanSchema = z.object({
  dailyCalorieGoal: z
    .string()
    .min(1, { message: "Daily calorie goal is required" }),
  dietType: z.string().optional(),
  preferredCuisine: z.string().optional(),
  allergies: z.string().optional(),
  dietaryRestrictions: z.array(z.string()).optional(),
  snack: z.boolean().optional(),
  budget: z.string().optional(),
});

//  Diet type (vegan, vegetarian, keto, etc.)
//  Daily calorie goal
//  Preferred cuisine (Italian, Japanese, Mexican, etc.)
//  Allergies
//  Dietary restrictions (gluten-free, lactose-intolerant, etc.)
//  Snack or no snack
//  Budget
