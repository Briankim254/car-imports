"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { toast } from "sonner";
import { Car, Costs, Dates, Sales } from "@prisma/client";
import { Deletecar } from "@/server/actions";
import { formatDate } from "date-fns";

type Vehicle = Car & {
  dates: Dates | null;
  costs: Costs | null;
  sales: Sales | null;
};

export const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "registration",
    header: "Registration",
  },
  {
    header: "Customer Acquisition",
    cell: ({ row }) => {
      const vehicle = row.original;
      return (
        <div>
          <div>
            {vehicle?.dates?.customerAcquisitionDate
              ? formatDate(
                  new Date(vehicle.dates.customerAcquisitionDate),
                  "dd/MM/yyyy"
                )
              : ""}
          </div>
        </div>
      );
    },
  },
  {
    id: "totalCost",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Cost(ksh)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const vehicle = row.original;
      return (
        <div>
          {vehicle.costs?.totalCost
            ? vehicle.costs.totalCost.toLocaleString("en-KE", {
                style: "currency",
                currency: "KES",
                trailingZeroDisplay: "stripIfInteger",
                compactDisplay: "short",
              })
            : ""}
        </div>
      );
    },
  },
  {
    id: "actualSellingPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Actual Selling Price(ksh)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const vehicle = row.original;
      return (
        <div>
          {vehicle.sales?.actualSellingPrice
            ? vehicle.sales.actualSellingPrice.toLocaleString("en-KE", {
                style: "currency",
                currency: "KES",
                trailingZeroDisplay: "stripIfInteger",
                compactDisplay: "short",
              })
            : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "chasisNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Chasis Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Created At",
  //   cell: ({ row }) => {
  //     const date = new Date(row.original.createdAt);
  //     const formatted = formatDate(date, "dd/MM/yyyy");
  //     return <div>{formatted}</div>;
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const vehicle = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`/admin/vehicles/vehicle/${vehicle.id}`}>
              <DropdownMenuItem>View Vehicle</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>Toggle user verification</DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={async () => {
                toast.promise(Deletecar(vehicle.id), {
                  loading: "Deleting vehicle...",
                  success: "Vehicle deleted",
                  error: (err) => `${err}`,
                });
              }}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              Delete Vehicle
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
