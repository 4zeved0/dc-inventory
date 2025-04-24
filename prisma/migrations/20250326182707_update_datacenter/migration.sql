-- CreateTable
CREATE TABLE "Localization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Localization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Datacenter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "localizationId" INTEGER,

    CONSTRAINT "Datacenter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rack" (
    "id" SERIAL NOT NULL,
    "rackNumber" INTEGER NOT NULL,
    "datacenterId" INTEGER NOT NULL,

    CONSTRAINT "Rack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipament" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "hostname" TEXT,
    "client" TEXT,
    "serialNumber" TEXT,
    "status" BOOLEAN NOT NULL,
    "spaceQuantity" INTEGER NOT NULL,
    "equipamentType" TEXT NOT NULL,
    "assetNumber" INTEGER NOT NULL,
    "equipamentBrand" TEXT NOT NULL,
    "positionInRack" INTEGER NOT NULL,
    "observations" TEXT,
    "rackRackNumber" INTEGER NOT NULL,

    CONSTRAINT "Equipament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PowerStrip" (
    "powerStripNumber" INTEGER NOT NULL,
    "numberKva" INTEGER NOT NULL,
    "powerStripColor" TEXT NOT NULL,
    "rackRackNumber" INTEGER NOT NULL,

    CONSTRAINT "PowerStrip_pkey" PRIMARY KEY ("powerStripNumber")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rack_rackNumber_key" ON "Rack"("rackNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Datacenter" ADD CONSTRAINT "Datacenter_localizationId_fkey" FOREIGN KEY ("localizationId") REFERENCES "Localization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rack" ADD CONSTRAINT "Rack_datacenterId_fkey" FOREIGN KEY ("datacenterId") REFERENCES "Datacenter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipament" ADD CONSTRAINT "Equipament_rackRackNumber_fkey" FOREIGN KEY ("rackRackNumber") REFERENCES "Rack"("rackNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PowerStrip" ADD CONSTRAINT "PowerStrip_rackRackNumber_fkey" FOREIGN KEY ("rackRackNumber") REFERENCES "Rack"("rackNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
