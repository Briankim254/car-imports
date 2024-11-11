import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/theme-switcher";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb";
import { getSession, logout } from "@/auth";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();
  if (!user) {
    redirect("/signin");
  }
  return (
    <SidebarProvider>
      <AppSidebar userData={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DynamicBreadcrumb />
          </div>
          <div className="px-4">
            <ModeToggle />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

// export const LogoutButton = () => {
//   return (
//     <form
//       action={async () => {
//         "use server";
//         await logout();
//         redirect("/");
//       }}
//     >
//       <DropdownMenuItem>
//         <button className="w-full text-left text-red-500">Sign Out</button>
//       </DropdownMenuItem>
//     </form>
//   );
// };
