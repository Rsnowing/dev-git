import babel from 'rollup-plugin-babel'
const { terser } = require('rollup-plugin-terser') // 原本用的是rollup-plugin-uglify,但是不识别es6语法
import resolve from '@rollup/plugin-node-resolve' // 解决第三方包import打包后undefined问题
import commonjs from 'rollup-plugin-commonjs'

const prod = process.env.ENV === 'production'
const format = process.env.FMT || 'umd'
export default {
  input: './src/index.js', // 打包入口
  output: {
    file: 'dist/index.min.js', // 出口路径
    name: 'index', // 指定打包后全局变量的名字
    format, // 统一模块规范
    sourcemap: true // 打包过程会将es6 -> es5。 开启源码调试 可以找到源代码的报错位置
  },
  plugins: [
    babel({
      exclude: 'node-modules/**' // 排除
    }),
    commonjs(),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    prod && terser()
  ]
}
