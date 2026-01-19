import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

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
      tsconfig: './tsconfig.json', // relativer Pfad ohne __dirname oder path.resolve
      sourceMap: true,
      module: 'ESNext'
    })
  ]
};