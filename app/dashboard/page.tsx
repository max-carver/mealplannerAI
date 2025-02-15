import logoutUser from "@/actions/logoutUser";
import { auth } from "@/auth";
import { Container } from "@/components/container";
import SubmitButton from "@/components/forms/SubmitButton";

const DashboardPage = async () => {
  const session = await auth();

  return (
    <Container>
      {JSON.stringify(session)}{" "}
      <SubmitButton onClick={logoutUser}>Logout</SubmitButton>
    </Container>
  );
};

export default DashboardPage;
