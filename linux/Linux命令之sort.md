- sort 默认对整行按字符串排序
```
$ cat greeting.txt
Hi there
Have a nice day
# extract and sort space separated words
$ <greeting.txt tr ' ' '\n' | sort
a
day
Have
Hi
nice
there
```

- 忽略文件头排序-u
```
sort -u1 <scores.csv
Cy,97,98,95
Ith,100,100,100
Lin,78,83,80
```

- 降序排序-r
$ printf 'peace\nrest\nquiet' | sort -r  
rest  
quiet  
peace  

- 按数字排序-n
```
# lexicographic ordering isn't suited for numbers
$ printf '20\n2\n3' | sort
2
20
3

# -n helps in this case
$ printf '20\n2\n3' | sort -n
2
3
20
```

- human数字排序-h
```
$ cat file_size.txt
104K    power.log
316M    projects
746K    report.log
20K     sample.txt
1.4G    games

$ sort -hr file_size.txt
1.4G    games
316M    projects
746K    report.log
104K    power.log
20K     sample.txt
```

- 排除重复-u
```
# (10) and [10] are deemed equal in dictionary sort
$ printf '(10)\n[20]\n[10]' | sort -du
(10)
[20]
```

- 指定排序的列，-k选项以各种方式接受参数。你可以指定用逗号隔开的起始列和结束列的数字。如果你只指定起始列，最后一列将被用作结束列。通常你只想按单列排序，在这种情况下，开始列和结束列都要指定相同的数字。你可以多次使用-k选项来指定你自己的顺序优先级。
- 你可以使用-t选项来指定一个单字节字符作为字段分隔符。
```
# second column is the primary key
# reversed numeric sort on third column is the secondary key
# entire line will be used only if there are still tied entries
$ sort -t, -k2,2 -k3,3nr marks.csv
CSE,Amy,67
ECE,Joel,72
EEE,Moi,68
CSE,Moi,62
ECE,Om,92
EEE,Raj,88
ECE,Raj,53
CSE,Surya,81
EEE,Tia,72
```



