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

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});
