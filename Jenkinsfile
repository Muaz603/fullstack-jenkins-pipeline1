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
                docker-compose up -d
                '''
            }
        }

        stage('Debug') {
            steps {
                sh '''
                pwd
                ls -la
                echo "---- Jenkinsfile in workspace ----"
                sed -n '1,120p' Jenkinsfile
                '''
            }
        }
            stage('Verify Backend Health') {
                steps {
                    sh '''
                    set -x

                    for i in $(seq 1 15); do
                        echo "Attempt $i"

                        if curl -sf http://172.17.0.1:5001/health; then
                            echo "Backend is healthy"
                            exit 0
                        fi

                        sleep 5
                    done

                    echo "Backend never became healthy"
                    exit 1
                    '''
                }
            }
            stage('Verify Student API') {
                steps {
                    sh '''
                    curl http://172.17.0.1:5001/api/students
                    '''
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