#!/bin/bash
echo 请输入远程仓库名
read -r name
echo 请输入远程仓库URL
read -r url
git remote add $name $url
git branch -M main
git push $name main
