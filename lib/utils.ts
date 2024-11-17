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
  // Fetch costs and sales along with the dates for grouping by month for the last 12 months
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
            gte: new Date(new Date().setMonth(new Date().getMonth() - 12)),
          },
        },
        {
          finalClientPaymentDate: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 12)),
          },
        },
      ],
    },
  });

  // Initialize monthly data for the past 12 months
  const monthlyData: {
    [key: number]: { totalCost: number; totalSelling: number };
  } = {};

  for (let i = 0; i < 12; i++) {
    const month = new Date(
      new Date().setMonth(new Date().getMonth() - i)
    ).getMonth();
    monthlyData[month] = { totalCost: 0, totalSelling: 0 };
  }

  // Aggregate costs and sales based on the past 12 months extracted from `exitFromPortDate` and `finalClientPaymentDate`
  costsAndSalesByMonth.forEach(
    ({ exitFromPortDate, finalClientPaymentDate, car }) => {
      // Determine the month from `exitFromPortDate` or `finalClientPaymentDate`
      const month = (exitFromPortDate || finalClientPaymentDate)?.getMonth();

      if (month !== undefined) {
        // Sum up total cost and actual selling price per month
        monthlyData[month].totalCost += car?.costs?.totalCost || 0;
        monthlyData[month].totalSelling += car?.sales?.actualSellingPrice || 0;
      }
    }
  );

  // Format the data into the chart data structure
  const chartData = Object.keys(monthlyData).map((month) => ({
    month: new Date(0, Number(month)).toLocaleString("default", {
      month: "short",
    }),
    totalCost: monthlyData[Number(month)].totalCost,
    totalSelling: monthlyData[Number(month)].totalSelling,
    margin:
      monthlyData[Number(month)].totalSelling -
      monthlyData[Number(month)].totalCost,
  }));

  return chartData;
}
