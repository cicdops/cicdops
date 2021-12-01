- uniq去除重复只保留单一副本
```
$ printf 'red\nred\nred\ngreen\nred\nblue\nblue' | uniq
red
green
red
blue
```

- 只保留重复的行-d
```
$ cat purchases.txt
coffee
tea
washing powder
coffee
toothpaste
tea
soap
tea

$ sort purchases.txt | uniq -d
coffee
tea
```

- 只保留不重复的行-u   
```
# just a reminder that uniq works based on adjacent lines only  
$ printf 'red\nred\nred\ngreen\nred\nblue\nblue' | uniq -u  
green  
red  
```

- 统计次数-c
```
$ sort purchases.txt | uniq -c | sort -n
      1 soap
      1 toothpaste
      1 washing powder
      2 coffee
      3 tea
```

- 分组--group
```
$ sort purchases.txt | uniq --group
coffee
coffee

soap

tea
tea
tea

toothpaste

washing powder
```
