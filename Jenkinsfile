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
                
                
        
                // stage('React Build') {
                //     steps {
                //         sh 'npm install -g yarn'
                //         sh 'yarn --cwd ./vis-network install --network-timeout 100000'
                //         sh 'yarn --cwd ./vis-network build'
                //     }
                // }
                
                // stage('Build') {
                //     steps {
                //         sh 'docker build -t basepage/nginx ./vis-network/'
                //     }
                // }
                
                // stage('Deploy') {
                //     steps {
                //         sh 'docker ps -q --filter name=react-nginx-docker | grep -q . && docker stop react-nginx-docker && docker rm react-nginx-docker'
                //         sh 'docker run -it -p 80:80 -d --name react-nginx-docker react-nginx'
                //     }
                // }
                
                // stage('Finish') {
                //     steps {
                //         sh 'docker rmi $(docker images -f "dangling=true" -q)'
                //     }
                // }
            }
        }
    }
}