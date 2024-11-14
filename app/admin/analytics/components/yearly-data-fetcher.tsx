"use client";

import { useState, useTransition, useCallback, useEffect } from "react";
import { fetchDataForYear, getDistinctYears, YearData } from "@/server/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoaderCircle } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function YearlyDataFetcher() {
  const [year, setYear] = useState<number | null>(null);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [data, setData] = useState<YearData[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchYears = async () => {
      const years = await getDistinctYears();
      setAvailableYears(years);
      if (years.length > 0) {
        setYear(years[0]);
        fetchDataForSelectedYear(years[0]);
      }
    };
    fetchYears();
  }, []);

  const fetchDataForSelectedYear = useCallback((selectedYear: number) => {
    startTransition(async () => {
      const newData = await fetchDataForYear(selectedYear);
      setData(newData);
    });
  }, []);

  const handleYearChange = useCallback(
    (newYear: string) => {
      const yearNumber = parseInt(newYear, 10);
      setYear(yearNumber);
      fetchDataForSelectedYear(yearNumber);
    },
    [fetchDataForSelectedYear]
  );

  if (!year)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader">Loading data, please wait...</div>
      </div>
    );

  const totalLandingPrice = data.reduce(
    (acc, curr) => acc + (curr.costs?.landingCost ?? 0),
    0
  );
  const totalSellingPrice = data.reduce(
    (acc, curr) => acc + (curr?.sales?.actualSellingPrice ?? 0),
    0
  );
  const totalMargin = totalSellingPrice - totalLandingPrice;
  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Yearly Data Summary</h1>
      <div className="w-[180px]">
        <Select value={year.toString()} onValueChange={handleYearChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a year" />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {isPending ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader">
            <LoaderCircle size={30} className="animate-spin" />
          </div>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>
              <CardDescription>
                {/* display the sum of landing price , selling price and margin */}
                <div>
                  Total Landing Price:{" "}
                  {totalLandingPrice.toLocaleString("en-KE", {
                    style: "currency",
                    currency: "KES",
                    trailingZeroDisplay: "stripIfInteger",
                    compactDisplay: "short",
                  })}
                </div>
                <div>
                  Total Selling Price:{" "}
                  {totalSellingPrice.toLocaleString("en-KE", {
                    style: "currency",
                    currency: "KES",
                    trailingZeroDisplay: "stripIfInteger",
                    compactDisplay: "short",
                  })}
                </div>
                <div>
                  Total Margin:{" "}
                  {totalMargin.toLocaleString("en-KE", {
                    style: "currency",
                    currency: "KES",
                    trailingZeroDisplay: "stripIfInteger",
                    compactDisplay: "short",
                  })}
                </div>
              </CardDescription>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable data={data} columns={columns} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
