/*
  Warnings:

  - You are about to drop the column `agent` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tenant]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tenant` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_agent_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "agent",
ADD COLUMN     "tenant" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_tenant_key" ON "user"("tenant");
