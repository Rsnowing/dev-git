const { version } = require('./package.json')
const commander = require('commander')

// commander: start, test, pre, del
commander.version(version, '-v --version', '获取版本').option('-s, --start').parse(process.argv)


console.log(commander.start)
