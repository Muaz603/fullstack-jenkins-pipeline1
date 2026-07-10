pipeline {
    agent any

    stages {

        stage('Verify Docker') {
            steps {
                sh 'docker --version'
                sh 'docker-compose --version'
            }
        }

        stage('Cleanup') {
            steps {
                sh '''
                docker-compose down || true
                docker rm -f mysql-db backend frontend || true
                '''
            }
        }
        stage('Build Images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                for i in {1..15}; do
                if curl -sf http://localhost:5001/health; then
                    exit 0
                fi
                sleep 5
                done

                exit 1
                '''
            }
        }

        stage('Verify Backend Health') {
            steps {
                sh 'sleep 20'
                sh 'curl http://localhost:5001/health'
            }
        }

        stage('Verify Student API') {
            steps {
                sh 'curl http://localhost:5001/api/students'
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