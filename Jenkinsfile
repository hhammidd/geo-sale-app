@Library('javahome-demo') _
properties([
  parameters([
    string(name: 'service_name', defaultValue: 'geo-sale-app', description: 'Service-name',),
    string(name: 'IMAGE_TAG', defaultValue: '', description: 'Image TAG, if it is empty version should be something for now',),
    string(name: 'branch', defaultValue: 'master', description: 'Which is the branch triggered',),
    string(name: 'environment', defaultValue: 'tst', description: 'Which cluster you need to deploy, default/bricks-tst/bricks-acc/bricks-prd',),
  ])
])

def newVersion
pipeline {

  agent any
  stages {

    stage("get version, checkout  and build") {
      steps {
        script {
          if ("${IMAGE_TAG}"?.trim()) {
            stage('No need to checkout') {
              sh 'echo ${IMAGE_TAG}, image maybe already exist'
            }
          } else {
            stage('build image') {
              newVersion = 6
            }
          }
        }
      }
    }

    stage("Angular audit check") {
      steps {
        script {
          if ("${IMAGE_TAG}"?.trim()) {
            stage('No need to audit') {
              sh 'echo ${IMAGE_TAG}, image maybe already exist'
            }
          } else {
            checkangularaudit("${service_name}")
          }
        }

      }
    }

    stage("deploy") {
      steps {
        script {
          if ("${IMAGE_TAG}"?.trim()) {
            stage('deploy existed image') {
              createExistedImagehelm("${service_name}", "${IMAGE_TAG}", "${environment}")
            }
          } else {
            stage('deploy new version') {
              newVersion = 1 // TODO remove it later
              createangularhelm("${service_name}", "${newVersion}", "${environment}")
            }
          }
        }
      }
    }
  }
}
