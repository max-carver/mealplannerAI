"use client";

import { Container } from "@/components/container";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <Container>
      <nav className=" flex justify-between items-center h-16">
        <Link href="/" className="text-2xl font-bold">
          Meal<span className="text-primary">PlannerAI</span>
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
