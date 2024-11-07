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
  const res = await prisma.car.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      dates: true,
      costs: true,
      sales: true,
    },
  });

  return res;
}

export default async function Home() {
  const vehicle = await getData();

  return (
    <>
      <div className="mx-auto px-2">
        <div className="flex items-center mx-4 my-3">
          <div className="ml-auto flex items-center gap-2">
            <Link href="/admin/vehicles/vehicle/create" className="">
              <Button size="sm" className="h-8 gap-1 ">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sm:whitespace-nowrap hidden sm:block">
                  Add Vehicle
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Vehicles</CardTitle>
            <CardDescription>List of all vehicles</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={vehicle} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
