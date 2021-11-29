- paste 实现多个文件的列合并
```
# quote the delimiter if it is a shell metacharacter
$ paste -d'|' <(seq 3) <(seq 4 5) <(seq 6 8)
1|4|6
2|5|7
3||8
```

- paste 将文件分割为多列多行
```
# five columns
$ seq 10 | paste -d: - - - - -
1:2:3:4:5
6:7:8:9:10

$ seq 6 | paste - nums.txt -
1       3.14    2
3       42      4
5       1000    6
```

- paste 将多行合并为一行
```
$ printf 'apple\nbanana\ncherry' | paste -sd-
apple-banana-cherry
```
