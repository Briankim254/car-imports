-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "chasis_number" TEXT NOT NULL,
    "registration" TEXT,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);
