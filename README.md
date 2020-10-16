开发时 git自动化流程

安装： npm i -g dev-git

0. 从master 签出 dev test
1. merge dev test => push
2. 签出pre => merge => push 
3. 签出dev test pre
4. 删除 dev test

* g --help 查看帮助 
* g -v or g --version 获取版本
* g -s or g --start 开始开发 删除已有dev test 并从master重新签出这些分支
* g -d or g --dev 提测 将开发分支合到dev并push
* g -t or g --test 提测 将开发分支合到test 并push
* g -e or g --end 上线完成 删除dev test。 注： pre你自己删吧 啦啦啦