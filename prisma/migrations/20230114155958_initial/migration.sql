/*
  Warnings:

  - A unique constraint covering the columns `[agent]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[feed_id]` on the table `user_insta_feed` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `agent` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "agent" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_agent_key" ON "user"("agent");

-- CreateIndex
CREATE UNIQUE INDEX "user_insta_feed_feed_id_key" ON "user_insta_feed"("feed_id");
