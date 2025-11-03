'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';


export default function HomePage() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);


async function handleLogin(e: React.FormEvent) {
e.preventDefault();
setLoading(true);
setError(null);
const res: any = await signIn('credentials', { redirect: false, email, password });
setLoading(false);
if (res?.error) setError('Credenciais inválidas');
else window.location.href = '/dashboard';
}


return (
<div className="max-w-md mx-auto p-6 bg-slate-800 rounded-2xl shadow">
<h2 className="text-2xl font-bold mb-4" style={{ color: '#f97316' }}>Entrar</h2>
<form onSubmit={handleLogin} className="space-y-3">
<input className="w-full p-2 rounded-md bg-slate-700" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
<input className="w-full p-2 rounded-md bg-slate-700" placeholder="senha" value={password} onChange={e => setPassword(e.target.value)} type="password" />
<button className="w-full py-2 rounded-md" style={{ background: '#f97316' }} disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
{error && <p className="text-sm text-red-400">{error}</p>}
</form>
</div>
);
}