-- CreateTable
CREATE TABLE "Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titleTodoList" TEXT NOT NULL,
    "textAreaTodoList" TEXT NOT NULL,
    "isFavorited" BOOLEAN NOT NULL DEFAULT false
);
