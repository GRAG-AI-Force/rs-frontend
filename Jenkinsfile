pipeline {

    agent any

    // ============================================================
    // PIPELINE OPTIONS
    // ============================================================

    options {
        skipDefaultCheckout(true)
        timestamps()
        disableConcurrentBuilds()
        timeout(
            time: 60,
            unit: 'MINUTES'
        )
        buildDiscarder(
            logRotator(
                numToKeepStr: '20',
                artifactNumToKeepStr: '20'
            )
        )
    }

    // ============================================================
    // GITHUB PUSH TRIGGER
    // ============================================================

    triggers {
        githubPush()
    }

    // ============================================================
    // ENVIRONMENT
    // ============================================================

    environment {

        // ========================================================
        // NODE.JS, JAVA & ANDROID SDK PATHS (WINDOWS HOST)
        // ========================================================

        NODE_HOME = 'C:/nvm4w/nodejs'
        JAVA_HOME = 'C:\\Program Files\\Java\\jdk-21.0.11'
        ANDROID_HOME = 'C:\\Users\\Sharan Mailurkar\\AppData\\Local\\Android\\Sdk'
        ANDROID_SDK_ROOT = 'C:\\Users\\Sharan Mailurkar\\AppData\\Local\\Android\\Sdk'
        PATH = "C:\\nvm4w\\nodejs;${JAVA_HOME}\\bin;${ANDROID_HOME}\\platform-tools;${ANDROID_HOME}\\cmdline-tools\\latest\\bin;${PATH}"

        // ========================================================
        // GITHUB REPOSITORY
        // ========================================================

        GITHUB_REPOSITORY = 'https://github.com/GRAG-AI-Force/rs-frontend.git'
        GITHUB_BRANCH = 'main'

        // ========================================================
        // APPLICATION PARAMETERS
        // ========================================================

        APP_NAME = 'respore-sence'
        NODE_VERSION = '22'

        // ========================================================
        // ANDROID PATHS
        // ========================================================

        ANDROID_DIR = 'android'
        APK_PATH = 'android/app/build/outputs/apk/release/app-release.apk'
        AAB_PATH = 'android/app/build/outputs/bundle/release/app-release.aab'
    }

    // ============================================================
    // STAGES
    // ============================================================

    stages {

        // ========================================================
        // 1. WORKSPACE CLEANUP
        // ========================================================

        stage('Workspace Cleanup') {
            steps {
                echo '=========================================='
                echo ' WORKSPACE CLEANUP                        '
                echo '=========================================='
                deleteDir()
            }
        }

        // ========================================================
        // 2. CHECKOUT APPLICATION
        // ========================================================

        stage('Checkout Application') {
            steps {
                echo '=========================================='
                echo ' CHECKOUT APPLICATION                     '
                echo '=========================================='

                checkout scmGit(
                    branches: [
                        [
                            name: "refs/heads/${GITHUB_BRANCH}"
                        ]
                    ],
                    userRemoteConfigs: [
                        [
                            url: "${GITHUB_REPOSITORY}"
                        ]
                    ]
                )

                bat '''
                    echo.
                    echo ==========================================
                    echo GIT INFORMATION
                    echo ==========================================

                    echo Git Commit:
                    git rev-parse HEAD

                    echo.
                    echo Git Branch:
                    git branch --show-current

                    echo.
                    echo Repository:
                    git config --get remote.origin.url

                    echo.
                    echo ==========================================
                '''
            }
        }

        // ========================================================
        // 3. VALIDATE NODE.JS
        // ========================================================

        stage('Validate Node.js') {
            steps {
                echo '=========================================='
                echo ' NODE.JS VALIDATION                       '
                echo '=========================================='

                withEnv([
                    "PATH=C:\\nvm4w\\nodejs;${env.PATH}"
                ]) {
                    bat '''
                        echo ==========================================
                        echo NODE.JS VALIDATION
                        echo ==========================================

                        echo.
                        echo Node Location:
                        where node

                        if errorlevel 1 (
                            echo ERROR: Node.js was not found.
                            exit /b 1
                        )

                        echo.
                        echo Node Version:
                        node --version

                        if errorlevel 1 (
                            echo ERROR: Node.js execution failed.
                            exit /b 1
                        )

                        echo.
                        echo NPM Location:
                        where npm

                        if errorlevel 1 (
                            echo ERROR: npm was not found.
                            exit /b 1
                        )

                        echo.
                        echo NPM Version:
                        npm --version

                        if errorlevel 1 (
                            echo ERROR: npm execution failed.
                            exit /b 1
                        )

                        echo.
                        echo ==========================================
                        echo NODE.JS VALIDATION SUCCESSFUL
                        echo ==========================================
                    '''
                }
            }
        }

        // ========================================================
        // 4. INSTALL DEPENDENCIES
        // ========================================================

        stage('Install Dependencies') {
            steps {
                echo '=========================================='
                echo ' INSTALL NPM DEPENDENCIES                 '
                echo '=========================================='

                withEnv([
                    "PATH=C:\\nvm4w\\nodejs;${env.PATH}"
                ]) {
                    bat '''
                        echo Checking package files...

                        if not exist package.json (
                            echo ERROR: package.json not found.
                            exit /b 1
                        )

                        if not exist package-lock.json (
                            echo ERROR: package-lock.json not found.
                            exit /b 1
                        )

                        echo.
                        echo Installing dependencies...

                        npm ci

                        if errorlevel 1 (
                            echo ERROR: npm dependency installation failed.
                            exit /b 1
                        )

                        echo.
                        echo ==========================================
                        echo NPM DEPENDENCIES INSTALLED SUCCESSFULLY
                        echo ==========================================
                    '''
                }
            }
        }

        // ========================================================
        // 5. TYPESCRIPT TYPE CHECK
        // ========================================================

        stage('TypeScript Verification') {
            steps {
                echo '=========================================='
                echo ' RUN TYPESCRIPT TYPECHECK                 '
                echo '=========================================='

                withEnv([
                    "PATH=C:\\nvm4w\\nodejs;${env.PATH}"
                ]) {
                    bat '''
                        npm run typecheck

                        if errorlevel 1 (
                            echo ERROR: TypeScript verification failed.
                            exit /b 1
                        )

                        echo.
                        echo ==========================================
                        echo TYPESCRIPT VERIFICATION SUCCESSFUL
                        echo ==========================================
                    '''
                }
            }
        }

        // ========================================================
        // 6. LINT
        // ========================================================

        stage('Lint') {
            steps {
                echo '=========================================='
                echo ' RUN ESLINT                               '
                echo '=========================================='

                withEnv([
                    "PATH=C:\\nvm4w\\nodejs;${env.PATH}"
                ]) {
                    bat '''
                        npm run lint

                        if errorlevel 1 (
                            echo ERROR: ESLint failed.
                            exit /b 1
                        )

                        echo.
                        echo ==========================================
                        echo LINT SUCCESSFUL
                        echo ==========================================
                    '''
                }
            }
        }

        // ========================================================
        // 7. UNIT TESTS
        // ========================================================

        stage('Unit Tests') {
            steps {
                echo '=========================================='
                echo ' RUN UNIT TESTS                           '
                echo '=========================================='

                withEnv([
                    "PATH=C:\\nvm4w\\nodejs;${env.PATH}"
                ]) {
                    bat '''
                        npm test -- --runInBand --reporters=default --reporters=jest-junit

                        if errorlevel 1 (
                            echo ERROR: Unit tests failed.
                            exit /b 1
                        )

                        echo.
                        echo ==========================================
                        echo UNIT TESTS SUCCESSFUL
                        echo ==========================================
                    '''
                }
            }
            post {
                always {
                    junit allowEmptyResults: true, testResults: 'reports/junit/*.xml'
                }
            }
        }

        // ========================================================
        // 8. VALIDATE ANDROID ENVIRONMENT
        // ========================================================

        stage('Validate Android Environment') {
            steps {
                echo '=========================================='
                echo ' ANDROID ENVIRONMENT VALIDATION           '
                echo '=========================================='

                bat '''
                    echo Java Version:
                    "%JAVA_HOME%\\bin\\java.exe" -version

                    if errorlevel 1 (
                        echo ERROR: Java is not available.
                        exit /b 1
                    )

                    echo.
                    echo Node.js:
                    where node
                    if errorlevel 1 (
                        echo ERROR: Node.js is not available.
                        exit /b 1
                    )
                    node --version

                    echo.
                    echo NPX:
                    where npx
                    if errorlevel 1 (
                        echo ERROR: npx is not available.
                        exit /b 1
                    )
                    npx --version

                    echo.
                    echo Android ADB:
                    adb --version

                    if errorlevel 1 (
                        echo WARNING: adb tool not found in PATH.
                    )

                    echo.
                    echo ANDROID_HOME:
                    echo %ANDROID_HOME%

                    echo.
                    echo ANDROID_SDK_ROOT:
                    echo %ANDROID_SDK_ROOT%

                    echo.
                    echo ==========================================
                    echo ANDROID ENVIRONMENT VALIDATION COMPLETE
                    echo ==========================================
                '''
            }
        }

        // ========================================================
        // 9. ANDROID CLEAN
        // ========================================================

        stage('Android Clean') {
            steps {
                echo '=========================================='
                echo ' ANDROID GRADLE CLEAN                     '
                echo '=========================================='

                script {
                    if (fileExists("android/gradlew.bat")) {
                        dir("${ANDROID_DIR}") {
                            bat '''
                                gradlew.bat --no-daemon clean

                                if errorlevel 1 (
                                    echo ERROR: Android Gradle clean failed.
                                    exit /b 1
                                )
                            '''
                        }
                    } else {
                        echo 'Notice: android/gradlew.bat not present. Skipping Gradle clean.'
                    }
                }
            }
        }

        // ========================================================
        // 10. ANDROID BUILD & BUNDLE
        // ========================================================

        stage('Android Build') {
            steps {
                echo '=========================================='
                echo ' ANDROID RELEASE BUILD                    '
                echo '=========================================='

                script {
                    if (fileExists("android/gradlew.bat")) {
                        dir("${ANDROID_DIR}") {
                            bat '''
                                gradlew.bat --no-daemon assembleRelease

                                if errorlevel 1 (
                                    echo ERROR: Android release build failed.
                                    exit /b 1
                                )
                            '''
                        }
                    } else {
                        echo 'Building React Native mobile JS bundle for release verification...'
                        withEnv(["PATH=C:\\nvm4w\\nodejs;${env.PATH}"]) {
                            bat '''
                                npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android-bundle.js

                                if errorlevel 1 (
                                    echo ERROR: React Native bundle generation failed.
                                    exit /b 1
                                )
                            '''
                        }
                    }
                }
            }
        }

        // ========================================================
        // 11. VERIFY AND ARCHIVE ARTIFACTS
        // ========================================================

        stage('Verify & Archive Artifacts') {
            steps {
                echo '=========================================='
                echo ' VERIFY AND ARCHIVE ARTIFACTS             '
                echo '=========================================='

                script {
                    if (fileExists("${APK_PATH}")) {
                        bat '''
                            echo Android APK successfully generated:
                            echo %APK_PATH%
                            dir "%APK_PATH%"
                        '''
                        archiveArtifacts(
                            artifacts: 'android/app/build/outputs/apk/release/*.apk',
                            fingerprint: true,
                            allowEmptyArchive: false
                        )
                    } else if (fileExists("android-bundle.js")) {
                        echo 'React Native JS bundle successfully generated and verified.'
                        archiveArtifacts(
                            artifacts: 'android-bundle.js',
                            fingerprint: true,
                            allowEmptyArchive: true
                        )
                    } else {
                        echo 'Build step completed cleanly.'
                    }
                }
            }
        }
    }

    // ============================================================
    // POST BUILD
    // ============================================================

    post {
        success {
            echo '=========================================='
            echo ' FRONTEND CI PIPELINE SUCCESSFUL           '
            echo '=========================================='
            echo "Application : ${env.APP_NAME}"
            echo "Branch      : ${env.GITHUB_BRANCH}"
            echo "Build       : ${env.BUILD_NUMBER}"
            echo '=========================================='
        }

        failure {
            echo '=========================================='
            echo ' FRONTEND CI PIPELINE FAILED               '
            echo '=========================================='
            echo 'Check the failed Jenkins stage and console output.'
            echo '=========================================='
        }

        always {
            echo '=========================================='
            echo ' PIPELINE COMPLETED                       '
            echo '=========================================='
        }
    }
}
