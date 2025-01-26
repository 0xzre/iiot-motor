import { PrismaClient } from "@prisma/client";

const globalPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalPrisma.prisma ?? new PrismaClient();

export const db = prisma;
