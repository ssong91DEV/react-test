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
            }
        }
    }
}