import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import path from 'path';

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
      tsconfig: path.resolve('./tsconfig.json'),
      sourceMap: true,
      module: 'ESNext'
    })
  ]
};