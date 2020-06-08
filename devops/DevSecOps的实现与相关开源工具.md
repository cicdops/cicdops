DevSecOps的实现与相关开源工具

DevSecOps是一种以自动化方式在DevOps流程中集成安全工具的方法。DevSecOps不仅仅是引入新的安全工具，还包括关于使用这些工具的必要知识。这需要对DevOps文化改进，需要对员工进行培训，并要求他们提高自己的技能。这使得他们能够更有效地协作，从而创造出一种“安全文化”。这种多文化、多学科的自动化安全环境使每个人都关注安全，而不仅仅是单个团队，这也是DevSecOps的主要驱动因素之一。

## Pre-commit Hooks
由于意外的git提交，AWS密钥、访问令牌、SSH密钥等敏感信息经常会通过公共源代码存储库被错误地泄漏。这可以通过使用像“Talisman”这样的预提交钩子来避免，它在提交或推送活动之前检查文件中的敏感信息。
- Talisman - https://github.com/thoughtworks/talisman
- Crass - https://github.com/floyd-fuh/crass
- Git Hooks -  https://githooks.com/
- Git Secrets - https://gitsecret.io/
- Pre - Commit—https://precommit.com/
- Detect Secrets - https://github.com/Yelp/detect-secrets
- Git Hound—https://github.com/ezekg/git-hound
- Truffle Hog -  https://github.com/dxa4481/truffleHog

## Secrets Management
对于自动化，开发人员和管理员通常会将凭证存储在配置文件、环境变量等中，以便访问各种服务。将凭据存储在文件或配置中可能导致将凭据暴露给意外的用户。这可以通过利用“Hashicorp vault”之类的秘密管理服务来隔离。这允许在单独的级别隔离凭据，每个环境都可以从特定的环境获取凭据并以编程方式使用它。

- Hashicorp Vault – https://www.vaultproject.io/
- Torus – https://www.torus.sh/
- Keywhiz – https://square.github.io/keywhiz/
- EnvKey – https://www.envkey.com/
- Confidant – https://github.com/lyft/confidant
- AWS Secrets Manager – https://aws.amazon.com/secrets-manager/

## Software Composition Analysis
有必要对应用程序中使用的所有依赖项进行分析，并检查它们是否存在由于缺少安全补丁而引起的漏洞。对于Java和。net应用程序，我们可以使用一个叫做“依赖检查”的工具，它可以在创建构建之前运行，以确定应用程序中是否使用了任何易受攻击的软件。可以根据漏洞的数量和严重程度来决定是继续运行管道还是修复漏洞失败。以下是一些工具，执行软件组合分析的安全漏洞:

- OWASP Dependency Check – https://www.owasp.org/index.php/OWASP_Dependency_Check
- SonaType (Free for Open Source) – https://ossindex.sonatype.org/
- Snyk (Free for Open Source) – https://snyk.io/
- Bunder Audit – https://github.com/rubysec/bundler-audit
- Rubysec – https://rubysec.com/
- Retire JS – https://github.com/RetireJS/retire.js

## Static Analysis Security Testing
**持续集成微信公众号cicdops**
使用自动化工具来执行安全代码审查，可以清除许多容易发现的漏洞，比如SQL注入、跨站点脚本编制、反序列化漏洞等等。对于基于Java的应用程序，我们可以使用一个名为“FindSecBugs”的工具，该工具对代码进行深入分析(但不会给出太多的假阳性结果)，并为代码中已确定的所有漏洞提供全面的报告。可以根据漏洞的数量和严重程度来决定是继续运行管道还是在管道继续运行之前修复漏洞。下面是一些可用于SAST目的的开源工具的列表。

## Dynamic Analysis Security Testing
Web应用程序扫描器是对Web应用程序进行漏洞评估的重要部分。这些扫描器中的大部分具有API端点或CLI访问，可以利用这些端点或CLI访问来启动对目标应用程序的扫描。OWASP ZAP就是这样一个工具，它可以用于在QA/Staging环境中启动对应用程序的web应用程序安全扫描，从而消除大量的安全错误配置，比如在备份文件中泄露敏感信息、不安全的HTTP头文件等。

- OWASP ZAP – https://www.owasp.org/index.php/OWASP_Zed_Attack_Proxy_Project
- Arachni Scanner – http://www.arachni-scanner.com/
- Nikto – https://cirt.net/Nikto2

## Security in Infrastructure as Code
在使用简单的几行代码构建基础设施时，Docker之类的容器化解决方案非常流行。“Docker Hub”是一个非常流行的公共Docker存储库，从这里可以将Docker图像拉到运行容器。已经有各种各样的例子，这些docker图像与恶意软件或千疮百孔的各种漏洞如下图所示。因此，扫描这些从公共存储库中提取的docker图像是非常重要的。

一种能够很好地洞察Docker容器/映像的安全性的解决方案是“Clair”。Clair扫描原始docker图像，并给出详尽的报告，强调图像中存在的漏洞。因此，在将Clair之类的工具部署到基础设施之前，在生产docker映像上运行它们是非常重要的。在DevSecOps的这个阶段需要考虑的其他工具有:

- Clair – https://github.com/coreos/clair
- Anchore Engine – https://github.com/anchore/anchore-engine
- Dagda – https://github.com/eliasgranderubio/dagda
- Open-Scap – https://www.open-scap.org/getting-started/
- Docksan – https://github.com/kost/dockscan

## Vulnerability Assessment (VA)
**持续集成微信公众号cicdops**
通常的做法是对生产系统执行漏洞评估，以识别环境中运行的各种服务和相关的漏洞。
在使用Docker创建的服务器上指向一个VA工具时，它只会在该主机上公开的服务上执行扫描。但是，如果我们将该工具附加到docker网络，然后执行扫描，那么它将为我们提供实际运行的服务的良好图像。
这可以使用各种解决方案来实现，比如OpenVAS，它可以很容易地集成到管道中。

- OpenVAS – http://openvas.org/
- DockScan – https://github.com/kost/dockscan

## Compliance As Code
组织需要对其IT基础设施应用遵从性控制，以遵守行业最佳实践和各种法规，如PCI DSS、HIPAA、SOX等。在DevOps中，使用“基础结构作为代码”，生产环境永远不会被保留，它总是被拆除并重新创建，因此在安装后测试更新/新创建的环境是非常必要的。“Inspec”就是这样一个工具，它可以帮助我们执行这些测试，因为我们只需要提供一个ruby文件，其中包含以非常简单和清晰的方式执行的测试，这对于每个审计专业人员来说都很容易编写和编写代码。

- Inspec – https://www.inspec.io/
- Serverspec – https://serverspec.org/
- DevSec Hardening Framework – https://dev-sec.io/
- Kitchen CI – https://kitchen.ci/

## Vulnerability Management
**持续集成微信公众号cicdops**
我们用来创建DevSecOps管道的工具会产生大量的漏洞，每个工具都有自己的独立格式。管理这些数据变得非常困难，更不用说跟踪和修复这些漏洞了。因此，漏洞管理解决方案是DevSecOps流程的核心，所有工具都需要将它们的数据汇集到这些解决方案中，以便集中管理、分类、跟踪和补救。
“ArcherySec”就是这样一个工具，它不仅与上面提到的大多数工具都有很好的集成，而且我们还可以通过ArcherySec启动Zap和OpenVAS等扫描。

用于漏洞管理的其他工具有
- ArcherySec – https://github.com/archerysec/archerysec
- DefectDojo – https://www.defectdojo.org/
- JackHammer – https://github.com/olacabs/jackhammer

## Alerting and Monitoring
生产应用程序总是面临来自未知和不可预见的新威胁。这可以通过一个积极的入侵监视和预防解决方案来缓解。其中一个这样的开源解决方案是“ModSecurity WAF(Web应用程序防火墙)，它可以检测OWASP的十大漏洞，如SQL注入、跨站点脚本编制等。

- ModSecurity WAF – https://modsecurity.org/

到目前为止，我们已经了解了DevSecOps如何在环境中运行的技术知识，但是仅仅拥有工具和技术是不够的。DevSecOps需要一种促进“缺省安全”文化的文化更改。这可以通过在每个域内创建安全冠军、增加与安全团队的协作等等来实现。
最后，DevSecOps对于您的DevOps模型非常重要，因为它是处理“大规模安全性”的惟一方法。


翻译自以下文章， 文章干活很多，所以必须保留原文的小广告表示感谢，Claranet为开发人员提供了一个关于DevSecOps和AppSec的全天研讨会，使与会者能够全面了解DevSecOps实践。如果您想参加研讨会，或者希望我们通过为您提供定制的解决方案来帮助您在现有的DevOps管道中实现安全性，请与我们联系。  

原文链接： https://www.notsosecure.com/achieving-devsecops-with-open-source-tools/





