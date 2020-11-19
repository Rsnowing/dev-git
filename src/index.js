const { version } = require('../package.json')
const commander = require('commander')
const { execSync } = require('child_process')
const DEVELOP = execSync('git symbolic-ref --short -q HEAD', { encoding: 'utf8' }) // 开发分支名称

// commander: start, test, pre, del
commander
  .version(version, '-v --version', '获取版本')
  .option('-s, --start', '开始开发 删除已有dev test pre 并从master重新签出这些分支')
  .option('-t, --test', '提测 将开发分支合到test 并push')
  .option('-d, --dev', '发布到开发分支 将开发分支合到dev push')
  .option('-e, --end', '上线完成 删除dev test。 注： pre你自己删吧 啦啦啦')
  .parse(process.argv)

commander.on('--help', () => {})
main()

function main() {
  // 开始流程： dev test,
  if (commander.start) {
    console.log('创建dev test pre')
    del('dev')
    del('test')
    del('pre')
    create('dev')
    create('test')
    create('pre')
  } else if (commander.dev) {
    console.log('准备发布到开发环境')
    merge('dev')
    checkout(DEVELOP)
  } else if (commander.test) {
    console.log('准备提测')
    merge('test')
    checkout(DEVELOP)
  } else if (commander.pre) {
    console.log('准备预发')
    merge('pre')
    checkout(DEVELOP)
  } else if (commander.end) {
    console.log('删除dev test, 注： pre你自己删吧 啦啦啦')
    del('dev')
    del('test')
  }
}

function checkout(branch) {
  execSync(`git checkout ${branch}`)
}

// 检查远程分支是否存在
function checkExit(branch) {
  const res = execSync('git branch -a', { encoding: 'utf8' })
  let list = res.split('\n')
  list.map(item => item.trim())
  let fmtlist = []
  list.forEach(item => {
    const i = item.trim()
    i && fmtlist.push(i)
  })
  return fmtlist.includes(branch)
}

// 从master创建分支
function create(branch) {
  try {
    execSync(`git branch ${branch} origin/master`, { encoding: 'utf8' })
  } catch (error) {
    // console.log(error)
  }
}

function merge(branch) {
  try {
    const isFileUnCommit = getIsFileUnCommit()
    if (isFileUnCommit) {
      console.log('请先提交本地文件啦...')
      return
    }
    execSync(`git checkout ${branch}`)
    if (checkExit(`remotes/origin/${branch}`)) {
      execSync(`git pull origin ${branch}`)
    }
    execSync(`git merge --no-ff ${DEVELOP}`, { encoding: 'utf8' })
    execSync(`git push origin ${branch}`, { encoding: 'utf8' })
  } catch (error) {
    // console.log(error)
  }
}

// 检查本地是否有未提交文件
function getIsFileUnCommit() {
  let res = execSync('git status --untracked-files=all --porcelain', { encoding: 'utf8' })
  console.log(res)
  return !!res
}

// 删除本地及远程分支
function del(branch) {
  try {
    // 先判断是否有本地and远程分支
    if (checkExit(branch)) {
      execSync(`git branch --delete --force ${branch}`, { encoding: 'utf8' })
    }
    if (checkExit(`remotes/origin/${branch}`)) {
      execSync(`git push origin --delete ${branch}`, { encoding: 'utf8' })
    }
  } catch (e) {
    // console.error(e)
  }
}
