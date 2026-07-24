pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh './mvnw clean package'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t enterprise-ai-devops-platform .'
            }
        }
    }
}

stage('Docker Push') {
    steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
            sh '''
                echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                docker tag enterprise-ai-devops-platform haridoc2026/enterprise-ai-devops-platform:latest
                docker push haridoc2026/enterprise-ai-devops-platform:latest
            '''
        }
    }
}