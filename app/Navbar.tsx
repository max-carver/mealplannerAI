"use client";

import { Container } from "@/components/container";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/mealplanlogo.svg";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import UserButton from "@/components/forms/UserButton";

export default function Navbar() {
  const { data: session, status } = useSession();
  return (
    <Container>
      <nav className=" flex justify-between items-center h-20">
        <Link href="/" className="text-3xl font-bold flex items-center gap-0.5">
          <Image src={logo} alt="logo" width={25} height={25} />
          <div>
            Meal<span className="text-primary">PlannerAI</span>
          </div>
        </Link>

        {/*  <ThemeToggle /> */}

        {status === "loading" ? (
          <Loader2 className="size-8 text-primary animate-spin" />
        ) : session ? (
          <UserButton />
        ) : (
          <div className="flex items-center gap-0.5">
            <Link href="/auth/login">
              <Button variant="link" size="lg">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" className="rounded-full">
                Get Started{" "}
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </Container>
  );
}
