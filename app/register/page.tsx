import { Container } from "@/components/container";
import RegisterForm from "@/components/forms/RegisterForm";
const RegisterPage = () => {
  return (
    <Container className="flex items-center justify-center h-[calc(100vh-64px)]">
      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;
