-comm 用来比较两个文件，与diff相似，但是输出为3列格式
第一列是第一个文件特有的行   
第二列是第二个文件特有的行  
第三列是两个文件共有的行  
-1 抑制第一个文件特有的列  
-2 抑制第二个文件特有的列  
-3 抑制两个文件共有的列  
共同列中的重复行数将是两个文件之间重复出现的最小值。其余的重复行，如果有的话，将被认为是拥有多余行的文件所独有的。  
一般先进行sort，然后在comm和diff  

```
# side by side view of the sample files
# note that these files are already sorted
$ paste colors_1.txt colors_2.txt
Blue    Black
Brown   Blue
Orange  Green
Purple  Orange
Red     Pink
Teal    Red
White   White

$ comm colors_1.txt colors_2.txt
        Black
                Blue
Brown
        Green
                Orange
        Pink
Purple
                Red
Teal
                White
                
# suppress lines common to both the files
$ comm -3 colors_1.txt colors_2.txt
        Black
Brown
        Green
        Pink
Purple
Teal
```
