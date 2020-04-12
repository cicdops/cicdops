---
description: ''
sidebar: 'devops'
prev:'/devops/DevOps的工作岗位的要求/
next: '/devops/DevOps常用工具/'
---

前篇提到了DevOps的工作岗位要求，但是没有来的及深入细节，本文根据个人10年多的经验，尽量详细地列举DevOps所需要用到的一些技术和相关参考网站。

## Linux基础
- Linux系统的基本概念；
- 必须会使用至少一个编辑器，例如VIM；
- 至少会一种shell，例如bash；
- 会使用rsh/ssh/scp/rhost/rsync；
- cron相关设置和命令，crontab；
- 进程的状态，以及相关的命令ps, top, pgrep，pstree;
- 文件状态的查看排序，ls；
- 文件的查找， find；
- 文件权限，以及相关命令ls, chmod, chown;
- 文件的压缩解压种类，tar；
- job相关命令 jobs，nohup，bg, fg, disown;
- 信号的种类INT，TERM，QUIT， 和kill的使用，例如 kill -9；
- 软硬链接的概念和命令，ln；
- 磁盘的使用和配额命令，df，du，quota；
- 内存的种类swap和buffer，相关命令top；
- 系统的检测命令，uptime，ps，top， free，pstree；
- Daemon，service的工作原理，配置，使用，例如命令service；
- 用户的权限，group等的操作；
- 磁盘的自动挂载；
- 文件内容的查找命令grep，sed；
- 高级命令xargs；
- 文本数据库的操作命令，例如cut，tr，sort，uniq；
- 会使用pstree，strace等追踪进程相关问题；
- 网络和防火墙的配置；
- wget，curl下载或者模拟http；

> linux 入门请移步：  
> http://www.linux6.com/  
> https://www.cnblogs.com/itech/p/3660240.html  


## 脚本编码能力
DevOps的工作内容就是流程的自动化，不是所有的任务都有第三方的免费工具，所以使用**Perl**或者**Python**将重复的工作脚本化自动化是一项主要的工作职责。其中包括：

- 文件读写处理，
- 正则表达式匹配，
- 多线程多进程并发，
- 日志分析和报警，
- 生成csv或者网页的报告，
- 各种任务的自动化检测和报警。
- 以及通用软件和系统的开发，

总之各种任务种类繁多，但是只要你有Perl或者Python这样的瑞士军刀，那就手到擒拿了。

## 开发和持续集成相关的工具
最近几年软件流程相关的工具百花齐放，虽然没有web技术框架那么夸张，但是也足够让人眼花缭乱了。工具会根据公司软件所在的领域不同，也会应为软件所使用的技术栈有所差异。

- 开发编译工具的使用，Makefile，gdb，gradle，cmake，vscode等；
- 源码管理工具，git，github，svn等；
- 持续集成工具，Jenkins，TeamCity， Bamboo等；
- 测试相关框架和自动化，Junit，selenium等；
- 软件质量相关工具，Jira，SonarQube 等；
- artifact管理，dockerhub，jfrog，nexus等；
- 容器相关工具，docker，kubernes，swam，mesos等；
- 流程监控和报警，elesticsearch，kibana，prometheus，grafana等；
- 云服务的使用， amazon，openshift，google cloud platform等；
- 自动部署工具，chef，puppet，salkstack，ansible；

>更多工具：https://github.com/cicdops/awesome-ciandcd

## 其他必须技能
- web服务器作为基础架构之一，必须会配置，例如apache，nginx；
- 数据库在配置管理中，也是基础架构之一，必须熟悉使用和管理，常用的数据库MySQL，Mongo，Redis；
- 虚拟机的使用，VirtualBox, Vagrant;
- Docker容器的使用以及容器编排工具的配置和使用；
- Web开发能力，熟悉javascript和流行的web框架React等；
- 机器学习和人工智能相关的技术；
