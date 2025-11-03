// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed de usuários...");

  // Criptografa as senhas
  const adminPassword = await bcrypt.hash("admin123", 10);
  const funcPassword = await bcrypt.hash("func123", 10);

  // Cria usuário admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@empresa.com" },
    update: {},
    create: {
      name: "Admin Master",
      email: "admin@empresa.com",
      password: adminPassword,
      role: "admin",
    },
  });

  // Cria usuário funcionário
  const funcionario = await prisma.user.upsert({
    where: { email: "func@empresa.com" },
    update: {},
    create: {
      name: "Funcionário Teste",
      email: "func@empresa.com",
      password: funcPassword,
      role: "funcionario",
    },
  });

  console.log("✅ Usuários criados com sucesso:");
  console.log({ admin, funcionario });
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
