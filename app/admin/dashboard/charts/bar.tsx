"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple bar chart";

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];

const chartConfig = {
  totalCost: {
    label: "Total Cost",
    color: "hsl(var(--chart-1))",
  },
  totalSelling: {
    label: "Total Selling Price",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function BarComponent({ chartData }: { chartData: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progresive Yearly Cost, Selling Price</CardTitle>
        <CardDescription>
          Compare the total cost and selling price of cars yearly to date.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.toString()}
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => `ksh${(value / 1_000_000).toFixed(1)}M`}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="line"  />}
            />
            <Bar dataKey="totalCost" fill="var(--color-totalCost)" radius={4} />
            <Bar
              dataKey="totalSelling"
              fill="var(--color-totalSelling)"
              radius={4}
            />
            </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
