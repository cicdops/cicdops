Jenkins pipeline之声明式的jenkinsfile

## 内置的关键字
- pipeline ： 是pipeline的跟节点
- agent: 定义piple使用哪个账号在哪个机器上执行
- post: 定义pipeline最后执行的一组任务，支持多种条件判断always, changed, fixed, regression, aborted,failure, success, unstable, unsuccessful, and cleanup.
- stages: 是多个stage的父节点。
- stage: 代表整个pipleline里的一个阶段，stage里面才是具体的steps。
- steps: 定义在stage的内部，表示具体如何执行。
- environment: 定义公用的环境变量
- options: 定义pipeline或者plugin的参数设置。
- parameters: 定义了整个pipeline的外部参数，必须有默认值，用户也可以在启动时指定新的参数
- triggers: 定义如何触发pipeline，例如cron，pollSCM，或者upstream。
- tools: 定义需要安装的工具，且会自动加入到PATH
- input: 允许pipeline与用户交互，等待用户确认然后继续。
- when: 条件语句

## pipeline的实例代码
其实还是非常直观易懂的：
```
pipeline {
  agent {
    node {
      label 'DEBIAN8'
    }
  }
    triggers {
        cron('H */4 * * 1-5')
    }
  environment {
    ARTIFACTORY_URL = 'https://path.to.artifacts/some-registry'
  }
  options {
    disableConcurrentBuilds()
    retry(1)
    skipStagesAfterUnstable()
    timeout(time: 10, unit: 'MINUTES')
    skipDefaultCheckout()
    buildDiscarder(logRotator(numToKeepStr: '10',           artifactNumToKeepStr: '1'))
  }
  tools {
    /**
     * Predefined environment variables MAVEN3 and JDK-1.8
     */
    maven 'MAVEN3'
    jdk 'JDK-1.8'
  }
  stages {
    /**
     * Initialization check for Java and Maven
     */
    stage('Initialization') {
      steps {
        sh '''
          java -version
          mvn -version
        '''
      }
    }
    /**
     * Checkout source code from Github on any of the GIT nodes
     */
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    /**
     * Compile the Maven project
     */
    stage('Build') {
      steps {
        sh 'mvn clean install'
      }
    }
    /**
     * Trigger this in PRs, don't run on master or release branches
     */
    stage('Package') {
      when {
        changeRequest()
      }
      steps {
        sh 'mvn clean package -DskipTests'
      }
    }
    /**
     * Only run this on master and release branches
     */
    stage('Deploy') {
      when {
        branch 'master'
      }
      environment {
        DEPLOYER = credentials('deployer')
      }
      steps {
        sh 'mvn clean deploy'
      }
    }
    /**
     * Clean workspace
     */
    stage('Clean') {
      steps {
        cleanWs()
      }
    }
  }
    post { 
        always { 
            echo 'I will always say Hello again!'
        }
    }
}
```

## 常见的options
我们来解释一下上面常用的option的用途：
- disableConcurrentBuilds()：一时间最多只允许一个pipeline运行，如果前面的仍在运行， 后面的将会等待状态。
- retry(1)： 失败了，重试一次。
- skipStagesAfterUnstable()：如果某个stage为unstable状态，则忽略后面的任务，直接退出。
- timeout(time: 10, unit: 'MINUTES')：10分钟的超时设置。
- skipDefaultCheckout()： 忽略默认的checkout。
- buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '1'))： 保留最新的10个build log和1个artifact。


### 参考：
https://medium.com/@brianrthompson/scripted-vs-declarative-pipelines-which-to-choose-c6af403f1e97  
