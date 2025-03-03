"use client";

import * as z from "zod";
import { generatePlanSchema } from "@/lib/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomSelect } from "./CustomSelect";
import { MultiSelect } from "../CustomMultiSelect";
import generateMealPlan from "@/actions/generateMealPlan";
import SubmitButton from "./SubmitButton";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const GeneratePlanForm = ({
  onSubmittingChange,
}: {
  onSubmittingChange: (isSubmitting: boolean) => void;
}) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof generatePlanSchema>>({
    resolver: zodResolver(generatePlanSchema),
    defaultValues: {
      dailyCalorieGoal: "",
      dietType: "none",
      preferredCuisine: "none",
      allergies: "",
      dietaryRestrictions: [],
      budget: "",
    },
  });

  // Watch for changes to isSubmitting
  useEffect(() => {
    onSubmittingChange(form.formState.isSubmitting);
  }, [form.formState.isSubmitting, onSubmittingChange]);

  const dietTypeOptions = [
    { key: "none", label: "None" },
    { key: "halaal", label: "Halaal" },
    { key: "kosher", label: "Kosher" },
    { key: "vegetarian", label: "Vegetarian" },
    { key: "vegan", label: "Vegan" },
    { key: "paleo", label: "Paleo" },
    { key: "keto", label: "Keto" },
  ];

  const preferredCuisineOptions = [
    { key: "none", label: "None" },
    { key: "italian", label: "Italian" },
    { key: "japanese", label: "Japanese" },
    { key: "mexican", label: "Mexican" },
    { key: "indian", label: "Indian" },
    { key: "chinese", label: "Chinese" },
    { key: "thai", label: "Thai" },
    { key: "korean", label: "Korean" },
    { key: "mediterranean", label: "Mediterranean" },
  ];

  const dietaryRestrictionsOptions = [
    // { key: "none", label: "Select restrictions" },
    { key: "gluten-free", label: "Gluten-Free" },
    { key: "lactose-intolerant", label: "Lactose-Intolerant" },
  ];

  const onSubmit = async (values: z.infer<typeof generatePlanSchema>) => {
    try {
      // const response = await generateMealPlan(values);
      // if (response.error) {
      //   setError(response.message);
      // } else {
      //   setSuccess(response.message);
      //   router.push("/generate-meal-plan");
      // }
      await new Promise((resolve) => setTimeout(resolve, 5000));
      console.log(values);
    } catch (error) {
      setError("Something went wrong");
      console.log(error);
    } finally {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="dailyCalorieGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Daily Calorie Goal</FormLabel>
              <FormControl>
                <Input placeholder="Amount of calories" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dietType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Diet Type</FormLabel>
              <FormControl>
                <CustomSelect
                  label="Diet Type"
                  options={dietTypeOptions}
                  field={field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferredCuisine"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Preferred Cuisine</FormLabel>
              <FormControl>
                <CustomSelect
                  label="Preferred Cuisine"
                  options={preferredCuisineOptions}
                  field={field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="allergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Allergies</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Leave blank if none"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dietaryRestrictions"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">
                Dietary Restrictions
              </FormLabel>
              <FormControl>
                <MultiSelect
                  options={dietaryRestrictionsOptions}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Select dietary restrictions"
                  variant="default"
                  animation={2}
                  maxCount={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Budget</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Optional budget amount"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="snack"
          render={({ field }) => (
            <FormItem className="flex-row items-center gap-2">
              <FormLabel className="text-primary">Include snack</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormError text={error} />
        <FormSuccess text={success} />

        <div>
          <SubmitButton isLoading={form.formState.isSubmitting}>
            Generate Plan
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};

export default GeneratePlanForm;
