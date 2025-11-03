'use client';
import { motion } from 'framer-motion';


export default function EmojiStatus({ hit }: { hit: boolean }) {
return (
<motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.9, repeat: Infinity }} className="text-4xl">
{hit ? '😄' : '😢'}
</motion.div>
);
}