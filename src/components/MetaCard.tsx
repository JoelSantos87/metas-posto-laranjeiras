'use client';
import EmojiStatus from './EmojiStatus';


export default function MetaCard({ title, meta, vendas }: { title: string; meta: number; vendas: number }) {
const hit = vendas >= meta;
const progress = Math.min(100, Math.round((vendas / Math.max(meta, 1)) * 100));
return (
<div className="p-4 rounded-2xl shadow-md bg-gradient-to-br from-slate-800 to-slate-900">
<div className="flex justify-between items-center">
<div>
<h3 className="text-lg font-semibold">{title}</h3>
<p className="text-sm">Meta: {meta} — Vendas: {vendas}</p>
</div>
<EmojiStatus hit={hit} />
</div>
<div className="mt-3 h-3 bg-slate-700 rounded-full overflow-hidden">
<div className="h-full rounded-full" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #f97316, #0f172a)' }} />
</div>
</div>
);
}