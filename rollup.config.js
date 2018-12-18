import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default {
  input: 'src/reactive-elements.js',
  external: ['react', 'react-dom'],
  output: [
    {
      format: 'cjs',
      sourcemap: true,
      file: pkg.main,
    },
    {
      format: 'esm',
      sourcemap: true,
      file: pkg.module,
    },
    {
      format: 'iife',
      name: 'ReactiveElements',
      sourcemap: true,
      file: 'dist/reactive-elements.iife.js',
    },
  ],
  plugins: [resolve(), commonjs(), babel()],
};
