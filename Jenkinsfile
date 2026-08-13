pipeline {
    agent any

    parameters {
        booleanParam(
            name: 'BUILD_MOBILE',
            defaultValue: false,
            description: 'Set to true to execute native React Native mobile bundle verification (requires Node/React Native CLI on agent)'
        )
        string(
            name: 'NODE_VERSION',
            defaultValue: '18',
            description: 'Target Node.js major version for pipeline execution'
        )
    }

    environment {
        CI = 'true'
        NODE_ENV = 'test'
        JEST_JUNIT_OUTPUT_DIR = 'reports/junit'
        JEST_JUNIT_OUTPUT_NAME = 'js-test-results.xml'
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        ansiColor('xterm')
        buildDiscarder(logRotator(numToKeepStr: '30'))
    }

    stages {
        stage('Checkout Source Code') {
            steps {
                echo '==================================================='
                echo ' STAGE 1: Checking out source code repository...   '
                echo '==================================================='
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '==================================================='
                echo ' STAGE 2: Installing Node dependencies (npm ci)... '
                echo '==================================================='
                script {
                    if (isUnix()) {
                        sh 'npm ci || npm install'
                    } else {
                        bat 'npm ci || npm install'
                    }
                }
            }
        }

        stage('TypeScript Static Check') {
            steps {
                echo '==================================================='
                echo ' STAGE 3: Verifying TypeScript types (tsc)...     '
                echo '==================================================='
                script {
                    if (isUnix()) {
                        sh 'npm run typecheck'
                    } else {
                        bat 'npm run typecheck'
                    }
                }
            }
        }

        stage('ESLint Code Quality') {
            steps {
                echo '==================================================='
                echo ' STAGE 4: Executing ESLint style & quality check...'
                echo '==================================================='
                script {
                    if (isUnix()) {
                        sh 'npm run lint'
                    } else {
                        bat 'npm run lint'
                    }
                }
            }
        }

        stage('Unit & Component Tests') {
            steps {
                echo '==================================================='
                echo ' STAGE 5: Running Jest unit & component tests...  '
                echo '==================================================='
                script {
                    if (isUnix()) {
                        sh 'npm test -- --ci --reporters=default --reporters=jest-junit'
                    } else {
                        bat 'npm test -- --ci --reporters=default --reporters=jest-junit'
                    }
                }
            }
            post {
                always {
                    junit allowEmptyResults: true, testResults: 'reports/junit/*.xml'
                }
            }
        }

        stage('Coverage Analysis') {
            steps {
                echo '==================================================='
                echo ' STAGE 6: Generating test coverage reports...     '
                echo '==================================================='
                script {
                    if (isUnix()) {
                        sh 'npm run test:coverage -- --ci'
                    } else {
                        bat 'npm run test:coverage -- --ci'
                    }
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: 'coverage/**/*', allowEmptyArchive: true
                }
            }
        }

        stage('Mobile Bundle Validation') {
            when {
                expression { params.BUILD_MOBILE == true || env.BUILD_MOBILE == 'true' }
            }
            steps {
                echo '==================================================='
                echo ' STAGE 7: Validating React Native mobile bundle... '
                echo '==================================================='
                script {
                    if (isUnix()) {
                        sh 'npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android-bundle.js'
                    } else {
                        bat 'npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android-bundle.js'
                    }
                }
            }
        }
    }

    post {
        success {
            echo '==================================================='
            echo ' SUCCESS: Respore Sence CI/CD Pipeline Passed!      '
            echo ' All TypeScript, ESLint, and Jest tests verified.  '
            echo '==================================================='
        }
        failure {
            echo '==================================================='
            echo ' FAILURE: Respore Sence CI/CD Pipeline Failed!     '
            echo ' Inspect stage logs and JUnit test reports.        '
            echo '==================================================='
        }
    }
}
