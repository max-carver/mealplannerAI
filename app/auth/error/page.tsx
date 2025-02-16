import { CircleXIcon } from "lucide-react";

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <CircleXIcon className="size-8 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
          Authentication Error
        </h1>
        <p className="text-muted-foreground">
          {searchParams.error || "Something went wrong."}
        </p>
        <div>
          <a
            href="/login"
            className="text-sm text-blue-500 hover:text-blue-600"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
