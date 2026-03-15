-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "company" TEXT,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "description" TEXT,
    "bookingDate" DATETIME NOT NULL,
    "bookingTime" TEXT NOT NULL DEFAULT '09:00',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Booking" ("bookingDate", "company", "createdAt", "description", "email", "id", "name", "status", "topic", "whatsapp") SELECT "bookingDate", "company", "createdAt", "description", "email", "id", "name", "status", "topic", "whatsapp" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
