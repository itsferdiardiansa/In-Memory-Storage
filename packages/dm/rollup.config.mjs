import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import babel from '@rollup/plugin-babel'
import eslint from '@rollup/plugin-eslint'
import run from '@rollup/plugin-run'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'

export default [
  {
    input: 'src/main.ts',
    output: [
      {
        file: 'dist/main.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/esm/main.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    watch: {
      include: ['src/**'],
      clearScreen: false,
    },
    plugins: [
      process.env.NODE_ENV === 'development' && run(),
      json(),
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
    input: 'dist/esm/types/main.d.ts',
    output: [{ file: 'dist/main.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
]
