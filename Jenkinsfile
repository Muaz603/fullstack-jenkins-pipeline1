pipeline {
    agent any

    stages {

        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }

        stage('Verify Docker') {
            steps {
                sh 'docker --version'
                sh 'docker-compose --version'
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Deploy Application') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        stage('Verify Backend Health') {
            steps {
                sh 'sleep 15'
                sh 'curl http://backend:5001/health'
            }
        }

        stage('Verify Student API') {
            steps {
                sh 'curl http://backend:5001/api/students'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Full Stack Application deployed successfully.'
        }

        failure {
            echo 'FAILED: Pipeline execution failed.'
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}