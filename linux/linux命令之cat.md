
- cat 用来连接多个文本文件
cat greeting.txt fruits.txt nums.txt > op.txt

- cat 可以接受标准输入
```
# both stdin and file arguments
$ echo 'apple banana cherry' | cat greeting.txt -
Hi there
Have a nice day
apple banana cherry
```

- cat 压缩多余的空行-s
```
$ printf 'hello\n\n\nworld\n\nhave a nice day\n' | cat -s
hello

world

have a nice day
```

- cat 列出行号-n 或者 -b
```
$ printf 'apple\n\nbanana\n\ncherry\n' | cat -n
     1	apple
     2	
     3	banana
     4	
     5	cherry
$ printf 'apple\n\nbanana\n\ncherry\n' | cat -b
     1  apple

     2  banana

     3  cherry
```



- cat 用来在shell脚本里创建文本文件：
```
$ cat << 'EOF' > fruits.txt
> banana
> papaya
> mango
> EOF



$ cat fruits.txt
banana
papaya
mango
```

- tac 发转文本的行
```
$ cat log.txt
--> warning 1
a,b,c,d
42
--> warning 2
x,y,z
--> warning 3
4,3,1

$ tac log.txt | grep -m1 'warning'
--> warning 3

$ tac log.txt | sed '/warning/q' | tac
--> warning 3
4,3,1
```
