/*
  Warnings:

  - You are about to drop the column `rackRackNumber` on the `Equipament` table. All the data in the column will be lost.
  - You are about to drop the column `rackRackNumber` on the `PowerStrip` table. All the data in the column will be lost.
  - Added the required column `rackId` to the `Equipament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rackId` to the `PowerStrip` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Equipament" DROP CONSTRAINT "Equipament_rackRackNumber_fkey";

-- DropForeignKey
ALTER TABLE "PowerStrip" DROP CONSTRAINT "PowerStrip_rackRackNumber_fkey";

-- DropIndex
DROP INDEX "Rack_rackNumber_key";

-- AlterTable
ALTER TABLE "Equipament" DROP COLUMN "rackRackNumber",
ADD COLUMN     "rackId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PowerStrip" DROP COLUMN "rackRackNumber",
ADD COLUMN     "rackId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Equipament" ADD CONSTRAINT "Equipament_rackId_fkey" FOREIGN KEY ("rackId") REFERENCES "Rack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PowerStrip" ADD CONSTRAINT "PowerStrip_rackId_fkey" FOREIGN KEY ("rackId") REFERENCES "Rack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
