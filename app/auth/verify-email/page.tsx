import { Container } from "@/components/container";
import VerificationForm from "@/components/forms/VerificationForm";

const VerifyEmailPage = async () => {
  return (
    <Container className="flex h-screen items-center justify-center">
      <VerificationForm />
    </Container>
  );
};

export default VerifyEmailPage;
