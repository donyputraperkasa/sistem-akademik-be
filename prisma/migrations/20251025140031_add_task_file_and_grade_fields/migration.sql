-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "filePath" TEXT,
ADD COLUMN     "grade" DOUBLE PRECISION,
ADD COLUMN     "submittedAt" TIMESTAMP(3);
