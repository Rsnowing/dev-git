const { version } = require('./package.json')
const commander = require('commander')
const { execSync } = require('child_process')
// const DEVELOP = execSync('git symbolic-ref --short -q HEAD', { encoding: 'utf8' }) // 开发分支名称

// commander: start, test, pre, del
commander.version(version, '-v --version', '获取版本').option('-s, --start').parse(process.argv)

main()

function main() {
  // 开始流程： dev test,
  if (commander.start) {
    start()
  } else if (commander.test) {
    // 提测流程
  } else if (commander.pre) {
    // 预发布流程
  } else if (commander.del) {
    // 删除dev test 分支
  }
}

function start() {
  try {
    execSync('git checkout master')
    execSync('git pull', { encoding: 'utf8' })
  } catch (error) {
    console.log(error)
  }
}
