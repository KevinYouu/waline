#!/bin/bash
echo 请输入更新内容:
read m
echo 更新日志中...
System=$(uname -s)
if [ $System == "Darwin" ];then
echo "Use MacOS"
sed -i '' "1a\\
####  `date '+%Y-%m-%d %H:%M:%S %A'` \\
$m
" ChangeLog.md
elif [ $System == "Linux" ];then
echo "Use Linux"
sed -i "2 i #### $(date '+%Y-%m-%d %H:%M:%S %A') \n $m" Readme.md
else
echo "Other OS: $System"
fi
gitRemote=$(git remote)
git add .
git commit -m $m
git push $gitRemote
