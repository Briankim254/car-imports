"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import {
  Activity,
  Anchor,
  Car,
  HandCoins,
  Home,
  LineChart,
  PanelLeft,
  Users2,
} from "lucide-react";
import Link from "next/link";
// import { SiMedibangpaint } from "react-icons/si";
import { usePathname } from "next/navigation";

function HeaderSheet() {
  const pathname = usePathname();
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className={`group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base
                ${pathname === "" ? "text-accent-foreground bg-accent" : ""}`}
            >
              <Anchor className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Pixels & Paint</span>
            </Link>
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground rounded-md
                ${
                  pathname === "/admin/dashboard"
                    ? "text-accent-foreground bg-accent"
                    : ""
                }`}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/admin/analytics"
              className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground rounded-md
              ${
                pathname === "/admin/analytics"
                  ? "text-accent-foreground bg-accent"
                  : ""
              }`}
            >
              <Activity className="h-5 w-5" />
              Analytics
            </Link>
            <Link
              href="/admin/vehicles"
              className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground rounded-md
                ${
                  pathname === "/admin/vehicles"
                    ? "text-accent-foreground bg-accent"
                    : ""
                }`}
            >
              <Car className="h-5 w-5" />
              Vehicles
            </Link>
            <Link
              href="/admin/investors"
              className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground rounded-md
              ${
                pathname === "/admin/investors"
                  ? "text-accent-foreground bg-accent"
                  : ""
              }`}
            >
              <HandCoins className="h-5 w-5" />
              Investors
            </Link>
            <Link
              href="/admin/users"
              className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground rounded-md
              ${
                pathname === "/admin/users"
                  ? "text-accent-foreground bg-accent"
                  : ""
              }`}
            >
              <Users2 className="h-5 w-5" />
              Users
            </Link>
            <Link
              href="/admin/settings"
              className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground rounded-md
                ${
                  pathname === "/admin/settings"
                    ? "text-accent-foreground bg-accent"
                    : ""
                }`}
            >
              <LineChart className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default HeaderSheet;
