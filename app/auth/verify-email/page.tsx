import { Container } from "@/components/container";

type Params = {
  token: string;
};

const VerifyEmailPage = async ({ params }: { params: Params }) => {
  const { token } = await params;

  return (
    <Container className="flex h-screen items-center justify-center">
      Verifiy Email Page
    </Container>
  );
};

export default VerifyEmailPage;
