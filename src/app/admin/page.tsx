import { prisma } from '@/app/lib/prisma';
// ❌ Se você ainda não está usando session aqui, remova o import abaixo
// import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function AdminPage() {
  const users = await prisma.user.findMany({
    include: { metas: true },
  });

  if (!users.length) {
    return <div>Nenhum usuário encontrado.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#0f172a' }}>
        Painel Admin
      </h2>

      <div className="space-y-3">
        {users.map((u) => (
          <div key={u.id} className="p-3 rounded-md bg-slate-800">
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
