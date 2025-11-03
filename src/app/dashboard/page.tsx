import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // 🔒 Verifica sessão do usuário no servidor
  const session = await getServerSession(authOptions);

  // Se não estiver logado → redireciona para /login
  if (!session) {
    redirect("/login");
  }

  // (Opcional) Filtrar dados conforme o papel do usuário
  // Exemplo: se for admin, mostrar todos os usuários
  const isAdmin = session.user.role === "admin";

  const users = isAdmin
    ? await prisma.user.findMany({ include: { metas: true } })
    : await prisma.user.findMany({
        where: { email: session.user.email },
        include: { metas: true },
      });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4" style={{ color: "#0f172a" }}>
        Dashboard — {isAdmin ? "Administrador" : "Funcionário"}
      </h2>

      <div className="space-y-3">
        {users.map((u) => (
          <div key={u.id} className="p-3 rounded-md bg-slate-800 text-white">
            <div className="flex justify-between items-center">
              <div>
                <strong>{u.name}</strong>
                <div className="text-sm text-slate-400">{u.email}</div>
              </div>
              <div className="text-sm">Metas: {u.metas.length}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
