argo-cd基于Kubernetes的声明式持续部署


## 什么是argo-cd？
Argo CD是一个基于Kubernetes的声明式GitOps持续交付工具。

## 为什么CD ?
应用程序定义、配置和环境应该是声明性的，并且应该是版本控制的。应用程序部署和生命周期管理应该是自动化的、可审计的、易于理解的。

## argo-cd功能
- 将应用程序自动部署到指定的目标环境
- 支持多种配置管理/模板工具(Kustomize、Helm、Ksonnet、Jsonnet、plain-YAML)
- 能够管理和部署到多个集群
- SSO集成(OIDC, OAuth2, LDAP, SAML 2.0, GitHub, GitLab, Microsoft, LinkedIn)
- 授权的多租户和RBAC策略
- 回滚/回滚到Git存储库中提交的任何应用程序配置
- 应用程序资源的健康状态分析
- 自动配置漂移检测和显示
- 将应用程序自动或手动同步到所需的状态
- Web UI，提供应用程序活动的实时视图
- 用于自动化和CI集成的CLI
- Webhook集成(GitHub, BitBucket, GitLab)
- 用于自动化的访问令牌
- PreSync、Sync、PostSync钩子支持复杂的应用程序发布(例如，blue/green & canary升级)
- 应用程序事件和API调用的审计跟踪
- Prometheus指标
- 在Git中重写ksonnet/helm参数的参数覆盖

## Argo 如何工作的CD?
Argo CD遵循GitOps模式，使用Git存储库存储所需应用程序的配置。
Kubernetes清单可以通过以下几种方式指定:
- kustomize应用程序
- helm图表
- ksonnet应用程序
- jsonnet文件
- 基于YAML/json配置
- 配置管理插件配置的任何自定义配置管理工具

Argo CD实现为kubernetes控制器，它持续监视运行中的应用程序，并将当前的活动状态与期望的目标状态进行比较(如Git repo中指定的那样)。如果已部署的应用程序的活动状态偏离了目标状态，则认为是OutOfSync。Argo CD报告和可视化这些差异，同时提供了方法，可以自动或手动将活动状态同步回所需的目标状态。在Git repo中对所需目标状态所做的任何修改都可以自动应用并反映到指定的目标环境中。



## 快速开始：
这将创建一个新的名称空间argocd, Argo CD服务和应用程序资源将驻留在这里。
```
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

## 下载 Argo CD CLI
```
VERSION=$(curl --silent "https://api.github.com/repos/argoproj/argo-cd/releases/latest" | grep '"tag_name"' | sed -E 's/.*"([^"]+)".*/\1/') 
curl -sSL -o /usr/local/bin/argocd https://github.com/argoproj/argo-cd/releases/download/$VERSION/argocd-linux-amd64

chmod +x /usr/local/bin/argocd
现在你就可以运行argocd
```

## 开源代码：
https://github.com/argoproj/argo-cd/   
https://argoproj.github.io/argo-cd/  
https://cd.apps.argoproj.io/applications  
