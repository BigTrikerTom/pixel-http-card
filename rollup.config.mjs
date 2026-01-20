import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'build/pixel-http-card.js',
  output: {
    file: 'dist/pixel-http-card.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve()
  ]
};
