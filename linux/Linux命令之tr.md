
- tr 实现字符的替换，参数必须使用单引号  
$ echo 'apple;banana;cherry' | tr ';' ':'  
apple:banana:cherry  

- tr 大小写的转化  
$ echo 'HELLO WORLD' | tr 'A-Z' 'a-z'  
hello world  

- tr 单行与多行的转化
```
printf 'apple\nbanana\ncherry\n' | tr '\n' ' '
apple banana cherry
echo 'apple banana cherry' | tr ' ' '\n'
apple
banana
cherry
```

- tr 删除字符-d
```
$ echo '2021-08-12' | tr -d '-'
20210812
# retain alphabets, whitespaces, period, exclamation and question mark
$ echo "$s" | tr -cd 'a-zA-Z.!?[:space:]'
Hi there! How are you? All fine here.
```

- tr 压缩重复
```
# squeeze other than lowercase alphabets
$ echo 'how    are     you!!!!!' | tr -cs 'a-z'
how are you!
```
