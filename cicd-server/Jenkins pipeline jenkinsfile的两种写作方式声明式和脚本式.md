
Jenkins pipeline jenkinsfile的两种写作方式，声明式和脚本式。

## 为什么需要pipeline？
在多年前Jenkins成为最流行的持续集成服务器的Jenkins 1.x时代，所有的新功能都是通过安装插件来增强，所有的配置都是通过网页界面来实现的。

在Jenkins迈入2.x的时代，为了跟随时代的步伐（everything is code），Jenkins引入了配置及代码的概念。用代码来表示流程是为了版本控制和自动化的方便，使得配置跟源代码一样可重现，更加容易地支持多分支开发部署。 具体地来说，就是Jenkins引入了pipeline的概念，可以使用groovy来编写Jenkinsfile。

## 为什么两种实现pipeline的方式呢？

真的是看戏的不嫌事大,同一功能两种实现，很多用户也会被搞迷吧。下面咱们就来捋一捋这个发展过程。
Jenkins是使用Java实现的，所以在很早的时候就引入了groovy作为DSL，管理员可以使用groovy来实现一些自动化和高级的管理功能。因为groovy引擎已经集成到Jenkins，所以在pipeline一开始很自然就使用groovy来编写Jenkinsfile。

但是groovy毕竟是一种语言，对于没有太多编程经验的小白这个学习曲线有点太陡峭。这个时候声明式的pipeline就出现了，主要是为了降低入门的难度。

## 作为Jenkins用户该如何选择呢？

- 声明式pipeline鼓励声明式编程模型，比较适合没有编程经验的初学者。 
- 脚本式pipeline，是基于groovy的DSL语言实现的，为Jenkins用户提供了大量的灵活性性和可扩展性。
- 声明式pipeline会得到越来越多的官方支持，可以使用Visual Pipeline Editor来编辑和验证声明式pipeline。
- 如果实在是声明式语法还没有支持的功能，还可以在声明式里直接调用脚本。

**所以推荐新手从声明式pipeline开始。**

声明式pipeline：
[https://jenkins.io/doc/book/pipeline/syntax/#declarative-pipeline](https://jenkins.io/doc/book/pipeline/syntax/#declarative-pipeline)  
脚本式pipeline：
[https://jenkins.io/doc/book/pipeline/syntax/#scripted-pipeline](https://jenkins.io/doc/book/pipeline/syntax/#scripted-pipeline)

## 下面我们分别来个例子来初步感受下，看看你更喜欢哪种？

### 声明式pipeline
```
pipeline {
    agent any
    stages {
        stage('Example Build') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Example Deploy') {
            when {
                branch 'production'
                environment name: 'DEPLOY_TO', value: 'production'
            }
            steps {
                echo 'Deploying'
            }
        }
    }
}
```

### 脚本式pipeline
```
node {
    stage('Example') {
        if (env.BRANCH_NAME == 'master') {
            echo 'I only execute on the master branch'
        } else {
            echo 'I execute elsewhere'
        }
    }
}
```

### 声明式pipeline里调用脚本式语法
```
pipeline {
    agent any
    stages {
        stage('Example') {
            steps {
                echo 'Hello World'

                script {
                    def browsers = ['chrome', 'firefox']
                    for (int i = 0; i < browsers.size(); ++i) {
                        echo "Testing the ${browsers[i]} browser"
                    }
                }
            }
        }
    }
}
```

### 参考：
https://stackoverflow.com/questions/43484979/jenkins-scripted-pipeline-or-declarative-pipeline  
https://medium.com/@brianrthompson/scripted-vs-declarative-pipelines-which-to-choose-c6af403f1e97  
