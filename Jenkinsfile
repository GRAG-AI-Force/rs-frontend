pipeline {
    agent any

    environment {
        CI = 'true'
        NODE_ENV = 'test'
        BUILD_MOBILE = 'false' // Set to 'true' in Jenkins parameter if Android/iOS SDK tooling is available
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        ansiColor('xterm')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code repository...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node package dependencies cleanly with npm ci...'
                sh 'npm ci || npm install'
            }
        }

        stage('TypeScript Verification') {
            steps {
                echo 'Running static TypeScript compilation check (tsc --noEmit)...'
                sh 'npm run typecheck'
            }
        }

        stage('ESLint Verification') {
            steps {
                echo 'Running ESLint code quality & style checks...'
                sh 'npm run lint'
            }
        }

        stage('Unit & Component Tests') {
            steps {
                echo 'Executing Jest headless unit and component tests with JUnit XML reporter...'
                sh 'npm test -- --ci --reporters=default --reporters=jest-junit'
            }
            post {
                always {
                    junit allowEmptyResults: true, testResults: 'reports/junit/*.xml'
                }
            }
        }

        stage('Code Coverage Analysis') {
            steps {
                echo 'Generating Jest test coverage report...'
                sh 'npm run test:coverage'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'coverage/**/*', allowEmptyArchive: true
                }
            }
        }

        stage('Mobile Native Build (Optional)') {
            when {
                environment name: 'BUILD_MOBILE', value: 'true'
            }
            steps {
                echo 'BUILD_MOBILE is set to true. Executing native React Native mobile build verification...'
                sh 'npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android-bundle.js'
            }
        }
    }

    post {
        success {
            echo '==================================================='
            echo ' Jenkins CI/CD Pipeline Passed Successfully!       '
            echo ' Respore Sence frontend source verified cleanly.    '
            echo '==================================================='
        }
        failure {
            echo '==================================================='
            echo ' Jenkins CI/CD Pipeline Failed!                    '
            echo ' Check log output and unit/typecheck reports.      '
            echo '==================================================='
        }
    }
}
