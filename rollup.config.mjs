import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import path from 'path';

const tsConfigPath = path.join(__dirname, 'tsconfig.json').replace(/\\/g, '/');

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
      tsconfig: tsConfigPath,
      sourceMap: true,
      module: 'ESNext'
    })
  ]
};
