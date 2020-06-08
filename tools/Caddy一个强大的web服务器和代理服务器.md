## 什么是Caddy
Caddy是一个强大的、可扩展的平台，可以为您的站点、服务和应用程序提供服务，它是用Go编写的。虽然大多数人使用它作为web服务器或代理，但其实他支持更多的功能:
- Caddy是唯一自动且默认使用HTTPS的web服务器。
- web服务器
- 反向代理
- sidecar代理
- 负载均衡器
- API网关
- ingress控制器
- 系统管理器
- 进程supervisor
- 任务调度器
- (任何长时间运行的进程long-running process)
- 简单的配置与Caddyfile
- 强大的配置和它的原生JSON配置
- 使用JSON API进行动态配置
- 如果不喜欢JSON，配置适配器
- 默认自动HTTPS，让我们加密公共站点，内部名称和ip的全托管本地CA，可以与集群中的其他Caddy实例协调吗
- 避免其他服务器由于TLS/OCSP/与证书相关的问题而宕机时
- HTTP/1.1、HTTP/2和实验性HTTP/3支持
- 高度可扩展的模块化架构让Caddy做任何事情都不会臃肿
- 在任何没有外部依赖的地方运行(甚至libc也不行)
- 用Go编写，一种比其他服务器具有更高内存安全保证的语言

### 简化的外部依赖
Caddy简化了你的基础设施。它负责TLS证书更新、OCSP绑定、静态文件服务、反向代理、Kubernetes访问等。
它的模块化架构意味着您可以使用为任何平台编译的单个静态二进制文件做更多的事情。
Caddy在容器中运行得很好，因为它没有依赖项—甚至libc也没有。几乎在任何地方都能运行Caddy。

### 一流的安全
Caddy是唯一自动且默认使用HTTPS的web服务器。
Caddy为您的站点自动获取和更新TLS证书。它甚至会固定OCSP响应。其新颖的证书管理功能是同类产品中最成熟、最可靠的。
用Go编写的Caddy提供了比用c编写的服务器更大的内存安全性。

### 文件服务器和代理
Caddy是一个灵活、高效的静态文件服务器，也是一个强大的、可伸缩的反向代理。
使用它来为您的静态站点提供压缩、模板评估、Markdown呈现等服务。
或者将其用作任意数量后端的动态反向代理，包括主动和被动健康检查、负载平衡、断路、缓存等等。

## 下载和安装
下载非常简单：
```
wget "https://github.com/caddyserver/caddy/releases/latest/download/ASSET"  
docker pull caddy  
如果需要安装为service，参考https://caddyserver.com/docs/install
```

## 零配置文件服务器
```
启动当前目录为文件服务器： 
caddy file-server
启动当前目录为文件服务器，且支持https： 
caddy file-server --domain example.com
方向代理：
caddy reverse-proxy --from example.com --to localhost:9000
使用mysite目录： 
caddy file-server --root ~/mysite
```

## Caddy通过配置文件运行
启动server，且支持https，反向代理，压缩，和模板
```
example.com  
  
# Templates give static sites some dynamic features  
templates  

# Compress responses according to Accept-Encoding headers
encode gzip zstd

# Make HTML file extension optional
try_files {path}.html {path}

# Send API requests to backend
reverse_proxy /api/* localhost:9005

# Serve everything else from the file system
file_server
```

## caddy同一服务器支持多个域名
```
mysite.com {
    root /www/mysite.com
}

sub.mysite.com {
    root /www/sub.mysite.com
    gzip
    log ../access.log
}
```

## 参考
https://caddyserver.com/  
https://github.com/caddyserver/caddy  

