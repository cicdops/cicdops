## Linux基本开发环境配置git,c++,nodejs,nginx

前一篇文章配置了基本的SSH，本文来讲讲关于基本的开发环境的配置，包括git，c，c++，nodejs，nginx。

### 安装git和配置无密码登录github
```
yum install git

ssh-keygen -t rsa -C "github_id_email"
GitHub上，打开“Account settings”--“SSH Keys”页面，
然后点击“Add SSH Key”，填上Title（随意写），
在Key文本框里粘贴 id_rsa.pub文件里的全部内容。

ssh -T git@github.com
git config --global user.name "github_name"
git config --global user.email "github_id_email" 

下载个github项目试试
git clone git@github.com:cicdops/cicdops.git
```

### 安装c和c++的编译开发环境
这个group的打包安装还是第一次用，赞一个！
```
dnf install gcc
dnf groupinstall "Development Tools"
```

### 安装nodejs
作为最流行的变成环境，真的是低头不见抬头见，迟早都得装，所以现在就搞定她。
```
yum install nodejs
安装的gridsome模块玩玩把。
npm install --global --force @gridsome/cli
```

### 安装nginx
```
安装nginx
dnf install nginx
/bin/systemctl start nginx.service
firewall-cmd --zone=public --add-port=80/tcp  --permanent
systemctl restart firewalld
```

### 配置终端支持中文
最后再来个重量级的配置，必不可少，有了这个才是完美的Linux开发环境。
```
localectl status
localectl list-locales
dnf install langpacks-zh_CN.noarch
localectl set-locale LANG=zh_CN.utf8
```
如果你是使用putty来SSH的，那么还需要配置下。
![putty](https://img2020.cnblogs.com/blog/46653/202004/46653-20200416202409680-267573013.png)

## 欢迎关注公众号：cicdops
![devops9](http://aishizhe.cn/cicdops/gzh12.jpg)
