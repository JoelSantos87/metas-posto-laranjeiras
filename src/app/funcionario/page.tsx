import MetaCard from '../../components/MetaCard';
import { prisma } from '../../lib/prisma';


export default async function FuncionarioPage() {
// Em produção, use session para pegar userId. Aqui apenas demo com primeiro usuário func
const func = await prisma.user.findFirst({ where: { role: 'funcionario' } });
if (!func) return <div>Nenhum usuário funcionário encontrado.</div>;
const today = new Date(new Date().toDateString());
const meta = await prisma.meta.findFirst({ where: { userId: func.id, date: today } });
const metaDiaria = meta?.metaDiaria ?? 100;
const vendasDia = meta?.vendasDia ?? 0;
const metaMensal = meta?.metaMensal ?? 3000;
const vendasMes = meta?.vendasMes ?? 0;


return (
<div className="grid gap-4 grid-cols-1 md:grid-cols-2">
<MetaCard title={`Olá, ${func.name}`} meta={metaDiaria} vendas={vendasDia} />
<MetaCard title="Meta Mensal" meta={metaMensal} vendas={vendasMes} />
</div>
);
}