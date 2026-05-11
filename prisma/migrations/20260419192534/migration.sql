/*
  Warnings:

  - A unique constraint covering the columns `[stripeSessionId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stripeSessionId` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "stripeSessionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payments_stripeSessionId_key" ON "payments"("stripeSessionId");
