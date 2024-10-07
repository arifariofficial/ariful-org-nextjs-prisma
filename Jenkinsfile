pipeline {
    agent any
    triggers {
        githubPush()
    }
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
                script {
                    sh 'git checkout production'
                }
            }
        }

        stage('Check Workspace') {
            steps {
                script {
                    // List files in the current workspace to debug the issue
                    sh 'ls -al'
                }
            }
        }

        stage('Check Branch') {
            steps {
                script {
                    def branch = sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()
                    echo "Branch detected: ${branch}"

                    if (branch != 'production') {
                        echo "Skipping build. Current branch is not 'production'."
                        currentBuild.result = 'SUCCESS'
                        return
                    }
                }
            }
        }

        stage('Clean Docker Images') {
            when {
                expression { sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim() == 'production' }
            }
            steps {
                script {
                    // Ensure the directory path is correct based on the debug output from the previous stage
                    sh '''
                        cd ariful-org-nextjs-prisma
                        docker-compose down
                        docker system prune -af --volumes
                    '''
                }
            }
        }

        stage('Docker Build and Up') {
            when {
                expression { sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim() == 'production' }
            }
            steps {
                script {
                    sh '''
                        cd ariful-org-nextjs-prisma
                        docker-compose build
                        docker-compose up -d
                    '''
                }
            }
        }
    }
}
