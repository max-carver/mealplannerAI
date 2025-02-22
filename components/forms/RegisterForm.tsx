"use client";

import { RegisterSchema } from "@/lib/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import registerUser from "@/actions/registerUser";
import SubmitButton from "@/components/forms/SubmitButton";
import FormError from "@/components/forms/FormError";
import FormSuccess from "@/components/forms/FormSuccess";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const RegisterForm = () => {
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    try {
      const response = await registerUser(values);

      if (response.error) {
        setError(response.message);
      } else {
        setSuccess(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <div className="form">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
          <h2 className="text-4xl font-bold text-center">Create an account</h2>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="j.wick@gmail.com"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="At least 8 characters"
                      {...field}
                      type={showPassword ? "text" : "password"}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {!showPassword ? <Eye /> : <EyeOff />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError text={error} />
          <FormSuccess text={success} />

          <SubmitButton isLoading={form.formState.isSubmitting}>
            Get Started
          </SubmitButton>
        </form>

        <div className="flex items-center justify-center">
          <Link
            href="/auth/login"
            className="hover:underline underline-offset-1 text-sm text-muted-foreground text-center align-center"
          >
            Already have an account?
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2">
          <div className="w-full h-[1px] bg-gray-300"></div>
          <div className="text-gray-500">or</div>
          <div className="w-full h-[1px] bg-gray-300"></div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/dashboard",
              })
            }
          >
            <FcGoogle /> Register with Google
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default RegisterForm;
