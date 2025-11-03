'use client';
import Link from 'next/link';


export default function Navbar() {
return (
<nav className="bg-transparent p-2">
<div className="max-w-6xl mx-auto flex gap-4">
<Link href="/dashboard">Dashboard</Link>
<Link href="/admin">Admin</Link>
<Link href="/funcionario">Funcionário</Link>
</div>
</nav>
);
}