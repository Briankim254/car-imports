import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import prisma from "@/prisma/prisma";

async function getData() {
  const res = await prisma.user.findMany({
    orderBy: {
      id: "desc",
    },
  });
  return res;
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <div className="mx-auto px-2">
        <div className="flex items-center mx-4 my-3">
          <div className="ml-auto flex items-center gap-2">
            <Link href="/admin/users/create" className="">
              <Button size="sm" className="h-8 gap-1 ">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sm:whitespace-nowrap hidden sm:block">
                  Add User
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Portal Users</CardTitle>
            <CardDescription>List of all Platform users</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={data} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
