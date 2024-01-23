import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import babel from '@rollup/plugin-babel'
import eslint from '@rollup/plugin-eslint'
import run from '@rollup/plugin-run'
import terser from '@rollup/plugin-terser'

export default [
  {
    input: 'src/main.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/esm/index.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    watch: {
      include: ['src/**'],
      // clearScreen: false
    },
    plugins: [
      process.env.NODE_ENV === 'development' && run(),
      resolve({
        extensions: ['.ts', '.tsx'],
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
      terser(),
      eslint({
        throwOnError: true,
      }),
      babel({
        babelHelpers: 'runtime',
        skipPreflightCheck: true,
        extensions: ['.ts', '.tsx'],
      }),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
]
