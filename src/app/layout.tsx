import '../styles/globals.css';
import ThemeToggle from '../components/ThemeToggle';


export const metadata = { title: 'Metas de Vendas' };


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="pt-BR">
<body>
<div className="min-h-screen bg-gradient-to-br from-[#071129] to-[#07102a] text-slate-100">
<header className="p-4 border-b border-slate-700">
<div className="max-w-6xl mx-auto flex justify-between items-center">
<h1 className="text-xl font-bold" style={{ color: '#f97316' }}>Metas de Vendas</h1>
<ThemeToggle />
</div>
</header>
<main className="max-w-6xl mx-auto p-6">{children}</main>
</div>
</body>
</html>
);
}