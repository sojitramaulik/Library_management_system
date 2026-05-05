-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phoneno" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "bookname" TEXT NOT NULL,
    "sem" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book_issue" (
    "id" SERIAL NOT NULL,
    "s_id" INTEGER NOT NULL,
    "b_id" INTEGER NOT NULL,
    "iss_date" TIMESTAMP(3) NOT NULL,
    "sub_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "book_issue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "book_issue" ADD CONSTRAINT "book_issue_s_id_fkey" FOREIGN KEY ("s_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_issue" ADD CONSTRAINT "book_issue_b_id_fkey" FOREIGN KEY ("b_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
