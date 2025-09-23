-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "githubId" INTEGER,
    "name" TEXT,
    "avatar_url" TEXT,
    "company" TEXT,
    "blog" TEXT,
    "location" TEXT,
    "email" TEXT,
    "bio" TEXT,
    "public_repos" INTEGER,
    "public_gists" INTEGER,
    "followers" INTEGER,
    "following" INTEGER,
    "created_at" TIMESTAMP(3),
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "public"."User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "User_githubId_key" ON "public"."User"("githubId");
