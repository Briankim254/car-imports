import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import {
  Car,
  Calendar,
  DollarSign,
  PieChart,
  CreditCard,
  MessageSquare,
  Users,
} from "lucide-react";
import prisma from "@/prisma/prisma";
import EditVehicleForm from "./(forms)/edit-car-form";
import ModifyDatesForm from "./(forms)/modify-dates-form";
import ModifyRemarksForm from "./(forms)/modify-remarks-form";
import ModifyCostForm from "./(forms)/modify-costs-form";
import ModifySalesForm from "./(forms)/modify-sales-form";
import ModifyCreditForm from "./(forms)/modify-credit-sales-form";
import VehicleInvestments from "./(forms)/investments/main-index";

async function getData(id: string) {
  const data = await prisma.car.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      creditSales: true,
      investments: {
        include: {
          investor: true,
        },
      },
      remarks: true,
      costs: true,
      sales: true,
      dates: true,
      margins: true,
    },
  });

  return data;
}

export default async function VehicleBentoDashboardComponent({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      formatMatcher: "best fit",
      // year: "numeric",
      // month: "short",
      // day: "numeric",
    });
  };
  const getProgressPercentage = (current: number, total: number) => {
    return total > 0 ? (current / total) * 100 : 0;
  };
  const absolute =
    (data?.sales?.actualSellingPrice ?? 0) - (data?.costs?.totalCost ?? 0);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Main Info Card */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex items-center space-x-2 text-xl font-bold">
              <Car className="h-6 w-6 text-muted-foreground" />
              <div className="">Vehicle Overview</div>
            </CardTitle>
            <div className="">{data && <EditVehicleForm {...data} />}</div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">
                  Brand
                </p>
                <p className="text-2xl font-bold">{data?.brand}</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">
                  Chasis Number
                </p>
                <p className="text-2xl font-bold">{data?.chasisNumber}</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">
                  Registration
                </p>
                <p className="text-2xl font-bold">
                  {data?.registration || "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row items-center justify-between border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
              Created{" "}
              <time>
                {data?.createdAt
                  ? new Date(data.createdAt).toDateString()
                  : "N/A"}
              </time>
            </div>
          </CardFooter>
        </Card>
        <div className="col-span-1 row-span-2">
          {/* Dates Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-bold">
                Important Dates
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                {data?.id && (
                  <ModifyDatesForm
                    id={data.id}
                    dates={data?.dates ?? undefined}
                  />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                  <span className="text-sm font-medium text-muted-foreground">
                    Order Date
                  </span>
                  <span className="text-sm font-bold">
                    {data?.dates?.orderDate
                      ? formatDate(data?.dates?.orderDate)
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                  <span className="text-sm font-medium text-muted-foreground">
                    Final Payment
                  </span>
                  <span className="text-sm font-bold">
                    {data?.dates?.finalPaymentDate
                      ? formatDate(data?.dates?.finalPaymentDate)
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                  <span className="text-sm font-medium text-muted-foreground">
                    Delivery at Port
                  </span>
                  <span className="text-sm font-bold">
                    {data?.dates?.deliveryAtPortDate
                      ? formatDate(data?.dates?.deliveryAtPortDate)
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                  <span className="text-sm font-medium text-muted-foreground">
                    Exit from Port
                  </span>
                  <span className="text-sm font-bold">
                    {data?.dates?.exitFromPortDate
                      ? formatDate(data?.dates?.exitFromPortDate)
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                  <span className="text-sm font-medium text-muted-foreground">
                    Customer Acquisition
                  </span>
                  <span className="text-sm font-bold">
                    {data?.dates?.customerAcquisitionDate
                      ? formatDate(data?.dates?.customerAcquisitionDate)
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                  <span className="text-sm font-medium text-muted-foreground">
                    Final Client Payment
                  </span>
                  <span className="text-sm font-bold">
                    {data?.dates?.finalClientPaymentDate
                      ? formatDate(data?.dates?.finalClientPaymentDate)
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                  <span className="text-sm font-medium text-muted-foreground">
                    Total Duration
                  </span>
                  <span className="text-sm font-bold">
                    {data?.dates?.totalDuration}{" "}
                    {(data?.dates?.totalDuration ?? 0) > 1
                      ? "days"
                      : data?.dates?.totalDuration === 0
                      ? "day"
                      : "-"}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-row items-center justify-start border-t bg-muted/50 px-6 py-3">
              {data?.updatedAt && (
                <div className="text-xs text-muted-foreground">
                  Last updated{" "}
                  <time>{new Date(data.updatedAt).toDateString()}</time>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
        {/* Sales Card */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">
              Sales Information
            </CardTitle>
            <div className="flex items-center space-x-2">
              <PieChart className="h-4 w-4 text-muted-foreground" />
              {data?.id && (
                <ModifySalesForm
                  id={data.id}
                  sales={data?.sales ?? undefined}
                  totalCost={data?.costs?.totalCost ?? 0}
                />
              )}
            </div>
          </CardHeader>
          <CardContent>
            {data?.sales && (
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                  <span className="text-sm font-medium text-muted-foreground">
                    Target Markup(%){" "}
                  </span>
                  <span className="text-sm font-bold">
                    {`${data?.sales.targetMarkup}%`}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                  <span className="text-sm font-medium text-muted-foreground">
                    Target Selling Price
                  </span>
                  <span className="text-sm font-bold">
                    {data?.sales.targetSellingPrice.toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                  <span className="text-sm font-medium text-muted-foreground">
                    Actual Selling Price
                  </span>
                  <span className="text-sm font-bold">
                    {" "}
                    {data?.sales.actualSellingPrice.toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                  <span className="text-xs font-medium text-muted-foreground">
                    Discount / Premium(%){" "}
                  </span>
                  <span className="text-sm font-bold">
                    {(data?.sales.discountPremium || 0).toFixed(2)} %
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Margins Card */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">Margins</CardTitle>
            <div className="flex items-center space-x-2">
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    Absolute Margin
                  </span>
                  <span className="text-sm font-bold">
                    {absolute.toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                  </span>
                </div>
                <Progress
                  value={getProgressPercentage(
                    Number(
                      (data?.creditSales?.amountPaidSoFar ?? 0).toFixed(2)
                    ),
                    data?.sales?.actualSellingPrice ?? 0
                  )}
                  className="h-2"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    Percentage Margin
                  </span>
                  <span className="text-sm font-bold">
                    {(absolute < 0 && "-") || ""}{" "}
                    {(
                      ((Math.abs(absolute) ?? 0) /
                        (data?.sales?.actualSellingPrice ?? 0) || 0) * 100
                    ).toFixed(2)}
                    %
                  </span>
                </div>
                <Progress
                  value={getProgressPercentage(
                    Number(
                      (data?.creditSales?.amountPaidSoFar ?? 0).toFixed(2)
                    ),
                    data?.sales?.actualSellingPrice ?? 0
                  )}
                  className="h-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credit Sales Card */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">Credit Sales</CardTitle>
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              {data?.id && (
                <ModifyCreditForm
                  id={data.id}
                  credit={data?.creditSales ?? undefined}
                  actualSellingPrice={data?.sales?.actualSellingPrice ?? 0}
                />
              )}
            </div>
          </CardHeader>
          <CardContent>
            {data?.creditSales && (
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                  <span className="text-sm font-medium text-muted-foreground">
                    Amount Paid
                  </span>
                  <span className="text-sm font-bold">
                    {data?.creditSales?.amountPaidSoFar.toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                  <span className="text-sm font-medium text-muted-foreground">
                    Pending Balance
                  </span>
                  <span className="text-sm font-bold">
                    {(data?.creditSales?.pendingBalance || 0).toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                  </span>
                </div>
                {(data?.sales?.actualSellingPrice || 0) >
                  (data?.creditSales?.amountPaidSoFar || 0) && (
                  <Progress
                    value={getProgressPercentage(
                      Number(data?.creditSales?.amountPaidSoFar) ?? 0,
                      Number(data?.sales?.actualSellingPrice) ?? 0
                    )}
                    className="h-2"
                  />
                )}

                <Badge
                  variant={
                    (data?.sales?.actualSellingPrice || 0) >=
                    (data?.creditSales?.amountPaidSoFar || 0)
                      ? "secondary"
                      : "default"
                  }
                >
                  {(data?.sales?.actualSellingPrice || 0) >=
                  (data?.creditSales?.amountPaidSoFar || 0)
                    ? "Paid"
                    : "Pending"}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {data?.creditSales?.paymentNotes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Remarks Card */}
        <div>
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-bold">Remarks</CardTitle>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                {data?.id && (
                  <ModifyRemarksForm
                    id={data.id}
                    remarks={data?.remarks ?? undefined}
                  />
                )}
              </div>
            </CardHeader>
            <CardContent>
              {data?.remarks ? (
                <div className="space-y-2">
                  <p className="text-sm bg-muted/50 p-2 rounded-md">
                    {data?.remarks?.notes}
                  </p>
                  {data?.remarks?.pendingItems && (
                    <div className="bg-muted/50 p-2 rounded-md">
                      <span className="text-sm font-medium text-muted-foreground">
                        Pending Items:
                      </span>
                      <span className="text-sm ml-2">
                        {data.remarks.pendingItems}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <h4 className="text-sm text-muted-foreground">
                    No remarks available
                  </h4>
                </div>
              )}
            </CardContent>
            {data?.remarks?.updatedAt && (
              <CardFooter className="flex flex-row items-center justify-between border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  Last updated{" "}
                  <time>{new Date(data.updatedAt).toDateString()}</time>
                </div>
              </CardFooter>
            )}
          </Card>
        </div>

        {/* Costs Card */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-3 row-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">Costs Breakdown</CardTitle>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              {data?.id && (
                <ModifyCostForm id={data.id} costs={data?.costs ?? undefined} />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {data?.costs ? (
                <>
                  <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">
                      Landing Cost
                    </span>
                    <span className="text-sm font-bold">
                      {(data?.costs?.landingCost ?? 0).toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">
                      Duty
                    </span>
                    <span className="text-sm font-bold">
                       {(data?.costs?.duty ?? 0).toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">
                      Port Charges
                    </span>
                    <span className="text-sm font-bold">
                       {(data?.costs?.portCharges ?? 0).toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">
                      Deliver Order
                    </span>
                    <span className="text-sm font-bold">
                       {(0).toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">
                      Mss Levy
                    </span>
                    <span className="text-sm font-bold">
                       {(0).toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">
                      Rediation
                    </span>
                    <span className="text-sm font-bold">
                       {(0).toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">
                      Fuel and Driver/Lorry
                    </span>
                    <span className="text-sm font-bold">
                       {(data?.costs?.fuelAndDriver ?? 0).toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">
                      Insurance/Kg/Without plates
                    </span>
                    <span className="text-sm font-bold">
                       {(data?.costs?.insurance ?? 0).toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">
                      Broker Cost
                    </span>
                    <span className="text-sm font-bold">
                       {(data?.costs?.brokerCost ?? 0).toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">
                      Service Cost
                    </span>
                    <span className="text-sm font-bold">
                       {(data?.costs?.serviceCost ?? 0).toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">
                      Clearing Cost
                    </span>
                    <span className="text-sm font-bold">
                       {(data?.costs?.clearingCost ?? 0).toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">
                      Agency Cost
                    </span>
                    <span className="text-sm font-bold">
                       {(0).toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">
                      Other Cost
                    </span>
                    <span className="text-sm font-bold">
                       {(data?.costs?.otherCost ?? 0).toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">
                      Total Cost
                    </span>
                    <span className="text-sm font-bold">
                       {(data?.costs?.totalCost ?? 0).toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                    </span>
                  </div>
                  <Separator className="col-span-1 md:col-span-2 lg:col-span-3" />
                  <div className="flex gap2 flex-col bg-muted/50 p-2 rounded-md col-span-1 md:col-span-2 lg:col-span-3">
                    <span className="text-sm font-medium text-muted-foreground">
                      Remarks
                    </span>
                    <span className="text-sm font-light">
                      {data?.costs?.remarks || ""}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center">
                  <h4 className="text-sm text-muted-foreground">
                    No costs data available
                  </h4>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Investments Card */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">Investments</CardTitle>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              {data?.id && <VehicleInvestments carId={data.id} />}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.investments.map((investment, index) => (
                <div
                  key={index}
                  className="space-y-2 bg-muted/50 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      <VehicleInvestments
                        carId={data.id}
                        capitalInvestor={investment}
                      />
                    </span>
                    <span className="text-sm font-bold"></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      Investor
                    </span>
                    <span className="text-sm font-bold">
                      {investment.investor?.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      Initial Amount
                    </span>
                    <span className="text-sm font-bold">
                      {(investment.initialAmount ?? 0).toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      Profit Share
                    </span>
                    <span className="text-sm font-bold">
                      {(investment.profitShare ?? 0).toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      Commission
                    </span>
                    <span className="text-sm font-bold">
                      {(investment.commission ?? 0).toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      Total Balance
                    </span>
                    <span className="text-sm font-bold">
                      {(investment.totalBalance ?? 0).toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                      compactDisplay: "short",
                    })}
                    </span>
                  </div>
                  <Separator />
                  <p className="text-sm text-muted-foreground">
                    {investment.remarks}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
