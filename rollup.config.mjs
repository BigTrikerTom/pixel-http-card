import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/pixel-http-card.ts',
  output: {
    file: 'dist/pixel-http-card.js',
    format: 'es'
  },
  plugins: [
    resolve(),
    typescript({ tsconfig: './tsconfig.json' })
', sourceMap: true })
  ]
};