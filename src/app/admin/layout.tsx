import AdminShell from "@/components/admin/AdminShell";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    redirect("/auth");
  }

  return <AdminShell>{children}</AdminShell>;
}
