pipeline {
    agent any
    environment {
        GIT_URL = "https://github.com/ssong91DEV/react-test.git"
        imagename = "react-nginx"
        dockerImage = ''
    }

    tools {
        nodejs "NodeJS 16.13.2"
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
        stage("TEST") {
            agent { docker 'node:16.13.2'}
            steps {
                sh 'node --version'
            }
        }

                // stage("Docker Image Build") {
                //     steps {
                //         script {
                //             dockerImage = docker.build imagename
                //         }
                //     }
                // }

                // stage("Docker Deploy") {
                //     steps {
                //         sh "docker run -it -p 80:80 -d --name react-nginx-docker react-nginx"
                //     }
                // }

    }
}