import { Container } from "@/components/container";
import LoginForm from "@/components/forms/LoginForm";

const LoginPage = () => {
  return (
    <Container className="flex items-center justify-center h-[calc(100vh-64px)]">
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
