-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "stripeSessionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "stripeSessionId" DROP NOT NULL;
