/*
  Warnings:

  - Added the required column `color` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titleTodoList" TEXT NOT NULL,
    "textAreaTodoList" TEXT NOT NULL,
    "isFavorited" BOOLEAN NOT NULL DEFAULT false,
    "color" TEXT NOT NULL
);
INSERT INTO "new_Todo" ("id", "isFavorited", "textAreaTodoList", "titleTodoList") SELECT "id", "isFavorited", "textAreaTodoList", "titleTodoList" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
