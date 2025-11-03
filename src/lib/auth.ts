// src/lib/auth.ts
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma'; // Caminho corrigido
import bcrypt from 'bcrypt';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
session: { strategy: 'jwt' },
providers: [
CredentialsProvider({
name: 'Credentials',
credentials: {
email: { label: 'Email', type: 'text' },
password: { label: 'Password', type: 'password' }
},
async authorize(credentials) {
if (!credentials) return null;
const user = await prisma.user.findUnique({ where: { email: credentials.email } });
if (!user) return null;
const match = await bcrypt.compare(credentials.password, user.password);
if (!match) return null;
return { id: user.id, name: user.name, email: user.email, role: user.role };
}
})
],
callbacks: {
async jwt({ token, user }) {
if (user) token.role = (user as any).role;
return token;
},
async session({ session, token }) {
(session as any).user.role = token.role;
return session;
}
},
secret: process.env.NEXTAUTH_SECRET
};
