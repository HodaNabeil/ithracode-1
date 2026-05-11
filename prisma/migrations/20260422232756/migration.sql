/*
  Warnings:

  - You are about to drop the column `duration_seconds` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_product_id` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `mux_playback_id` on the `lectures` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_session_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_progress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "consultation_bookings" DROP CONSTRAINT "consultation_bookings_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "coupon_courses" DROP CONSTRAINT "coupon_courses_course_id_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_instructor_id_fkey";

-- DropForeignKey
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_course_id_fkey";

-- DropForeignKey
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_order_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "refunds" DROP CONSTRAINT "refunds_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_progress" DROP CONSTRAINT "user_progress_enrollment_id_fkey";

-- DropForeignKey
ALTER TABLE "user_progress" DROP CONSTRAINT "user_progress_lecture_id_fkey";

-- DropIndex
DROP INDEX "enrollments_order_id_key";

-- DropIndex
DROP INDEX "orders_stripe_session_id_key";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "duration_seconds",
DROP COLUMN "stripe_product_id",
ADD COLUMN     "duration" INTEGER;

-- AlterTable
ALTER TABLE "enrollments" DROP COLUMN "order_id";

-- AlterTable
ALTER TABLE "lectures" DROP COLUMN "mux_playback_id";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "stripe_session_id";

-- DropTable
DROP TABLE "payments";

-- DropTable
DROP TABLE "subscriptions";

-- DropTable
DROP TABLE "user_progress";

-- CreateTable
CREATE TABLE "progress" (
    "id" TEXT NOT NULL,
    "enrollment_id" TEXT NOT NULL,
    "lecture_id" TEXT NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "completed_at" TIMESTAMP(3),
    "last_accessed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time_spent" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "stripe_payment_intent_id" TEXT,
    "stripe_session_id" TEXT,
    "stripe_customer_id" TEXT,
    "provider" "PaymentProvider" NOT NULL DEFAULT 'STRIPE',
    "provider_transaction_id" TEXT,
    "provider_metadata" JSONB,
    "amount_cents" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'EGP',
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" TEXT,
    "last4" TEXT,
    "brand" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "progress_enrollment_id_idx" ON "progress"("enrollment_id");

-- CreateIndex
CREATE INDEX "progress_lecture_id_idx" ON "progress"("lecture_id");

-- CreateIndex
CREATE UNIQUE INDEX "progress_enrollment_id_lecture_id_key" ON "progress"("enrollment_id", "lecture_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_stripe_payment_intent_id_key" ON "Payment"("stripe_payment_intent_id");

-- CreateIndex
CREATE INDEX "orders_order_number_idx" ON "orders"("order_number");

-- AddForeignKey
ALTER TABLE "progress" ADD CONSTRAINT "progress_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "enrollments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultation_bookings" ADD CONSTRAINT "consultation_bookings_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
