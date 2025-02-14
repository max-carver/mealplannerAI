import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 mx-auto w-full",
        className
      )}
      {...props}
    />
  );
}
