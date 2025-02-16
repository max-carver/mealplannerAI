"use client";

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
import { LoginSchema } from "@/lib/formSchemas";
import loginUser from "@/actions/loginUser";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import Link from "next/link";

const LoginForm = () => {
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    try {
      const response = await loginUser(values);

      if (response?.error) {
        setError(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <div className="space-y-4 p-5 border w-full lg:w-1/2 xl:w-1/3 mx-auto rounded shadow-md">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
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
            Login
          </SubmitButton>
        </form>

        <div className="flex items-center justify-center">
          <Link
            href="/auth/register"
            className="hover:underline underline-offset-1 text-sm text-muted-foreground text-center align-center"
          >
            Don't have an account?
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
            <FcGoogle /> Login with Google
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default LoginForm;
