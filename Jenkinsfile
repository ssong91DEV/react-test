pipeline {
    agent any
    environment {
        GIT_URL = "https://github.com/ssong91DEV/react-test.git"
    }

    tools {
        nodejs "NodeJS 16.13.2"
    }
    
    stages {
        stage("Build and Deploy") {
            agent {
                node {
                    label 'react-project'
                }
            }
            stages {
                stage('Git Pull') {
                    steps {
                        git url: "https://github.com/ssong91DEV/react-test.git",
                        branch: "main",
                        poll: true,
                        changelog: true
                    }
                }

                stage('build gradle') {
                    steps {
                        // gralew이 있어야됨. git clone해서 project를 가져옴.
                        sh 'chmod +x gradlew'
                        sh  './gradlew clean build'
                        sh 'ls -al ./build'
                    }
                    post {
                        success {
                            echo 'gradle build success'
                        }

                        failure {
                            echo 'gradle build failed'
                        }
                    }
                }
                
                stage("Dockerizing") {
                    steps {
                        sh 'docker build -f Dockerfile -t react-nginx .'
                    }
                }
                
                stage("Deploy") {
                    steps {
                        sh "docker run -it -p 80:80 -d --name react-nginx-docker react-nginx"
                    }
                    
                    post {
                        success {
                            echo "success!!!!!!!!!!!"
                        }
                        
                        failure {
                            echo "failed!!!!!!!!!!!!!!"
                        }
                    }
                }
            }
        }
    }
}