import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/require-admin";

export default async function AdminLayout({ children }) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const admin = await getAdminUser();
  if (!admin) {
    redirect("/");
  }

  return children;
}
