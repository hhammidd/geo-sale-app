@Library('javahome-demo') _
properties([
  parameters([
    string(name: 'service_name', defaultValue: 'geo-sale-app', description: 'Service-name',),
    string(name: 'IMAGE_TAG', defaultValue: '', description: 'Image TAG',),
    string(name: 'branch', defaultValue: 'master', description: 'Which is the branch triggered',),
    string(name: 'environment', defaultValue: 'default', description: 'Which cluster you need to deploy, default/bricks-tst/bricks-acc/bricks-prd',),
  ])
])

pipeline {

//  environment {
////        registry = "hhssaaffii/${service_name}"
////        registryCredential = ''
////        dockerImage = ''
//    //Use Pipeline Utility Steps plugin to read information from pom.xml into env variables
////        IMAGE = readMavenPom().getArtifactId()
////        VERSION = readMavenPom().getVersion()
//  }
  agent any
  stages {
    stage("get version") {
      steps {
        script {
          if ("${IMAGE_TAG}"?.trim()) {
            stage('No need to checkout,') {
              sh 'echo ${IMAGE_TAG}, image maybe already exist'
            }
          } else {
            stage('build image') {
//              steps {
                buildangularapp("${service_name}")
//              git 'https://github.com/hhammidd/${service_name}.git'
//              sh "docker build -t ${service_name}:3 ."
//              }
            }

//            stage("start build and push image") {
//              steps {
//                buildangularimage("3")
//              }
//            }

          }
        }
      }
    }

//    stage("checkout code") {
//      steps {
//        buildangularapp("${service_name}")
//      }
//    }


    stage("deploy") {
      steps {
        createangularhelm("${service_name}", "3", "${environment}")
      }
    }

  }
}
