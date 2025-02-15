"use client";

import { Container } from "@/components/container";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/mealplanlogo.svg";

export default function Navbar() {
  return (
    <Container>
      <nav className=" flex justify-between items-center h-16">
        <Link href="/" className="text-3xl font-bold flex items-center gap-0.5">
          <Image src={logo} alt="logo" width={25} height={25} />
          <div>
            Meal<span className="text-primary">PlannerAI</span>
          </div>
        </Link>
        <Button variant="outline">Outline</Button>
        <Button variant="default">Default</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <ThemeToggle />
      </nav>
    </Container>
  );
}
