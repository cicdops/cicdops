
GNU MAKE 入门

来自： https://www.bogotobogo.com/cplusplus/gnumake.php  

## make规则定义：
```
target ... : prerequisites (dependencies) ...
     recipe (system command)...
```

## 一个简单的makefile：
```
myprogram : main.o aa.o bb.o cc.o
	g++ -o myprogram main.o aa.o bb.o cc.o

main.o : main.cpp header1.h
	g++ -c main.cpp	
aa.o : aa.cpp header1.h header2.h
	g++ -c aa.cpp
bb.o : bb.cpp header2.h
	g++ -c bb.cpp
cc.o : cc.cpp header3.h
	g++ -c cc.cpp
clean :
	rm myprogram \
	main.o aa.o bb.o cc.
```

Make读取当前目录中的makefile，并从处理第一条规则开始。在我们的例子中，该规则用于重新链接我的程序。然而，在make完全处理此规则之前，它必须处理myprogram所依赖的文件的规则，在本例中是对象文件。每个文件都根据自己的规则进行处理。这些规则通过编译源文件来更新每个.o文件。如果源文件或作为先决条件而命名的任何头文件比目标文件更新，或者目标文件不存在，则应该执行重新编译。  
处理其他规则是因为它们的目标显示为目标的先决条件。如果目标不依赖其他规则，则不会处理该规则，除非我们用make clean等命令告诉make这样做。

在重新编译需要的目标文件之后，make决定是否重新链接我的程序。如果文件不存在，或者任何目标文件比它更新，则必须这样做。如果一个对象文件刚刚被重新编译，它现在比myprogram要新，所以myprogram被重新链接。因此，如果我们更改文件aa.cpp并运行make, make将编译该文件以更新aa.O，然后链接myprogram。如果我们改变文件header2.h并运行make, make将重新编译目标文件aa.o和bb.O，然后链接文件myprogram。  

简而言之，要更新我的程序，我们只需要发出make命令来清除*。O和myprogram，我们发出make clean。  

但是存在重复的文件，这使得以后添加其他文件时容易出错。所以，我们需要使用变量:
```
#Makefile case 1
OBJECTS = main.o aa.o bb.o cc.o
myprogram : $(OBJECTS)
	g++ -o myprogram $(OBJECTS)

main.o : main.cpp header1.h
	g++ -c main.cpp	
aa.o : aa.cpp header1.h header2.h
	g++ -c aa.cpp
bb.o : bb.cpp header2.h
	g++ -c bb.cpp
cc.o : cc.cpp header3.h
	g++ -c cc.cpp
clean :
	rm myprogram \
	$(OBJECTS)
```

实际上，make有一个用于更新的隐式规则(何时以及如何根据文件名重制文件)。根据名为*.cpp文件生成对应的*.o文件，我们不需要为编译器添加配方。例如，生成main.o。我们不需要指定g++ -c main.cpp:
```
#Makefile case 2
OBJECTS = main.o aa.o bb.o cc.o
myprogram : $(OBJECTS)
	g++ -o myprogram $(OBJECTS)
main.o : header1.h
aa.o :  header1.h header2.h
bb.o : header2.h
cc.o : header3.h
clean : rm myprogram \
	$(OBJECTS)
```

- 为了防止make被一个叫做clean的实际文件搞混，我可以使用.PHONY告诉make系统clean为一个target。  
- -rm中的“-”使make忽略rm的错误继续执行。


下面的Makefile使用了更多的变量，包括自动变量。
```
#Makefile case 4
CC = g++
CFLAGS = -c
SOURCES =  main.cpp aa.cpp bb.cpp cc.cpp
OBJECTS = $(SOURCES:.cpp=.o)
EXECUTABLE = myprogram

all: $(OBJECTS) $(EXECUTABLE)

$(EXECUTABLE) : $(OBJECTS)
		$(CC) $(OBJECTS) -o $@  

.cpp.o: *.h
	$(CC) $(CFLAGS) $< -o $@

clean :
	-rm -f $(OBJECTS) $(EXECUTABLE)

.PHONY: all clean
```
- $(SOURCES:.cpp=.o)： 从SOURCES里所有的cpp文件得到对应的所有o文件。
- $<：代表所有的依赖
- $@：代表target
- $^或者$+： 代表所有的依赖
- $<： 代表第一个依赖


如果我们运行make或者make all，我们得到:
```
main.cpp -o main.o
g++ -c aa.cpp -o aa.o
g++ -c bb.cpp -o bb.o
g++ -c cc.cpp -o cc.o
g++ main.o aa.o bb.o cc.o -o myprogram
```

make中调用shell脚本命令：
```
# compiler
CC = g++
# install dir
INSTDIR = /usr/local/bin
# include dir
INCLUDE = .
# for debug
CFLAGS = -g -c -Wall
# for release
# CFLAGS = -O -c -Wall

SOURCES =  main.cpp aa.cpp bb.cpp cc.cpp
OBJECTS = $(SOURCES:.cpp=.o)
EXECUTABLE = myprogram

all: $(OBJECTS) $(EXECUTABLE)

$(EXECUTABLE) : $(OBJECTS)
                $(CC) $(OBJECTS) -o $@

.cpp.o: *.h
        $(CC) $(CFLAGS) $< -o $@

clean :
        -rm -f $(OBJECTS) $(EXECUTABLE)

.PHONY: all clean

install: $(EXECUTABLE)
        @ if [ -d $(INSTDIR) ]; then \
           cp $(EXECUTABLE) $(INSTDIR); \
           chmod a+x $(INSTDIR)/$(EXECUTABLE); \
           chmod og-w $(INSTDIR)/$(EXECUTABLE); \
           echo "$(EXECUTABLE) is installed in $(INSTDIR)"; \
        else \
           echo "Warning! $(INSTDIR) does not exist"; \
        fi           
```


如果我们想根据条件出发后面脚本的执行，我们可以使用&&:
```
install: $(EXECUTABLE)
        @ if [ -d $(INSTDIR) ]; \
        then \
           cp $(EXECUTABLE) $(INSTDIR) && \
           chmod a+x $(INSTDIR)/$(EXECUTABLE) && \
           chmod og-w $(INSTDIR)/$(EXECUTABLE) && \
           echo "$(EXECUTABLE) is installed in $(INSTDIR)"; \
        else \
           echo "Warning! $(INSTDIR) does not exist"; \
        fi
```

## make的隐式推理规则
对于下面的文件不创建makefile直接make，我们可以看到make能够正确地执行。
```
/* main.cpp */

#include <stdio.h>
int main(int argc, char* argv[])
{
   return 0;
}
```
这是因为make有很多内部规则，它知道如何调用编译器，就像我们从上面的例子中看到的那样。它被称为推理规则。由于规则使用宏，我们可以通过给宏赋一个新值来改变行为。

https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html#Automatic-Variables
```
%.o : %.c
        $(CC) -c $(CFLAGS) $(CPPFLAGS) $< -o $@
```
