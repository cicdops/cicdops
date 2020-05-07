## 什么是CDF
持续交付基金会(CDF)是许多快速增长的持续交付项目(包括Jenkins、Jenkins X、Spinnaker，Tekton和Screwdriver)的中立供应商。CDF通过开放模型、培训、行业指南和可移植性重点来支持DevOps从业者。

以下最佳实践被认为是一个成功的DevOps方法的关键:  
- 松耦合架构
- 自助服务配置
- 自动配置
- 持续的构建/集成和交付
- 自动发布管理
- 增量测试
- 作为代码的基础结构配置
- 综合配置管理
- 基于主干的开发和特性标志

## Jenkins X： https://jenkins-x.io/
市场上已经有各种不同的GitOps解决方案，Jenkins X是一个开源项目，它使用Kubernetes实现基于云原生应用的持续集成。

Jenkins X提供了pipeline的自动化、内置的GitOps， 和快速自动生成的预览环境，以帮助团队协作并在任何规模上加速他们的软件交付。

1. Jenkins X管道和自动化CI/CD
Jenkins X并不需要深入了解Jenkins X管道的内部机制，相反，Jenkins X将为您的项目默认一些非常棒的pipeline，这些pipeline将完全实现CI和CD。

2. 通过GitOps进行环境更新
每个团队都可以独立的一组环境。然后，Jenkins X通过GitOps实现独立的环境管理和应用程序新版本升级的自动化。

3. pull请求和快速的验证
Jenkins X会自动为您的pull请求生成预览环境，这样您就可以在更改合并到master之前得到快速的反馈

4. 对问题和pull请求进行反馈
但代码准备好的时候，需要更新环境，或者更新版本的时候，Jenkins X会自动对提交、问题和拉请求进行注释，并提供反馈。



## Spinnaker： http://www.spinnaker.io/
是一个开源的、支持多云的连续交付平台，实现快速且信心十足的软件自动化发布。

## Tekton：https://tekton.dev/
是一个强大而灵活的开源框架，用于创建CI/CD系统，允许开发人员跨云提供商和内部系统构建、测试和部署。

## Screwdriver.cd: https://screwdriver.cd/
来自yahoo的开源项目，yaml配置。


