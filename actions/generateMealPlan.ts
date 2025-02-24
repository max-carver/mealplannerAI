"use server";

import { generatePlanSchema } from "@/lib/formSchemas";
import { db } from "@/prisma/db";
import { z } from "zod";
import { auth } from "@/auth";
import OpenAI from "openai";

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

  const openAI = new OpenAI({
    apiKey: process.env.OPEN_ROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
  });

  let prompt = `
  You are a professional nutritionist. Create a 7-day meal plan for an individual aiming for no less than ${dailyCalorieGoal} calories per day. 
  Diet type: ${dietType || "none"}
  Preferred cuisine: ${preferredCuisine || "none"}
  Allergies or restrictions: ${allergies || "none"}
  Dietary restrictions: ${dietaryRestrictions || "none"}
  Budget: ${budget || "none"}.

  For each day, provide: 
  - Breakfast
  - Lunch
  - Dinner

  Use simple ingredients. Include approximate calorie count for each meal.

  Structure the response in a JSON object where each day is a key and each meal (breakfast, lunch, dinner) is a subkey. Example:
  {
    "Monday": {
      "breakfast": {
        "name": "Oatmeal with milk and honey",
        "calories": 200,
        "ingredients": ["oats", "milk", "honey"]
      },
      "lunch": {
        "name": "Salad with chicken",
        "calories": 300,
        "ingredients": ["lettuce", "tomato", "cucumber", "onion", "chicken"]
      },
      "dinner": {
        "name": "Pasta with tomato sauce",
        "calories": 400,
        "ingredients": ["pasta", "tomato sauce"]
      }
    }, 
    "Tuesday": {
      "breakfast": {
        "name": "Oatmeal with milk and honey",
        "calories": 200,
        "ingredients": ["oats", "milk", "honey"]
      },
      "lunch": {
        "name": "Salad with chicken",
        "calories": 300,
        "ingredients": ["lettuce", "tomato", "cucumber", "onion", "chicken"]  
      },
      "dinner": {
        "name": "Pasta with tomato sauce",
        "calories": 400,
        "ingredients": ["pasta", "tomato sauce"]
      },
    },
    // And so on until Sunday
  }

  Return just the JSON object with no extra text or comments and no backticks.
  `;

  const response = await openAI.chat.completions.create({
    model: "meta-llama/llama-3.3-70b-instruct:free",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 1500,
  });

  const aiContent = response.choices[0].message.content!.trim();
  console.log(aiContent);
  let parsedData: any;

  try {
    parsedData = JSON.parse(aiContent);
  } catch (error) {
    return { error: true, message: "Something went wrong" };
  }

  if (typeof parsedData !== "object" || !parsedData) {
    return {
      error: true,
      message: "Failed to parse meal plan, please try again",
    };
  }

  const mealPlan = await db.mealPlan.create({
    data: {
      dailyCalorieGoal: parseInt(dailyCalorieGoal),
      dietType: dietType ?? "none",
      preferredCuisine: preferredCuisine ?? "none",
      allergies: allergies ?? "none",
      dietaryRestrictions: dietaryRestrictions ?? [],
      budget: budget ? parseInt(budget) : 0,
      description: aiContent,
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
