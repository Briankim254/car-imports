import { TooltipProvider } from "@/components/ui/tooltip";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Sidebar } from "@/components/sidebar";
import HeaderSheet from "@/components/HeaderSheet";
import { ModeToggle } from "@/components/theme-switcher";
import { redirect } from "next/navigation";
// import { SearchCommandDialog } from "@/components/custom-command";
import { getSession, logout } from "@/auth";
import { get } from "http";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    redirect("/signin");
  }
  // if (user?.verification == "UNVERIFIED") {
  //   redirect("/guest/verify");
  // }

  return (
    <>
      <TooltipProvider delayDuration={200}>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <Sidebar />
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <HeaderSheet />
              <div className="relative ml-auto flex-1 md:grow-0">
                {/* <SearchCommandDialog user={user} /> */}
              </div>
              <ModeToggle />
              {user ? (
                <div className="flex items-center gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="overflow-hidden rounded-full"
                      >
                        <Image
                          src={"/placeholder-user.jpg"}
                          width={36}
                          height={36}
                          alt="Avatar"
                          className="overflow-hidden rounded-full"
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>
                        {user?.fname} {user?.lname}
                        <div className="text-sm text-muted-foreground">
                          {user?.email}
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link href="/admin/settings">
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <form
                        action={async () => {
                          "use server";
                          await logout();
                          redirect("/");
                        }}
                      >
                        <DropdownMenuItem>
                          <button className="w-full text-left text-red-500">
                            Sign Out
                          </button>
                        </DropdownMenuItem>
                      </form>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <SignInButton />
              )}
            </header>
            {children}
          </div>
        </div>
      </TooltipProvider>
    </>
  );
};

export default LayoutPage;

async function SignInButton() {
  return (
    <Link href="/signin">
      <Button>Sign In</Button>
    </Link>
  );
}
