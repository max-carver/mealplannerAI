import { Container } from "@/components/container";
import Image from "next/image";
import logo from "@/public/mealplanlogo.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <Container className="flex items-center flex-col gap-10 w-full justify-center h-[calc(100vh-80px)]">
      <div className="flex items-center gap-2 ">
        <Image src={logo} alt="logo" width={100} height={100} />
        <h1 className="text-[96px] font-bold">
          Meal<span className="text-primary">PlannerAI</span>
        </h1>
      </div>
      <Link href="/generate-meal-plan">
        <Button size="2xl" className="rounded-full" variant="secondary">
          Get Started{" "}
        </Button>
      </Link>
    </Container>
  );
}
