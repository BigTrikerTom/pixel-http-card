import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname Ersatz in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);

// Absoluter Pfad zur tsconfig.json mit Linux-Slashes
// const tsconfigPath = path.join(__dirname, 'tsconfig.json').replace(/\\/g, '/');
const tsconfigPath = path.join(__dirname, 'tsconfig.json').replace(/\\/g, '/');

export default {
  input: 'src/pixel-http-card.ts',
  output: {
    file: 'dist/pixel-http-card.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve(),
    typescript({
      tsconfig: path.parse(tsconfigPath),
      sourceMap: true,
      module: 'ESNext'
    })
  ]
};