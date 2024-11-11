"use client";

import { Frown, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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

export const description = "A stacked area chart";

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]

const chartConfig = {
  totalCost: {
    label: "Total Cost",
    color: "hsl(var(--chart-1))",
  },
  totalSelling: {
    label: "Total Selling Price",
    color: "hsl(var(--chart-2))",
  },
  margin: {
    label: "Margin",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function AreaComponent({ chartData }: { chartData: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Cost, Selling Price & Margins</CardTitle>
        <CardDescription>
          Showing total numbers for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="totalCost"
                type="natural"
                fill="var(--color-mobile)"
                fillOpacity={0.4}
                stroke="var(--color-totalCost)"
                stackId="a"
              />
              <Area
                dataKey="totalSelling"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-totalSelling)"
                stackId="a"
              />
              <Area
                dataKey="margin"
                type="natural"
                fill="var(--color-margin)"
                fillOpacity={0.4}
                stroke="var(--color-margin)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-32">
            <p>There is no data to display right now.</p>
            <Frown className="h-8 w-8" />
          </div>
        )}
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
}
