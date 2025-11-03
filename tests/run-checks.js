const { execSync } = require('child_process');
try {
execSync('node scripts/check-files.js', { stdio: 'inherit' });
console.log('check-files.js executado com sucesso');
} catch (e) {
console.error('check-files.js falhou (confirmado)');
process.exit(1);
}