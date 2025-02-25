import { Container } from "@/components/container";
import { MealPlanGenerator } from "./MealPlanGenerator";

const GenerateMealPlanPage = () => {
  return (
    <Container className="flex items-center justify-center h-[calc(100vh-80px)]">
      <MealPlanGenerator />
    </Container>
  );
};

export default GenerateMealPlanPage;
