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
        <DataTable data={data} columns={columns} />
      )}
    </div>
  );
}
