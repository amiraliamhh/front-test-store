const path = require('path')
const typescript = require('@rollup/plugin-typescript')
const vue = require('rollup-plugin-vue')
const copy = require('rollup-plugin-copy')
const serve = require('rollup-plugin-serve')
const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const alias = require('@rollup/plugin-alias')

export default [
  {
    input: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
      file: path.resolve(__dirname, 'dist', 'bundle.js'),
      format: 'es',
    },
    plugins: [
      typescript(),
    ],
  },
  {
    input: path.resolve(__dirname, 'examples', 'main.js'),
    output: {
      file: path.resolve(__dirname, 'dist', 'examples', 'main.js'),
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      vue(),
      alias({
        entries: [
          {
            find: 'vuey',
            replacement: path.resolve(__dirname, 'dist', 'bundle.js'),
          },
        ],
      }),
      commonjs(),
      nodeResolve({
        browser: true,
        dedupe: [
          'vue',
        ],
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
      copy({
        targets: [
          {
            src: path.resolve(__dirname, 'examples', 'index.html'),
            dest: path.resolve(__dirname, 'dist', 'examples'),
          },
        ],
      }),
      serve({
        contentBase: path.resolve(__dirname, 'dist', 'examples'),
        port: 5000,
        open: true,
      })
    ],
  },
]
