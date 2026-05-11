/*
  Warnings:

  - You are about to drop the column `duration` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `stripePriceId` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `stripePaymentIntent` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `stripeSessionId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `integration_id` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `paymob_intention_id` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `paymob_order_id` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `paymob_transaction_id` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `stripePaymentIntent` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `stripeSessionId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[stripe_session_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripe_payment_intent_id]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripe_session_id]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[webhook_event_id]` on the table `payments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_order_id_fkey";

-- DropIndex
DROP INDEX "orders_order_number_idx";

-- DropIndex
DROP INDEX "orders_stripeSessionId_key";

-- DropIndex
DROP INDEX "payments_paymob_transaction_id_key";

-- DropIndex
DROP INDEX "payments_stripeSessionId_key";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "duration",
DROP COLUMN "stripePriceId",
ADD COLUMN     "duration_seconds" INTEGER,
ADD COLUMN     "stripe_product_id" TEXT;

-- AlterTable
ALTER TABLE "enrollments" ALTER COLUMN "order_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "stripePaymentIntent",
DROP COLUMN "stripeSessionId",
ADD COLUMN     "stripe_session_id" TEXT;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "integration_id",
DROP COLUMN "paymob_intention_id",
DROP COLUMN "paymob_order_id",
DROP COLUMN "paymob_transaction_id",
DROP COLUMN "stripePaymentIntent",
DROP COLUMN "stripeSessionId",
ADD COLUMN     "failure_reason" TEXT,
ADD COLUMN     "is_refunded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "receipt_url" TEXT,
ADD COLUMN     "stripe_payment_intent_id" TEXT,
ADD COLUMN     "stripe_session_id" TEXT,
ADD COLUMN     "stripe_subscription_id" TEXT,
ADD COLUMN     "webhook_event_id" TEXT,
ALTER COLUMN "provider" SET DEFAULT 'STRIPE';

-- DropTable
DROP TABLE "Account";

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instructor_availabilities" (
    "id" TEXT NOT NULL,
    "instructor_id" TEXT NOT NULL,
    "day_of_week" INTEGER NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "slot_duration" INTEGER NOT NULL DEFAULT 60,
    "price_per_slot" DECIMAL(10,2) NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'EGP',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "instructor_availabilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultation_bookings" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "availability_id" TEXT NOT NULL,
    "payment_id" TEXT,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "scheduled_at" TIMESTAMP(3) NOT NULL,
    "duration_minutes" INTEGER NOT NULL,
    "google_meet_link" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consultation_bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "google_calendar_tokens" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "scope" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "google_calendar_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "stripe_subscription_id" TEXT NOT NULL,
    "stripe_customer_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "current_period_end" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE INDEX "reviews_course_id_idx" ON "reviews"("course_id");

-- CreateIndex
CREATE INDEX "reviews_user_id_idx" ON "reviews"("user_id");

-- CreateIndex
CREATE INDEX "reviews_rating_idx" ON "reviews"("rating");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_course_id_user_id_key" ON "reviews"("course_id", "user_id");

-- CreateIndex
CREATE INDEX "instructor_availabilities_instructor_id_idx" ON "instructor_availabilities"("instructor_id");

-- CreateIndex
CREATE INDEX "instructor_availabilities_is_active_idx" ON "instructor_availabilities"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "instructor_availabilities_instructor_id_day_of_week_key" ON "instructor_availabilities"("instructor_id", "day_of_week");

-- CreateIndex
CREATE UNIQUE INDEX "consultation_bookings_payment_id_key" ON "consultation_bookings"("payment_id");

-- CreateIndex
CREATE INDEX "consultation_bookings_student_id_idx" ON "consultation_bookings"("student_id");

-- CreateIndex
CREATE INDEX "consultation_bookings_availability_id_idx" ON "consultation_bookings"("availability_id");

-- CreateIndex
CREATE INDEX "consultation_bookings_status_idx" ON "consultation_bookings"("status");

-- CreateIndex
CREATE INDEX "consultation_bookings_scheduled_at_idx" ON "consultation_bookings"("scheduled_at");

-- CreateIndex
CREATE UNIQUE INDEX "google_calendar_tokens_user_id_key" ON "google_calendar_tokens"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_stripe_subscription_id_key" ON "subscriptions"("stripe_subscription_id");

-- CreateIndex
CREATE INDEX "subscriptions_user_id_idx" ON "subscriptions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_stripe_session_id_key" ON "orders"("stripe_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_stripe_payment_intent_id_key" ON "payments"("stripe_payment_intent_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_stripe_session_id_key" ON "payments"("stripe_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_webhook_event_id_key" ON "payments"("webhook_event_id");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon_courses" ADD CONSTRAINT "coupon_courses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instructor_availabilities" ADD CONSTRAINT "instructor_availabilities_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultation_bookings" ADD CONSTRAINT "consultation_bookings_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultation_bookings" ADD CONSTRAINT "consultation_bookings_availability_id_fkey" FOREIGN KEY ("availability_id") REFERENCES "instructor_availabilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultation_bookings" ADD CONSTRAINT "consultation_bookings_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "google_calendar_tokens" ADD CONSTRAINT "google_calendar_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
