/*
  Warnings:

  - The primary key for the `product_warehouse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `product_warehouse` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product_warehouse" (
    "productId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("productId", "warehouseId"),
    CONSTRAINT "product_warehouse_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "product_warehouse_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouse" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_product_warehouse" ("productId", "quantity", "warehouseId") SELECT "productId", "quantity", "warehouseId" FROM "product_warehouse";
DROP TABLE "product_warehouse";
ALTER TABLE "new_product_warehouse" RENAME TO "product_warehouse";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
