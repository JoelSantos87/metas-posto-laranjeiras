const fs = require('fs');
const path = require('path');


function findRootTsx(dir) {
const items = fs.readdirSync(dir);
return items.filter(i => i.endsWith('.tsx'));
}


const root = process.cwd();
const rootTsx = findRootTsx(root).filter(f => !f.startsWith('src'));
if (rootTsx.length) {
console.warn('⚠️ Aviso: arquivos .tsx encontrados na raiz do projeto (não rodar com node diretamente):');
rootTsx.forEach(f => console.warn(' -', f));
console.warn('Solução: mova esses arquivos para src/ ou renomeie para .jsx/.js se precisar executá-los com node.');
process.exitCode = 1;
} else {
console.log('✔️ Verificação rápida: sem .tsx na raiz.');
}


if (!fs.existsSync(path.join(root, 'tsconfig.json'))) {
console.warn('⚠️ tsconfig.json não encontrado. Adicione um tsconfig.json conforme instruções na documentação.');
process.exitCode = 1;
} else {
console.log('✔️ tsconfig.json encontrado.');
}