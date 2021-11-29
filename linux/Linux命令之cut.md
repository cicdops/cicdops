
- cut 将文本分割为多个列，然后取需要的列
```
$ printf 'good\tfood\ntip\ttap' | cut -f2
food
tap

# first and third field
$ printf 'apple\tbanana\tcherry\n' | cut -f1,3
apple   cherry

# 2nd, 3rd and 4th fields
$ printf 'apple\tbanana\tcherry\tdates\n' | cut -f2-4
banana  cherry  dates

# all fields from the start till the 3rd field
$ printf 'apple\tbanana\tcherry\tdates\n' | cut -f-3
apple   banana  cherry

# all fields from the 3rd field till the end
$ printf 'apple\tbanana\tcherry\tdates\n' | cut -f3-
cherry  dates
```

- cut 指定分隔符 -d，必须单引号  
$ echo 'one;two;three;four' | cut -d';' -f3   
three  

- cut 取反-c
```
# except second field  
$ printf 'apple ball cat\n1 2 3 4 5' | cut --complement -d' ' -f2  
apple cat  
1 3 4 5  
```

- cut 去除不匹配分隔符的行
```
$ cat mixed_fields.csv
1,2,3,4
hello
a,b,c

# use -s option to suppress such lines
$ cut -sd, -f2 mixed_fields.csv
2
b
```
