### split

-  默认情况下，分割命令一次分割1000行的输入。新行字符是默认的行分隔符。你可以传递单个文件或stdin数据作为输入。如果你需要将多个输入源串联起来，请使用cat。默认情况下，输出文件将被命名为xaa、xab、xac等（其中x是前缀）。如果文件名用完了，将再追加两个字母，并根据需要继续执行该模式。如果输入的行数不能平均分割，最后一个文件将包含少于1000行。

- -t选项用于指定一个单字节字符作为行的分隔符。
- -l选项可以改变每个输出文件中保存的行数。
- -b选项允许你按字节数分割输入。与基于行的分割类似，你总是可以通过串联输出文件来重建输入。这个选项也接受后缀，如K表示1024字节，KB表示1000字节，M表示1024*1024字节，等等。
- C选项与-b选项类似，但如果可能的话，它将尝试在行边界断开。断裂将发生在给定的字节数限制之前。
- n选项有几个特点。如果你只传递一个数字参数N，给定的输入文件将被分成N个块。为了避免拆分行，使用l/作为前缀。

```
# divide input into 2 parts, don't split lines
$ split -nl/2 purchases.txt
$ head x*
==> xaa <==
coffee
tea
washing powder
coffee

==> xab <==
toothpaste
tea
soap
tea
```

- 自定义分割后的文件名
```
# choose prefix as 'op_' instead of 'x'
$ split -l1 greeting.txt op_

$ head op_*
==> op_aa <==
Hi there

==> op_ab <==
Have a nice day
```

### join
- 连接命令可以帮助你根据一个共同的字段合并两个文件的行。当输入已按该字段排序时，这种方法效果最好。默认情况下，联合是根据第一个字段内容（也称为键）来合并两个文件。只有具有共同键的行将成为输出的一部分。
```
# sample sorted input files
$ cat shopping_jan.txt
apple   10
banana  20
soap    3
tshirt  3
$ cat shopping_feb.txt
banana  15
fig     100
pen     2
soap    1

# combine common lines based on the first field
$ join shopping_jan.txt shopping_feb.txt
banana 20 15
soap 3 1
```

- 使用--header选项可以在排序时忽略两个输入文件的第一行。
- -a选项也包括输入文件中不匹配的行。分别使用1和2作为第一个和第二个文件的参数。
默认情况下，联合是根据第一个字段内容（也称为键）来合并两个文件。只有具有共同键的行将成为输出的一部分。
- -t选项用于指定一个单字节字符作为字段分隔符。
- 默认情况下，两个输入文件的第一个字段都用来合并行。你可以使用-1和-2选项，后面跟一个字段号来指定一个不同的字段号。如果两个文件的字段号相同，你可以使用-j选项。
- -o指定输入的列名
```
# output field order is 1st, 2nd and 3rd fields from the first file
$ join -t, -1 2 -o 1.1,1.2,1.3 <(sort -t, -k2,2 marks.csv) names.txt
CSE,Amy,67
ECE,Raj,53
EEE,Raj,88
EEE,Tia,72
```




