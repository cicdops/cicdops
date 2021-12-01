### nl

- nl将在每一个非空的输入行前缀上行号和一个制表符。默认的数字格式是6个字符宽，用空格右对齐。与cat类似，nl命令将串联多个输入。
- -n定义数字的格式
rn右对齐，有空格填充物（默认）。  
rz 右对齐，带前导零。  
ln 左对齐，有空格填充物。  
```
# same as: cat -n greeting.txt fruits.txt nums.txt
$ nl greeting.txt fruits.txt nums.txt
     1  Hi there
     2  Have a nice day
     3  banana
     4  papaya
     5  mango
     6  3.14
     7  42
     8  1000

# example for input with empty lines, same as: cat -b
$ printf 'apple\n\nbanana\n\ncherry\n' | nl
     1  apple

     2  banana

     3  cherry
```


## wc

- wc命令是用来计算给定输入的行数、字数和字符数的。
-l for line count  
-w for word count  
-c for byte count  
```
$wc greeting.txt
 2  6 25 greeting.txt
$wc *[ck]*.csv
  9   9 101 marks.csv
  4   4  70 scores.csv
 13  13 171 total
 ```
