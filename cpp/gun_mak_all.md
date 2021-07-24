
GUN Make从入门到精通

翻译自：https://interrupt.memfault.com/blog/gnu-make-guidelines  

GNU Make是一种流行的、常用的用于构建C语言软件的程序。用于构建Linux内核和其他常用的GNU/Linux程序和软件库。  

大多数嵌入式软件开发人员在职业生涯中的某个时候都会使用GNU Make，要么使用它来编译小型库，要么构建整个项目。尽管有很多很多的选项可以替代Make，但是由于它的特性集和广泛的支持，它仍然通常被选择为新软件的构建系统。  

本文解释了GNU Make的一般概念和特性，并包括了如何最大限度地利用Make构建的建议!这是我最喜欢/最常用的Make概念和功能的简要介绍.  

### 什么是GNU Make?
GNU Make是一个可以自动运行shell命令并帮助执行重复任务的程序。它通常用于将文件转换成其他形式，例如将源代码文件编译成程序或库。  

它通过跟踪先决条件和执行命令层次结构来生成目标来实现这一点。  

尽管GNU Make手册很长，但我建议阅读一下，因为它是我找到的最好的参考:https://www.gnu.org/software/make/manual/html_node/index.html  

### 何时选择Make
Make适用于构建小型C/ c++项目或库，这些项目或库将包含在另一个项目的构建系统中。大多数构建系统都有办法集成基于make的子项目。

对于较大的项目，您会发现更现代的构建系统更易于使用。

在以下情况下，我建议使用非Make的构建系统:

当正在构建的目标(或文件)数量为(或最终将为)数百时。
需要一个“配置”步骤，它设置和保存变量、目标定义和环境配置。
该项目将保持内部或私有，将不需要由终端用户构建。
您会发现调试是一项令人沮丧的工作。
您需要构建的是跨平台的，可以在macOS、Linux和Windows上构建。
在这些情况下，您可能会发现使用CMake、Bazel、Meson或其他现代构建系统是一种更愉快的体验。

### 调用Make
运行make将从当前目录加载一个名为Makefile的文件，并尝试更新默认目标(稍后会详细介绍目标)。

Make将依次搜索名为GNUmakefile、makefile和makefile的文件

你可以使用-f/——file参数指定一个特定的makefile:

$ make -f foo.mk
你可以指定任意数量的目标，列出它们作为位置参数:

#典型目标
$ make clean all
你可以用-C参数传递Make目录，它会运行Make，就像它首先被cd到那个目录一样。

$ make -C some/sub/directory
有趣的事实:git也可以和-C一起运行，达到同样的效果!

### 并行调用
如果提供-j或-l选项，Make可以并行运行作业。我被告知的一个指导原则是，将作业限制设置为处理器核心数量的1.5倍:

#a machine with 4 cores:
$ make -j $ make -j
有趣的是，我发现使用-l“负载限制”选项的CPU利用率比使用-j“工作”选项略好。尽管YMMV !

有几种方法可以通过编程方式找到当前机器的CPU计数。一个简单的方法是使用python multiprocessing.cpu_count()函数来获得支持的系统的线程数量(注意与超线程系统,这将消耗大量的计算机资源,但可能是更可取的让让产生无限的工作)。

#在子shell中调用python的cpu_count()函数
$ make -l $(python -c "import multiprocessing;print (multiprocessing.cpu_count())”)

### 并行调用期间的输出
如果Make正在并行执行的命令有大量输出，您可能会看到在stdout上交错输出。为了处理这个问题，Make有一个选项——output -sync。

我建议使用——output-sync=recurse，它将在每个目标完成时打印recipe的全部输出，而不会分散其他recipe输出。

如果recipe使用递归Make，它还将一起输出整个递归Make的输出。

对Makefile的剖析
Makefile包含用于生成目标的规则。Makefile的一些基本组件如下所示:
```
#Comments are prefixed with the '#' symbol

#A variable assignment
FOO = "hello there!"

#A rule creating target "test", with "test.c" as a prerequisite
test: test.c
	# The contents of a rule is called the "recipe", and is
	# typically composed of one or more shell commands.
	# It must be indented from the target name (historically with
	# tabs, spaces are permitted)

	# Using the variable "FOO"
	echo $(FOO)

	# Calling the C compiler using a predefined variable naming
	# the default C compiler, '$(CC)'
	$(CC) test.c -o test
```
让我们看看上面例子的每个部分。

### 变量
变量使用语法$(FOO)，其中FOO是变量名。

变量包含纯字符串，因为Make没有其他数据类型。附加到一个变量将添加一个空格和新的内容:
```
FOO = one
FOO += two
# FOO is now "one two"

FOO = one
FOO = $(FOO)two
# FOO is now "onetwo"
```
### 变量赋值
在GNU Make语法中，变量的赋值方式有两种:

右边的表达式是逐字赋值给变量的——这很像C/ c++中的宏，在使用变量时对表达式求值:
```
FOO = 1
BAR = $(FOO)
FOO = 2
# prints BAR=2
$(info BAR=$(BAR))
```
将一个表达式的结果赋值给一个变量;表达式在赋值时展开:
```
FOO = 1
BAR := $(FOO)
FOO = 2
# prints BAR=1
$(info BAR=$(BAR))
```
注意:上面的$(info…)函数用于打印表达式，在调试makefile时非常方便!*’

未显式、隐式或未自动设置的变量将计算为空字符串。


### 环境变量
环境变量被携带到Make执行环境中。以下面的makefile为例:
```
$(info YOLO variable = $(YOLO))
```
如果我们在运行make时在shell命令中设置了变量YOLO，我们将设置这个值:
```
$ YOLO="hello there!" make
YOLO variable = hello there!
make: *** No targets.  Stop.
```
注意:Make打印“No targets”错误，因为我们的makefile没有列出目标!

如果你使用?=赋值语法，Make只会在变量没有值的情况下赋值:

Makefile:
```
#默认CC为gcc
CC ? = gcc
```
然后我们可以重写makefile中的$(CC):

```$ CC=clang make```

另一个常见的模式是允许插入额外的标志。在makefile中，我们将追加变量而不是直接赋值给它。

```CFLAGS += -Wall```

这允许从环境中传入额外的标志:

```
$ CFLAGS='-Werror=conversion -Werror=double-promotion' make
```
这是非常有用的!

### 最重要的变量
变量使用的一个特殊类别称为覆盖变量。使用此命令行选项将覆盖设置在环境中的或Makefile中的值!

Makefile:

```# the value passed in the make command will override
# any value set elsewhere
YOLO = "not overridden"
$(info $(YOLO))
```
命令:

```
# setting "YOLO" to different values in the environment + makefile + overriding
# variable, yields the overriding value
$ YOLO="environment set" make YOLO='overridden!!'
overridden!!
make: *** No targets.  Stop.
```

### 有针对性的变量
这些变量仅在recipe上下文中可用。它们也适用于任何必备配方!

```
# set the -g value to CFLAGS
# applies to the prog.o/foo.o/bar.o recipes too!
prog : CFLAGS = -g
prog : prog.o foo.o bar.o
	echo $(CFLAGS) # will print '-g'

```

### 隐式变量

这些都是由Make预先定义的(除非用同名的任何其他变量类型重写)。一些常见的例子:
```
$(CC) - the C compiler (gcc)
$(AR) - archive program (ar)
$(CFLAGS) - flags for the C compiler
Full list here:

https://www.gnu.org/software/make/manual/html_node/Implicit-Variables.html
```
### 自动变量

这些是由Make设置的特殊变量，在recipe上下文中可用。它们对于防止重复的名字很有用(Don 't Repeat Yourself)。

一些常见的自动变量:
```
# $@ : the target name, here it would be "test.txt"
test.txt:
	echo HEYO > $@

# $^ : name of all the prerequisites
all.zip: foo.txt test.txt
	# run the gzip command with all the prerequisites "$^", outputting to the
	# name of the target, "$@"
	gzip -c $^ > $@
See more at: https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html
```

### 目标(目标)
目标是规则语法的左边:
```
arget: prerequisite
	recipe
```
target几乎总是命名文件。这是因为Make使用最后修改时间来跟踪target是否比其prerequistite更新或更早，以及是否需要重新构建它!

当调用Make时，你可以通过将其指定为位置参数来指定想要构建的target:

```
# make the 'test.txt' and 'all.zip' targets
make test.txt all.zip
```

如果您没有在命令中指定目标，Make将使用makefile中指定的第一个目标，称为“默认目标”(如果需要，也可以覆盖默认目标)。

### 虚假phony目标
有时候设置元目标是很有用的，比如all, clean, test等等。在这些情况下，您不希望Make检查名为all/clean等的文件。

Make提供.PHONY目标语法，将目标标记为不指向文件:

假设我们的项目构建了一个程序和一个库foo和foo.a;如果我们想要
在默认情况下，我们可以创建一个'all'规则来构建两者
.PHONY:all
all : foo foo.a

如果你有多个假目标，一个好的模式可能是将每个目标都附加到定义它的.PHONY中:

```
# the 'all' rule that builds and tests. Note that it's listed first to make it
# the default rule
.PHONY: all
all: build test

# compile foo.c into a program 'foo'
foo: foo.c
	$(CC) foo.c -o foo

# compile foo-lib.c into a library 'foo.a'
foo.a: foo-lib.c
	# compile the object file
	$(CC) foo-lib.c -c foo-lib.o
	# use ar to create a static library containing our object file. using the
	# '$@' variable here to specify the rule target 'foo.a'
	$(AR) rcs $@ foo-lib.o

# a phony rule that builds our project; just contains a prerequisite of the
# library + program
.PHONY: build
build: foo foo.a

# a phony rule that runs our test harness. has the 'build' target as a
# prerequisite! Make will make sure (pardon the pun) the build rule executes
# first
.PHONY: test
test: build
	./run-tests.sh
```
请注意! !. phony目标总是被认为是过期的，因此Make将总是运行这些目标的配方(因此也运行任何具有. phony先决条件的目标!)小心使用! !

### 隐式规则
隐含规则由Make提供。我发现使用它们会让人感到困惑，因为在幕后发生了太多的行为。你偶尔会在野外遇到它们，所以要小心。

```
# this will compile 'test.c' with the default $(CC), $(CFLAGS), into the program
# 'test'. it will handle prerequisite tracking on test.c
test: test.o
Full list of implicit rules here:

https://www.gnu.org/software/make/manual/html_node/Catalogue-of-Rules.html
```

### 模式的规则
模式规则允许你编写一个通用规则，通过模式匹配应用于多个目标:
```
# Note the use of the '$<' automatic variable, specifying the first
# prerequisite, which is the .c file
%.o: %.c
	$(CC) -c $< -o $@
```
or
```
OBJ_FILES = foo.o bar.o

# Use CC to link foo.o + bar.o into 'program'. Note the use of the '$^'
# automatic variable, specifying ALL the prerequisites (all the OBJ_FILES)
# should be part of the link command
program: $(OBJ_FILES)
    $(CC) -o $@ $^
```

### 先决条件
如上所述，Make将在运行规则之前检查这些目标。它们可以是文件或其他目标。

如果任何先决条件比目标更新(修改时间)，Make将运行目标规则。

在C项目中，你可能有一个将C文件转换为目标文件的规则，如果C文件发生变化，你希望目标文件重新生成:
```
foo.o: foo.c
	# use automatic variables for the input and output file names
	$(CC) $^ -c $@
```

### 自动的先决条件
对于C语言项目来说，一个非常重要的考虑是，如果C文件的#include头文件发生了变化，那么将触发重新编译。这是通过gcc/clang的-M编译器标志完成的，它将输出一个.d文件，然后用Make include指令导入。

.d文件将包含.c文件的必要先决条件，因此任何头文件的更改都会导致重新构建。点击这里查看更多详情:

https://www.gnu.org/software/make/manual/html_node/Automatic-Prerequisites.html http://make.mad-scientist.net/papers/advanced-auto-dependency-generation/

基本形式可能是:
```
# these are the compiler flags for emitting the dependency tracking file. Note
# the usage of the '$<' automatic variable
DEPFLAGS = -MMD -MP -MF $<.d

test.o: test.c
    $(CC) $(DEPFLAGS) $< -c $@

# bring in the prerequisites by including all the .d files. prefix the line with
# '-' to prevent an error if any of the files do not exist
-include $(wildcard *.d)
```

### Order-only 先决条件
这些先决条件只有在不存在的情况下才会构建;如果它们比目标更新，则不会触发目标重新构建。

典型的用法是为输出文件创建一个目录;将文件发送到目录将更新其mtime属性，但我们不希望由此触发重新构建。

```
OUTPUT_DIR = build

# output the .o to the build directory, which we add as an order-only
# prerequisite- anything right of the | pipe is considered order-only
$(OUTPUT_DIR)/test.o: test.c | $(OUTPUT_DIR)
	$(CC) -c $^ -o $@

# rule to make the directory
$(OUTPUT_DIR):
	mkdir -p $@
```

### recipe
“recipe”是创建目标时要执行的shell命令列表。它们被传递到子shell中(默认为/bin/sh)。如果target在recipe运行后更新，则认为规则是成功的(但如果没有更新，则不视为错误)。
```
foo.txt:
	# a simple recipe
	echo HEYO > $@
```

如果配方中的任何一行返回非零退出代码，Make将终止并打印一条错误消息。你可以通过前缀-字符来告诉Make忽略非零退出码:

```
.PHONY: clean
clean:
	# we don't care if rm fails
	-rm -r ./build
```

在recipe行前面加上@将禁止在执行之前echo该行:
```
clean:
	@# this recipe will just print 'About to clean everything!'
	@# prefixing the shell comment lines '#' here also prevents them from
	@# appearing during execution
	@echo About to clean everything!
```

Make会在运行recipe上下文中展开变量/函数表达式，但不会处理它。如果你想访问shell变量，请使用$:
```
USER = linus

print-user:
	# print out the shell variable $USER
	echo $$USER

	# print out the make variable USER
	echo $(USER)
```

### function
Make函数的调用语法如下:

$(function-name arguments)
其中arguments是用逗号分隔的参数列表。

Built-in Functions
There are several functions provided by Make. The most common ones I use are for text manipulation: https://www.gnu.org/software/make/manual/html_node/Text-Functions.html https://www.gnu.org/software/make/manual/html_node/File-Name-Functions.html

For example:
```
FILES=$(wildcard *.c)

# you can combine function calls; here we strip the suffix off of $(FILES) with
# the $(basename) function, then add the .o suffix
O_FILES=$(addsuffix .o,$(basename $(FILES)))

# note that the GNU Make Manual suggests an alternate form for this particular
# operation:
O_FILES=$(FILES:.c=.o)
```

### 用户定义函数
```
reverse = $(2) $(1)

foo = $(call reverse,a,b)

# recursive wildcard (use it instead of $(shell find . -name '*.c'))
# taken from https://stackoverflow.com/a/18258352
rwildcard=$(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2) $(filter $(subst *,%,$2),$d))

C_FILES = $(call rwildcard,.,*.c)
```

### shell函数
你可以让Make调用一个shell表达式并捕获结果:

TODAYS_DATE=$(shell date --iso-8601)  

不过，我在使用这个功能时很谨慎;它会增加对你使用的任何程序的依赖，所以如果你正在调用更奇特的程序，确保你的构建环境是受控的(例如在容器中或使用Conda)。

make的条件表达式
```
FOO=yolo
ifeq ($(FOO),yolo)
$(info foo is yolo!)
else
$(info foo is not yolo :( )
endif

# testing if a variable is set; unset variables are empty
ifneq ($(FOO),)  # checking if FOO is blank
$(info FOO is unset)
endif

# "complex conditional"
ifeq ($(FOO),yolo)
$(info foo is yolo)
else ifeq ($(FOO), heyo)
$(info foo is heyo)
else
$(info foo is not yolo or heyo :( )
endif
```

### make include

sources.mk:

SOURCE_FILES := \
  bar.c \
  foo.c \


Makefile:

include sources.mk

OBJECT_FILES = $(SOURCE_FILES:.c=.o)

%.o: %.c
	$(CC) -c $^ -o $@

### make eval
```
# generate rules for xml->json in some weird world
FILES = $(wildcard inputfile/*.xml)

# create a user-defined function that generates rules
define GENERATE_RULE =
$(eval
# prereq rule for creating output directory
$(1)_OUT_DIR = $(dir $(1))/$(1)_out
$(1)_OUT_DIR:
	mkdir -p $@

# rule that calls a script on the input file and produces $@ target
$(1)_OUT_DIR/$(1).json: $(1) | $(1)_OUT_DIR
	./convert-xml-to-json.sh $(1) $@
)

# add the target to the all rule
all: $(1)_OUT_DIR/$(1).json
endef
```
```
# produce the rules
.PHONY: all
all:

$(foreach file,$(FILES),$(call GENERATE_RULE,$(file)))
```
请注意，使用Make的这个特性的方法可能会让人很困惑，添加一些有用的注释来解释意图是什么，对您未来的自己会很有用!

### VPATH
VPATH是一个特殊的Make变量，它包含Make在查找先决条件和目标时应该搜索的目录列表。

它可以用来将对象文件或其他派生文件发送到./build目录中，而不是把src目录弄得乱七八糟:
```
# This makefile should be invoked from the temporary build directory, eg:
# $ mkdir -p build && cd ./build && make -f ../Makefile

# Derive the directory containing this Makefile
MAKEFILE_DIR = $(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

# now inform Make we should look for prerequisites from the root directory as
# well as the cwd
VPATH += $(MAKEFILE_DIR)

SRC_FILES = $(wildcard $(MAKEFILE_DIR)/src/*.c)

# Set the obj file paths to be relative to the cwd
OBJ_FILES = $(subst $(MAKEFILE_DIR)/,,$(SRC_FILES:.c=.o))

# now we can continue as if Make was running from the root directory, and not a
# subdirectory

# $(OBJ_FILES) will be built by the pattern rule below
foo.a: $(OBJ_FILES)
	$(AR) rcs $@ $(OBJ_FILES)

# pattern rule; since we added ROOT_DIR to VPATH, Make can find prerequisites
# like `src/test.c` when running from the build directory!
%.o: %.c
	# create the directory tree for the output file 👍
	echo $@
	mkdir -p $(dir $@)
	# compile
	$(CC) -c $^ -o $@
```

### touch file
```
# our tools are stored in tools.tar.gz, and downloaded from a server
TOOLS_ARCHIVE = tools.tar.gz
TOOLS_URL = https://httpbin.org/get

# the rule to download the tools using wget
$(TOOLS_ARCHIVE):
	wget $(TOOLS_URL) -O $(TOOLS_ARCHIVE)

# rule to unpack them
tools-unpacked.dummy: $(TOOLS_ARCHIVE)
	# running this command results in a directory.. but how do we know it
	# completed, without a file to track?
	tar xzvf $^
	# use the touch command to record completion in a dummy file
	touch $@
```

### 调试makefile
对于小问题，我通常使用printf的Make等效函数，即$(info/warning/error)函数，例如当检查不工作的条件路径时:
```
ifeq ($(CC),clang)
$(error whoops, clang not supported!)
endif
```

要调试为什么规则在不应该运行的情况下运行(或者相反)，可以使用——debug选项:https://www.gnu.org/software/make/manual/html_node/Options-Summary.html

我建议在使用此选项时将stdout重定向到文件，它会产生大量输出。

### profile
For profiling a make invocation (e.g. for attempting to improve compilation times), this tool can be useful:

https://github.com/rocky/remake

Check out the tips here for compilation-related performance improvements:

https://interrupt.memfault.com/blog/improving-compilation-times-c-cpp-projects

### verbose flag
```
# Makefile for building the 'example' binary from C sources

# Verbose flag
ifeq ($(V),1)
Q :=
else
Q := @
endif

# The build folder, for all generated output. This should normally be included
# in a .gitignore rule
BUILD_FOLDER := build

# Default all rule will build the 'example' target, which here is an executable
.PHONY:
all: $(BUILD_FOLDER)/example

# List of C source files. Putting this in a separate variable, with a file on
# each line, makes it easy to add files later (and makes it easier to see
# additions in pull requests). Larger projects might use a wildcard to locate
# source files automatically.
SRC_FILES = \
    src/example.c \
    src/main.c

# Generate a list of .o files from the .c files. Prefix them with the build
# folder to output the files there
OBJ_FILES = $(addprefix $(BUILD_FOLDER)/,$(SRC_FILES:.c=.o))

# Generate a list of depfiles, used to track includes. The file name is the same
# as the object files with the .d extension added
DEP_FILES = $(addsuffix .d,$(OBJ_FILES))

# Flags to generate the .d dependency-tracking files when we compile.  It's
# named the same as the target file with the .d extension
DEPFLAGS = -MMD -MP -MF $@.d

# Include the dependency tracking files
-include $(DEP_FILES)

# List of include dirs. These are put into CFLAGS.
INCLUDE_DIRS = \
    src/

# Prefix the include dirs with '-I' when passing them to the compiler
CFLAGS += $(addprefix -I,$(INCLUDE_DIRS))

# Set some compiler flags we need. Note that we're appending to the CFLAGS
# variable
CFLAGS += \
    -std=c11 \
    -Wall \
    -Werror \
    -ffunction-sections -fdata-sections \
    -Og \
    -g3

# Our project requires some linker flags: garbage collect sections, output a
# .map file
LDFLAGS += \
    -Wl,--gc-sections,-Map,$@.map

# Set LDLIBS to specify linking with libm, the math library
LDLIBS += \
    -lm

# The rule for compiling the SRC_FILES into OBJ_FILES
$(BUILD_FOLDER)/%.o: %.c
	@echo Compiling $(notdir $<)
	@# Create the folder structure for the output file
	@mkdir -p $(dir $@)
	$(Q) $(CC) $(CFLAGS) $(DEPFLAGS) -c $< -o $@

# The rule for building the executable "example", using OBJ_FILES as
# prerequisites. Since we're not relying on an implicit rule, we need to
# explicity list CFLAGS, LDFLAGS, LDLIBS
$(BUILD_FOLDER)/example: $(OBJ_FILES)
	@echo Linking $(notdir $@)
	$(Q) $(CC) $(CFLAGS) $(LDFLAGS) $^ $(LDLIBS) -o $@

# Remove debug information for a smaller executable. An embedded project might
# instead using [arm-none-eabi-]objcopy to convert the ELF file to a raw binary
# suitable to be written to an embedded device
STRIPPED_OUTPUT = $(BUILD_FOLDER)/example-stripped

$(STRIPPED_OUTPUT): $(BUILD_FOLDER)/example
	@echo Stripping $(notdir $@)
	$(Q)objcopy --strip-debug $^ $@

# Since all our generated output is placed into the build folder, our clean rule
# is simple. Prefix the recipe line with '-' to not error if the build folder
# doesn't exist (the -f flag for rm also has this effect)
.PHONY: clean
clean:
	- rm -rf $(BUILD_FOLDER)
```
$ V=1 make

### make 建议
让Make发挥最大作用的建议列表:

target通常应该是真实的文件。
当发出子MAKE命令时，总是使用$(MAKE)。
尽量避免使用.phony目标。如果规则生成任何文件工件，请考虑将其作为目标，而不是冒名!
尽量避免使用隐含的规则。
对于C文件，确保使用.d自动包括跟踪!
小心使用元编程。
在规则中使用自动变量。总是尝试使用$@作为菜谱输出路径，这样你的规则和Make的路径就完全相同了。
在makefile中自由地使用注释，特别是在使用了复杂的行为或微妙的语法时。你的同事(还有未来的自己)会感谢你的。
使用-j或-l选项并行运行Make !
尽量避免使用touch命令来跟踪规则完成.

### 其他
您还可能在开放源码项目中遇到automake(请查找./configure脚本)。这是一个生成makefile的相关工具，值得一看(特别是如果您正在编写需要广泛移植的C软件)。

今天有许多GNU Make的竞争者，我鼓励大家去研究它们。一些例子:

CMake非常流行(Zephyr项目使用了它)，值得一看。它使out-of-tree 构建非常容易
Bazel使用声明式语法(vs. Make的命令式方法)
Meson是一个像cmake一样的元构建器，但默认使用Ninja作为后端，可以非常快
