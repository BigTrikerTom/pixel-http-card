import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      sourceMap: true,
      module: 'ESNext'
    })
  ]
};