import { PrismaClient } from "@prisma/client";

// Evita múltiplas instâncias do Prisma durante o hot reload no Next.js (modo dev)
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error", "warn"], // opcional: ajuda a depurar no console
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
