
今天看到消息，来自大神阮一峰的《bash脚本教程》开源发布了，  
我也借此机会来总结个**bash极简教程**。

本文是一个更加简化的《bash极简教程》，告诉你什么时候需要使用bash，最常用的bash语法及关键字使用。  

## 命令能搞定的，不用写bash脚本
在Linux系统里，我们经常会遇到一些操作，不能使用单个命令完成，但是可以使用多个命令组合来完成。如果可以使用命令的组合完成的没有必要写脚本。
命令的组合可以使用；，&&，  {} 和 |， 例如：
```
apt-get update; apt-get upgrade
apt-get update && apt-get upgrade
cat tmp.txt | cut -d ' ' -f 2
mkdir -p aaa/bbb/ccc && touch aaa/bbb/ccc/ddd.txt
```

以下这些命令经常组合在一起使用，学会了就可以装13了，就可以初步感受到Linux的魅力。
```
ls, find, xargs, awk，cat, grep，sed, cut, sort, uniq, tr

find . -name '*.pyc' -exec rm -rf {} \;
find dir1 dir2 dir3 dir4 -type d -exec cp header.shtml {} \;      
find xargstest/ -name 'file??' | sort | xargs wc -l
cat countryInfo.txt | grep -v "^#" >countryInfo-n.txt
cut -f 3 -d, list.txt | awk '{print $1}' | sort | uniq
```

终极大招，命令行里使用if/else/for，这个要是用熟了，那你就是大神了，工作会有飞一样的感觉，跟玩差不多。。。
```
if [ -f "/usr/bin/wine" ]; then export WINEARCH=win32; fi
[ -f "/usr/bin/wine" ] && export WINEARCH=win32
[ -f ~/sample.txt ] && echo “File exists.” || touch ~/sample.txt
ps aux | grep some_proces[s] > /tmp/test.txt ; if [ $? -eq 0 ]; then echo 1; else echo 0; fi
for i in {1..5}; do COMMAND-HERE; done
for i in /etc/*.conf; do cp $i /backup; done
for NUM in `seq 1 1 1000`; do touch $NUM-file.txt; done
```

## 为什么需要bash脚本
需要重复执行且逻辑简单。 bash脚本还有个好处就就是跨平台。
bash里常用的条件控制if/else/for:
```
# 写法一
if test -e /tmp/foo.txt ; then
  echo "Found foo.txt"
fi

# 写法二
if [ -e /tmp/foo.txt ] ; then
  echo "Found foo.txt"
fi

# 写法三
if [[ -e /tmp/foo.txt ]] ; then
  echo "Found foo.txt"
fi
```

最常用的判断文件，字符串等。。。
```
[ -e file ]：如果 file 存在，则为true
[ -s file ]：如果 file 存在且其长度大于零，则为true。
[ string ]：如果string不为空（长度大于0），则判断为真。
[ integer1 -eq integer2 ]：如果integer1等于integer2，则为true。
```

For循环的使用，使用bash脚本的最主要的理由：
```
for i in word1 word2 word3; do
  echo $i
done

for i in *.png; do
  ls -l $i
done
```

## 如果逻辑太复杂时，需要使用perl或者python
bash脚本虽然支持所有的条件控制，但是很多基本操作总是感觉很别扭，  
比如整数，浮点数，字符串的比较，数组的操作，hash的操作，set的操作，正则表达式的匹配等。  
所以我一般只有简单的命令和if/else/for才写bash，再复杂的逻辑就使用perl或者python。

### 参考

阮一峰的《bash脚本教程》： https://wangdoc.com/bash/index.html  
开源地址：https://github.com/wangdoc/bash-tutorial  

linux的命令和脚本参考，也可以参考小站：[http://www.linux6.com/](http://www.linux6.com/)  
开源地址：[https://github.com/itech001/linux6](https://github.com/itech001/linux6)



 

