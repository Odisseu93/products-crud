/*
  Warnings:

  - You are about to drop the `warehouses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "warehouses";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "warehouse" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product_warehouse" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "product_warehouse_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "product_warehouse_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouse" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_product_warehouse" ("id", "productId", "quantity", "warehouseId") SELECT "id", "productId", "quantity", "warehouseId" FROM "product_warehouse";
DROP TABLE "product_warehouse";
ALTER TABLE "new_product_warehouse" RENAME TO "product_warehouse";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
