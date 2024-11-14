"use server";

import { InvestorFormSchema } from "@/app/admin/investors/investor/create/create-investor-form";
import { EditInvestorFormSchema } from "@/app/admin/investors/investor/[id]/edit-investor-form";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CarFormSchema } from "@/app/admin/vehicles/vehicle/create/create-vehicle-form";
import { DatesFormSchema } from "@/app/admin/vehicles/vehicle/[id]/(forms)/modify-dates-form";
import { calculateTotalDuration } from "@/lib/utils";
import { RemarksFormSchema } from "@/app/admin/vehicles/vehicle/[id]/(forms)/modify-remarks-form";
import { CostsFormSchema } from "@/app/admin/vehicles/vehicle/[id]/(forms)/modify-costs-form";
import { SalesFormSchema } from "@/app/admin/vehicles/vehicle/[id]/(forms)/modify-sales-form";
import { CreditFormSchema } from "@/app/admin/vehicles/vehicle/[id]/(forms)/modify-credit-sales-form";
import { investmentsFormSchema } from "@/app/admin/vehicles/vehicle/[id]/(forms)/investments/modify-investstment";
import { UserFormSchema } from "@/app/admin/users/create/create-user-form";
import { ProfileFormValues } from "@/app/admin/users/user/[id]/profile-form";
import { logout } from "@/auth";
import { z } from "zod";

export const createUser = async (data: UserFormSchema, id?: number) => {
  try {
    const user = await prisma.user.upsert({
      where: { id: id },
      update: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        emailVerified: false,
        phone: data.phone,
      },
      create: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        emailVerified: false,
        phone: data.phone,
      },
    });
    if (!user) {
      return { error: "Failed to create user" };
    }
    revalidatePath("/admin/users");
    return user;
  } catch (error) {
    return { error: ` ${error}` };
  }
};

export const UpdateUser = async (data: ProfileFormValues, id?: number) => {
  try {
    const user = await prisma.user.update({
      where: { id: id },
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        emailVerified: false,
        phone: data.phone,
      },
    });
    if (!user) {
      return { error: "Failed to update user" };
    }
    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/user/${id}`);
    return user;
  } catch (error) {
    return { error: ` ${error}` };
  }
};
export const CreateCar = async (data: CarFormSchema) => {
  try {
    await prisma.car.create({
      data: {
        brand: data.brand,
        chasisNumber: data.chasisNumber,
        registration: data.registration,
      },
    });
  } catch (error) {
    return { error: ` ${error}` };
  }
  revalidatePath("/admin/vehicles");
  return;
};

export const UpdateCar = async (id: number, data: CarFormSchema) => {
  try {
    await prisma.car.update({
      where: { id: id },
      data: {
        brand: data.brand,
        chasisNumber: data.chasisNumber,
        registration: data.registration,
      },
    });
  } catch (error) {
    return { error: ` ${error}` };
  }
  revalidatePath(`/admin/vehicles/vehicle/${id}`);
  return;
};

export const Deletecar = async (id: number) => {
  try {
    await prisma.car.delete({
      where: { id: id },
    });
    revalidatePath("/admin/vehicles");
    return;
  } catch (error) {
    return { error: ` ${error}` };
  }
};

export const CreateInvestor = async (data: InvestorFormSchema) => {
  const investor = await prisma.capitalInvestors.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
    },
  });
  if (!investor) {
    return { error: "Failed to create investor" };
  }
  revalidatePath("/admin/investors");
  return;
};

export const UpdateInvestor = async (
  id: number,
  data: EditInvestorFormSchema
) => {
  const investor = await prisma.capitalInvestors.update({
    where: { id: id },
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
    },
  });
  if (!investor) {
    return { error: "Failed to update investor" };
  }
  revalidatePath("/admin/investors");
  return;
};

export const DeleteInvestor = async (id: number) => {
  try {
    await prisma.capitalInvestors.delete({
      where: { id: id },
    });
    revalidatePath("/admin/investors");
    redirect("/admin/investors");
  } catch (error) {
    return { error: ` ${error}` };
  }
};

export const ModifyDates = async (id: number, data: DatesFormSchema) => {
  try {
    await prisma.dates.upsert({
      where: { carId: id },
      update: {
        orderDate: data.orderDate,
        finalPaymentDate: data.finalPaymentDate,
        deliveryAtPortDate: data.deliveryAtPortDate,
        exitFromPortDate: data.exitFromPortDate,
        customerAcquisitionDate: data.customerAcquisitionDate,
        finalClientPaymentDate: data.finalClientPaymentDate,
        totalDuration: calculateTotalDuration(
          data.customerAcquisitionDate,
          data.finalClientPaymentDate
        ),
      },
      create: {
        carId: id,
        orderDate: data.orderDate,
        finalPaymentDate: data.finalPaymentDate,
        deliveryAtPortDate: data.deliveryAtPortDate,
        exitFromPortDate: data.exitFromPortDate,
        customerAcquisitionDate: data.customerAcquisitionDate,
        finalClientPaymentDate: data.finalClientPaymentDate,
        totalDuration: calculateTotalDuration(
          data.customerAcquisitionDate,
          data.finalClientPaymentDate
        ),
      },
    });
  } catch (error) {
    return { error: ` ${error}` };
  }
  revalidatePath(`/admin/vehicles/vehicle/${id}`);
  revalidatePath("/admin/vehicles");
  return;
};

export const ModifyRemarks = async (id: number, data: RemarksFormSchema) => {
  try {
    await prisma.remarks.upsert({
      where: { carId: id },
      update: {
        notes: data.notes,
      },
      create: {
        carId: id,
        notes: data.notes,
      },
    });
  } catch (error) {
    return { error: ` ${error}` };
  }
  revalidatePath(`/admin/vehicles/vehicle/${id}`);
  revalidatePath("/admin/vehicles");
  return;
};

export const ModifyCosts = async (
  id: number,
  data: CostsFormSchema,
  totalCost: number
) => {
  try {
    await prisma.costs.upsert({
      where: { carId: id },
      update: {
        landingCost: data.landingCost,
        duty: data.duty,
        portCharges: data.portCharges,
        clearingCost: data.clearingCost,
        fuelAndDriver: data.fuelAndDriver,
        insurance: data.insurance,
        serviceCost: data.serviceCost,
        otherCost: data.otherCost,
        totalCost: totalCost,
        remarks: data.remarks,
      },
      create: {
        carId: id,
        landingCost: data.landingCost,
        duty: data.duty,
        portCharges: data.portCharges,
        clearingCost: data.clearingCost,
        fuelAndDriver: data.fuelAndDriver,
        insurance: data.insurance,
        serviceCost: data.serviceCost,
        otherCost: data.otherCost,
        totalCost: totalCost,
        remarks: data.remarks,
      },
    });
  } catch (error) {
    return { error: ` ${error}` };
  }
  revalidatePath(`/admin/vehicles/vehicle/${id}`);
  revalidatePath("/admin/vehicles");
  return;
};

export const ModifySales = async (
  id: number,
  data: SalesFormSchema,
  targetSellingPrice: number
) => {
  try {
    await prisma.sales.upsert({
      where: { carId: id },
      update: {
        targetMarkup: data.targetMarkup,
        actualSellingPrice: data.actualSellingPrice || 0,
        targetSellingPrice: targetSellingPrice,
        discountPremium: data.actualSellingPrice
          ? ((data.actualSellingPrice - targetSellingPrice) /
              targetSellingPrice) *
            100
          : null,
        remarks: data.remarks,
      },
      create: {
        carId: id,
        targetMarkup: data.targetMarkup,
        actualSellingPrice: data.actualSellingPrice || 0,
        targetSellingPrice: targetSellingPrice,
        discountPremium: data.actualSellingPrice
          ? ((data.actualSellingPrice - targetSellingPrice) /
              targetSellingPrice) *
            100
          : null,
        remarks: data.remarks,
      },
    });
  } catch (error) {
    return { error: ` ${error}` };
  }
  revalidatePath(`/admin/vehicles/vehicle/${id}`);
  revalidatePath("/admin/vehicles");
  return;
};

export const ModifyCredit = async (
  id: number,
  data: CreditFormSchema,
  actualSellingPrice: number
) => {
  try {
    const amountPaidSoFar = data.amountPaidSoFar ?? 0;
    const balance =
      actualSellingPrice > amountPaidSoFar
        ? actualSellingPrice - amountPaidSoFar
        : 0;

    await prisma.creditSales.upsert({
      where: { carId: id },
      update: {
        amountPaidSoFar: data.amountPaidSoFar,
        paymentNotes: data.paymentNotes,
        pendingBalance: balance,
        totalAmount: actualSellingPrice,
      },
      create: {
        carId: id,
        amountPaidSoFar: data.amountPaidSoFar || 0,
        paymentNotes: data.paymentNotes,
        pendingBalance: balance,
        totalAmount: actualSellingPrice,
      },
    });
  } catch (error) {
    return { error: ` ${error}` };
  }
  revalidatePath(`/admin/vehicles/vehicle/${id}`);
  revalidatePath("/admin/vehicles");
  return;
};

export const ModifyInvestments = async (
  carId: number,
  data: investmentsFormSchema
) => {
  try {
    await prisma.carInvestments.upsert({
      where: {
        carId_investorId: { carId: carId, investorId: data.investorId },
      },
      update: {
        initialAmount: data.initialAmount,
        investorId: data.investorId,
        remarks: data.remarks,
      },
      create: {
        carId: carId,
        initialAmount: data.initialAmount,
        investorId: data.investorId,
        remarks: data.remarks,
      },
    });
  } catch (error) {
    return { error: ` ${error}` };
  }
  revalidatePath(`/admin/vehicles/vehicle/${carId}`);
  revalidatePath("/admin/vehicles");
  return;
};

export const handleLogout = async () => {
  logout();
  // redirect("/signin");
};

// Define a type for our data
export type YearData = {
  id: number;
  brand: string;
  costs: {
    landingCost: number | null;
  } | null;
  sales: {
    actualSellingPrice: number | null;
  } | null;
  dates: {
    exitFromPortDate: Date | null;
  } | null;
};

const yearSchema = z.number().int().min(2000).max(2099);

export async function fetchDataForYear(year: number): Promise<YearData[]> {
  const validatedYear = yearSchema.parse(year);

  // get the landing price, selling price , margin and sum of each three for each car in the given year
  const data = await prisma.car.findMany({
    select: {
      id: true,
      brand: true,
      costs: {
        select: {
          landingCost: true,
        },
      },
      sales: {
        select: {
          actualSellingPrice: true,
        },
      },
      dates: {
        select: {
          exitFromPortDate: true,
        },
      },
    },
    where: {
      AND: [
        {
          dates: {
            exitFromPortDate: {
              gte: new Date(validatedYear, 0, 1),
              lt: new Date(validatedYear + 1, 0, 1),
            },
          },
        },
        {
          sales: {
            actualSellingPrice: {
              not: undefined,
            },
          },
        },
      ],
    },
  });

  return data;
}

export async function getDistinctYears(): Promise<number[]> {
  const years = await prisma.dates.findMany({
    select: {
      exitFromPortDate: true,
    },
    distinct: ["exitFromPortDate"],
    orderBy: {
      orderDate: "desc",
    },
  });

  // Extract years from the datetime and remove duplicates
  const yearsList = years.map((entry) =>
    entry.exitFromPortDate ? entry.exitFromPortDate.getFullYear() : null
  );
  const filteredYears = yearsList.filter((year) => year !== null);
  const distinctYears = Array.from(new Set(filteredYears));

  return distinctYears;
}
