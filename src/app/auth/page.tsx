import AuthContainer from "@/components/auth/AuthContainer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AuthPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  if (token) {
    redirect("/seller-dashboard");
  }
  return <AuthContainer />;
};

export default AuthPage;
