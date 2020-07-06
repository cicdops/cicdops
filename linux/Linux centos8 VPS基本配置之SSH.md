Linux centos8 VPS基本配置之SSH


最近在使用阿里云的时候，需要安装一些nodejs模块，但是总是安装失败，我已经使用了淘宝镜像cnpm加速，查看了具体原因是有github的依赖。 阿里云访问github出奇的慢，查了很多资料，也在论坛里向阿里反应过这个问题，但是貌似无解。所以没有办法，我只能把东京VPS重新启动起来，每月5美元，然后从阿里云SSH到VPS，速度老快，还可以VVPPNN，查英文资料，想干啥就干啥，杠杠的！



由于是从centos6升级到centos8，所以有些命令改动，在VPS网站申请好实例后，从web控制台登录进行修改密码和SSH的配置。下面记录基本的配置过程：

### 修改密码
使用root账号在web控制台登录，然后使用命令passwd修改新密码。

### 检查或者修改SSH的端口
```bash
修改SSH配置文件
vim /etc/ssh/sshd_config
Port 22
```

### 配置SELinux
```
配置SELinux允许SSH端口，或者你也可以直接关闭SELinux.
先查看SELinux开放给ssh使用的端口
semanage port -l|grep ssh
我的系统打印如下：
ssh_port_t tcp 22
如果没有打开实行如下命令
semanage port -a -t ssh_port_t -p tcp 22
完成后，再次查看
semanage port -l|grep ssh
ssh_port_t tcp 22
```

### 配置防火墙
```
配置防火墙允许SSH端口：
如果你关闭了防火墙，可以忽略此步。
先查看防火墙是否开启了10086端口：
firewall-cmd --permanent --query-port=22/tcp
打印结果如下：
no
表示没有开放22端口，那么添加下该端口：
firewall-cmd --permanent --add-port=22/tcp
打印结果如下：
success
重新加载防火墙策略：
firewall-cmd --reload
执行成功后，查看22端口是否被开启：
firewall-cmd --permanent --query-port=10086/tcp
打印结果如下：
yes
```

### 重启防火墙
```
重启SSH服务和防火墙，最好也重启下服务器
systemctl restart sshd
systemctl restart firewalld.service
shutdown -r now
```

### 从阿里云到VPS
两台Linux的SSH,在阿里云上执行如下脚本，然后实现阿里云到VPS的SSH：  
sh nopasswd.sh USER REMOTE_HOST  
本机上已有 id_dsa.pub ,若无。 使用命令 ssh-keygen -t dsa 获得。  
远程机上登录用户家目录下，已经有 .ssh 文件夹，若无创建之。  
```
nopasswd.sh
#!/bin/sh
scp ~/.ssh/id_rsa.pub  $1@$2:~/
ssh $1@$2 " touch ~/.ssh/authorized_keys ; cat ~/id_rsa.pub  >> ~/.ssh/authorized_keys; chmod 644 ~/.ssh/authorized_keys; exit"
```

### 使用putty或者Windows的Linux子系统SSH
在Linux 主机下产生的私钥zd文件putty是不认识的，putty只认识自己的ppk格式，要在这两种格式之间转换，需要PuTTYgen这个程版序。 puttygen是putty的配套程序，putty的安装包和winscp的安装包都权包含了这个程序



