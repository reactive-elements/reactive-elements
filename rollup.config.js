import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};
export default {
  input: 'src/reactive-elements.js',
  external: ['react', 'react-dom'],
  output: [
    {
      format: 'cjs',
      sourcemap: true,
      file: pkg.main,
      globals,
    },
    {
      format: 'esm',
      sourcemap: true,
      file: pkg.module,
      globals,
    },
    {
      format: 'iife',
      name: 'ReactiveElements',
      sourcemap: true,
      file: 'dist/reactive-elements.iife.js',
      globals,
    },
  ],
  plugins: [resolve(), commonjs(), babel()],
};
