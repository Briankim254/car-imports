import { getSession } from "@/auth";
import { redirect } from "next/navigation";

const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
  const user = await getSession();

  if (user) {
    redirect("/admin/dashboard");
  }

  return <div>{children}</div>;
};

export default LayoutPage;
