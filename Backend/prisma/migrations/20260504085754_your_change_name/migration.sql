/*
  Warnings:

  - You are about to drop the `book_issue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "book_issue" DROP CONSTRAINT "book_issue_b_id_fkey";

-- DropForeignKey
ALTER TABLE "book_issue" DROP CONSTRAINT "book_issue_s_id_fkey";

-- DropTable
DROP TABLE "book_issue";

-- CreateTable
CREATE TABLE "BookIssue" (
    "id" SERIAL NOT NULL,
    "s_id" INTEGER NOT NULL,
    "b_id" INTEGER NOT NULL,
    "iss_date" TIMESTAMP(3) NOT NULL,
    "sub_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookIssue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookIssue" ADD CONSTRAINT "BookIssue_s_id_fkey" FOREIGN KEY ("s_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookIssue" ADD CONSTRAINT "BookIssue_b_id_fkey" FOREIGN KEY ("b_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
