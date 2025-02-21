"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { newVerification } from "@/actions/newVerification";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";

const VerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = useCallback(async () => {
    if (success || error) return;

    if (!token) {
      return;
    }

    try {
      const response = await newVerification(token);

      if (response?.error) {
        setError(response.message);
      } else {
        setSuccess(response.message);
      }
    } catch (error) {
      setError("Something went wrong");
      console.log(error);
    }
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 p-5 border w-full lg:w-1/2 xl:w-1/3 mx-auto rounded shadow-md flex flex-col items-center justify-center"
    >
      {error && success && (
        <p className="text-2xl font-bold">Verifying Email...</p>
      )}
      {error && <FormError text={error} />}
      {success && <FormSuccess text={success} />}
    </form>
  );
};

export default VerificationForm;
