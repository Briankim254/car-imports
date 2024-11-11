import prisma from "@/prisma/prisma";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateTotalDuration = (
  startDate: Date | null | undefined,
  endDate: Date | null | undefined
): number | null => {
  return startDate && endDate
    ? Math.round(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      )
    : null;
};

export async function getYearlyCostAndSales() {
  // Fetch costs and sales along with the dates for grouping by year
  const costsAndSalesByYear = await prisma.dates.findMany({
    select: {
      exitFromPortDate: true,
      finalClientPaymentDate: true,
      car: {
        select: {
          costs: {
            select: {
              totalCost: true,
            },
          },
          sales: {
            select: {
              actualSellingPrice: true,
            },
          },
        },
      },
    },
  });

  // Aggregate costs and sales based on the month extracted from `exitFromPortDate` and `finalClientPaymentDate`
  const yearlyData: {
    [key: number]: { totalCost: number; totalSelling: number };
  } = {};

  costsAndSalesByYear.forEach(
    ({ exitFromPortDate, finalClientPaymentDate, car }) => {
      // Determine the year from `exitFromPortDate` or `finalClientPaymentDate`
      const year = (exitFromPortDate || finalClientPaymentDate)?.getFullYear();

      if (year) {
        if (!yearlyData[year]) {
          yearlyData[year] = { totalCost: 0, totalSelling: 0 };
        }

        // Sum up total cost and actual selling price per year
        yearlyData[year].totalCost += car?.costs?.totalCost || 0;
        yearlyData[year].totalSelling += car?.sales?.actualSellingPrice || 0;
      }
    }
  );

  // Format the data into the chart data structure
  const chartData = Object.keys(yearlyData).map((year) => ({
    year: year.toString(),
    totalCost: yearlyData[Number(year)].totalCost,
    totalSelling: yearlyData[Number(year)].totalSelling,
    margin:
      yearlyData[Number(year)].totalSelling -
      yearlyData[Number(year)].totalCost,
  }));

  return chartData;
}

export async function getmonthlyCostAndSales() {
  // Fetch costs and sales along with the dates for grouping by month for the last 6 months
  const costsAndSalesByMonth = await prisma.dates.findMany({
    select: {
      exitFromPortDate: true,
      finalClientPaymentDate: true,
      car: {
        select: {
          costs: {
            select: {
              totalCost: true,
            },
          },
          sales: {
            select: {
              actualSellingPrice: true,
            },
          },
        },
      },
    },
    where: {
      OR: [
        {
          exitFromPortDate: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
          },
        },
        {
          finalClientPaymentDate: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
          },
        },
      ],
    },
  });

  // Aggregate costs and sales based on the past 6 months extracted from `exitFromPortDate` and `finalClientPaymentDate`
  const monthlyyData: {
    [key: number]: { totalCost: number; totalSelling: number };
  } = {};

  costsAndSalesByMonth.forEach(
    ({ exitFromPortDate, finalClientPaymentDate, car }) => {
      // Determine the month from `exitFromPortDate` or `finalClientPaymentDate`
      const month = (exitFromPortDate || finalClientPaymentDate)?.getMonth();

      if (month) {
        if (!monthlyyData[month]) {
          monthlyyData[month] = { totalCost: 0, totalSelling: 0 };
        }

        // Sum up total cost and actual selling price per month
        monthlyyData[month].totalCost += car?.costs?.totalCost || 0;
        monthlyyData[month].totalSelling += car?.sales?.actualSellingPrice || 0;
      }
    }
  );

  // Format the data into the chart data structure
  const chartData = Object.keys(monthlyyData).map((month) => ({
    month: new Date(0, Number(month)).toLocaleString("default", {
      month: "short",
    }),
    totalCost: monthlyyData[Number(month)].totalCost,
    totalSelling: monthlyyData[Number(month)].totalSelling,
    margin:
      monthlyyData[Number(month)].totalSelling -
      monthlyyData[Number(month)].totalCost,
  }));

  return chartData;
}
