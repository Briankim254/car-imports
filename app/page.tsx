import { getSession } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getSession();

  if (!user) {
    redirect("/signin");
  }

  if (user) {
    redirect("/admin/dashboard");
  }
  return (
    <>
      <main className="">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          Welcome to Canvas Control
        </div>
      </main>
    </>
  );
}
