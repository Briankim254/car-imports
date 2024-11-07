import React from "react";
import ModifyInvestmentsForm from "./modify-investstment";
import { CarInvestments } from "@prisma/client";
import prisma from "@/prisma/prisma";

async function VehicleInvestments({
  carId,
  capitalInvestor,
}: {
  carId: number;
  capitalInvestor?: CarInvestments;
}) {
  const investors = await prisma.capitalInvestors.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <div>
      <ModifyInvestmentsForm
        carId={carId}
        investors={investors}
        capitalInvestment={capitalInvestor}
      />
    </div>
  );
}

export default VehicleInvestments;
