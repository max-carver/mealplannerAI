"use client";

import * as z from "zod";
import { generatePlanSchema } from "@/lib/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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

const GeneratePlanForm = () => {
  const form = useForm<z.infer<typeof generatePlanSchema>>({
    resolver: zodResolver(generatePlanSchema),
    defaultValues: {
      dailyCalorieGoal: "",
      dietType: "",
      preferredCuisine: "",
      allergies: "",
      dietaryRestrictions: [],
      budget: "",
    },
  });

  const dietTypeOptions = [
    { key: "halaal", label: "Halaal" },
    { key: "kosher", label: "Kosher" },
    { key: "vegetarian", label: "Vegetarian" },
    { key: "vegan", label: "Vegan" },
    { key: "paleo", label: "Paleo" },
    { key: "keto", label: "Keto" },
  ];

  const preferredCuisineOptions = [
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
    { key: "gluten-free", label: "Gluten-Free" },
    { key: "lactose-intolerant", label: "Lactose-Intolerant" },
  ];

  const onSubmit = (values: z.infer<typeof generatePlanSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-5 border w-full lg:w-1/2 xl:w-1/3  mx-auto rounded shadow-md"
      >
        <FormField
          control={form.control}
          name="dailyCalorieGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Daily Calorie Goal</FormLabel>
              <FormControl>
                <Input placeholder="2000" {...field} />
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
                  placeholder="Nuts, shellfish, soy etc"
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
                <Input {...field} placeholder="2000" className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button type="submit" className="w-full mt-2">
            Generate Plan
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default GeneratePlanForm;
