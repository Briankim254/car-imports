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
import { Deletecar, YearData } from "@/server/actions";
import { formatDate } from "date-fns";

export const columns: ColumnDef<YearData>[] = [
  {
    accessorKey: "brand",
    header: "Unit",
  },
  {
    id: "totalCost",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Landing Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div>
          {data.costs?.landingCost
            ? data.costs.landingCost.toLocaleString("en-KE", {
                style: "currency",
                currency: "KES",
                trailingZeroDisplay: "stripIfInteger",
                compactDisplay: "short",
              })
            : "-"}
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
          Actual Selling Price
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
            : "-"}
        </div>
      );
    },
  },
  {
    id: "margin",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Margin
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const vehicle = row.original;
      const margin =
        (vehicle.sales?.actualSellingPrice ?? 0) -
        (vehicle.costs?.landingCost ?? 0);
      return (
        <div>
          {margin
            ? margin.toLocaleString("en-KE", {
                style: "currency",
                currency: "KES",
                trailingZeroDisplay: "stripIfInteger",
                compactDisplay: "short",
              })
            : "-"}
        </div>
      );
    },
  },
  {
    id: "actualMargin",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Actual Margin
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const vehicle = row.original;
      return <div>{"-"}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.original.dates?.exitFromPortDate
        ? new Date(row.original.dates.exitFromPortDate)
        : null;
      const formatted = date ? formatDate(date, "dd/MM/yyyy") : "-";
      return <div>{formatted}</div>;
    },
  },
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
            <Link href={`/admin/vehicles/vehicle/${vehicle.id}`}>
              <DropdownMenuItem>Add Remark</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
