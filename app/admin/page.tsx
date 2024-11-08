import { getSession } from "@/auth";
import { redirect } from "next/navigation";

async function page() {
  const user = await getSession();
  console.log(user);
  if (!user) {
    redirect("/signin");
  }
//   return <div>page</div>;
}

export default page;
