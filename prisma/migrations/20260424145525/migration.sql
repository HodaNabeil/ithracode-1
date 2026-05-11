-- CreateEnum
CREATE TYPE "PathSectionType" AS ENUM ('TITLE', 'PARAGRAPH', 'IMAGE', 'BUTTON');

-- CreateTable
CREATE TABLE "PathSection" (
    "id" TEXT NOT NULL,
    "pathId" TEXT NOT NULL,
    "type" "PathSectionType" NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "trackId" TEXT,

    CONSTRAINT "PathSection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PathSection" ADD CONSTRAINT "PathSection_pathId_fkey" FOREIGN KEY ("pathId") REFERENCES "paths"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PathSection" ADD CONSTRAINT "PathSection_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
