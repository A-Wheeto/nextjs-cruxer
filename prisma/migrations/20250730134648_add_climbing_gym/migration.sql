-- CreateTable
CREATE TABLE "ClimbingGym" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClimbingGym_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClimbingGym_name_key" ON "ClimbingGym"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ClimbingGym_email_key" ON "ClimbingGym"("email");
