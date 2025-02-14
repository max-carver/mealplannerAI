import { Container } from "@/components/container";
import GeneratePlanForm from "@/components/forms/GeneratePlanForm";

export default function Home() {
  return (
    <Container className="flex items-center w-full justify-center h-[calc(100vh-72px)]">
      <GeneratePlanForm />
    </Container>
  );
}
