@Library('javahome-demo') _
properties([
  parameters([
    string(name: 'service_name', defaultValue: 'geo-sale-app', description: 'Service-name',),
    string(name: 'IMAGE_TAG', defaultValue: '', description: 'Image TAG, if it is empty version should be something for now',),
    string(name: 'version', defaultValue: '3', description: 'new version TODO, should be automated',),
    string(name: 'branch', defaultValue: 'master', description: 'Which is the branch triggered',),
    string(name: 'environment', defaultValue: 'default', description: 'Which cluster you need to deploy, default/bricks-tst/bricks-acc/bricks-prd',),
  ])
])

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
              buildangularapp("${service_name}", "${version}")
            }
          }
        }
      }
    }

    stage("deploy") {
      steps {
        script {
          if ("${IMAGE_TAG}"?.trim()) {
            stage('deploy wanted image') {
              createangularhelm("${service_name}", "${IMAGE_TAG}", "${environment}")
            }
          } else {
            stage('deploy new version') {
              createangularhelm("${service_name}", "${version}", "${environment}")
            }
          }
        }
      }
    }

//    stage("clean none images") { // TODO add  later
//      steps {
//        removeNoneImages()
//      }
//    }

  }
}
